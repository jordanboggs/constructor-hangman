const Word = function(word) {
  this.word = word;
  this.array = word.split("");
};

module.exports = Word;
