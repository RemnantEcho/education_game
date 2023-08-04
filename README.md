# Education Game
Games to bring the fun back in Education.

The goal of this project was to inspire and reinvigorate the minds of young students in pursuit of knowledge regarding less STEM-related fields. So Geography, History, Philosophy, Arts.

To access the game you can use this link:
[Education Game](https://deft-twilight-cfb9fb.netlify.app/homepage)

This project has currently games for two subjects: **Geography** and **History**.  
+ For **Geography**: **Capital Cities** and **Flags**.
+ For **History**: **General Knowledge**.

Flags and General Knowledge are multiple choice questions that you can select answers from randomly pulled questions from a Render deployed Server.

Capital Cities features a Drag and Drop functionality where students have to drag and drop letters and spell out the correct answer.

You have hints to help you out if you get stuck, a info button that explains how the game works,  
and Fun facts you get after each question about the previous question.  

A summary of how many you have gotten correct appears at the end followed by a Back button, to go back to the subject page, and the Restart button to play again.

The Front-End uses HTML/CSS for the GUI, and JavaScript for the functionality and communicating with the Back-End.

The Back-End uses Node.js, with npm, dotenv, express. Our Back-End retrieves fetch requests from our Front-End and sends back question data based on different End-Points, this data is stored in a .json file as a array of object with key's such as 'name', 'image', 'capital'.

## How To Play
### Geography - Flags
1. Press Start
2. Look at the Image, Select a option at the bottom of the Screen
   + **(Additional)** Use Hint Button for help
3. Read the Fun Fact and click Okay
4. **Repeat Steps 2 - 3** until finished
5. Either Go **Back** or **Restart** Game to Play again

### Geography - Capital Cities
1. Press Start
2. Look at the Image, Drag and Drop letter buttons at the bottom to the boxes below the image
   + **(Additional)** Use Hint Button for help
3. Press Submit to check your answer
4. Read the Fun Fact and click Okay
5. **Repeat Steps 2 - 5** until finished
6. Either Go **Back** or **Restart** Game to Play again

## Features
+ HTML/CSS GUI
+ Home Page with Thumbnails  
+ Navbar with Drop Down
+ Global-styles Stylesheet for styles inherited by multiple webpages
+ Sprite images for Nav icons
+ Linear Gradient for Background Image
+ Expanding and Collapsing tabs
+ Responsive and viewport scaling design
+ About Page with POST command to send Messages to the server which is stored in a .json file
+ Embedded Google Maps
+ Game flow using overlays and hidden screens
+ Multiple Choice Questions randomly sorted for display
+ Drag and Drop Questions
+ Retrieving relevant Question Data from a server using fetch methods
+ Fetch Methods with parameters taken from the url, and sending a array of objects with length based on the parameter
+ Help Button for instructions
+ Hint button for displaying a Hint
+ Fun Facts will display between each question
+ Summary Menu when game finishes
+ Test Functions for the Back-End

## Dependencies
+ `npm`
+ `cors`
+ `dotenv`
+ `express`
### Developer
+ `nodemon`
+ `jest`
+ `supertest`

## Tools
+ Visual Studio Code
+ Git/Github
+ Figma
+ Photoshop

## Deployment
+ Front-End: [Netlify](https://www.netlify.com)
+ Back-End: [Render](https://render.com/)

## Bugs
+ None thus far
