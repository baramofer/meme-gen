'use strict';

function init() {
    renderImgsSection();
    renderSearchBoxDataList();
    renderKeywordByPop();
}
function renderKeywordByPop() {       
    var elPopWords = document.querySelector('.pop-words');
    var strHtml = '';
    var keywords = keywordsSortedByPop();
    strHtml += `<ul>`;
    for (var i = 5; i > 0; i--) {
        strHtml += `<li><a href="#" style="font-size:${(i+2)*5}px" onclick="renderImgsSection('${keywords[i].keyword}');renderKeywordByPop()">${keywords[i].keyword}</a></li>`;
    } 
    strHtml += `</ul>`;
    elPopWords.innerHTML = strHtml;
}

function onImgSelected(id) {
    setImgSelected(id);
}

function renderSearchBoxDataList() {
    var elKeywordList = document.querySelector('.KeywordList');
    var keywords = getKeywordsList();
    // var keywords = getKeywordsListInArray() // - better performance, less UI
    var strHtml = '';
    keywords.forEach(keyword => {
        strHtml += `<option value="${keyword}" label="${keyword}" />`
    })
    elKeywordList.innerHTML = strHtml;
}

function renderImgsSection(searchWord) {
    renderKeywordByPop();
    if (searchWord === undefined) searchWord = '';
    else checkSearchByPop(searchWord)
    var elImgsSection = document.querySelector('.imgs-section');
    var strHtml = '';

    // better UX , less performance
    var imgs = filteredImgsByLetter(searchWord.toLowerCase());
    imgs.forEach(img => {
        var url = img.url;
        strHtml += `<a href="editor.html"><img src="img/${url}" onclick="onImgSelected(${img.id})"></a>`
    })
    /*
    // better performance , less UX
    var imgs = filteredImgsByWord(searchWord);
    if (!searchWord) imgs.forEach(img => strHtml += `<img src="img/${img.url}" onclick="alert('1')"</img>`)
    else imgs.forEach(img => strHtml += `<img src="img/${img}" onclick="alert('1')"></img>`)
    */
    elImgsSection.innerHTML = strHtml;
}

function navToggle() {
    var elMainNav = document.querySelector('.header-nav');
    var elHamburgerIcon = document.querySelector('.hamburger');
    elMainNav.classList.toggle('open');
    var strHtml = `<li><a href="index.html"><div><i class="fa fa-camera-retro"></i></div>Gallery</a></li>
                   <li><a href="#"><div><i class="fa fa-paint-brush"></i></div>Memes</a></li>
                   <li><a href="#"><div><i class="fa fa-question-circle"></i></div>About</a></li>`
    if (elMainNav.classList.contains('open')) {
        elHamburgerIcon.style.display = 'none';
        elMainNav.style.right = '0';
        elMainNav.innerHTML = `<li><a href="#"><i onclick="navToggle()" class="fa fa-bars"></i></a></li>${strHtml}`
        screenToggle();
    } else {
        elMainNav.style.right = '-100%';
        elHamburgerIcon.style.display = 'none';
        elMainNav.innerHTML = strHtml;
        screenToggle();
    }
}

function screenToggle() {
    var elHamburgerIcon = document.querySelector('.hamburger');
    var elScreen = document.querySelector('.screen');
    elScreen.classList.toggle('open');
    if (elScreen.classList.contains('open')) {
        elScreen.style.display = 'block';
    }
    else {
        elHamburgerIcon.style.display = 'block';
        elScreen.style.display = 'none';
    }
}

//search box version 1 - better UI , less performance,
// the code use this function (line 39 at main.js)
function filteredImgsByLetter(letter) {
    return gImgs.filter(img => {
        for (var i = 0; i < img.keywords.length; i++) {
            if (img.keywords[i].includes(letter)) {
                return img.keywords[i]
            }
        }
    })
}
//search box version 2 - map object - better performance, less UI,
//the code doesnt use this function (line 33 at main.js)
function filteredImgsByWord(searchWord) {
    if (!searchWord) return gImgs;
    else return imgsMap[searchWord].split(' ')
}