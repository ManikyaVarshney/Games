let basket = document.getElementById('basket');
let fallingObject = document.getElementById('fallingObject');
let scoreDisplay = document.getElementById('score');
let gameContainer = document.getElementById('gameContainer');
let score = 0;
let basketSpeed = 20;
let fallingSpeed = 2;
let missedObjects = 0;
let gameOver = false;

// Function to move the basket
document.addEventListener('keydown', (e) => {
    if (gameOver) return;
    let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
    if (e.key === 'ArrowLeft' && basketLeft > 0) {
        basket.style.left = basketLeft - basketSpeed + 'px';
    } else if (e.key === 'ArrowRight' && basketLeft < (gameContainer.offsetWidth - basket.offsetWidth)) {
        basket.style.left = basketLeft + basketSpeed + 'px';
    }
});

// Function to move the falling object
function moveFallingObject() {
    let fallingTop = parseInt(window.getComputedStyle(fallingObject).getPropertyValue("top"));
    if (fallingTop < gameContainer.offsetHeight) {
        fallingObject.style.top = fallingTop + fallingSpeed + 'px';
    } else {
        missedObjects++;
        if (missedObjects >= 3) {
            alert('Game Over! Your score is: ' + score);
            gameOver = true;
            return;
        }
        resetFallingObject();
    }
    checkCollision();
    if (!gameOver) {
        requestAnimationFrame(moveFallingObject);
    }
}

// Function to reset the falling object
function resetFallingObject() {
    fallingObject.style.top = '-50px';
    fallingObject.style.left = Math.random() * (gameContainer.offsetWidth - fallingObject.offsetWidth) + 'px';
}

// Function to check collision
function checkCollision() {
    let basketRect = basket.getBoundingClientRect();
    let fallingRect = fallingObject.getBoundingClientRect();
    if (basketRect.x < fallingRect.x + fallingRect.width &&
        basketRect.x + basketRect.width > fallingRect.x &&
        basketRect.y < fallingRect.y + fallingRect.height &&
        basketRect.height + basketRect.y > fallingRect.y) {
        score++;
        scoreDisplay.innerText = 'Score: ' + score;
        resetFallingObject();
    }
}

// Start the game
resetFallingObject();
moveFallingObject();
