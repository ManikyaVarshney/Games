let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');
let scoreDisplay = document.getElementById('score');
let gameContainer = document.getElementById('gameContainer');
let score = 0;
let jumping = false;

// Function to make the player jump
function jump() {
    if (jumping) return;
    jumping = true;
    let jumpHeight = 150;
    let jumpSpeed = 10;

    let upInterval = setInterval(() => {
        if (jumpHeight <= 0) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (jumpHeight >= 150) {
                    clearInterval(downInterval);
                    jumping = false;
                }
                player.style.bottom = parseInt(player.style.bottom) - jumpSpeed + 'px';
                jumpHeight += jumpSpeed;
            }, 20);
        }
        player.style.bottom = parseInt(player.style.bottom) + jumpSpeed + 'px';
        jumpHeight -= jumpSpeed;
    }, 20);
}

// Function to move the obstacle
function moveObstacle() {
    let obstacleLeft = parseInt(obstacle.style.right);
    if (obstacleLeft < 850) {
        obstacle.style.right = (obstacleLeft + 5) + 'px';
    } else {
        obstacle.style.right = '-50px';
        score++;
        scoreDisplay.innerText = 'Score: ' + score;
    }
}

// Function to detect collision
function checkCollision() {
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));
    if (obstacleLeft > 750 && obstacleLeft < 800 && playerBottom <= 70) {
        alert('Game Over! Your score is: ' + score);
        score = 0;
        scoreDisplay.innerText = 'Score: ' + score;
        obstacle.style.right = '-50px';
    }
}

// Game loop
function gameLoop() {
    moveObstacle();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

// Event listener for jumping
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

// Initialize game
player.style.bottom = '20px';
obstacle.style.right = '-50px';
gameLoop();
