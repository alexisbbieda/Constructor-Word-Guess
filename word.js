//Require letter.js file
var Letter = require("./letter.js")

function Word(word) {
    // An array of new Letter objects representing the letters of the underlying word
    this.letterArr = [];
    this.compare = "";

    for (var i = 0; i < word.length; i++) {
        this.letterArr.push(new Letter(word[i]))
    }

    // A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
    this.wordString = function () {
        var correctWordString = "";
        for (var j = 0; j < this.letterArr.length; j++) {
            correctWordString += this.letterArr[j].returnChar() + " ";
        }
        return correctWordString
    }

    // A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
    this.guessCheck = function (input) {
        for (var k = 0; k < this.letterArr.length; k++) {
            this.letterArr[k].guessCheck(input)
        }
    }
}

module.exports = Word;