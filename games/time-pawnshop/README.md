# 时间当铺 Time Pawnshop

> 经营一家收购"时间"的当铺，通过改写客人的过去来改变现在。
> <img width="963" height="650" alt="image" src="https://github.com/user-attachments/assets/d6c595f2-8500-498d-8630-3f46c45065eb" />
一款叙事解谜 + 经营模拟的像素风 HTML5 游戏。纯浏览器运行，无需安装。
<img width="961" height="640" alt="image" src="https://github.com/user-attachments/assets/08e013ce-cfda-4855-a61c-68d52ec7bccc" />

## 游戏简介

你是一家神秘当铺的老板。客人以"记忆片段"作为抵押，换取改变命运的机会。进入客人的记忆，在关键节点做出选择——每个选择产生"时间涟漪"，跨越时空影响其他客人的命运。

### 核心玩法

- **时间交易** — 进入客人的记忆，在关键节点做出二选一的抉择
- **蝴蝶效应** — 你的选择会跨时空影响其他客人的命运
- **当铺经营** — 用时间碎片修复设施、解锁客人、延续时限
- **跨周目系统** — 多周目游玩解锁隐藏角色、隐藏事件和真结局

### 游戏内容

- 7 位主线角色 + 1 位隐藏角色
- 6 种结局（含 2 个隐藏结局）
- 15 条时间涟漪 + 6 组共振效应
- 12 个隐藏事件 + 3 个二次来访事件
- 5 件收藏品
- 48 个成就（7 个分类）
<img width="966" height="645" alt="image" src="https://github.com/user-attachments/assets/f3b822d0-f21b-40c6-8088-16e5fce3efa4" />

## 快速开始

1. 克隆仓库
```bash
git clone https://github.com/shengjie2022/time-pawnshop.git
```

2. 用浏览器打开 `index.html` 即可游玩

无需任何构建工具或依赖安装。

## 技术栈

- 原生 JavaScript（无框架依赖）
- HTML5 Canvas 2D 渲染
- 像素精灵 + 程序化背景
- localStorage 本地存档

## 项目结构

```
├── index.html          # 入口页面
├── css/style.css       # 样式
├── js/
│   ├── engine.js       # 引擎层（渲染/输入/粒子/对话/音频）
│   ├── data.js         # 数据层（精灵/角色/故事/背景/成就）
│   └── game.js         # 逻辑层（场景/系统/状态管理）
└── 《时间当铺》游戏策划案v4.1.md  # 详细策划文档
```

## 版本

当前版本：**v4.1**

详细策划文档见 [《时间当铺》游戏策划案v4.1.md](《时间当铺》游戏策划案v4.1.md)

## License

[MIT](LICENSE)


