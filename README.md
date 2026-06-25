# 盛洁 · 游戏作品集

个人游戏策划作品集网站，展示 3 款独立游戏（可游玩 Demo + 完整策划文档）。

## 游戏列表

| 游戏 | 类型 | 技术栈 | 状态 |
|------|------|--------|------|
| [时间当铺](./games/time-pawnshop.html) | 叙事解谜 | HTML5 Canvas | ✅ 可游玩 |
| [废土快递](./games/wasteland.html) | Roguelike 经营 | Electron | 📐 策划文档 |
| [蟹化进化2](./games/crab-evolution.html) | Roguelite 进化 | Electron | 📐 策划文档 |

## 本地运行

### 方式一：Python（推荐）
```bash
cd portfolio
python -m http.server 8080
# 访问 http://localhost:8080
```

### 方式二：VS Code Live Server
在 VS Code 中安装 Live Server 扩展，右键 `index.html` → Open with Live Server

### 方式三：Node.js
```bash
npx serve .
```

## 部署到 GitHub Pages

1. 在 GitHub 创建新仓库 `portfolio`
2. 上传本目录所有文件
3. Settings → Pages → Source: Deploy from a branch → main → Save
4. 等待 2 分钟后访问 `https://[username].github.io/portfolio/`

## 架构说明

```
portfolio/
├── index.html          # 作品集首页
├── styles/
│   └── main.css        # 全局样式
└── games/
    ├── time-pawnshop.html   # 时间当铺（可游玩 + 策划文档）
    ├── wasteland.html      # 废土快递（策划文档）
    └── crab-evolution.html # 蟹化进化2（策划文档）
```

## 游戏托管

各游戏源码托管在独立仓库：
- 时间当铺: https://github.com/shengjie2022/time-pawnshop (GitHub Pages 已启用)
- 废土快递: https://github.com/shengjie2022/wasteland-express
- 蟹化进化2: https://github.com/shengjie2022/carcinization-evolution-2

---
盛洁 · 深圳技术大学 · 计算机科学与技术 · 应届生
联系方式: sj200403272021@163.com
