// 蛇类实现
class Snake {
    constructor() {
        // 初始位置和长度
        this.body = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        // 初始方向
        this.direction = 'right';
        // 下一个方向
        this.nextDirection = 'right';
    }

    // 获取蛇头位置
    getHead() {
        return this.body[0];
    }

    // 设置方向
    setDirection(direction) {
        // 防止蛇直接反向移动
        const oppositeDirections = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };
        if (direction !== oppositeDirections[this.direction]) {
            this.nextDirection = direction;
        }
    }

    // 移动蛇
    move() {
        // 更新方向
        this.direction = this.nextDirection;
        
        // 计算新的蛇头位置
        const head = this.getHead();
        let newHead;

        switch (this.direction) {
            case 'up':
                newHead = { x: head.x, y: head.y - 1 };
                break;
            case 'down':
                newHead = { x: head.x, y: head.y + 1 };
                break;
            case 'left':
                newHead = { x: head.x - 1, y: head.y };
                break;
            case 'right':
                newHead = { x: head.x + 1, y: head.y };
                break;
        }

        // 将新蛇头添加到身体前端
        this.body.unshift(newHead);
        // 移除尾部（如果没有吃到食物）
        this.body.pop();
    }

    // 增长蛇身
    grow() {
        // 获取尾部位置并添加到身体末尾
        const tail = this.body[this.body.length - 1];
        this.body.push({ ...tail });
    }

    // 检查是否碰撞自身
    checkSelfCollision() {
        const head = this.getHead();
        for (let i = 1; i < this.body.length; i++) {
            if (utils.isSamePosition(head, this.body[i])) {
                return true;
            }
        }
        return false;
    }

    // 重置蛇
    reset() {
        this.body = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
    }
}