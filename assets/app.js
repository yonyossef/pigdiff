/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, gameOver;
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');
var dekelImg = document.querySelector('.dekel');
var diceDOM = document.querySelector('.dice');

function playMiss() { 
    document.getElementById("missAudio").play(); 
} 
function playWin() { 
    document.getElementById("winAudio").play(); 
} 
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}
// currentScore = 0;
activePlayer = 0;
gameOver = true;

dekelImg.style.display = 'none';
btnRoll.style.display = 'none';
btnHold.style.display = 'none';
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// get Element value example
// var x = document.querySelector('#score-0').textContent;

diceDOM.style.display = 'none';

function SwitchActivePlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer = activePlayer ^ 1;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

btnRoll.addEventListener('click', function() {
    var dice, currentScoreDOM;
    if (gameOver) {
        console.log("Please press NEW GAME")
    } else {
        dice = Math.floor(Math.random() * 6) + 1;
        currentScoreDOM = document.querySelector('#current-'+ activePlayer );

        diceDOM.style.display = 'block';
        diceDOM.style.border = "none";
        diceDOM.src = 'assets/dice-' + dice + '.png';    

        if (dice != 1) {
            currentScoreDOM.textContent = Number(currentScoreDOM.textContent) + dice;
        } else {
            currentScoreDOM.textContent = 0;
            SwitchActivePlayer();
            diceDOM.style.border = "thick solid black";
            playMiss();
            btnRoll.style.display = 'none';
            dekelImg.style.display = 'block';
            setTimeout(function(){btnRoll.style.display = 'block'; dekelImg.style.display = 'none';},3000);
        }
    };
});

btnHold.addEventListener('click', function() {
    var currentScoreDOM = document.querySelector('#current-'+ activePlayer );
    var playerScoreDOM = document.querySelector('#score-'+ activePlayer );
    

    if (gameOver) {
        console.log("Please press NEW GAME")
    } else {
        var newScore = Number(playerScoreDOM.textContent) + Number(currentScoreDOM.textContent);
        
        playerScoreDOM.textContent = newScore;

        currentScoreDOM.textContent = 0;

        if (newScore >= 100) {
            btnRoll.style.display = 'none';
            btnHold.style.display = 'none';
            gameOver = true;
            console.log("Player " + activePlayer + 1 + " is the winner! Press NEW GAME for another");
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            dekelImg.style.display = 'block';
            playWin();
        } else {
            SwitchActivePlayer();
        }
    };
});

document.querySelector('.btn-new').addEventListener('click', function() {
    var currentScoreDOM;
    
    activePlayer = 0;
    for (var i=0; i<2; i++) {
        document.querySelector('#score-'+ i ).textContent = 0;
        document.querySelector('#current-'+ i ).textContent = 0;
    };
    currentScoreDOM = document.querySelector('#current-'+ activePlayer );

    diceDOM.style.display = 'none';

    btnRoll.style.display = 'block';
    btnHold.style.display = 'block';

    gameOver = false;
});




