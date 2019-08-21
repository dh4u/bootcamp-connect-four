// Game.js - This code is a take-off of the Tic Tac Toe tutorial - https://reactjs.org/tutorial/tutorial.html

// import components
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { useTimeOut, useDelayNextChildren } from './UseTimeout.js';
import '../CSS/ConnectFour.css'

// Board class sets up the game board
class Board extends React.Component { 
    /* renderListItem
        Runs through the squares property and returns a black, blank, or red circle
        I kept the props.squares[i] === 'X' and props.squares[i] === 'O' but equated them with red and black. These squares are not clickable. 
    */ 
    renderListItem(i) {
        if( this.props.squares[i] === null ){
            return (<li onHover={this.innerHTML=this.props.redIsNext}>{this.props.squares[i]}</li>);
        }else if( this.props.squares[i] === 'X' ){
            return (<li className="red"></li>);
        }else if( this.props.squares[i] === 'O' ){
            return (<li className="black"></li>);
        }
    }
  
    /* render
        returns the game board by using the renderListItem function and passing in the square number or column designation.
    */
   render() {

        return (
            <div className="connectFour">
                <ul>
                    {this.renderListItem( 0 )}
                    {this.renderListItem( 1 )}
                    {this.renderListItem( 2 )}
                    {this.renderListItem( 3 )}
                    {this.renderListItem( 4 )}
                    {this.renderListItem( 5 )}
                    {this.renderListItem( 6 )}
                </ul>
                <ul>
                    {this.renderListItem( 7 )}
                    {this.renderListItem( 8 )}
                    {this.renderListItem( 9 )}
                    {this.renderListItem( 10 )}
                    {this.renderListItem( 11 )}
                    {this.renderListItem( 12 )}
                    {this.renderListItem( 13 )}
                </ul>
                <ul>
                    {this.renderListItem( 14 )}
                    {this.renderListItem( 15 )}
                    {this.renderListItem( 16 )}
                    {this.renderListItem( 17 )}
                    {this.renderListItem( 18 )}
                    {this.renderListItem( 19 )}
                    {this.renderListItem( 20 )}
                </ul>
                <ul>
                    {this.renderListItem( 21 )}
                    {this.renderListItem( 22 )}
                    {this.renderListItem( 23 )}
                    {this.renderListItem( 24 )}
                    {this.renderListItem( 25 )}
                    {this.renderListItem( 26 )}
                    {this.renderListItem( 27 )}
                </ul>
                <ul>
                    {this.renderListItem( 28 )}
                    {this.renderListItem( 29 )}
                    {this.renderListItem( 30 )}
                    {this.renderListItem( 31 )}
                    {this.renderListItem( 32 )}
                    {this.renderListItem( 33 )}
                    {this.renderListItem( 34 )}
                </ul>
                <ul>
                    {this.renderListItem( 35 )}
                    {this.renderListItem( 36 )}
                    {this.renderListItem( 37 )}
                    {this.renderListItem( 38 )}
                    {this.renderListItem( 39 )}
                    {this.renderListItem( 40 )}
                    {this.renderListItem( 41 )}
                </ul>
            </div>
        );
    }
}

// Dropzone is for the clickable circles above the game board that indicate the column that the player is "dropping" the piece into
class DropZone extends React.Component { 
    renderListItem(colName) {
        return (<li className={this.props.redIsNext ? "red" : "black"}  onClick={() => this.props.onClick(colName)}></li>);
    }
  
    render() {
        /*  
            These squares are clickable and correspond to the columns of the game board. They highlight by changing the class to red or black depending on the redIsNext property.
        */
        return (
                
            <ul className="drop-zone">
                {this.renderListItem('column0Bottom')}
                {this.renderListItem('column1Bottom')}
                {this.renderListItem('column2Bottom')}
                {this.renderListItem('column3Bottom')}
                {this.renderListItem('column4Bottom')}
                {this.renderListItem('column5Bottom')}
                {this.renderListItem('column6Bottom')}
            </ul>
        );
    }
}

// Game class is essentially the controller for the board
class Game extends React.Component{
    constructor(props){
        super(props);
        
        /*  STATE
            Tracks several things:
            
            1. similar to the Tic Tac Toe tutorial - use an array of squares to keep track of the board
            2. stepNumber (remnant of the tutorial. I was thinking of doing a history but wasn't required)
            3. redIsNext - this is just xIsNext from the tutorial but renamed
            4. column0Bottom - column6Bottom - stores the position in the column that the piece should "drop" into
        */
        this.state = {
            history: [{
                squares: Array(42).fill(null)
                ,
            }]
            ,stepNumber: 0
            ,redIsNext: true
            ,column0Bottom: 35
            ,column1Bottom: 36
            ,column2Bottom: 37
            ,column3Bottom: 38
            ,column4Bottom: 39
            ,column5Bottom: 40
            ,column6Bottom: 41
            ,lastColumnClicked: null
            ,
        }
    }

