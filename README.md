# README - Invisible Cities FrontEnd v. 0.1 2/16/21

Hey! Invisible Cities was my first stab at a chat app. This is the frontend.

I developed this as my final project for a full-stack web developmenmt bootcamp called FlatIron. To explore the technologies I learned over the course of 12 weeks, I chose to design a chat app in the style of the app MarcoPolo. It turns out that was an overly ambitious idea for my current level, but somehow after designing and redesigning this app over the course of 5 weeks, I have something that, for the most part, works.

There is room for improvement, but it's time to turn this in. In this document, you'll find my notes relevant to the backend data model, controllers, and some of the things I'd like to develop when I get a chance to work on the next version of this app.

# Deprecated files

- Over the five weeks I spent on this project, I ended up scrapping the build and starting over several times. There are vestigial bits in the /src/deprecated folder just in case they may come up.

# Future Technologies

- perhaps for the next version, implementing stuff with GraphQL and websockets would help. There are probably some leftovers in the package.json and the deprecated files.

- additionally, this version stores a ton in localStorage. I think there's some sort of server-side temp session storage that would be way more secure, but I only started to learn about that this week and I wasn't about to risk another re-start.

- Some sort of testing needs to be written. My colleagues recommend JEST and I plan on checking it out for the next release.
- It would be great to implement editing user profiles. There's some structure for it in the db, but the controller on the backend needs built out and so does the frontend

# Nothing fancy, but it works

- I was able to get a tiny bit of styling done before the deadline but not much at all. What's been done uses material ui.
- Instead of websockets handling updating compnents, I used the useEffect hook. It works, but it's slooooooow. Really looking forward to getting websockets working with this project.

# Open issues

- two things I've noticed that I havent had a chance to correct: When a user uses the pull-down menus to make groups from their friends, the pull-down menus don't auro update :( More serious, when a user logs out, localStorage isn't completely clear and things look a little weird.

# user stories

- once you get this working with the backend, a user can create an account, log in, search for friends, request friends and respond to friend requests, block friends, message groups, create and delete groups, and delete their own profile.

Backend can be found here: https://github.com/s-satsangi/invisible-cities-backend
