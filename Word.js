const Letter = require("./Letter.js");

const Word = function(word) {
  this.word = word;
  this.array = this.objectifyLetters(word);
};

Word.prototype.objectifyLetters = function(word) {
  let array = word.split("");
  array.forEach(function(letter, index) {
    array[index] = new Letter(letter);
  });
  return array;
};

module.exports = Word;
