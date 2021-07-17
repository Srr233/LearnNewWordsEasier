function getEngRu(str) {
    const splited = str.split(' - ');
    const ruReplace = splited[1].replaceAll('*', '');
    return {
        eng: splited[0],
        ru: ruReplace
    }
}

export { getEngRu };