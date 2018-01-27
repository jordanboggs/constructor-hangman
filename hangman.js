/* * * * * * * * * * * * * * * * * * * * * * *
 * CONSTRUCTOR HANGMAN                       *
 * By Jordan Boggs                           *
 * January, 2018                             *
 * Submitted for credit for                  *
 *  University of Denver Coding Bootcamp     *
 * * * * * * * * * * * * * * * * * * * * * * *
 */

const Word = require("./Word.js");
const Letter = require("./Letter.js");
const prompt = require("prompt");
const colors = require("colors/safe");
const _ = require("lodash");

const wordBank = ["armadillo", "capybara", "platypus", "hippopotamus",
                  "rhinoceros", "wallaby", "elephant", "dromedary",
                  "llama", "alpaca", "gazelle", "antilope", "anteater"];
let maxGuesses = 9;
let guesses = maxGuesses;

const pickWord = function() {
  const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  const newWord = new Word(randomWord);
  return newWord;
};

let newWord = pickWord();
// Remove the word from the wordbank
_.pull(wordBank, newWord.word);
let guessedArray = newWord.arrayOfChars;
let blanksArray = newWord.arrayOfBlanks;

const interface = function() {
  console.log(colors.white(blanksArray.join(" ") + "\n"));

  // Set up the prompt
  let schema = {
    properties: {
      letter: {
        description: colors.yellow("Guess a letter:")
      }
    }
  };
  // Set up colors
  prompt.message = colors.cyan("?");
  prompt.delimiter = " ";
  // Begin prompt
  prompt.start();
  prompt.get(schema, function(err, result){
    if (err) {
      console.log(colors.red(err));
    }
    else {
      // Program will reject all letters after initial letter
      let letter = result.letter[0];

      // Program will detect if the guess was wrong
      let correctGuess = false;

      // Check array for matches
      for (let i = 0; i < guessedArray.length; i++) {
        if (letter === guessedArray[i]) {
          // Replace the space in blanksArray
          blanksArray[i] = letter;
          correctGuess = true;
        }
      }

      // Check if right or wrong
      if (!correctGuess) {
        guesses--;
        console.log(colors.red("Incorrect!"));
        console.log(colors.cyan("Guesses left: " + guesses));
        interface();
      }
      else {
        console.log(colors.white(blanksArray.join(" ")));

        // Check for victory
        if (_.isEqual(blanksArray, guessedArray)) {
          // Check if there are any new words left
          if (wordBank.length > 0) {
            // Prompt to start a new game
            let newSchema = {
              properties: {
                continue: {
                  type: 'boolean',
                  description: colors.yellow("Continue? (true/false)")
                }
              }
            }
            prompt.start();
            prompt.get(newSchema, function(err, result) {
              if (err) {
                throw err;
              }
              if (result.continue) {  
                // Pick a new word
                newWord = pickWord();

                // Remove the word from the wordbank
                _.pull(wordBank, newWord.word);

                // reset
                guessedArray = newWord.arrayOfChars;
                blanksArray = newWord.arrayOfBlanks;
                guesses = maxGuesses;
                interface();
              }
            });
          }
          else {
            console.log(colors.rainbow("Congratulations!! You win!!!"));
          }
        }
        else {
          interface();
        }
      }
    }
  });
}

interface();
