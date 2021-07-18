/**
 * 
 * @param {number} n
 * 
 * split words 
 */
function chunkGame(n) {
    const sorted = this.variables.currentWords.sort(() => Math.random() - Math.random());
    let chunked = 0;
    let chunkedWords = [];
    while(sorted.length) {
        if (chunked === n) {
            this.variables.chunkedWords.push(chunkedWords);
            chunkedWords = [];
            chunked = 0;
        } else {
            chunkedWords.push(sorted.pop());
            chunked += 1;
        }
    }
    // add last chunk
    this.variables.chunkedWords.push(chunkedWords);
    // add chunk to curre tWords
    this.variables.currentWords = this.variables.chunkedWords[0].slice();
}

export { chunkGame };