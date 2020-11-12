function computerPlay() {
    function random(a, b) {
        let num = Math.floor(Math.random() * (b - a) + a);
        return num;
    }

    let randomNumber = random(1, 4);
    if (randomNumber > 0 && randomNumber <= 3) {
        if (randomNumber == 1) {
            return 'rock';
        } else if (randomNumber == 2) {
            return 'paper';
        } else if (randomNumber == 3) {
            return 'scissors';
        } else {
            console.log('undefined number at computerPlay().');
        }
    } else {
        console.log('Out of range number at computerPlay().');
    }
}

//This sets a result of the check to a number to get easy a new check on the Game().
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
    } else if (player1 == null || player1 == undefined || player1 == '') {
        console.log('Error at the end of playRound().');
    }
    else {
        console.log('There\'s an error at the second parameter, computerPlay()');
    }

}

let playerScore = 0, computerScore = 0;
//whit this "lastPlay" we will check if is the last round that gave us the result.
let lastPlay = false; 

//Displays the score on the top of the div game.
function textScore(text1, text2) {
    let player = document.querySelector('.your-score');
    let computer = document.querySelector('.computer-score');
    player.textContent = 'Your Score: ' + text1 + ' points.';
    computer.textContent = 'Phillip Score: ' + text2 + ' points.';
}

//Adds a comment of the status of the game.
function addComment(text) {
    let images = document.querySelector('.images');
    let p = document.createElement('p');
    images.appendChild(p).textContent = text;
}

//Removing the above to get the same space for a new one.
function removeComment() {
    let images = document.querySelector('.images');
    let p = images.querySelector('p');
    if (p) {
        images.removeChild(p);
    }
}

// Hides the "choose" buttons and shows the "end-game" button that
// set the score to 0 and shows again the "chooses"
function restartGame() {
    let playAgain = document.querySelector('#end-game');
    let chooses = document.querySelectorAll('.choose');

    playAgain.setAttribute('class', 'end-game button');
    chooses.forEach(function (e) {
        e.classList.add('hidden');
    });

    playAgain.addEventListener('click', function () {
        chooses.forEach(function (e) {
            e.classList.remove('hidden');
        })
        playAgain.classList.add('hidden');
        setScore();
        addComment('Try yourself in this new battle!!.');
    });
    playerScore = 0;
    computerScore = 0;
}

// Hide the "choose" buttons and the "fighters" images
// then show the fight comic image and its animation
function toggleHidden() {
    let chooses = document.querySelectorAll('.choose');
    let messy = document.querySelector('.messy');
    let fighters = document.querySelectorAll('.fighter');

    chooses.forEach(function (e) {
        e.classList.add('hidden');
    });

    messy.classList.toggle('hidden');
    fighters.forEach(function (e) {
        e.classList.toggle('hidden');
    });
}

//when the animation of the "fight" ends restore the status of "fighters"
//and the "choose" buttons and hide the "fight" image.
function animationRestore() {
    let messy = document.querySelector('.messy');
    let fighters = document.querySelectorAll('.fighter');
    let chooses = document.querySelectorAll('.choose');

    messy.addEventListener('animationend', function (e) {
        messy.classList.add('hidden');
        fighters.forEach(function (e) {
            e.classList.remove('hidden');
        });

        chooses.forEach(function (e) {
            e.classList.remove('hidden');
        });
    });
}

//The same as above but in this case hides the "chooses" buttons
function lastAnimationRestore() {
    let messy = document.querySelector('.messy');
    let fighters = document.querySelectorAll('.fighter');

    messy.addEventListener('animationend', function (e) {
        messy.classList.add('hidden');
        fighters.forEach(function (e) {
            e.classList.remove('hidden');
        });

        let chooses = document.querySelectorAll('.choose');
        chooses.forEach(function (e) {
            e.classList.add('hidden');
        });
    });
    lastPlay = true;
}

//This function is for internal use of the game(), and makes it
//all look cleaner inside it.
function setScore() {
    removeComment();
    textScore(playerScore, computerScore);
}

function game(selection) {
    let computerSelection = computerPlay();
    let playerSelection = selection;
    let result = playRound(playerSelection, computerSelection);

    if (result == 1) {
        playerScore++;
        setScore();
        addComment('You have win this battle!, but not the war yet...');
    } else if (result == -1) {
        computerScore++;
        setScore();
        addComment('You loose, Phillip wins this battle but you have a chance yet.');
    } else if (result == 0) {
        setScore();
        addComment('It\' a tie, nobody wins.');
    } else {
        setScore();
        addComment('It seems like you have made somethind bad to one of the selections method at the inner game() function.');
    }
    
    if (playerScore === 3 || computerScore === 3) {
        lastPlay = true;
        if (playerScore === 3) {
            setScore();
            addComment('Congratulations!!, You have Win this war!!.');
            restartGame();
        } else if (computerScore === 3) {
            setScore();
            addComment('Ohww gosh, Phillip has win you, but this is the revenge time!!');
            restartGame();
        } else {
            addComment('There\'s an error at the end of game().');
            console.log('There\'s an error at the end of game().');
        }
    }
}

function playAudio() {
    let audio = document.querySelector('audio');
    audio.play();
}

//This function makes the buttons clickable and runs the game.
function listener() {
    const chooses = document.querySelectorAll('.choose');
    // let fighters = document.querySelectorAll('.fighter');

    // fighters.forEach(function (e) {
        //     e.addEventListener('click', function (e) {
    //         toggleHidden();
    //         playAudio();
    //         game(this.id);
    //         if (lastPlay) {
    //             lastAnimationRestore();
    //             lastPlay = false;
    //         } else {
    //             animationRestore();
    //         }
    //     })
    // });

    chooses.forEach(function (e) {
        e.addEventListener('click', function (e) {
            toggleHidden();
            playAudio();
            game(this.id);
            if (lastPlay) {
                lastAnimationRestore();
                lastPlay = false;
            } else {
                animationRestore();
            }
        })
    });

    addComment('You can start by clicking a button of your choice.')
}

listener();