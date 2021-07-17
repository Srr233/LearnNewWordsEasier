function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function downloadWords(arrOfWords, fileName) {
    const result = arrOfWords.map(str => str + '\r\n');
    download(fileName, result.join(''));
}
export { downloadWords };