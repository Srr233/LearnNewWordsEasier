/**
 * Gets answer or start, it helps to choose correct message
 * @param {string} type 
 * @returns void
 * 
 */
function _isContainMessage(type) {
    if (!this.variables.isFileLoaded) {
      alert('You must load a file!');
      return true;
    }
    if (type !== 'answer' && !this.variables.currentWords.length) {
      alert('Words haven\'t found or all words are learned. Check your words!');
      return true;
    };
    if (!this.variables.isStarted && type !== 'start') {
      alert('Press start and play!');
      return true;
    }
    return false;
  }

export { _isContainMessage };