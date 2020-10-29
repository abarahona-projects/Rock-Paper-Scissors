// computer selection, randomly select a number and display a selection in function of that number

function computerPlay() {

    function random(a, b) {
        let num = Math.floor(Math.random() * (b - a) + a);
        return num;
    }
    let ranum = random(1, 4);
    if (ranum > 0 && ranum <= 3) {
        if (ranum == 1) {
            return 'rock';
        } else if (ranum == 2) {
            return 'paper';
        } else if (ranum == 3) {
            return 'scissors';
        } else {
            return 'Numero no determinado.';
        }
    } else {
        return 'Numero fuera de rango.';
    }
}

// game round and equality checker

function playRound(player1, player2) {

    if (player1 == 'rock' && player2 == 'paper') {
        return -1;
    } else if (player1 == 'rock' && player2 == 'scissors') {
        return 1;
    } else if (player1 == 'paper' && player2 == 'rock') {
        return 1;
    } else if (player1 == 'paper' && player2 == 'scissors') {
        return -1;
    } else if (player1 == 'scissors' && player2 == 'rock') {
        return -1;
    } else if (player1 == 'scissors' && player2 == 'paper') {
        return 1;
    } else if (player1 == player2) {
        return 0;
    } else {
        return 'hay un error en el segundo parametro, computerPlay()';
    }

}

//completing the game


function game() {
    let playerScore = 0, computerScore = 0;
    let jugadas = 4;

// Setting the game at 5 rounds

    for (i = 1; i <= 5; i++) {
        let computerSelection = computerPlay();
        let playerSelection = prompt('Please enter rock, paper or scissors', '');
        let result = playRound(playerSelection, computerSelection);

// adding points to each player or skipping the round

        if (result == 1) {
            playerScore++;
            console.log('Tienes un punto, tu puntuacion total es ' + playerScore + ', ganas con 3.');
        } else if (result == -1) {
            computerScore++;
            console.log('Has perdido, la computadora va ganando por ' + computerScore + ' puntos.');
        } else if (result == 0) {
            --i;
            console.log('Empate, tienen la misma eleccion.');
        } else {
            --i;
            ++jugadas;
            console.log('Tienes que escibir rock, paper o scissors, para que el juego funcione.');
        }

// Checking for a winner of the play

        if (playerScore === 3 || computerScore === 3 || jugadas === 0) {
            if (playerScore === 3) {
                alert('Has ganado rotundamente por ' + playerScore + ' puntos.');
                return 'Fin del juego';
            } else if (computerScore === 3) {
                alert('La computadora te gano con ' + computerScore + ' puntos.');
                return 'Fin del juego';
            } else if (jugadas === 0) {
                alert('Se han acabado los turnos. El resultado es : Jugador= ' + playerScore + ' , Computadora= ' + computerScore);
                return 'Fin del juego';
            } else {
                alert('hay un error al final del bucle.');
                return 'Error al final del bucle';
            }
        }

        jugadas--;
    }
}