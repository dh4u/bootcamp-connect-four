# React JS Game

![](/public/ConnectFour.png)

This project was for the Full Stack Developer bootcamp I did.

## The assignment

> For this Capstone Project, you will be tasked to create a simple game using React. To be able to successfully do this, you will need to consolidate all the concepts you have learned about React, JSX and JavaScript so far.
>
> Create a React app that allows users to play Minesweeper. Minesweeper is a simple game where a user clicks on tiles to reveal whether there is a “mine” behind the tile or not. If a tile that hides a “mine” is clicked, the user loses and the game is over. If you are not familiar with Minesweeper, try it out [here](https://codepen.io/gaearon/pen/gWWZgR?editors=0010) .
>
> It is not compulsory that you create a Minesweeper game. Feel free to create another game (such as Suduko, Mahong, a memory game etc) of your choice. Tic-tac-toe is not a suitable choice!
>
> Any game that you create should meet the following criteria:
> > 1. It should be created using Create React App.
> > 2. It should include attractively styled components (at least 4 different types of components) that respond to user interaction. Feel free to use React-Bootstrap or another library and/or your own custom stylesheets.
> > 3. A number of components should be rendered using the array.Map() method. Each component rendered in this way should have a key that uniquely identifies it (see Task: React II).
> > 4. User interaction should modify the state of some components.
> > 5. The state of two or more components should be synced.
> > 6. The user should be able to restart the game.
> > 7. The user should be clearly informed if they have “won” or “lost” the game.
> > 8. The user should easily be able to request “help” that will inform the user about the rules of the game from the UI.
> > 9. The UI should be attractive, easy to use and intuitive.
> > 10. It should include a file called “readMe.md” which explains the rules of the game. This file should also provide clear instructions that an end user will be able to follow to be able to install and run your app on their local machine.
> > 11. Your mentor should be able to launch your app by typing ‘npm start’ from the command line interface.
> > 12. The file structure of the project should be well organized in line with guidelines [here](https://reactjs.org/docs/faq-structure.html) .
> > 13. Your code should be well documented with appropriate comments. The code should also be easy to read adhering to [Google’s style guide](https://google.github.io/styleguide/jsguide.html) about indentation, meaningful variable and component names etc.

## Demo
I have the code hosted for demo at Heroku. It may be a little slow to spin up but you can [play it here](https://dh4u-bootcamp-connect-four.herokuapp.com/).

## Running the Code

Clone / Download the project to your computer.

### Start the code
Open command prompt / terminal for the project folder and then you can run:

#### `npm install`

This will install the node dependencies.

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### How to play:

The game alternates between the red and black players.

To take a turn click a circle above a column on the playing board and your piece will drop to the first open slot in that column.

The objective of the game is to get four circles of the same color in a row (four red circles in a row or four black circles in a row).

The four circles can be in any direction (diagonally, horizontally, or vertically).

You can restart the game at any time by clicking "Start Over".

Hope that helps!

<br>
<br>

***
###### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).