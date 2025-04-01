document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector("#start");
    const startScreen = document.querySelector("#start-screen");
    const gameOverScreen = document.querySelector("#game-over");
    const restartButton = document.querySelector("#restart");
    const winScreen = document.querySelector("#win-screen");

    const cityLandscape = document.querySelector("#car-game-id");

    startButton.addEventListener("click", function() {
        startScreen.classList.add("no-display");
        cityLandscape.classList.remove("no-display")
    });

    restartButton.addEventListener("click", function() {
        location.reload();
    });

    //Car Minigame
    const car = document.querySelector("#car");
    const police = document.querySelector("#police");

    const playingField = document.querySelector("#game-background");
    const safeMiniGame = document.querySelector("#safe-minigame");

    
    let distanceUpDown = 0;
    let distanceLeftRight = 50;

    function crashCheck() {
        const carPos = car.getBoundingClientRect();
        const policePos = police.getBoundingClientRect();
        
        if ( //debugged met chatgpt
            carPos.left < policePos.right &&
            carPos.right > policePos.left &&
            carPos.top < policePos.bottom &&
            carPos.bottom > policePos.top
        ) {
            gameOverScreen.classList.remove("hidden");
            cityLandscape.classList.add("hidden");
            police.classList.add("hidden");
        }
    }

    document.addEventListener("keydown", function(event) {

        if (event.key === "ArrowDown" && distanceUpDown < innerHeight - car.clientHeight) {
            distanceUpDown += 100;
            car.style.transform = "rotate(180deg)";
            car.style.top = `${distanceUpDown}px`
        } else if (event.key === "ArrowUp" && distanceUpDown > 0) {
            distanceUpDown -= 100;
            car.style.transform = "rotate(0deg)";
            car.style.top = `${distanceUpDown}px`
        } else if (event.key === "ArrowLeft" && distanceLeftRight > 50) {
            distanceLeftRight -= 100;
            car.style.transform = "rotate(-90deg)";
            car.style.left = `${distanceLeftRight}px`
        } else if (event.key === "ArrowRight" && distanceLeftRight < innerWidth - car.clientWidth) {
            distanceLeftRight += 100;
            car.style.transform = "rotate(90deg)";
            car.style.left = `${distanceLeftRight}px`
        }

        if (distanceLeftRight > innerWidth - car.clientWidth - 200) {
            cityLandscape.classList.add("hidden");
            safeMiniGame.classList.remove("hidden");
            police.style.display="none";
        }
    });

    setInterval(crashCheck, 100);

    // End of Car minigame

    //Safe Minigame
    const inputBox = document.querySelector("#code-input");
    const codeButton = document.querySelectorAll(".code-button");
    const checkInputButton = document.querySelector("#check-input");
    const backspaceButton = document.querySelector("#backspace");
    const triedCodes = document.querySelector("#codes");
    const triesLeftElement = document.querySelector("#tries-left")
    const keyPad = document.querySelector("#keypad");
    const closeButton = document.querySelector("#close-button");
    const showCode = document.querySelector("#show-code");
    const safeOpen = document.querySelector("#safe-open");
    const safeClosed = document.querySelector("#safe-closed");
    const moneyBags = document.querySelector("#money");

    const rightNumber = Math.floor(Math.random() * 9000) + 1000;

    let inputDigits = null;

    rightNumberDigits = rightNumber.toString().split('').map(Number);

    console.log(rightNumber)

    function checkDigits(digit, index) {
        const span = document.createElement("span");
        span.innerHTML = digit;

        if (digit === rightNumberDigits[index]) {
            span.classList.add("green");
        } else if (rightNumberDigits.includes(digit)) {
            span.classList.add("yellow");
        }

        triedCodes.appendChild(span);
    }

    codeButton.forEach(function(buttons) {
        buttons.addEventListener("click", function() {
            if (inputBox.value.length < 4) {
                inputBox.value += this.value;
            }
        });
    });

    backspaceButton.addEventListener("click", function() {
        inputBox.value = null;
    });

    checkInputButton.addEventListener("click", function() {
        inputDigits = inputBox.value.split('').map(Number);

        if (Number(inputBox.value) === rightNumber) {

            inputBox.value = "Code accepted";
            inputBox.style.fontSize = "1.5rem"
            setTimeout(function() {
                safeClosed.classList.add("no-display");
                safeOpen.classList.remove("no-display");
                moneyBags.classList.remove("no-display");
                closeButton.style.animation = "grow 1s infinite";
            }, 100);

            checkInputButton.addEventListener("click", function() {
                inputBox.value = "Code accepted";
            }); 

        } else if (inputBox.value.length < 4 || isNaN(inputBox.value)) {
            inputBox.value = "Error";
            span.innerHTML = null;
        } else {
            inputBox.value = null;

            let triesLeft = Number(triesLeftElement.innerHTML);
            triesLeft--;
            triesLeftElement.innerHTML = triesLeft;

            if (triesLeft === 0) {
                gameOverScreen.classList.remove("hidden");
                safeMiniGame.classList.add("hidden");
                showCode.innerHTML = `The right code was: ${rightNumber}`;
            }
        };

        const div = document.createElement("div");
        inputDigits.forEach(checkDigits);
        triedCodes.appendChild(div);
    });

    moneyBags.addEventListener("click", function() {
        winScreen.classList.remove("hidden");
    })

    keyPad.addEventListener("click", function() {
        playingField.classList.toggle("hidden");
    });

    closeButton.addEventListener("click", function() {
        playingField.classList.toggle("hidden");
    });
    //End of safe minigame
});