const Letter = require("./Letter.js");

const Word = function(word) {
  this.word = word;
  this.array = this.objectifyLetters(word);
  this.arrayOfChars = this.makeArrayOfChars(this.array);
  this.arrayOfBlanks = this.makeArrayOfBlanks(this.array);
};

// I don't believe I ever ended up using this.array, so think about
// removing this in the future
Word.prototype.objectifyLetters = function(word) {
  let arr = word.split("");
  arr.forEach(function(letter, index) {
    arr[index] = new Letter(letter);
  });
  return arr;
};

Word.prototype.makeArrayOfChars = function(objectArray) {
  let arr = [];
  for (let i = 0; i < objectArray.length; i++) {
    arr[i] = objectArray[i].guessed;
  }
  return arr;
};

Word.prototype.makeArrayOfBlanks = function(objectArray) {
  let arr = [];
  for (let i = 0; i < objectArray.length; i++) {
    arr[i] = objectArray[i].blank;
  }
  return arr;
};

module.exports = Word;
