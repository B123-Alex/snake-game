// 工具函数
const utils = {
    // 随机生成指定范围内的整数
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // 检查两个坐标是否相同
    isSamePosition: function(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    },

    // 检查坐标是否在蛇身上
    isOnSnake: function(position, snake) {
        return snake.body.some(segment => this.isSamePosition(segment, position));
    },

    // 从localStorage获取指定难度的最高分记录
    getHighScore: function(difficulty) {
        const key = `snakeHighScore_${difficulty}`;
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return { score: 0, playerName: '' };
    },

    // 保存最高分到localStorage
    setHighScore: function(difficulty, score, playerName) {
        const currentRecord = this.getHighScore(difficulty);
        if (score > currentRecord.score) {
            const key = `snakeHighScore_${difficulty}`;
            localStorage.setItem(key, JSON.stringify({ score: score, playerName: playerName }));
            return true;
        }
        return false;
    },

    // 获取所有难度的最高分记录
    getAllHighScores: function() {
        return {
            easy: this.getHighScore('easy'),
            medium: this.getHighScore('medium'),
            hard: this.getHighScore('hard')
        };
    }
};