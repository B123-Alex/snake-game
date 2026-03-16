# 贪食蛇游戏

一款经典的贪食蛇游戏，使用HTML5 + CSS3 + JavaScript实现。

## 功能特性

- 🎮 经典贪食蛇玩法
- 📱 响应式设计，支持不同屏幕尺寸
- 🎨 多种皮肤选择
- 📊 按难度分组的最高分记录
- 🏆 新纪录时可输入用户名
- ⌨️ 键盘控制（方向键移动，回车键暂停）
- 📱 自动缩放，适配不同浏览器窗口

## 游戏操作

- **方向键**：控制蛇的移动方向
- **回车键**：暂停/继续游戏

## 本地运行

1. 克隆或下载项目到本地
2. 打开命令行工具，进入项目目录
3. 运行本地服务器：
   ```bash
   # 使用Python 3
   python -m http.server 8000
   
   # 或使用Python 2
   python -m SimpleHTTPServer 8000
   ```
4. 在浏览器中访问：`http://localhost:8000`

## 部署到GitHub Pages

1. **创建GitHub仓库**：
   - 登录GitHub，创建新仓库
   - 命名为 `snake-game` 或其他合适的名称

2. **上传项目文件**：
   - 将以下文件上传到仓库：
     - `index.html`
     - `css/style.css`
     - `js/` 目录及其所有文件
     - `README.md`

3. **启用GitHub Pages**：
   - 进入仓库设置（Settings）
   - 找到"Pages"选项
   - 选择"Branch: main"（或"Branch: master"，取决于你的默认分支名称）
   - 点击"Save"
   - 等待几分钟，GitHub会生成访问URL

4. **访问游戏**：
   - 访问生成的URL，格式通常为 `https://username.github.io/snake-game`

## 项目结构

```
snake-game/
├── index.html          # 游戏主页面
├── css/                # 样式文件
│   └── style.css       # 游戏样式
├── js/                 # JavaScript文件
│   ├── game.js         # 游戏核心逻辑
│   ├── snake.js        # 蛇类实现
│   ├── food.js         # 食物类实现
│   └── utils.js        # 工具函数
└── README.md           # 项目说明
```

## 技术栈

- **前端**：HTML5 + CSS3 + JavaScript
- **游戏渲染**：Canvas API
- **数据存储**：localStorage（用于存储最高分）

## 浏览器兼容性

- Chrome
- Firefox
- Safari
- Edge

## 贡献

欢迎提交Issue和Pull Request来改进这个游戏！

## 许可证

MIT License