    /*  dropIntoPosition
        I added this function after the first iteration to introduce "gravity" to the board.
        Each time something "drops" into position it should go to the position in state for that column. Also assign a new bottom position for the column.
    */
    async dropIntoPosition(columnBottomValue){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const originalBottomValue = this.state[columnBottomValue];
        const newBottomValue = originalBottomValue - 7;
        const lastColumnClicked = originalBottomValue % 7; // because there are 7 columns
        // the is the space number for the bottom of the column
        let animateSpaceNumber = this.state[columnBottomValue];
        // array to store the other space numbers in the array
        let animateSpaceNumbers = [];

        // populate the array by 
        for ( let i = lastColumnClicked; i < 42; i = i + 7 ){
            console.log("i: " + i);
            animateSpaceNumbers.push(i);
        }

        console.log("columnBottomValue: " + columnBottomValue);
        console.log(animateSpaceNumbers);
        
        this.setState({
            lastColumnClicked: lastColumnClicked
            ,[columnBottomValue]: newBottomValue
            ,
        });

        //const promiseResult = await Promise.all(promises);

        this.handleClick(originalBottomValue);
    }

    delay (ms) {
        console.log('delay !');
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms)
        })
    }
    
    highlightItem(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        console.log(" highlightItem: " + i);

        squares[i] = this.state.redIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
                ,
            }])
            ,stepNumber: history.length
            ,
        });
    }
    
    /*  handleClick
        This function is called when a column header is clicked.
        It checks to see if there is a winner and returns if so.
        It updates theses state variables: history, stepNumber, and redIsNext.
    */
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if( calculateWinner(squares) || squares[i] ){
            return;
        }
        squares[i] = this.state.redIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
                ,
            }])
            ,stepNumber: history.length
            ,redIsNext: !this.state.redIsNext
            ,
        });
        console.log(this.state);
    }
    
    /*  resetGame
        Reset the game by updating these state variables: stepNumber, redIsNext, and column0Bottom - column6Bottom
    */
   resetGame(step){
        this.setState({
            stepNumber: 0
            ,redIsNext: true
            ,column0Bottom: 35
            ,column1Bottom: 36
            ,column2Bottom: 37
            ,column3Bottom: 38
            ,column4Bottom: 39
            ,column5Bottom: 40
            ,column6Bottom: 41
            ,lastColumnClicked: null
            ,
        })
    }
    
    /*  render
        This function returns the Connect Four game by bundling the various components together and also providing a status (winning player or next player up).
        Uses several react-bootstrap components including Accordion, Button, Card, and Jumbotron. 
    */
   render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const redIsNext = this.state.redIsNext;

        console.log(current.squares);
        
        let status;
        if (winner){
            if( redIsNext ){
                status = '<div style="display: flex; flex-direction: row; margin-left: 55px;"><div>Winner:</div> <div><ul class="next-player"><li class="black"></li></ul></div></div>';
            }else{
                status = '<div style="display: flex; flex-direction: row; margin-left: 55px;"><div>Winner:</div> <div><ul class="next-player"><li class="red"></li></ul></div></div>';
            }
        }else{
            if( redIsNext ){
                status = '<div style="display: flex; flex-direction: row; margin-left: 20px;"><div>Next player:</div><div><ul class="next-player" style="width: auto;"><li class="red"></li></ul></div></div>';
            }else{
                status = '<div style="display: flex; flex-direction: row; margin-left: 20px;">Next player:<br /><ul class="next-player" style="width: auto;"><li class="black"></li></ul></div>';
            }   
        }
        
        return (
            <div>
                {/*
                Jumbotron that displays the name of the game and uses an Accordion for displaying the instructions
                */}
                <Jumbotron>
                    <h1>Connect Four</h1>
                    <br />

                    <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            I hope this is a simple game but if you need help...
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body style={{fontSize: '.75rem'}}>
                            <h3>How to play</h3>
                            <hr />
                            <p>The game alternates between the red and black players.</p>
                            <p>To take a turn click a circle above a column on the playing board and your piece will drop to the first open slot in that column.</p>
                            <p>The objective of the game is to get four circles of the same color in a row (four red circles in a row or four black circles in a row).</p>
                            <p>The four circles can be in any direction (diagonally, horizontally, or vertically).</p>
                            <p>You can restart the game at any time by clicking "Start Over".</p>
                            <p>Hope that helps!</p>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Close
                            </Accordion.Toggle>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>
                </Jumbotron>
                <br />
                <div className="connectFour">
                    <DropZone
                        onClick={(columnBottomValue) => this.dropIntoPosition(columnBottomValue)}
                        redIsNext={this.state.redIsNext}
                        />
                    {/*
                        The game board
                    */}
                    <div className="game">
                        <div className="game-board">
                            <Board
                            squares={current.squares}
                            redIsNext={this.state.redIsNext}
                            />
                        </div>
                    </div>

                    {/*
                        Info about the game and a means to restart it.
                    */}
                    <div className="game-info">
                        <div>
                            <br />
                            <div dangerouslySetInnerHTML={{__html: status}}></div>
                        </div>
                        <Button variant="outline-primary" onClick={() => this.resetGame() }>Start Over</Button>
                    </div>
                </div>
            </div>
        );
    }
}

