(function(){
    "use strict";

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const actionArea = document.getElementById('actions');
    const player1Sprite = document.getElementById('player1');
    const player2Sprite = document.getElementById('player2');
    const player1Health = document.getElementById('player1Health');
    const player2Health = document.getElementById('player2Health');

    let hitSound = new Audio('sounds/hit.wav');
    let oneSound = new Audio('sounds/one.wav');
    let selectSound = new Audio('sounds/select.wav');
    let snakeEyesSound = new Audio('sounds/snakeEyes.wav');
    let winSound = new Audio('sounds/win.wav');

    hitSound.volume = 0.2;
    oneSound.volume = 0.2;
    selectSound.volume = 0.2;
    snakeEyesSound.volume = 0.2;
    winSound.volume = 0.2;

    const gameData = {
        dice : ['images/1die.png','images/2die.png','images/3die.png','images/4die.png','images/5die.png','images/6die.png'],
        players : ['player1','player2'],
        score : [0,0],
        roll1 : 0,
        roll2 : 0,
        rollSum: 0,
        index: 0,
        gameEnd: 30
    }

    document.getElementById('continue').addEventListener('click', function(){
        let selectSound = new Audio('sounds/select.wav');
        selectSound.play();
        selectSound.volume = 0.2;
        document.getElementById('rules').className = 'hidden';
        document.getElementById('gamecontrol').className = 'visible';
        player1Sprite.className = 'visible';
        player2Sprite.className = 'visible';
    });

    startGame.addEventListener('click', function(){
        selectSound.play();
        game.className = 'visible';

        gameData.index = Math.round(Math.random());
        console.log(gameData.index);

        gameControl.innerHTML = '';

        document.getElementById('quit').addEventListener('click', function(){
            let selectSound = new Audio('sounds/select.wav');
            selectSound.play();
            selectSound.volume = 0.2;
            setTimeout(function(){
                location.reload();
            },300)
        });

        setUpTurn();
    }); 

    function setUpTurn(){
    game.innerHTML = `roll the dice for ${gameData.players[gameData.index]} </p>`;
        actionArea.innerHTML = '<button id="roll">Roll</button>';

        document.getElementById('roll').addEventListener('click',function(){
            throwDice();
        });
    }

    function throwDice(){
        actionArea.innerHTML = '';

        //get random values from 1-6
        gameData.roll1 = Math.floor(Math.random() * 6) +1; //using ceil could result in a zero
        gameData.roll2 = Math.floor(Math.random() * 6) +1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;

        //put dice images on screen. dice array index needs to be one less than the dice value
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}" class="die1"> <img src="${gameData.dice[gameData.roll2-1]}" class="die2">`;

        switch(gameData.index){
            case 0 : player1Sprite.style.backgroundImage = 'url(images/player1Punch.png)'; break;
            case 1 : player2Sprite.style.backgroundImage = 'url(images/player2Punch.png)';
        }

        setTimeout(function(){
            player1Sprite.style.backgroundImage = 'url(images/player1.png)';
            player2Sprite.style.backgroundImage = 'url(images/player2.png)';
        }, 300);

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        console.log(gameData.rollSum);

        // if two 1s are rolled the rollSum is 2

        if (gameData.rollSum === 2){
            // console.log('snake eyes');
            snakeEyesSound.play();
            showCurrentScore();
            game.innerHTML += '<p>oh snap! snake eyes</p>'
            gameData.score[gameData.index] = 0;

            //switches which player is playing
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            setTimeout(setUpTurn, 2000);
        }
        //if either die is a one
        else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            oneSound.play();
            console.log('one of the two dice was a one')
            showCurrentScore();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            game.innerHTML += `<p> sorry one of your rolls was a 1, switching to ${gameData.players[gameData.index]}<p>`;
            setTimeout(setUpTurn, 2000);
        }

        //if neither die was a one
        else{
            hitSound.play();
            console.log('the game proceeds')
            gameData.score[gameData.index] += gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll Again</button> <button id="pass">Pass</button>'
        
                document.getElementById('rollagain').addEventListener('click',function(){
                    throwDice();
                });

                document.getElementById('pass').addEventListener('click',function(){
                    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                    let selectSound = new Audio('sounds/select.wav');
                    selectSound.volume = 0.2;
                    selectSound.play();
                    setUpTurn();
                });

                checkWinningCondition();
        }
    }

    function checkWinningCondition(){
        if (gameData.score[gameData.index] > gameData.gameEnd){

            showCurrentScore();

            winSound.play();
            game.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points</h2>`

            actionArea.innerHTML = '<button id = "newGame"> start a new game</button>';

            document.getElementById('newGame').addEventListener('click', function(){
                let selectSound = new Audio('sounds/select.wav');
                selectSound.play();
                selectSound.volume = 0.2;
                setTimeout(function(){
                    location.reload();
                },300)
            });
        }
        else{
            //show current score
            showCurrentScore();
        }
    };

    function showCurrentScore() {

        // score.innerHTML = `<p><strong>${gameData.players[0]} ${gameData.score[0]}<strong> VS. <strong>${gameData.players[1]} ${gameData.score[1]}<strong></p>`;
        player1Health.style.width = `${10*(30 - gameData.score[1])}px`;
        player2Health.style.width = `${10*(30 - gameData.score[0])}px`;
    };
        
})();