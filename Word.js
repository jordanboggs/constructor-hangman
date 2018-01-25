const Word = function(word) {
  this.word = word;
  this.makeArray = function(word) {
    return word.split("");
  };
  this.array = this.makeArray(word);
};
