// 食物类实现
class Food {
    constructor(canvasWidth, canvasHeight, gridSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gridSize = gridSize;
        this.position = null;
    }

    // 生成食物
    generate(snake) {
        let newPosition;
        do {
            // 随机生成位置
            newPosition = {
                x: utils.randomInt(0, (this.canvasWidth / this.gridSize) - 1),
                y: utils.randomInt(0, (this.canvasHeight / this.gridSize) - 1)
            };
        } while (utils.isOnSnake(newPosition, snake)); // 确保食物不在蛇身上

        this.position = newPosition;
    }

    // 获取食物位置
    getPosition() {
        return this.position;
    }
}