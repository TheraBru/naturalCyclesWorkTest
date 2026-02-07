import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import quoteFetcher from './quoteFetcher';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App {
  title = signal('countdown');
  countdown = signal({ seconds: 0, minutes: 0, hours: 0 });
  quote = toSignal(from(quoteFetcher()), { initialValue: null });
  selectedDate = signal<Date | null>(null);

  private intervalId?: number;

  millisecondsToFormat(ms: number) {
    let seconds = ms / 1000;

    const hours = Math.trunc(seconds / 3600);
    seconds = seconds % 3600;

    const minutes = Math.trunc(seconds / 60);
    seconds = seconds % 60;

    return { 
      hours: hours, 
      minutes: minutes, 
      seconds: Math.trunc(seconds) 
    };
  }

  constructor() {
    this.intervalId = window.setInterval(() => {
      const selection = this.selectedDate();

      if (selection) {
        const now = new Date();
        let diff = selection.getTime() - now.getTime();
        
        if (diff < 0) diff = 0;
        this.countdown.set(this.millisecondsToFormat(diff));
      }
    }, 1000);
  }

  onTitleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.title.set(inputElement.value);
  }

  onDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const currentDate = new Date();
    const selected = new Date(inputElement.value + 'T00:00:00');
    
    this.selectedDate.set(selected);
    
    const timeDifference = selected.getTime() - currentDate.getTime();
    const formattedTimeDifference = this.millisecondsToFormat(timeDifference);
    
    this.countdown.set(formattedTimeDifference);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