/*  calculateWinner
    This compares the squares array against the winning combinations on the board
*/
function calculateWinner(squares){
    const lines = [
        // 1st row matches
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        // 2nd row matches
        [7, 8, 9, 10],
        [8, 9, 10, 11],
        [9, 10, 11, 12],
        [10, 11, 12, 13],
        // 3rd row matches
        [14, 15, 16, 17],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
        [17, 18, 19, 20],
        // 4th row matches
        [21, 22, 23, 24],
        [22, 23, 24, 25],
        [23, 24, 25, 26],
        [24, 25, 26, 27],
        // 5th row matches
        [28, 29, 30, 31],
        [29, 30, 31, 32],
        [30, 31, 32, 33],
        [31, 32, 33, 34],
        // 6th row matches
        [35, 36, 37, 38],
        [36, 37, 38, 39],
        [37, 38, 39, 40],
        [38, 39, 40, 41],
        // 1st column matches
        [0, 7, 14, 21],
        [7, 14, 21, 28],
        [14, 21, 28, 35],
        // 2nd column matches
        [1, 8, 15, 22],
        [8, 15, 22, 29],
        [15, 22, 29, 36],
        // 3rd column matches
        [2, 9, 16, 23],
        [9, 16, 23, 30],
        [16, 23, 30, 37],
        // 4th column matches
        [3, 10, 17, 24],
        [10, 17, 24, 31],
        [17, 24, 31, 38],
        // 5th column matches
        [4, 11, 18, 25],
        [11, 18, 25, 32],
        [18, 25, 32, 39],
        // 6th column matches
        [5, 12, 19, 26],
        [12, 19, 26, 33],
        [19, 26, 33, 40],
        // 7th column matches
        [6, 13, 20, 27],
        [13, 20, 27, 34],
        [20, 27, 34, 41],
        // bottom left to top right diagonals
        // 1st diagonal matches
        [21, 15, 9, 3],
        // 2nd diagonal matches
        [28, 22, 16, 10],
        [22, 26, 10, 4],
        // 3rd diagonal matches
        [35, 29, 23, 17],
        [29, 23, 17, 11],
        [23, 17, 11, 5],
        // 4th diagonal matches
        [36, 30, 24, 18],
        [30, 24, 18, 12],
        [24, 18, 12, 6],
        // 5th diagonal matches
        [37, 31, 25, 19],
        [31, 25, 19, 13],
        // 6th diagonal matches
        [38, 32, 26, 20],
        // bottom right to top left diagonals
        // 1st diagonal matches
        [38, 30, 22, 14],
        // 2nd diagonal matches
        [39, 31, 23, 15],
        [31, 23, 15, 7],
        // 3rd diagonal matches
        [40, 32, 24, 16],
        [32, 24, 16, 8],
        [24, 16, 8, 0],
        // 4th diagonal matches
        [41, 33, 25, 17],
        [33, 25, 17, 9],
        [25, 17, 9, 1],
        // 5th diagonal matches
        [34, 26, 18, 10],
        [26, 18, 10, 2],
        // 6th diagonal matches
        [27, 19, 11, 3],
    ]
    
    for ( let i = 0; i < lines.length; i++ ){
        const[a, b, c, d] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]){
            return squares[a];
        }
    }
    return null;
}
export default Game;