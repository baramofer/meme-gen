'use strict';

var gCanvas;
var gCtx;


function init() {
    if (!isUserSelectImg()) window.location.replace('index.html');
    gMeme = getMeme();
    renderCanvas();
    renderToolbar();
}

function renderToolbar() {
    var meme = getMeme();
    meme = meme.txts[meme.selectedTxtIdx];
    var selectedArielFont;
    var selectedImpactFont;
    if (meme.fontFamily === 'ariel') selectedArielFont = 'selected'
    else selectedImpactFont = 'selected'
    document.querySelector('.input-txt-toolbar').innerHTML =
        `<input type="text" name="line" onkeyup="updateCanvas(this)" value="${meme.line}">`
    document.querySelector('.txt-btns-toolbar-down').innerHTML =
        `<select name="fontFamily" class="btn btn-option" onchange="updateCanvas(this)">
                    <option value="ariel" ${selectedArielFont}>Ariel</option>
                    <option value="impact" ${selectedImpactFont}>Impact</option>
        </select>
                <input class="btn btn-txt" type="color" name="color" value="${meme.color}" onchange="updateCanvas(this)">
                    <input class="btn btn-txt" type="color" name="stroke" value="${meme.stroke}" onchange="updateCanvas(this)">`
}

function renderCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext("2d");
    var currImg = getImgSelected();
    var elImg = document.querySelector('.imgSelected')
    elImg.src = `img/${currImg}`;
    var img = new Image()
    img.src = `img/${currImg}`
    img.onload = function () {
        resizeCanvas();
        gCtx.drawImage(img, 0, 0, gCanvas.height, gCanvas.width);
        draw();
    }
}

function onSwitch() {
    var meme = getMeme();
    if (meme.txts.length !== 2) return;
    doSwitch();
    updateMeme();
}

function onAddLine() {
    addLine();
    renderCanvas();
    renderToolbar();
    updateMeme();
}

function onDeleteLine() {
    var meme = getMeme();
    if (meme.txts.length <= 1) return;
    delLine();
    renderCanvas();
    updateMeme();
}

function onChangeOrder() {
    var meme = getMeme();
    var linesAmount = meme.txts.length - 1;
    if (linesAmount === meme.selectedTxtIdx) {
        meme.selectedTxtIdx = 0;
    } else meme.selectedTxtIdx++;
    renderToolbar();
    updateMeme();
}

function updateCanvas({ name, value }) {
    var meme = getMeme()
    if (name === 'size') value = +value + meme.txts[meme.selectedTxtIdx][name];
    else if (name === 'y') value = +value + meme.txts[meme.selectedTxtIdx][name];
    setMemeValue(meme.txts[meme.selectedTxtIdx][name], value);
    meme.txts[meme.selectedTxtIdx][name] = value;
    renderCanvas();
    updateMeme();
}

function draw() {
    var meme = getMeme();
    meme.txts.forEach((txt, idx) => {
        drawText(idx);
    });
}

function drawText(idx) {
    var meme = getMeme();
    var meme = meme.txts[idx];
    gCtx.font = `${meme.size}px ${meme.fontFamily}`;
    gCtx.strokeStyle = `${meme.stroke}`
    gCtx.fillStyle = `${meme.color}`
    gCtx.textAlign = `${meme.align}`
    gCtx.fillText(meme.line, gCanvas.width / 2, meme.y);
    gCtx.strokeText(meme.line, gCanvas.width / 2, meme.y);
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}

function drawImg() {
    const img = document.querySelector('img');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}