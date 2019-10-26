'use strict';


function getImgSelected() {
    var CurrMeme = loadFromStorage('currImg')
    return CurrMeme;
}

function delLine() {    
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1);
    gMeme.selectedTxtIdx--;
    saveToStorage('gMeme', gMeme);
}

function addLine() {
    var elContainer = document.querySelector('.canvas-container');
    var posY = (gMeme.txts.length > 1) ? posY = elContainer.offsetHeight / 2 : posY = elContainer.offsetHeight - (elContainer.offsetHeight / 10);
    var size = (elContainer.offsetHeight===300)? 38:44;      
    gMeme.txts.push(
        {
            line: 'Text here!',
            size: size,
            fontFamily: 'impact',
            align: 'ceter',
            color: '#ffffff',
            bold: 1,
            stroke: '#000000',
            x: 40,
            y: posY
        }
    )
    gMeme.selectedTxtIdx++;
}

function isUserSelectImg() {
    return (loadFromStorage('currImg')) ? true : false
}

function doSwitch() {
    var posX0 = gMeme.txts[0].x
    var posY0 = gMeme.txts[0].y
    gMeme.txts[0].x = gMeme.txts[1].x
    gMeme.txts[0].y = gMeme.txts[1].y
    gMeme.txts[1].x = posX0
    gMeme.txts[1].y = posY0
    renderCanvas()
}

function updateMeme() {
    saveToStorage('gMeme', gMeme);
}