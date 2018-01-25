/* * * * * * * * * * * * * * * * * * * * * * *
 * CONSTRUCTOR HANGMAN                       *
 * By Jordan Boggs                           *
 * January, 2018                             *
 * Submitted for credit for                  *
 *  University of Denver Coding Bootcamp     *
 * * * * * * * * * * * * * * * * * * * * * * *
 */

const prompt = require('prompt');
const colors = require("colors/safe");
const Word = require("./Word.js");
const Letter = require("./Letter.js");

const wordBank = ["armadillo", "capybara", "platypus", "hippopotamus",
                  "rhinoceros", "wallaby", "elephant", "dromedary",
                  "llama", "alpaca", "gazelle", "antilope", "anteater"];
let guesses = 9;

const pickWord = function() {
  const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  const newWord = new Word(randomWord);
  return newWord;
};

let newWord = pickWord();

let schema = {
  properties: {
    letter: {
      description: "Guess a letter"
    }
  }
};

prompt.start();
prompt.get('letter', function(err, result){
  console.log(result);
});
