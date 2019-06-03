"use strict";

function playSoundOnKeyPress(e) {
    const audio = document.querySelector(`audio[data-key = "${e.keyCode}"]`);
    if(!audio) return;
    const key = document.querySelector(`.key[data-key = "${e.keyCode}"]`)
    if(!key) return;
    if(key.classList.contains('playing') == false) {
        key.classList.add('playing');
        audio.currentTime = 0; //rewind to the start
        audio.play();
    } else {
        key.classList.remove('playing');
    }
}

function playSoundOnMouseClick (e) {
    const audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`);
    const key = document.querySelector(`.key[data-key = "${e.target.dataset.key}"]`)
    if(key.classList.contains('playing') == false) {
        key.classList.add("playing");
        audio.currentTime = 0;
        audio.play();
    } else {
        key.classList.remove('playing');
    }
}

function removeTransition(e) {
    if(e.propertyName != 'transform') return; //skip if its not a transform
    this.classList.remove('playing');
}

window.addEventListener('keydown', playSoundOnKeyPress);

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', playSoundOnMouseClick));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

