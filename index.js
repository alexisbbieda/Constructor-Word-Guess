// Require word.js file
var Word = require("./word.js");

// Initialize iquirer constructor
var inquirer = require("inquirer");

// Word options
var fruit = ["apple", "pear", "kiwi", "grape", "banana", "peach", "mango", "plum", ];

// Create variables
var randomWord = "";
var wordGuess = "";
var correctWord;
var guessesLeft;
var guessesRemaining = 10

// Function that takes the user guess and compares it to the correct word that is generated
function word() {
    wordGuess = correctWord.wordString()
    console.log(wordGuess);
    correctWord.compare = wordGuess
}

// Function that tells user to guess a letter
function guess() {
    inquirer.prompt([{
        name: "ask",
        message: "Guess any letter"
    }])
    
    // Check how many guessed user has left
    .then(function (response) {
        var input = response.ask
        
        if (guessesRemaining > 0) {
            
            if (input.length === 1) {
                correctWord.guessCheck(input)
                wordGuess = correctWord.wordString();

                // Indicate if user guessed right or wrong and changes their guessesRemaining
                if (correctWord.compare === wordGuess) {
                    console.log("Wrong Guess:" + input);
                    guessesRemaining--
                    console.log("Guesses Left:" + guessesRemaining);
                    
                    // If there are no more guesses left run the loser function
                    if (guessesRemaining === 0) {
                        loser();
                    } 
                    
                    // If there are more guesses left run the guess and print functions
                    else {
                        print();
                        guess();
                    }
                   
                } 
                
                // If the user wins
                else {
                    console.log("Correct!");
                    guessesLeft--
                    print();
                    
                    // If there are no more guesses left and the user wins it starts over
                    if (guessesLeft === 0) {
                        console.log("Next Word: ");
                        restart();
                        print();
                        guess();
                    } 
                    
                    // Keep running the guess function
                    else {
                        guess();
                    }
                }
            } 
            
            // Prompt user to guess a letter
            else if (input.length === 0) {
                console.log("Guess a letter");
                guess();
            } 
            
            // If the user enters more then one letter tell that you can only choose one at a time
            else {
                console.log("Only one letter at a time");
                guess();
            }

        // Run the lose function
        } else {
            loser();
        }
    })
}

// Funtion for when the user loses
function loser() {
    {
        console.log("You Lost");
        inquirer.prompt([{
            type: "confirm",
            name: "playAgain",
            message: "Do you want to play again?"
        }])
        
        // Based on the users response either play again or quit game
        .then(function (response) {
            if (response.playAgain) {
                restart();
                print();
                guess();
            } else {
                console.log("Bye");
            }
        })
    }
}

// Function for when the user chooses to restart the game
// Generate a new word from the array
function restart() {
    randomWord = "";
    var index = parseInt(Math.floor(Math.random() * (fruit.length)));
    randomWord = fruit[index];
    correctWord = new Word(randomWord);
    guessesLeft = correctWord.letterArr.length;
}

// Create an area for where the letter guesses show up
function print() {
    console.log("\n------------------------------------");
    word();
    console.log("\n------------------------------------\n");
}

// Call the functions
restart();
print();
guess();