'use strict';

var gMeme = createMeme();
var gImgs = createImgs();
var gImgsMap = createImgsMap();
var gKeywords = createKeywordsMap();

function checkSearchByPop(searchWord) {
    if (!gKeywords[searchWord]) return;
    gKeywords[searchWord]++;
    saveToStorage('gKeywords', gKeywords);
}

function keywordsSortedByPop(){
    var keywords = gKeywords;   
    var sortedKeywords = getKeywordsList().map(function (keyword){
        return { keyword: keyword, clickAmount: keywords[keyword] }
    })
    sortedKeywords.sort(function (a, b) {
        return a.clickAmount - b.clickAmount;
    })
    return sortedKeywords;
}

function createKeywordsMap() {
    gKeywords = loadFromStorage('gKeywords');
    if (!gKeywords) {
        gKeywords = keywordsMap()
        saveToStorage('gKeywords', gKeywords);
    }
    return gKeywords;
}

function getGkeywords(){
    return gKeywords;
}

function keywordsMap() {
    return gImgs.reduce(function (key, img) {
        for (var i = 0; i < img.keywords.length; i++) {
            if (!key[img.keywords[i]]) key[img.keywords[i]] = 1;
        }
        return key;
    }, {})
}

function createMeme() {
    gMeme = loadFromStorage('gMeme');
    if (!gMeme) {
        gMeme = {
            selectedImgId: 5,
            selectedTxtIdx: 0,
            txts: [
                {
                    line: 'Text Here!',
                    size: 44,
                    fontFamily: 'impact',
                    align: 'center',
                    color: '#ffffff',
                    bold: 1,
                    stroke: '#000000',
                    x: 40,
                    y: 70
                }
            ]
        }
        saveToStorage('gMeme', gMeme);
    }
    return gMeme;
}

//this create the basic imgs gallery
//each object must be enter hard code becase of the "keywords" key
function createImgs() {
    return [
        { id: 1, url: "1.jpg", keywords: ['other'] },
        { id: 2, url: "2.jpg", keywords: ['animals'] },
        { id: 3, url: "3.jpg", keywords: ['cute', 'animals'] },
        { id: 4, url: "4.jpg", keywords: ['cute', 'animals'] },
        { id: 5, url: "5.jpg", keywords: ['cute'] },
        { id: 6, url: "6.jpg", keywords: ['cute', 'animals'] },
        { id: 7, url: "7.jpg", keywords: ['funny'] },
        { id: 8, url: "8.jpg", keywords: ['funny'] },
        { id: 9, url: "9.jpg", keywords: ['funny', 'crazy'] },
        { id: 10, url: "10.jpg", keywords: ['happy'] },
        { id: 11, url: "11.jpg", keywords: ['happy'] },
        { id: 12, url: "12.jpg", keywords: ['happy'] },
        { id: 13, url: "13.jpg", keywords: ['funny', 'crazy'] },
        { id: 14, url: "14.jpg", keywords: ['other'] },
        { id: 15, url: "15.jpg", keywords: ['happy'] },
        { id: 16, url: "16.jpg", keywords: ['happy'] },
        { id: 17, url: "17.jpg", keywords: ['happy'] },
        { id: 18, url: "18.jpg", keywords: ['happy'] },
        { id: 19, url: "19.jpg", keywords: ['funny', 'crazy'] },
        { id: 20, url: "20.jpg", keywords: ['crazy'] },
        { id: 21, url: "21.jpg", keywords: ['funny'] },
        { id: 22, url: "22.jpg", keywords: ['funny'] },
        { id: 23, url: "23.jpg", keywords: ['happy'] },
        { id: 24, url: "24.jpg", keywords: ['happy', 'animals'] },
        { id: 25, url: "25.jpg", keywords: ['happy'] },
    ]
}

function getKeywordsList() {
    var singleKeywords = [];
    gImgs.forEach(img => {
        for (var i = 0; i < img.keywords.length; i++) {
            if (!singleKeywords.includes(img.keywords[i])) singleKeywords.push(img.keywords[i])
        }
    })
    return singleKeywords;
}

//this function use for search box version 2
// function getKeywordsList() {
//     var keywordsList = [];
//     for (let key in createImgsMap()) keywordsList.push(key)
//     return keywordsList;
// }

//this function also use for search box version 2 
function createImgsMap() {
    return gImgs.reduce(function (key, img) {
        for (var i = 0; i < img.keywords.length; i++) {
            if (!key[img.keywords[i]]) key[img.keywords[i]] = img.url;
            else key[img.keywords[i]] += ' ' + img.url;
        }
        return key;
    }, {})
}

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function setImgSelected(id) {
    gMeme.selectedImgId = id;
    setMemeValue('selectedImgId', id)
    var img = gImgs.find(img => img.id === id)
    saveToStorage('currImg', img.url)
}

function setMemeValue(key, value) {
    gMeme[key] = value;
    saveToStorage('gMeme', gMeme);
}