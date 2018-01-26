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
let guessedArray = newWord.arrayOfChars;
let blanksArray = newWord.arrayOfBlanks;

// DELETE later, this is for testing only
console.log(colors.blue("The word is " + newWord.word));
console.log(blanksArray);
console.log(colors.grey(blanksArray.join(" ")));

// Set up the prompt
let schema = {
  properties: {
    letter: {
      description: colors.magenta("Guess a letter:")
    }
  }
};
// Set up colors
prompt.message = colors.cyan("?");
prompt.delimiter = " ";
// Begin prompt
prompt.start();
prompt.get(schema, function(err, result){
  // console.log(colors.cyan(result.letter));
  if (err) {
    console.log(colors.red(err));
  }
  else {
    // Program will reject all letters after initial letter
    let letter = result.letter[0];

    // Program will detect if the guess was wrong
    let success = 0;

    // Check array for matches
    for (let i = 0; i < guessedArray.length; i++) {
      if (letter === guessedArray[i]) {
        // Replace the space in blanksArray
        blanksArray[i] = letter;
        success++;
      }
    }

    // Check if right or wrong
    if (success === 0) {
      guesses--;
      console.log(colors.red("Incorrect!"));
      console.log("Guesses left: " + guesses);
    }
    else {
      console.log(colors.green(blanksArray.join(" ")));
    }
  }
});
