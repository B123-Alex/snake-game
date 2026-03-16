// 游戏核心逻辑
class Game {
    constructor() {
        // 游戏元素
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.lengthElement = document.getElementById('length');
        this.finalScoreElement = document.getElementById('final-score');
        this.highScoreEasyElement = document.getElementById('high-score-easy');
        this.highScoreMediumElement = document.getElementById('high-score-medium');
        this.highScoreHardElement = document.getElementById('high-score-hard');
        this.newRecordSection = document.getElementById('new-record-section');
        this.playerNameInput = document.getElementById('player-name');

        // 游戏状态
        this.isRunning = false;
        this.isPaused = false;
        this.score = 0;
        this.gridSize = 20;
        this.speed = 150; // 初始速度（毫秒）
        this.gameLoopId = null;
        this.currentDifficulty = 'medium';
        this.isNewRecord = false;

        // 游戏对象
        this.snake = new Snake();
        this.food = new Food(this.canvas.width, this.canvas.height, this.gridSize);

        // 难度设置
        this.difficultyLevels = {
            easy: 200,
            medium: 150,
            hard: 100
        };

        // 皮肤设置
        this.skins = {
            default: {
                snake: '#333',
                food: '#f44336',
                background: '#f9f9f9'
            },
            green: {
                snake: '#4CAF50',
                food: '#f44336',
                background: '#e8f5e8'
            },
            blue: {
                snake: '#2196F3',
                food: '#ff9800',
                background: '#e3f2fd'
            }
        };
        this.currentSkin = 'default';

        // 初始化事件监听器
        this.initEventListeners();
        // 初始化最高分显示
        this.updateAllHighScores();
        // 初始化自动缩放
        this.initAutoScale();
    }

    // 初始化自动缩放
    initAutoScale() {
        const updateScale = () => {
            const container = document.querySelector('.container');
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const containerWidth = 640;
            const containerHeight = 800; // 估计的最大高度

            // 计算缩放比例
            const scaleX = windowWidth / containerWidth;
            const scaleY = windowHeight / containerHeight;
            const scale = Math.min(scaleX, scaleY, 1); // 最大缩放为1（不放大）

            // 应用缩放
            if (scale < 1) {
                container.style.transform = `scale(${scale})`;
            } else {
                container.style.transform = 'scale(1)';
            }
        };

        // 初始缩放
        updateScale();

        // 窗口大小改变时重新计算缩放
        window.addEventListener('resize', updateScale);
    }

