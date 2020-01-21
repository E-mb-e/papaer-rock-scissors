// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/

const hands = [...document.querySelectorAll('.select img')];
const winner = document.querySelector('[data-summary="who-win"]');
// obiekt przechowujące dane gry - liczba gier, zwycięstwa, porażki i remisy
const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

// obiekt przechowyjący aktualny stan gry
const game = {
    playerHand: "",
    aiHand: ""
}

//Wybór opcji - player
function handSelection() {
    // console.log(this);
    game.playerHand = this.dataset.option
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px yellow';
}

//wybór opcji - ai
function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;;
}

// ustalenie wyniku gry
function checkResult(player, ai) {
    if (player === ai) {
        console.log(player, ai);
        return "draw";
    } else if ((player === 'paper' && ai === 'rock') || (player === 'rock' && ai === 'scissors') || (player === "scissors" && ai === "paper")) {
        return "win";
    } else return "loss";
}

// Publikacja wyników
function publishResult(gameResult) {
    switch (gameResult) {
        case 'win':
            document.querySelector('.wins span').textContent = ++gameSummary.wins;
            winner.textContent = "You win!";
            winner.style.color = "green";
            break;
        case 'loss':
            document.querySelector('.losses span').textContent = ++gameSummary.losses;
            winner.textContent = "AI!";
            winner.style.color = 'red';
            break;
        case 'draw':
            document.querySelector('.draws span').textContent = ++gameSummary.draws;
            winner.textContent = "Draw!";
            winner.style.color = 'gray';
            break;
    }
    document.querySelector('.numbers span').textContent = ++gameSummary.numbers;
    document.querySelector('[data-summary="your-choice"]').textContent = game.playerHand;
    document.querySelector('[data-summary="ai-choice"]').textContent = game.aiHand;
}

function restartGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = ''; //resetowanie obwódki można też forEachem poniżej ale po co?
    // hands.forEach(hand => hand.style.boxShadow = '');
    game.playerHand = '';
}

// funkcja sterująca
function startGame() {
    if (!game.playerHand) return alert('Please select a hand')
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(gameResult);
    restartGame();
}



hands.forEach(hand => {
    hand.addEventListener('click', handSelection)
});

document.querySelector('.start').addEventListener('click', startGame);