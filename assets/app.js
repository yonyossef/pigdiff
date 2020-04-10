/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, gameOver;
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');
var dekelMiss = document.querySelector('.dekel-miss');
var dekelWinR = document.querySelector('.dekel-wins-right');
var dekelWinL = document.querySelector('.dekel-wins-left');
var diceDOM = document.querySelector('.dice');
var missDOM = document.getElementById("missAudio");
var helpDOM = document.querySelector('.instructions');

function playMiss() { 
    var nextMiss = Math.floor(Math.random() * 5) + 1;
    missDOM.src = 'assets/dekelmiss-' + nextMiss + '.mp3';
    missDOM.play(); 
} 

function playWin() { 
    document.getElementById("winAudio").play(); 
} 

function SwitchActivePlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer = activePlayer ^ 1;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

// currentScore = 0;
activePlayer = 0;
gameOver = true;

dekelMiss.style.display = 'none';
btnRoll.style.display = 'none';
btnHold.style.display = 'none';
dekelWinR.style.display = 'none';
dekelWinL.style.display = 'none';

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// get Element value example
// var x = document.querySelector('#score-0').textContent;

diceDOM.style.display = 'none';

btnRoll.addEventListener('click', function() {
    var dice, currentScoreDOM;
    if (gameOver) {
        console.log("Please press NEW GAME")
    } else {        
        currentScoreDOM = document.querySelector('#current-'+ activePlayer );

        diceDOM.style.display = 'block';
        diceDOM.style.border = "none";

        dice = (currentScoreDOM.textContent == 0 ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 6) + 1);
        diceDOM.src = 'assets/dice-' + dice + '.png';    

        if (dice != 1) {
            currentScoreDOM.textContent = Number(currentScoreDOM.textContent) + dice;
        } else {
            currentScoreDOM.textContent = 0;
            SwitchActivePlayer();
            diceDOM.style.border = "thick solid black";
            playMiss();
            btnRoll.style.display = 'none';
            dekelMiss.style.display = 'block';
            setTimeout(function(){
                btnRoll.style.display = 'block'; dekelMiss.style.display = 'none';
            },4500);
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
            helpDOM.style.display = 'block';
            gameOver = true;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            dekelMiss.style.display = 'none';
            activePlayer == 1 ? dekelWinR.style.display = 'block' : dekelWinL.style.display = 'block';
            playWin();
        } else {
            SwitchActivePlayer();
        }
    };
});

document.querySelector('.btn-new').addEventListener('click', function() {
    var currentScoreDOM;
    
    activePlayer = 0;
    helpDOM.style.display = 'none';

    for (var i=0; i<2; i++) {
        document.querySelector('#score-' + i).textContent = 0;
        document.querySelector('#current-' + i).textContent = 0;
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
        document.querySelector('#name-' + i).textContent = 'Player ' + i;
    };
    currentScoreDOM = document.querySelector('#current-'+ activePlayer );
    document.querySelector('.player-' + 0 + '-panel').classList.add('active');

    diceDOM.style.display = 'none';

    btnRoll.style.display = 'block';
    btnHold.style.display = 'block';
    dekelWinL.style.display = 'none';
    dekelWinR.style.display = 'none';

    gameOver = false;
});




