import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import quoteFetcher from './quoteFetcher'
import { toSignal } from '@angular/core/rxjs-interop'
import { from } from 'rxjs'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = signal('')
  countdown = signal({ seconds: 0, minutes: 0, hours: 0, days: 0 })
  quote = toSignal(from(quoteFetcher()), { initialValue: null })
  selectedDate = signal<Date | null>(null)

  private intervalId?: number
  private readonly STORAGE_TITLE = 'nc_title'
  private readonly STORAGE_DATE = 'nc_selectedDate'

  millisecondsToFormat(ms: number) {
    let seconds = ms / 1000

    const days = Math.trunc(seconds / 86400)
    seconds = seconds % 86400

    const hours = Math.trunc(seconds / 3600)
    seconds = seconds % 3600

    const minutes = Math.trunc(seconds / 60)
    seconds = seconds % 60

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: Math.trunc(seconds),
    }
  }

  constructor() {
    try {
      const savedTitle = localStorage.getItem(this.STORAGE_TITLE)
      if (savedTitle) this.title.set(savedTitle)

      const savedDate = localStorage.getItem(this.STORAGE_DATE)
      if (savedDate) {
        const parsed = new Date(savedDate)
        if (!isNaN(parsed.getTime())) this.selectedDate.set(parsed)
      }
    } catch (e) {}

    this.intervalId = window.setInterval(() => {
      const selection = this.selectedDate()

      if (selection) {
        const now = new Date()
        let diff = selection.getTime() - now.getTime()

        if (diff < 0) diff = 0
        this.countdown.set(this.millisecondsToFormat(diff))
      }
    }, 1000)
  }

  onTitleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement
    this.title.set(inputElement.value)
    try {
      localStorage.setItem(this.STORAGE_TITLE, inputElement.value)
    } catch {}
  }

  onDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement

    const currentDate = new Date()
    const selected = new Date(inputElement.value)
    this.selectedDate.set(selected)
    try {
      localStorage.setItem(this.STORAGE_DATE, selected.toISOString())
    } catch {}

    const timeDifference = selected.getTime() - currentDate.getTime()
    const formattedTimeDifference = this.millisecondsToFormat(timeDifference)

    this.countdown.set(formattedTimeDifference)
  }

  get selectedDateIso(): string {
    const sd = this.selectedDate()
    return sd ? sd.toISOString().slice(0, 10) : ''
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
