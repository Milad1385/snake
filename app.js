const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const scoreElem = document.querySelector(".score");
let scale = 10;
let rows = canvas.width / scale; //=> 40
let columns = canvas.height / scale; //=> 40

function Food() {
  this.x;
  this.y;

  this.drawFood = function () {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.generateRandomPlaceFood = function () {
    this.x = Math.floor(Math.random() * rows) * scale;
    this.y = Math.floor(Math.random() * columns) * scale;
  };
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale;
  this.ySpeed = 0;

  this.total = 0;
  this.tail = []; //{x:10 , y:10}

  this.drawSnake = function () {
    ctx.fillStyle = "#fff";
    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.updateLocation = function () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      this.resetGame();
      alert('شما باختی !')
      // this.x = 0;
    } else if (this.y > canvas.height) {
      this.resetGame();
      alert('شما باختی !')
      // this.y = 0;
    } else if (this.x < 0) {
      this.resetGame();
      alert('شما باختی !')
      // this.x = canvas.width;
    } else if (this.y < 0) {
      this.resetGame();
      alert('شما باختی !')
      // this.y = canvas.height;
    }
  };

  this.updateDirection = function (userDirection) {
    switch (userDirection) {
      case "Up": {
        this.xSpeed = 0;
        this.ySpeed = -scale;
        break;
      }
      case "Down": {
        this.xSpeed = 0;
        this.ySpeed = scale;
        break;
      }
      case "Right": {
        this.ySpeed = 0;
        this.xSpeed = scale;
        break;
      }
      case "Left": {
        this.ySpeed = 0;
        this.xSpeed = -scale;
        break;
      }
    }
  };

  this.isEatFood = function (food) {
    if (this.x === food.x && this.y === food.y) {
      this.total++;
      scoreElem.innerHTML = this.total;
      return true;
    }
    return false;
  };

  this.resetGame = function () {
    this.tail = [];
    this.total = 0;
    this.x = 0;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    scoreElem.innerHTML = 0;
  };
}

window.addEventListener("load", () => {
  let snake = new Snake();
  let food = new Food();
  food.generateRandomPlaceFood();
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.drawFood();
    snake.drawSnake();
    snake.updateLocation();
    if (snake.isEatFood(food)) {
      food.generateRandomPlaceFood();
    }
  }, 180);

  window.addEventListener("keydown", (event) => {
    let userDirection = event.code.replace("Arrow", "");
    snake.updateDirection(userDirection);
  });
});
