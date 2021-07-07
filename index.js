const inputFile = document.querySelector('[data-loadFile]');
const start = document.querySelector('[data-start]');
const englishWord = document.querySelector('[data-englishWord]');
const translatedWord = document.querySelector('[data-translatedWord]');
const answerInput = document.querySelector('[data-addAnswer]');
const learnedWordsButton = document.querySelector('[data-saveLearned]');
const restOfWords = document.querySelector('[data-saveRest]');
const selectCountRepeat = document.querySelector('[data-selectAmount]');
const deleteAllStarsButton = document.querySelector('[data-deleteAllStars]');
const showLetterButton = document.querySelector('[data-showLetter]');

let allWords;
let checkedWords = [];
let learnedWords = [];
let uploadedWords = [];
let currentTranslatedWord;
let isStarted = false;
let isFileLoaded = false;

const expCheck = /^\D* - \D*\*{0,3}$/g;
inputFile.addEventListener('change', function (e) {
    const file = this.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        isFileLoaded = true;
        const result = fileReader.result;
        const resultSplit = result.split('\r\n').map(couple => couple.trim().toLowerCase());
        allWords = resultSplit.filter(couple => couple.match(expCheck));
    }
});

function countStars(coup) {
    let count = 0;
    for (let i = 0; i < coup.length; i++) {
        count += +(coup[i] === '*');
    }
    return count;
}

function showStars(str) {
    starsCount = countStars(str);
    let starBox = document.querySelector(".starsBox");
    starBox.innerHTML = '';
    for (let i = 0; i < starsCount; i ++) {
        let starImg = document.createElement("img");
        starImg.classList.add("starImg");
        starImg.src =  './assets/star-win.svg';
        starBox.appendChild(starImg);
    }
}

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
function startGame(arrayWords) {
    if (!isFileLoaded) {
        alert('You must load a file!');
        return;
    }
    if (!allWords || !allWords.length) {
        alert('Words haven\'t found. Check your words!');
        return
    };
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
    addWordInCurrentWord(firstWord);
    translatedWord.textContent = '...';
    // push checked word
    checkedWords.push(firstWord);
    showStars(arrayWords);
}
start.addEventListener('click', () => {
    startGame(allWords);
});
function nextWord(couple) {
    englishWord.textContent = getEngRu(couple).eng;
    translatedWord.textContent = '...';
    // push checked word
    checkedWords.push(couple);
    showStars(couple);
}

let amount = 3;
function isLearnedWord(couple) {
    let amountStar = countStars(couple);
    return amountStar >= amount;
}
function addWordInCurrentWord(coupleWords) {
    const enRu = getEngRu(coupleWords);
    currentTranslatedWord = enRu.ru;
}
answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        if (!isFileLoaded) {
            alert('You must load a file!');
            return;
        }
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
        } else {
            checkedWords[indexOfCRWord] = coupleWords.replaceAll('*', '');
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
                const next = allWords.pop();
                addWordInCurrentWord(next);
                nextWord(next);
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

deleteAllStarsButton.addEventListener('click', function(e) {
    if (!isFileLoaded) {
        alert('You must load a file!');
        return;
    }
    if (!isStarted) {
        alert('You must save your file before playing');
        return;
    }
    allWords = allWords.map(couple => couple.replaceAll('*', ''));
    downloadWords(allWords, 'updated words');
});
function showLetter() {
    if (!isFileLoaded) {
        alert('You must load a file!');
        return;
    }
    if (!isStarted) {
        alert('You must play before getting a prompt');
        return;
    }
    if (!currentTranslatedWord[0]) return;
    if (translatedWord.textContent.includes('.')) translatedWord.textContent = '';
    translatedWord.textContent += currentTranslatedWord[0];
    currentTranslatedWord = currentTranslatedWord.slice(1);
}
answerInput.addEventListener('keyup', function(e) {
    if (e.shiftKey && e.key === 'Enter') {
        showLetter();
    }
});
showLetterButton.addEventListener('click', showLetter);
