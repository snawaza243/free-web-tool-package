const text = document.getElementById('text');
const inputField = document.getElementById('input-field');
const time = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

let words = ['Hello', 'World', 'Typing', 'Master'];
let wordIndex = 0;
let timer;

function updateText() {
    text.innerText = words[wordIndex];
    wordIndex++;
    if (wordIndex === words.length) {
        wordIndex = 0;
    }
}

function updateTime() {
    let remainingTime = parseInt(time.innerText);
    if (remainingTime > 0) {
        remainingTime--;
        time.innerText = remainingTime;
    } else {
        clearInterval(timer);
        inputField.disabled = true;
        startBtn.disabled = false;
        resetBtn.disabled = false;
        alert('Time is up! Your score is: ' + calculateScore());
    }
}

function calculateScore() {
    let typedWords = inputField.value.trim().split(' ');
    let correctWords = words.slice(0, typedWords.length);
    let score = 0;
    for (let i = 0; i < correctWords.length; i++) {
        if (correctWords[i] === typedWords[i]) {
            score++;
        }
    }
    return score;
}

startBtn.addEventListener('click', function () {
    inputField.value = '';
    inputField.disabled = false;
    inputField.focus();
    startBtn.disabled = true;
    resetBtn.disabled = true;
    words.sort(() => Math.random() - 0.5);
    updateText();
    time.innerText = 60;
    timer = setInterval(updateTime, 1000);
});

resetBtn.addEventListener('click', function () {
    inputField.disabled = true;
    startBtn.disabled = false;
    resetBtn.disabled = false;
    clearInterval(timer);
    text.innerText = 'Type this text';
    time.innerText = 60;
});

inputField.addEventListener('input', function () {
    let typedWords = inputField.value.trim().split(' ');
    let correctWords = words.slice(0, typedWords.length);
    for (let i = 0; i < correctWords.length; i++) {
        if (correctWords[i] !== typedWords[i]) {
            inputField.classList.add('error');
            return;
        }
    }
    inputField.classList.remove('error');
    if (typedWords.length === words.length) {
        clearInterval(timer);
        inputField.disabled = true;
        startBtn.disabled = false;
        resetBtn.disabled = false;
        alert('Congratulations! Your score is: ' + calculateScore());
    }
});


const textarea = document.getElementById('input-field');
const wordCount = document.getElementById('word-count');
const wordCountSpace = document.getElementById('word-count-space');


textarea.addEventListener('input', function () {
    let text = textarea.value.trim();
    let words = text.split(/\s+/); // split text by any whitespace character
    let count = words.length;
    wordCount.innerText = count;

    let countData = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            countData++;
            wordCountSpace.innerText = countData;

        }
    }
});


// textarea.addEventListener('input', function () {
//     let countData = 0;
//     for (let i = 0; i < text.length; i++) {
//         if (text[i] === ' ') {
//             countData++;
//             wordCountSpace.innerText = countData;

//         }
//     }

// });
