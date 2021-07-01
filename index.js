const inputFile = document.querySelector('[data-loadFile]');
const start = document.querySelector('[data-start]');
const englishWord = document.querySelector('[data-englishWord]');
const translatedWord = document.querySelector('[data-translatedWord]');
const answerInput = document.querySelector('[data-addAnswer]');
const learnedWordsButton = document.querySelector('[data-saveLearned]');
const restOfWords = document.querySelector('[data-saveRest]');
const selectCountRepeat = document.querySelector('[data-selectAmount]');

let allWords;
let checkedWords = [];
let learnedWords = [];
let uploadedWords = [];

const expCheck = /^\D* - \D*\*{0,3}$/g;
inputFile.addEventListener('change', function (e) {
    const file = this.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        const result = fileReader.result;
        const resultSplit = result.split('\r\n').map(couple => couple.trim().toLowerCase());
        allWords = resultSplit.filter(couple => couple.match(expCheck));
    }
});
function getEngRu(str) {
    const splited = str.split(' - ');
    const ruReplace = splited[1].replaceAll('*', '');
    return {
        eng: splited[0],
        ru: ruReplace
    }
}
function sortWords(arrayWords) {
    return arrayWords.sort(() => Math.random() - Math.random());
}
let isStarted = false;
function startGame(arrayWords) {
    isStarted = true;
    if (!arrayWords.length) {
        isStarted = false;
        alert('All words are learned!');
        return;
    }
    answerInput.value = '';
    allWords = sortWords(arrayWords);
    const firstWord = allWords.pop();
    englishWord.textContent = getEngRu(firstWord).eng;
    translatedWord.textContent = '...';
    // push checked word
    checkedWords.push(firstWord);
}
start.addEventListener('click', () => {
    if (!allWords || !allWords.length) throw new Error('Could not find words');
    startGame(allWords);
});
function nextWord(couple) {
    englishWord.textContent = getEngRu(couple).eng;
    translatedWord.textContent = '...';
    // push checked word
    checkedWords.push(couple);
}

let amount = 3;
function isLearnedWord(couple) {
    let amountStar = 0;
    for (let i = 0; i < couple.length; i++) {
        amountStar += +(couple[i] === '*');
    }
    return amountStar >= amount;
}
answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const currentWord = englishWord.textContent;
        const indexOfCRWord = checkedWords.findIndex(str => str.includes(currentWord));
        const coupleWords = checkedWords[indexOfCRWord];
        const enRu = getEngRu(coupleWords);
        const userAnswer = e.target.value.toLowerCase();
        if (userAnswer === enRu.ru) {
            alert ('Good! It\'s correct!');
            checkedWords[indexOfCRWord] = coupleWords + '*';
            if (isLearnedWord(checkedWords[indexOfCRWord])) {
                alert('You have learned new words! Good!');
                learnedWords.push(checkedWords[indexOfCRWord]);
                checkedWords.splice(indexOfCRWord, 1);
            }
        }
        translatedWord.textContent = enRu.ru;
        e.target.value = '';
        if (!allWords.length) {
            alert('All words are repeated! Great!');
            allWords = checkedWords.filter(str => !learnedWords.includes(str));
            uploadedWords = checkedWords.filter(str => !learnedWords.includes(str));
            checkedWords = [];
            startGame(allWords);
        } else {
            setTimeout(() => {
                nextWord(allWords.pop());
            }, 2000);
        } 
    }
});

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
restOfWords.addEventListener('click', () => {
    if (!checkedWords.length) {
        alert('You must play before downloading');
    } else {
        const allWordsRes = [...allWords, ...checkedWords];
        downloadWords(allWordsRes, 'updated words');
    }
});
learnedWordsButton.addEventListener('click', () => {
    if (!learnedWords.length) {
        alert('You must play before downloading');
    } else {
        downloadWords(learnedWords, 'learned words');
    }
});
let previousOption = 1;
selectCountRepeat.addEventListener('change', function(e) {
    if (isStarted) {
        alert('The game is started! You must choose amount before start the game!');
        this.value = previousOption;
        return;
    }
    amount = this.value;
    previousOption = this.value;
});