    // 初始化事件监听器
    initEventListeners() {
        // 开始游戏按钮
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        // 重新开始按钮
        document.getElementById('restart-btn').addEventListener('click', () => this.saveRecordAndRestart());
        // 返回菜单按钮
        document.getElementById('menu-btn').addEventListener('click', () => this.saveRecordAndShowMenu());
        // 方向键控制
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    // 处理键盘输入
    handleKeyPress(e) {
        switch (e.key) {
            case 'ArrowUp':
                if (this.isRunning && !this.isPaused) {
                    this.snake.setDirection('up');
                }
                break;
            case 'ArrowDown':
                if (this.isRunning && !this.isPaused) {
                    this.snake.setDirection('down');
                }
                break;
            case 'ArrowLeft':
                if (this.isRunning && !this.isPaused) {
                    this.snake.setDirection('left');
                }
                break;
            case 'ArrowRight':
                if (this.isRunning && !this.isPaused) {
                    this.snake.setDirection('right');
                }
                break;
            case 'Enter':
                if (this.isRunning) {
                    this.togglePause();
                }
                break;
        }
    }

    // 开始游戏
    startGame() {
        // 隐藏菜单和游戏结束界面
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('game-over').classList.add('hidden');
        // 显示游戏界面
        document.getElementById('game').classList.remove('hidden');

        // 重置游戏状态
        this.score = 0;
        this.snake.reset();
        this.isRunning = true;
        this.isPaused = false;
        this.isNewRecord = false;

        // 获取难度设置
        this.currentDifficulty = document.getElementById('difficulty').value;
        this.speed = this.difficultyLevels[this.currentDifficulty];

        // 获取皮肤设置
        this.currentSkin = document.getElementById('skin').value;

        // 生成初始食物
        this.food.generate(this.snake);

        // 更新分数和长度显示
        this.updateScore();
        this.updateLength();

        // 开始游戏循环
        this.gameLoop();
    }

    // 游戏主循环
    gameLoop() {
        if (!this.isRunning || this.isPaused) return;

        // 移动蛇
        this.snake.move();

        // 检查碰撞
        if (this.checkCollision()) {
            this.gameOver();
            return;
        }

        // 检查是否吃到食物
        if (this.checkFoodCollision()) {
            this.score += 10;
            this.snake.grow();
            this.food.generate(this.snake);
            this.updateScore();
            this.updateLength();
        }

        // 绘制游戏
        this.draw();

        // 继续游戏循环
        this.gameLoopId = setTimeout(() => this.gameLoop(), this.speed);
    }

    // 检查碰撞
    checkCollision() {
        const head = this.snake.getHead();
        const maxX = this.canvas.width / this.gridSize;
        const maxY = this.canvas.height / this.gridSize;

        // 检查边界碰撞
        if (head.x < 0 || head.x >= maxX || head.y < 0 || head.y >= maxY) {
            return true;
        }

        // 检查自身碰撞
        return this.snake.checkSelfCollision();
    }

    // 检查食物碰撞
    checkFoodCollision() {
        const head = this.snake.getHead();
        const foodPos = this.food.getPosition();
        return utils.isSamePosition(head, foodPos);
    }

    // 游戏结束
    gameOver() {
        this.isRunning = false;
        clearTimeout(this.gameLoopId);

        // 检查是否创造新纪录
        const currentRecord = utils.getHighScore(this.currentDifficulty);
        if (this.score > currentRecord.score) {
            this.isNewRecord = true;
            this.newRecordSection.classList.remove('hidden');
            this.playerNameInput.value = '';
            this.playerNameInput.focus();
        } else {
            this.isNewRecord = false;
            this.newRecordSection.classList.add('hidden');
        }

        // 显示最终分数
        this.finalScoreElement.textContent = this.score;

        // 显示游戏结束界面
        document.getElementById('game').classList.add('hidden');
        document.getElementById('game-over').classList.remove('hidden');
    }

    // 保存记录并重新开始
    saveRecordAndRestart() {
        if (this.isNewRecord) {
            const playerName = this.playerNameInput.value.trim() || '匿名玩家';
            utils.setHighScore(this.currentDifficulty, this.score, playerName);
            this.updateAllHighScores();
        }
        this.startGame();
    }

    // 保存记录并返回菜单
    saveRecordAndShowMenu() {
        if (this.isNewRecord) {
            const playerName = this.playerNameInput.value.trim() || '匿名玩家';
            utils.setHighScore(this.currentDifficulty, this.score, playerName);
            this.updateAllHighScores();
        }
        this.showMenu();
    }

    // 显示菜单
    showMenu() {
        this.isRunning = false;
        clearTimeout(this.gameLoopId);

        // 隐藏游戏和游戏结束界面
        document.getElementById('game').classList.add('hidden');
        document.getElementById('game-over').classList.add('hidden');
        // 显示菜单
        document.getElementById('menu').classList.remove('hidden');
    }

    // 切换暂停状态
    togglePause() {
        if (!this.isRunning) return;

        this.isPaused = !this.isPaused;
        if (!this.isPaused) {
            this.gameLoop();
        }
    }

    // 绘制游戏
    draw() {
        const skin = this.skins[this.currentSkin];

        // 清空画布
        this.ctx.fillStyle = skin.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制食物
        const foodPos = this.food.getPosition();
        this.ctx.fillStyle = skin.food;
        this.ctx.fillRect(
            foodPos.x * this.gridSize,
            foodPos.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );

        // 绘制蛇
        this.ctx.fillStyle = skin.snake;
        this.snake.body.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

        // 如果暂停，显示暂停文本
        if (this.isPaused) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('暂停', this.canvas.width / 2, this.canvas.height / 2);
        }
    }

    // 更新分数显示
    updateScore() {
        this.scoreElement.textContent = this.score;
    }

    // 更新长度显示
    updateLength() {
        this.lengthElement.textContent = this.snake.body.length;
    }

    // 更新所有难度的最高分显示
    updateAllHighScores() {
        const scores = utils.getAllHighScores();
        
        this.highScoreEasyElement.textContent = this.formatHighScore(scores.easy);
        this.highScoreMediumElement.textContent = this.formatHighScore(scores.medium);
        this.highScoreHardElement.textContent = this.formatHighScore(scores.hard);
    }

    // 格式化最高分显示
    formatHighScore(record) {
        if (record.score === 0) {
            return '无记录';
        }
        if (record.playerName) {
            return `${record.playerName} - ${record.score}分`;
        }
        return `${record.score}分`;
    }
}

// 初始化游戏
window.addEventListener('load', () => {
    new Game();
});