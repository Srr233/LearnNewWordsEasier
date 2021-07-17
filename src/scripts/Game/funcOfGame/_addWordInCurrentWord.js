import { getEngRu } from './getEngRu.js';
/**
   * Example for couple: "english - английский"
   * @param {string} couple
   * 
  */
 function _addWordInCurrentWord(couple) {
    const enRu = getEngRu(couple);
    this.htmlElements.englishWord.textContent = enRu.eng;
    this.htmlElements.translatedWord.textContent = '...';
    // currentTranslated word for prompting
    this.variables.currentTranslatedWord = enRu.ru;
  }

export { _addWordInCurrentWord };