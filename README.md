# :shipit: How to get started

1. Clone the repository to your local machine.
2. Withing the root folder run `npm i` to install dependencies. Make sure you have node and angular installed.
3. Run application with command `ng serve`.

## :eyes: Improvement suggestions and discussion

- There are a few things I would have wanted to improve before release. One major part is connected to accessibility. As of now I added no ARIA to the countdown so a screenreader will not alert user of changes. The reason why I didn't add this change is because it is better to not use ARIA at all than to use it incorrectly and when it comes to countdowns it is a tricky line to walk. You want the user to be aware of the ticking no matter if they have full vision or not, but you also don't want to disrupt their flow by alerting continously. Had this been an actual product it would have been a good idea to experiment a bit to find the best ARIA behavior.

- The countdown has some kinks that would have been good to handle before a release. A decision would have to be made for what behavior is expected if the user put in a date in the past for example.

- The solution with the scaling heading works for most inputs, especially the kinds one might expect from an actual user. But there are a few edge cases where the text will either be smaller or wrap. This is because the solution is dependant on the average width of a letter. Some letters however are smaller (like i and l) and some letters are wider (like m and w) this means that inputs that contains an unnatural amount of either of these letters will cause a breaking behavior. One might suggest either living with this issue (it is after all an extreme edge case) or taking the type of characters into account in the calculation as well.

- A decision that was made in the creation of this app was to add the quote for wider (and landscape) screens even though the Figma design seemed to count on it being absent. Had this been a real product I would have brought forward the question why this difference between the designs existed. For this assignment I took for granted that it was not on purpose and opted to keep the quote. This was because by WCAG and EN 301 549 standard all information on an application needs to be present through all screen sizes.

- Before a launch I would also suggest that some unit and e2e tests were added, to make sure everything works as expected and will continue to do so.

- Had this project been a real one and a part of a bigger structure then I would probably suggest using another structure of the directories as well as splitting up form and quote into different components.

- This app is rendered on Client side which works fine for such a small and non-complex build. Had we added bigger database communication and larger algoritms it would probably be a better idea to render it server side.

- I would also opt to use another API for the quotes, preferably one that is not third party or at the very least I can control the contents of. The one used for this project contained a few quite troubling and outright threatening and/or offensive quotes that might hurt the brand if a user would be met by it.

- A last disclaimer is that I am a React and Vue developer. This was my first time building in Angular. Meaning I had to understand the framework before I could build the app. Had this been a proper product that was meant for launch I would probably spend a bit more time on making sure the Angular syntax was up to standard.
