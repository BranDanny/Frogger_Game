//Magic Number
var CELL_WIDTH = 101;
var CELL_HEIGHT = 83;
var OFFSET = 55;

// 玩家要躲避的敌人
var Enemy = function (x,y,speed) {
  // 要应用到每个敌人的实例的变量写在这里
  this.x = x;
  this.y = y;
  this.speed = speed;
  // 加载图片文件的工具函数
  this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
  this.x += dt * this.speed;
  // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
  // 都是以同样的速度运行的
  this.checkCollisions(player);
  if(this.x >= (5*CELL_WIDTH)){ //实现Enemy循环出现
    this.x = -(CELL_WIDTH);
  }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//为Enemy添加检查碰撞函数checkCollisions
Enemy.prototype.checkCollisions = function (player) {
  var xx = Math.min(this.x+71, player.x+101) - Math.max(this.x, player.x);
  var yy = Math.min(this.y+137, player.y+141) - Math.max(this.y+74, player.y+60);
  if(xx > 0 && yy > 0){ //碰撞后player回到初始位置
    player.reset();
  }
};

// 现在实现玩家类
var Player = function (x,y) {
  this.x = x;
  this.y = y;
  this.sprite ='images/char-horn-girl.png'
};

//分数统计
var sc = 0;
document.getElementById("score").innerHTML = String(sc);

// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数 和一个重置reset()函数
Player.prototype.reset = function () {
  this.x = (2*CELL_WIDTH);
  this.y = (4*CELL_HEIGHT + OFFSET);
};

Player.prototype.update = function () {
  if(this.y == -28){ // 达到胜利条件, player回到初始位置
    this.reset();
    sc += 100;
    document.getElementById("score").innerHTML = String(sc);//更新分数
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

Player.prototype.handleInput = function (movement) {
  switch (movement) {
    //限制player移动范围
    case 'left': if(this.x > 0){this.x -= CELL_WIDTH} break;
    case 'right': if(this.x < 404){this.x += CELL_WIDTH} break;
    case 'up': if(this.y > -28){this.y -= CELL_HEIGHT} break;
    case 'down': if(this.y < 387){this.y += CELL_HEIGHT} break;
  }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
for(var i=0;i<=3;i++){
  allEnemies[i] = new Enemy(-101,83*(Math.floor(Math.random()*3))+OFFSET,Math.floor(Math.random()*(400-100+1)+100))
}
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player((2*CELL_WIDTH),(4*CELL_HEIGHT + OFFSET));

// 监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
