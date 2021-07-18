/**
 * 
 * @param {string} text 
 * @returns boolean
 * if a file is loaded with success
 */
function loadTXTFile(text) {
    // example: englis word - русское слово* (optional)
    const expCheck = /^\D* - \D*\*{0,3}$/g;

    const resultSplit = text.split('\r\n').map(couple => couple.trim().toLowerCase());
    const words = resultSplit.filter(couple => couple.match(expCheck));

    if (!words.length) return false;

    this.variables.currentWords = words.slice();
    this.variables.loadedWords = words.slice();

    //show that file loaded
    this.variables.isFileLoaded = true;
    return true;
}

export { loadTXTFile };