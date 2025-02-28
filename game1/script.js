const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Grid size for snake and food
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
]; // Snake's initial position
let food = generateFood(); // Food's initial position
let direction = { x: 0, y: 0 }; // Snake's initial direction
let score = 0;

function gameLoop() {
    // Move the snake
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check if snake collides with walls or itself
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || checkCollision(head)) {
        return gameOver();
    }

    // Add new head to snake
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove last piece of the snake
    }

    // Draw everything
    draw();
}

function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw Score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function generateFood() {
    let foodX = Math.floor(Math.random() * tileCount);
    let foodY = Math.floor(Math.random() * tileCount);
    return { x: foodX, y: foodY };
}

function gameOver() {
    alert("Game Over! Your score is " + score);
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = { x: 0, y: 0 };
    score = 0;
}

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -1 };
    }
    if (event.key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: 1 };
    }
    if (event.key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -1, y: 0 };
    }
    if (event.key === "ArrowRight" && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

// Set up key event listener for direction changes
window.addEventListener("keydown", changeDirection);

// Start the game loop
setInterval(gameLoop, 100);
