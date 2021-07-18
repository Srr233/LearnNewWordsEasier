function stopGame() {
    this.htmlElements.start.disabled = false;
    this.variables.isStarted = false;

    // save last words
    let notLearnedWords;
    if (this.variables.chunkMode) {
        // if chunkMode is on and stop game func is running, it means all words are learned
        notLearnedWords = [];
    } else {
        notLearnedWords = this.variables.checkedWords.filter(str => !this.variables.learnedWords.has(str));
    }

    this.variables.currentWords = notLearnedWords;
    this.variables.checkedWords = [];
    this.variables.chunkedWords = [];
    // update index of current word
    this.variables.indexOfCRWord = 0;
}

export { stopGame };