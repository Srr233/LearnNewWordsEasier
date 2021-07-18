import { getEngRu } from './getEngRu.js';
import { stopGame } from './stopGame.js';
import { isLearnedWord } from './isLearnedWord.js';
import { _isContainMessage } from './_isContainMessage.js';
import { _addWordInCurrentWord } from './_addWordInCurrentWord.js';

function addOneStarPlus(i, couple) {
    if (this.variables.chunkMode) {
        const index = this.variables.chunkedWords[0].findIndex((couple1) => couple1 === couple);
        this.variables.chunkedWords[0][index] = couple + '*';
        this.variables.checkedWords[i] = couple + '*';
        return;
    }
    this.variables.checkedWords[i] = couple + '*';
}

function replaceFromCheckedToLearned(i) {
    const learnedWord = this.variables.checkedWords.splice(i, 1)[0];
    if (this.variables.chunkMode) {
        const indexInChunked = this.variables.chunkedWords[0].findIndex(w => w === learnedWord);
        this.variables.chunkedWords[0].splice(indexInChunked, 1);
    }
    this.variables.learnedWords.add(learnedWord);
}

function breakCombination(i) {
    const couple = this.variables.checkedWords[i];
    if (this.variables.chunkMode) {
        const index = this.variables.chunkedWords[0].findIndex((couple1) => couple1 === couple);
        this.variables.chunkedWords[0][index] = couple.replaceAll('*', '');
        this.variables.checkedWords[i] = couple.replaceAll('*', '');
        return;
    }
    this.variables.checkedWords[i] = couple.replaceAll('*', '');
}
const timeing = 2000;

function continueGameChunk() {
    const notLearnedWords = this.variables.chunkedWords[0]
    .filter(couple => isLearnedWord(couple) < this.variables.howManyRepeat);
    const learnedWords = this.variables.chunkedWords[0]
    .filter(couple => isLearnedWord(couple) >= this.variables.howManyRepeat);

    if (notLearnedWords.length) {
        this.variables.currentWords = notLearnedWords;
    } else {
        if (this.variables.chunkedWords.length === 1) {
            alert('All words are learned!');
            stopGame.call(this);
            return;
        }
        alert('Chunk!');//change to pop-up!!!!!!!!!!!!!!!!
        this.variables.chunkedWords.splice(0, 1);
        this.variables.currentWords = this.variables.chunkedWords[0].slice();
    }
    setTimeout(() => {
        nextWord.call(this);
    }, timeing);
}

function nextWord() {
    const next = this.variables.currentWords.pop();
    this.variables.checkedWords.push(next);
    _addWordInCurrentWord.call(this, next);

    // update index of current word
    this.variables.indexOfCRWord = this.variables.checkedWords.length - 1;
}

function answer(inputText) {
    if (_isContainMessage.call(this, 'answer')) return;

    const indexOfCRWord = this.variables.indexOfCRWord;
    const coupleWords = this.variables.checkedWords[indexOfCRWord];
    const enRu = getEngRu(coupleWords);
    const userAnswer = inputText.toLowerCase();

    if (userAnswer === enRu.ru) {
        alert('Good! It\'s correct!');
        addOneStarPlus.call(this, indexOfCRWord, coupleWords);
        if (
            isLearnedWord(this.variables.checkedWords[indexOfCRWord]) >=
            this.variables.howManyRepeat
        ) {
            alert('You have learned new words! Good!');
            replaceFromCheckedToLearned.call(this, indexOfCRWord);    
        }
    } else {
        breakCombination.call(this, indexOfCRWord);
    }
    // show correct answer
    this.htmlElements.translatedWord.textContent = enRu.ru;

    if (!this.variables.currentWords.length) {
        if (this.variables.chunkMode) {
            continueGameChunk.call(this);
            return;
        }
        alert('All words are repeated! Great! Now you can start again!');
        stopGame.call(this);
    } else {
        setTimeout(() => {
            nextWord.call(this);
        }, timeing);
    } 
}

export { answer };