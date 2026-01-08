const cardsArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
let board = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    board = shuffle(cardsArray.slice());
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    document.getElementById('moves').textContent = 'Moves: 0';

    board.forEach((letter, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = letter;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.textContent = this.dataset.letter;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moves++;
        document.getElementById('moves').textContent = 'Moves: ' + moves;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.letter === secondCard.dataset.letter) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetCards();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Start game automatically on page load
startGame();
