function isLearnedWord(couple) {
    let amountStar = 0;
    for (let i = 0; i < couple.length; i++) {
        amountStar += +(couple[i] === '*');
    }
    return amountStar;
}

export { isLearnedWord };