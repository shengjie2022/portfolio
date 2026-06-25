// ============================================================
// 时间当铺 v4.1 - 游戏数据（对话重写+二次来访+时间旅人）
// ============================================================

// ---- 像素精灵定义 ----
// 调色板: 0=黑 1=深色 2=中色 3=亮色 4=皮肤 5=高光 6=特殊
const SPRITES = {

  // 当铺老板 (16x20)
  shopkeeper: {
    palette: ['#1a1a2e', '#2a1a3e', '#4a3a6a', '#8866aa', '#e0c0a0', '#fff8e8', '#6644aa'],
    width: 16,
    data: `
......0000......
.....022220.....
....02222220....
....02244220....
...0244444420...
...0244544420...
...0244444420...
...0244444420...
....04444440....
....01111110....
...0111661110...
...0111111110...
...0111111110...
...0111111110...
...0113113110...
...0113113110...
....01300310....
....04400440....
...044400444....
...000000000....`
  },

  // 老兵陈伯 (16x20)
  chenbo: {
    palette: ['#1a1a1a', '#3a2a1a', '#6a5a3a', '#8a7a5a', '#d0a878', '#f0d8b8', '#445522'],
    width: 16,
    data: `
......0000......
.....033330.....
....03333330....
....03355330....
...0355555530...
...0355555530...
...0354454530...
...0355555530...
....05555550....
....01111110....
...0116611110...
...0111111110...
...0611111160...
...0111111110...
...0113113110...
...0113113110...
....01300310....
....04400440....
...044400444....
...000000000....`
  },

  // 林小姐 (16x20)
  linxiaojie: {
    palette: ['#1a1a2e', '#2a1a1a', '#5a2a3a', '#aa4466', '#e0b898', '#fff0e0', '#884466'],
    width: 16,
    data: `
.....000000.....
....01111110....
...0111111110...
...0113553110...
..011455554110..
..011454454110..
..011455554110..
..011445544110..
...0145555410...
....04444440....
...0336633330...
...0333333330...
...0333333330...
...0333333330...
...0334334330...
...0334334330...
....03400340....
....04400440....
...044400444....
...000000000....`
  },

  // 小周 - 邮差 (16x20)
  xiaozhou: {
    palette: ['#1a1a2e', '#1a3a5a', '#2a5a8a', '#4a8aba', '#d8b890', '#f0d8c0', '#336644'],
    width: 16,
    data: `
......0000......
.....066660.....
....06666660....
....06644660....
...0644444460...
...0644544460...
...0644444460...
...0644444460...
....04444440....
....02222220....
...0222662220...
...0222222220...
...0222222220...
...0222222220...
...0223223220...
...0223223220...
....02300320....
....04400440....
...044400444....
...000000000....`
  },

  // 阿蘅 - 钟楼少女 (16x20)
  aheng: {
    palette: ['#1a1a1a', '#5a2a1a', '#8a4a2a', '#ba6a3a', '#d8b090', '#f0d8c0', '#886644'],
    width: 16,
    data: `
.....000000.....
....01111110....
...0111111110...
...0114454110...
..011444444110..
..011444444110..
..011454454110..
..011444444110..
...0144444410...
....04444440....
...0226622220...
...0222222220...
...0222222220...
...0222222220...
...0223223220...
...0223223220...
....02300320....
....04400440....
...044400444....
...000000000....`
  },

  // 老吴 - 照相师 (16x20)
  laowu: {
    palette: ['#1a1a1a', '#2a2a3a', '#4a4a5a', '#7a7a8a', '#c8a880', '#e8d0b0', '#884422'],
    width: 16,
    data: `
......0000......
.....011110.....
....01111110....
....01144110....
...0144444410...
...0144444410...
...0144454410...
...0144444410...
....04444440....
....02222220....
...0222662220...
...0226226220...
...0222222220...
...0222222220...
...0223223220...
...0223223220...
....02300320....
....04400440....
...044400444....
...000000000....`
  },

  // 神秘老人 (16x20)
  mystic: {
    palette: ['#0a0a1e', '#1a1a3e', '#3a3a6a', '#6a6aaa', '#c0b0a0', '#e8d8c8', '#8888cc'],
    width: 16,
    data: `
.....066660.....
....06666660....
...0666666660...
...0664554660...
..066455554660..
..066454454660..
..066455554660..
..066445544660..
...0645555460...
....04444440....
...0111661110...
...0111111110...
...0111111110...
...0111111110...
...0113113110...
...0113113110...
....01300310....
....01100110....
...011100111....
...000000000....`
  },

  // 小沙漏道具
  hourglass: {
    palette: ['#aa8844', '#ffcc66', '#ffeeaa', '#4488aa', '#88ccff'],
    width: 8,
    data: `
.000000.
.012210.
..0220..
..0340..
..0340..
..0220..
.012210.
.000000.`
  },

  // 时钟
  clock: {
    palette: ['#3a3a3a', '#6a6a6a', '#aaaaaa', '#dddddd', '#ffcc44'],
    width: 12,
    data: `
...000000...
..01222210..
.0122222210.
.0123223210.
01223223210.
01222232210.
01222222210.
.0122222210.
.0122222210.
..01222210..
...000000...
.....00.....`
  },

  // 幽灵剪影 (成就奖励精灵)
  ghost: {
    palette: ['#1a1a3e', '#3a3a6a', '#6a6aaa', '#9999cc', '#ccccee', '#eeeeff', '#6644aa'],
    width: 16,
    data: `
......3333......
.....333333.....
....33333333....
....33344333....
...3344444433...
...3344544433...
...3344444433...
...3344444433...
....34444443....
....33333333....
...3333663333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
...3333333333...
....333..333....
.....33..33.....
......3..3......
................`
  },

  // 时先生 (16x20) - 灰蓝长袍，银白长发用旧红绳束着
  shixiansheng: {
    palette: ['#0a0a1e', '#2a3040', '#4a5568', '#7a8899', '#c0b8a8', '#e8e0d0', '#aa3333'],
    width: 16,
    data: `
.....066660.....
....06333360....
...0633333360...
...0634454360...
..063445544360..
..063445544360..
..063454454360..
..063445544360..
...0345555430...
....05555550....
...0222662220...
...0222222220...
...0222222220...
...0222222220...
...0223223220...
...0223223220...
....02300320....
....05500550....
...055500555....
...000000000....`
  },

  // 白大褂陈伯 (成就奖励精灵)
  chenbo_doctor: {
    palette: ['#1a1a1a', '#dddddd', '#eeeeee', '#ffffff', '#d0a878', '#f0d8b8', '#4488aa'],
    width: 16,
    data: `
......0000......
.....044440.....
....04444440....
....04455440....
...0455555540...
...0455555540...
...0454454540...
...0455555540...
....05555550....
....01111110....
...0111661110...
...0112112110...
...0111111110...
...0111111110...
...0113113110...
...0113113110...
....01300310....
....04400440....
...044400444....
...000000000....`
  },

  // 军装陈伯 (成就奖励精灵)
  chenbo_army: {
    palette: ['#1a1a1a', '#2a3a1a', '#4a5a2a', '#6a7a3a', '#d0a878', '#f0d8b8', '#aa8844'],
    width: 16,
    data: `
......0000......
.....011110.....
....01111110....
....01155110....
...0155555510...
...0155555510...
...0154454510...
...0155555510...
....05555550....
....02222220....
...0222662220...
...0222222220...
...0622222260...
...0222222220...
...0223223220...
...0223223220...
....02300320....
....04400440....
...044400444....
...000000000....`
  },

  // 老父亲 (隐藏成就精灵)
  old_father: {
    palette: ['#1a1a1a', '#3a3a2a', '#5a5a4a', '#8a8a6a', '#c0a878', '#e0c898', '#665533'],
    width: 16,
    data: `
......0000......
.....011110.....
....01111110....
....01144110....
...0144444410...
...0144444410...
...0144444410...
...0144444410...
....04444440....
....06666660....
...0666666660...
...0666666660...
...0666666660...
...0666666660...
...0663663660...
...0663663660...
....06300360....
....04400440....
...044400444....
...000000000....`
  },

  // 时间旅人 (16x20) - 混搭年代：军装绿上半身+牛仔蓝下半身，半白半黑头发
  time_traveler: {
    palette: ['#0a0a1e', '#2a3a1a', '#4a6a2a', '#1a3a5a', '#c8b098', '#e8d8c0', '#ff6633'],
    width: 16,
    data: `
......0000......
.....055110.....
....05551110....
....05544110....
...0544444410...
...0544644410...
...0544444410...
...0544444410...
....04444440....
....02222220....
...0222662220...
...0222222220...
...0211111120...
...0222222220...
...0223223220...
...0333333330...
....03300330....
....04400440....
...044400444....
...000000000....`
  }
};

// ---- 客人定义 ----
const CLIENTS = {
  chenbo: {
    id: 'chenbo',
    name: '陈伯',
    sprite: 'chenbo',
    speakerColor: '#d0a878',
    title: '迟暮的老兵',
    description: '一位年迈的老人，眼中满是沧桑与遗憾。',
    timeCost: 0,
    timeReward: 30,
    unlockDay: 1,
    requiredShopLevel: 0
  },
  linxiaojie: {
    id: 'linxiaojie',
    name: '林小姐',
    sprite: 'linxiaojie',
    speakerColor: '#aa4466',
    title: '哀伤的女儿',
    description: '一位年轻女子，面容憔悴，似乎承受着巨大的悲伤。',
    timeCost: 0,
    timeReward: 35,
    unlockDay: 2,
    requiredShopLevel: 1
  },
  xiaozhou: {
    id: 'xiaozhou',
    name: '小周',
    sprite: 'xiaozhou',
    speakerColor: '#4a8aba',
    title: '最后的邮差',
    description: '年轻人，邮局后勤，鞋上沾着泥。手里攥着一封十年前的信，信封上写着"小玲亲启"。',
    timeCost: 0,
    timeReward: 40,
    unlockDay: 3,
    requiredShopLevel: 2
  },
  aheng: {
    id: 'aheng',
    name: '阿蘅',
    sprite: 'aheng',
    speakerColor: '#ba6a3a',
    title: '钟楼的守望者',
    description: '白发少女，校服洗得发白，手腕上缠着旧红绳。左眼琥珀色，右眼黑瞳。',
    timeCost: 0,
    timeReward: 45,
    unlockDay: 4,
    requiredShopLevel: 3
  },
  laowu: {
    id: 'laowu',
    name: '老吴',
    sprite: 'laowu',
    speakerColor: '#7a7a8a',
    title: '消逝的影像',
    description: '老照相师，指甲缝里有显影液痕迹，怀里抱着一个落灰的铁盒子。',
    timeCost: 0,
    timeReward: 40,
    unlockDay: 5,
    requiredShopLevel: 3
  },
  mystic: {
    id: 'mystic',
    name: '???',
    sprite: 'mystic',
    speakerColor: '#8888cc',
    title: '神秘来客',
    description: '一位神秘的老者，浑身散发着不属于这个时代的气息。',
    timeCost: 0,
    timeReward: 50,
    unlockDay: 6,
    requiredShopLevel: 4
  },
  shixiansheng: {
    id: 'shixiansheng',
    name: '时先生',
    sprite: 'shixiansheng',
    speakerColor: '#8899bb',
    title: '最后的掌柜',
    description: '灰蓝长袍，银白头发用旧红绳束着。左眼琥珀色，右眼黑瞳。',
    timeCost: 0,
    timeReward: 60,
    unlockDay: 1,
    requiredShopLevel: 2,
    metaCondition: 'shixiansheng'
  }
};

// ---- 故事/对话数据 ----
const STORIES = {

  // === 陈伯的故事 ===
  chenbo: {
    greeting: [
      { speaker: '陈伯', speakerColor: '#d0a878', text: '……这里就是时间当铺吗？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '是的，欢迎光临。在这里，时间可以被交易。' },
      { speaker: '陈伯', speakerColor: '#d0a878', text: '我……我想改变一件事。一个困扰了我六十年的选择。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '请把你的记忆交给我。让我看看，那个节点在哪里。' },
      { speaker: '陈伯', speakerColor: '#d0a878', text: '那年我十八岁，站在人生的岔路口……' },
      { speaker: '旁白', speakerColor: '#888888', text: '你感受到记忆的碎片涌入意识——一个少年站在村口，面前是两条截然不同的路。' },
    ],

    memory: {
      title: '1962年·岔路口',
      description: '炎热的夏日，蝉鸣不断。十八岁的陈少年站在村口的大榕树下。',
      background: 'crossroad',
      dialogs: [
        { speaker: '旁白', speakerColor: '#888888', text: '这是1962年的夏天。少年陈望山刚从高中毕业。' },
        { speaker: '旁白', speakerColor: '#888888', text: '桌上放着两封信——一封来自军区的入伍通知，一封来自省城医学院的录取信。' },
        { speaker: '少年陈', speakerColor: '#d0a878', text: '父亲说从军报国是男儿本分……可我一直想当医生，治病救人。' },
        { speaker: '少年陈', speakerColor: '#d0a878', text: '该怎么选？这一步，就是一辈子啊。' },
      ],
      choices: [
        {
          text: '选择从军——扛起钢枪，保家卫国',
          rippleHint: '时间涟漪：将影响未来的相遇',
          rippleId: 'chen_army',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '少年坚定地拿起了入伍通知书。' },
            { speaker: '少年陈', speakerColor: '#d0a878', text: '报效国家，无怨无悔！' },
            { speaker: '旁白', speakerColor: '#888888', text: '时间涟漪扩散——陈望山成为了一名军人。他在战场上立下赫赫战功，却在一次战斗中失去了右臂。' },
            { speaker: '旁白', speakerColor: '#888888', text: '退伍后他独自生活，一生未娶。那个想要救人的梦想，再也没有实现。' },
          ]
        },
        {
          text: '选择学医——执起银针，悬壶济世',
          rippleHint: '时间涟漪：将改变他人的命运',
          rippleId: 'chen_doctor',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '少年轻轻拿起了录取通知书，眼中闪烁着光芒。' },
            { speaker: '少年陈', speakerColor: '#d0a878', text: '对不起了父亲……我想走自己的路。' },
            { speaker: '旁白', speakerColor: '#888888', text: '时间涟漪扩散——陈望山进入医学院，成为了一名外科医生。' },
            { speaker: '旁白', speakerColor: '#888888', text: '1985年，他在省城医院成功完成了一台极其复杂的手术，挽救了一位年轻母亲的生命。' },
          ]
        }
      ]
    },

    ending_army: [
      { speaker: '陈伯', speakerColor: '#d0a878', text: '……看来不管怎么选，都是这条路啊。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '每一个选择都有它的代价和意义，陈伯。' },
      { speaker: '陈伯', speakerColor: '#d0a878', text: '谢谢你……至少让我看到了那个可能性。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×30。陈伯的记忆已经归还。' },
    ],
    ending_doctor: [
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '这个选择……改变了很多人的命运。' },
      { speaker: '陈伯', speakerColor: '#d0a878', text: '如果当初我选了这条路……那个女人，她还活着吗？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '时间的涟漪已经扩散。答案……也许很快就会揭晓。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×30。你感到一阵异样的波动——有什么被改变了。' },
    ]
  },

  // === 林小姐的故事 ===
  linxiaojie: {
    greeting_normal: [
      { speaker: '林小姐', speakerColor: '#aa4466', text: '请问……这里真的能改变过去吗？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '这取决于你愿意付出什么代价。请坐。' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '我的母亲……她在1985年病逝了。一种罕见的病，没有医生能治。' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '如果……如果那时候有一个更好的医生，她是不是就不会死？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '让我看看你的记忆。那个时刻……我能找到它。' },
    ],
    greeting_butterfly: [
      { speaker: '旁白', speakerColor: '#888888', text: '门铃响了，但没有人进来。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（奇怪……我感到有人本该来到这里，但时间的涟漪改变了什么。）' },
      { speaker: '旁白', speakerColor: '#888888', text: '在这条时间线上，林小姐的母亲被陈望山医生救活了。她不需要来到时间当铺。' },
      { speaker: '旁白', speakerColor: '#888888', text: '蝴蝶效应已经生效。你获得了额外的时间碎片 ×15。' },
    ],

    memory: {
      title: '1985年·省城医院',
      description: '消毒水的气味弥漫在走廊中。病房里，一个小女孩握着母亲的手。',
      background: 'hospital',
      dialogs: [
        { speaker: '旁白', speakerColor: '#888888', text: '1985年深冬。省城第一人民医院，内科病房。' },
        { speaker: '旁白', speakerColor: '#888888', text: '五岁的小玲坐在病床边，母亲面色苍白地躺在那里。' },
        { speaker: '小玲', speakerColor: '#aa4466', text: '妈妈……你什么时候能好起来？老师说你很快就会好的。' },
        { speaker: '母亲', speakerColor: '#cc8899', text: '小玲乖……妈妈只是有点累。你先去外面找护士姐姐玩好不好？' },
        { speaker: '旁白', speakerColor: '#888888', text: '走廊尽头，主治医生正在和林先生谈话。你能听到断断续续的声音——"……手术风险太大……""没有把握……""建议保守治疗……"' },
      ],
      choices: [
        {
          text: '说服医生进行手术——拼一次！',
          rippleHint: '时间涟漪：手术成败在此一举',
          rippleId: 'lin_surgery',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '你将一股力量注入这段记忆——林先生突然变得坚定起来。' },
            { speaker: '林先生', speakerColor: '#886644', text: '医生！求求你，就算只有一成希望，也请试一试！' },
            { speaker: '旁白', speakerColor: '#888888', text: '医生犹豫了很久，最终点了点头。' },
            { speaker: '旁白', speakerColor: '#888888', text: '手术进行了八个小时。最终——失败了。以当时的医疗条件，这个手术注定无法成功。' },
            { speaker: '旁白', speakerColor: '#888888', text: '母亲在手术台上离世。小玲甚至没能和母亲说最后一句话。' },
          ]
        },
        {
          text: '接受保守治疗——至少还有时间相处',
          rippleHint: '时间涟漪：最后的温暖',
          rippleId: 'lin_conservative',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '记忆按照原来的轨迹流动。保守治疗让母亲多撑了三个月。' },
            { speaker: '旁白', speakerColor: '#888888', text: '在那三个月里，母亲教小玲读了很多诗，讲了很多故事。' },
            { speaker: '母亲', speakerColor: '#cc8899', text: '小玲，记住妈妈说的话——不管将来遇到什么，都要勇敢地活下去。' },
            { speaker: '旁白', speakerColor: '#888888', text: '春天来临时，母亲在睡梦中安详离世。小玲枕边放着母亲留下的诗集。' },
          ]
        }
      ]
    },

    ending_surgery: [
      { speaker: '林小姐', speakerColor: '#aa4466', text: '……所以不管怎么样，妈妈都没办法活下来吗？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '有些事情，不是时间能改变的。但你母亲的爱，从未改变。' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '（擦去眼泪）谢谢你……让我明白了这一点。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×35。' },
    ],
    ending_conservative: [
      { speaker: '林小姐', speakerColor: '#aa4466', text: '那三个月……原来那么珍贵。我以前一直觉得是在受煎熬。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '时间最珍贵的不是长度，是温度。' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '我明白了。妈妈那首诗……我到现在还记得每一个字。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×35。林小姐的眼中重新有了光芒。' },
    ]
  },

  // === 小周的故事（v4.1重写：2010年县城邮局，22岁周默，林远的遗信）===
  xiaozhou: {
    greeting: [
      { speaker: '小周', speakerColor: '#4a8aba', text: '（推门进来，鞋上沾着泥）请问……这里收信吗？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '这里是时间当铺。我们收的是记忆。' },
      { speaker: '小周', speakerColor: '#4a8aba', text: '记忆……也算是一种信吧。寄件人是过去的自己，收件人是现在的自己。' },
      { speaker: '小周', speakerColor: '#4a8aba', text: '我叫周默。邮局后勤，不算正式邮递员。但有一封信……在我手里攥了十年。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '十年？是谁的信？' },
      { speaker: '小周', speakerColor: '#4a8aba', text: '一个叫林远的人。他已经不在了。' },
    ],
    branchingGreeting: {
      introDialogs: [],
      branchChoice: [
        { text: '"信里写了什么？"', branchKey: 'branch_letter_content' },
        { text: '"为什么等了十年？"', branchKey: 'branch_ten_years' }
      ],
      branch_letter_content: [
        { speaker: '小周', speakerColor: '#4a8aba', text: '我没有拆开。信封上写着"小玲亲启"。笔迹很工整，但最后几个字歪了——像是写到一半，手抖了。' },
        { speaker: '小周', speakerColor: '#4a8aba', text: '林远死后，他的邻居把这封信和其他遗物一起送到邮局。邮戳是2000年的。' },
        { speaker: '小周', speakerColor: '#4a8aba', text: '那年我12岁，在邮局帮忙。分拣员说这封信找不到收件人，让我丢掉。我没丢。' },
        { speaker: '当铺老板', speakerColor: '#8866aa', text: '你一直留着它。十年了。' },
        { speaker: '小周', speakerColor: '#4a8aba', text: '有些东西丢了就真的没了。我总觉得……这封信还在等一个机会。' },
      ],
      branch_ten_years: [
        { speaker: '小周', speakerColor: '#4a8aba', text: '（苦笑）因为我怕。' },
        { speaker: '小周', speakerColor: '#4a8aba', text: '十二岁那年，分拣室里有一大堆无法投递的信。我偷偷把这封留下来了。' },
        { speaker: '小周', speakerColor: '#4a8aba', text: '后来我长大了，在邮局后勤部工作。每天经手几百封信，只有这一封是我自己的秘密。' },
        { speaker: '小周', speakerColor: '#4a8aba', text: '我试过找"小玲"。但林远没有留下更多信息。户籍查不到，地址是三十年前的。' },
        { speaker: '当铺老板', speakerColor: '#8866aa', text: '所以你来了这里。' },
        { speaker: '小周', speakerColor: '#4a8aba', text: '我想看看……这封信该去哪里。或者该不该去任何地方。' },
      ]
    },

    memory: {
      title: '2010年·梧桐树下',
      description: '秋雨绵绵。邮局后院的梧桐树下，一个年轻人攥着一封泛黄的信。',
      background: 'post_office_2010',
      dialogs: [
        { speaker: '旁白', speakerColor: '#888888', text: '2010年深秋。县城邮局后院。' },
        { speaker: '旁白', speakerColor: '#888888', text: '22岁的周默站在梧桐树下。雨水打湿了他的制服，但他顾不上。他盯着手里的信封。' },
        { speaker: '旁白', speakerColor: '#888888', text: '信封上写着"小玲亲启"，寄件人"林远"。邮戳：2000年3月17日。' },
        { speaker: '周默', speakerColor: '#4a8aba', text: '十年了。我查了三年，只找到一条线索——"小玲"可能在省城。可能。' },
        { speaker: '周默', speakerColor: '#4a8aba', text: '今天是最后一天。明天这批无法投递的信就要统一销毁了。' },
        { speaker: '旁白', speakerColor: '#888888', text: '梧桐叶落满了他的肩膀。旁边的邮筒上贴着褪色的标语："每一封信都值得被送达。"' },
        { speaker: '周默', speakerColor: '#4a8aba', text: '投进去，它就会被送到省城那个可能是"小玲"的地址。投不投？' },
      ],
      choices: [
        {
          text: '投入邮筒——让这封信完成它的旅程',
          rippleHint: '时间涟漪：一封迟到十年的信',
          rippleId: 'zhou_send',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '周默深吸一口气，将信投入了邮筒。金属盖合上的声音在雨中格外清脆。' },
            { speaker: '周默', speakerColor: '#4a8aba', text: '去吧。找到你该去的地方。' },
            { speaker: '旁白', speakerColor: '#888888', text: '时间涟漪扩散——两个月后，省城一个叫林小玲的女人收到了这封信。' },
            { speaker: '旁白', speakerColor: '#888888', text: '她拆开信封，里面只有一句话："小玲，爸爸对不起你和妈妈。这辈子最后悔的事，就是没有好好告别。"' },
            { speaker: '旁白', speakerColor: '#888888', text: '她哭了一整夜。但第二天早上，她把父亲的照片从抽屉里拿出来，放在了床头。' },
          ]
        },
        {
          text: '在梧桐树下烧掉——有些告别不需要语言',
          rippleHint: '时间涟漪：梧桐叶与灰烬',
          rippleId: 'zhou_burn',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '周默从口袋里掏出打火机。火焰在雨中摇曳，但信纸还是慢慢燃了起来。' },
            { speaker: '周默', speakerColor: '#4a8aba', text: '林远先生……也许你想说的，她已经知道了。' },
            { speaker: '旁白', speakerColor: '#888888', text: '时间涟漪扩散——灰烬落在梧桐树根上。第二年春天，那棵树开了十年来最茂盛的花。' },
            { speaker: '旁白', speakerColor: '#888888', text: '周默辞去了邮局的工作。他说他终于明白了——有些信，是写给时间本身的。' },
          ]
        }
      ]
    },

    ending_send: [
      { speaker: '小周', speakerColor: '#4a8aba', text: '两个月后……她真的收到了？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '迟到十年的信。但它到达了。' },
      { speaker: '小周', speakerColor: '#4a8aba', text: '（擦了擦眼睛）那我这十年的执念……也算到达了吧。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×40。周默重新背起了邮包。' },
    ],
    ending_burn: [
      { speaker: '小周', speakerColor: '#4a8aba', text: '那棵梧桐……真的开花了？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '有些告别不需要信件。它们活在泥土里，活在年轮里。' },
      { speaker: '小周', speakerColor: '#4a8aba', text: '也许吧。至少我不用再攥着那封信了。手空了，才能做别的事。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×40。小周的脚步比来时轻快了许多。' },
    ],
    conditionalDeparture: [
      {
        afterRipple: 'zhou_send',
        metaRipplesSeen: ['lin_surgery'],
        dialogs: [
          { speaker: '小周', speakerColor: '#4a8aba', text: '对了，我查林远资料的时候发现……他女儿叫林小玲。她母亲在1985年做过一台手术。' },
          { speaker: '小周', speakerColor: '#4a8aba', text: '如果你见过一个姓林的女人……告诉她，她父亲的信，送到了。' },
        ]
      },
      {
        afterRipple: 'zhou_burn',
        metaHiddenEventSeen: ['linyuan_ghost'],
        dialogs: [
          { speaker: '小周', speakerColor: '#4a8aba', text: '（走到门口，突然回头）老板，你那面铜镜……我刚才好像看到里面有个人影。' },
          { speaker: '小周', speakerColor: '#4a8aba', text: '穿着旧外套，手里攥着什么东西。有点像……写信的人。' },
          { speaker: '当铺老板', speakerColor: '#8866aa', text: '……也许他在等你帮他做一个决定。' },
        ]
      }
    ]
  },

  // === 阿蘅的故事（v4.1重写：1997年·香港钟楼，回归前夜，17岁蘇蘅）===
  aheng: {
    greeting: [
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '（不抬头，声音像钟摆一样精确）这里是……时间当铺？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '是。你想典当什么？' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '我想典当"等待"。但不是普通的等待……是"让钟继续走"的等待。或者说，是"让钟停下"的后悔。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（注意到她的眼睛）你的眼睛……' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '祖父说，这是"守钟人的眼睛"。左眼看过太多时间，变成了琥珀。右眼还年轻，还能看见"现在"。' },
    ],
    branchingGreeting: {
      introDialogs: [],
      branchChoice: [
        { text: '"你祖父是守钟人？"', branchKey: 'branch_grandfather' },
        { text: '"等待"怎么典当？', branchKey: 'branch_pawn' },
        { text: '你手腕上的红绳……', branchKey: 'branch_redstring' }
      ],
      branch_grandfather: [
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '嗯。维多利亚港钟楼的最后一任守钟人。蘇老伯。' },
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '那座钟从1860年开始走，一百三十七年没有停过。祖父守了最后四十年。' },
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '1997年6月30日——回归前夜——他躺在钟楼上的帆布床上，呼吸越来越浅。' },
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '他说："蘅啊，钟还在走吗？"我说在走。他说："那就好。走到最后一秒。"' },
        { speaker: '当铺老板', speakerColor: '#8866aa', text: '你想改变的……是那个夜晚？' },
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '我想知道，如果那天晚上我做了不同的选择，钟——还有祖父——会怎样。' },
      ],
      branch_pawn: [
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '我在那座钟楼下面等了二十九年。等一个不知道该不该做的决定的结果。' },
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '等待本身变成了一种习惯。我怕如果不等了，连那个夜晚的重量都会消失。' },
        { speaker: '当铺老板', speakerColor: '#8866aa', text: '你想把这段等待交给我？' },
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '不是交给你。是交给时间。让时间告诉我——等待值不值得。' },
      ],
      branch_redstring: [
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '（下意识摸了摸手腕）这是祖父的。他把它绑在钟摆上过。' },
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '他说红绳沾了钟的时间，戴着它的人会记住每一秒的重量。' },
        { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '二十九年了，我确实记住了。每一秒。所以我来了。' },
        { speaker: '当铺老板', speakerColor: '#8866aa', text: '……让我看看那段记忆。' },
      ]
    },

    memory: {
      title: '1997年·香港钟楼',
      description: '回归前夜。维多利亚港的钟楼上，祖父躺在帆布床上，呼吸微弱。',
      background: 'hong_kong_clock_tower',
      bgColor: '#0a1020',
      dialogs: [
        { speaker: '旁白', speakerColor: '#888888', text: '1997年6月30日。深夜。维多利亚港钟楼。' },
        { speaker: '旁白', speakerColor: '#888888', text: '17岁的蘇蘅跪在帆布床边。祖父蘇老伯的脸色灰白，呼吸像生锈的齿轮一样艰涩。' },
        { speaker: '旁白', speakerColor: '#888888', text: '钟楼的大钟在头顶运转，指针指向11:47。再过13分钟，就是7月1日。回归的钟声应该在午夜敲响。' },
        { speaker: '蘇蘅', speakerColor: '#ba6a3a', text: '阿公……医生说你要休息。钟的事我来。' },
        { speaker: '蘇老伯', speakerColor: '#886644', text: '（微弱地）蘅……钟……钟还在走？' },
        { speaker: '蘇蘅', speakerColor: '#ba6a3a', text: '在走。一直在走。' },
        { speaker: '蘇老伯', speakerColor: '#886644', text: '好……走到12点……让它敲完最后那一下……然后……' },
        { speaker: '旁白', speakerColor: '#888888', text: '老人的话断在了这里。你知道他想说什么。但你也知道——钟的发条只够走到凌晨。之后，如果没有人给它上发条，它就会停。' },
        { speaker: '蘇蘅', speakerColor: '#ba6a3a', text: '如果我给钟上发条，它能走过今晚。但我要离开阿公的身边。如果我留在这里……钟敲完最后一下，就会安静下去。' },
      ],
      choices: [
        {
          text: '给钟上发条——让它走过最后这一夜',
          rippleHint: '时间涟漪：钟走了，迷路的人就能找到回家的路',
          rippleId: 'heng_clock_run',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '蘇蘅站起来，爬上了齿轮平台。她用尽全身力气转动发条轴。' },
            { speaker: '蘇蘅', speakerColor: '#ba6a3a', text: '阿公，你等我。我上好发条就下来。' },
            { speaker: '旁白', speakerColor: '#888888', text: '时间涟漪扩散——午夜十二点，钟声准时敲响。维多利亚港的人群欢呼。' },
            { speaker: '旁白', speakerColor: '#888888', text: '蘇蘅从齿轮平台上下来时，祖父的手已经凉了。他走得很安静，像一个走完最后一圈的钟摆。' },
            { speaker: '旁白', speakerColor: '#888888', text: '那座钟又走了三天。然后，再也没有人来上发条了。' },
          ]
        },
        {
          text: '剪断钟摆绳索——让祖父在沉默中安息',
          rippleHint: '时间涟漪：有些告别需要沉默',
          rippleId: 'heng_clock_stop',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '蘇蘅从工具箱里找到剪刀。她走到钟摆前，手在发抖。' },
            { speaker: '蘇蘅', speakerColor: '#ba6a3a', text: '阿公……对不起。但我不想你走的时候，身边只有钟声没有人。' },
            { speaker: '旁白', speakerColor: '#888888', text: '她剪断了维系钟摆的绳索。一百三十七年来第一次，钟楼沉默了。' },
            { speaker: '旁白', speakerColor: '#888888', text: '时间涟漪扩散——午夜十二点，维多利亚港没有钟声。人们抬头看钟楼，只看到黑暗。' },
            { speaker: '旁白', speakerColor: '#888888', text: '但蘇蘅握着祖父的手。老人最后一口气吐出来的时候，他在笑。' },
            { speaker: '旁白', speakerColor: '#888888', text: '钟楼后来被改建成了博物馆。那把剪刀至今还摆在展柜里。' },
          ]
        }
      ]
    },

    ending_clock_run: [
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '……钟敲响了。人群欢呼了。但阿公没有听到。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '也许他听到了。只是从更远的地方。' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '（沉默很久）……也许吧。钟声走得比人远。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×45。阿蘅的琥珀色左眼中，似乎映着一座钟楼的剪影。' },
    ],
    ending_clock_stop: [
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '他走的时候在笑。那就够了。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '有时候沉默比钟声更有力量。' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '二十九年了，我终于可以不再等了。（轻轻解下手腕上的红绳，放在柜台上）' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '这个给你。沾了一百三十七年时间的红绳。也许它在这里比在我手上更有用。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×45。钟楼的沉默，终于有了回音。' },
    ],
    conditionalDeparture: [
      {
        afterRipple: 'heng_clock_run',
        metaRipplesSeen: ['chen_army'],
        dialogs: [
          { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '对了，祖父提过一个人。独臂，每年给他寄钱。说是战场上的恩人。' },
          { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '如果你见到他……告诉他，我祖父的钟，为他敲过。' },
        ]
      },
      {
        afterRipple: 'heng_clock_stop',
        metaRipplesSeen: ['chen_doctor'],
        dialogs: [
          { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '祖父提过一个人。省城的医生。他说，"医生也是人，人就会犯错"。' },
          { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '如果你见到那个医生……告诉他，我祖父的钟，原谅他了。' },
        ]
      }
    ]
  },

  // === 老吴的故事（v4.1重写：1989年县城照相馆，35岁吴德昌，暗房中第37号订单）===
  laowu: {
    greeting: [
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '（捧着一个铁盒子进来，指甲缝里残留着显影液的痕迹）掌柜的……你这里能典当"犹豫"吗？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '犹豫？这是个不常见的典当物。请坐。' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '我叫吴德昌。开照相馆的。这个铁盒子里有一卷底片，编号37。' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '1989年，我在暗房里发现了它。是我妻子留下的。她失踪前一天拍的。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '失踪？' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '走了。没有留信，没有告别。我找了她三十五年。只有这卷底片——我一直没敢冲洗。' },
    ],
    branchingGreeting: {
      introDialogs: [],
      branchChoice: [
        { text: '"你冲洗了吗？"', branchKey: 'branch_develop' },
        { text: '"为什么不敢？"', branchKey: 'branch_afraid' },
        { text: '你的手指……', branchKey: 'branch_fingers' }
      ],
      branch_develop: [
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '没有。三十五年了，它一直在这个铁盒子里。' },
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '我怕冲出来之后看到的东西——比不知道更可怕。' },
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '也许照片上什么都没有。也许她笑着。也许……她在哭。' },
        { speaker: '当铺老板', speakerColor: '#8866aa', text: '你想让我带你回到那个暗房？' },
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '让我看看……如果我冲洗了，会发生什么。' },
      ],
      branch_afraid: [
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '因为……如果底片上什么都没有呢？或者——' },
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '如果底片上是她收拾行李的画面呢？那就说明她走的时候，是计划好的。不是意外。' },
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '三十五年来我一直告诉自己"也许她遇到了什么事"。但如果底片说不是……' },
        { speaker: '当铺老板', speakerColor: '#8866aa', text: '你宁可不知道。' },
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '不知道的痛，至少可以用"也许"来安慰。知道了就——没有也许了。' },
      ],
      branch_fingers: [
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '（看了看自己的手）显影液泡的。干这行的人都这样。' },
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '但其实我已经三十年没进过暗房了。这些痕迹……是洗不掉的。' },
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '就像那卷底片。就算我不冲洗它，它也一直在影响我。每天早上醒来，第一个念头就是那个铁盒子。' },
        { speaker: '当铺老板', speakerColor: '#8866aa', text: '也许是时候了。' },
        { speaker: '老吴', speakerColor: '#7a7a8a', text: '……也许吧。' },
      ]
    },

    memory: {
      title: '1989年·暗房',
      description: '暗房红灯下，第37号订单的底片在显影盘中等待。',
      background: 'darkroom_1989',
      dialogs: [
        { speaker: '旁白', speakerColor: '#888888', text: '1989年夏天。县城南街，吴记照相馆的暗房。' },
        { speaker: '旁白', speakerColor: '#888888', text: '35岁的吴德昌蹲在暗房角落，面前是一个落满灰尘的铁盒子。他的妻子三天前消失了。' },
        { speaker: '旁白', speakerColor: '#888888', text: '他在清理妻子的物品时发现了这卷底片。标签上写着"37号"——是他妻子失踪前一天，用店里的相机拍的。' },
        { speaker: '吴德昌', speakerColor: '#7a7a8a', text: '她用的是我的相机。我教她用的。她什么时候拍的？为什么我不知道？' },
        { speaker: '旁白', speakerColor: '#888888', text: '显影盘已经准备好了。药水的气味在红色安全灯下弥漫。底片在他手中微微颤抖。' },
        { speaker: '吴德昌', speakerColor: '#7a7a8a', text: '冲出来——我就知道她最后拍了什么。也许是线索。也许是告别。' },
        { speaker: '吴德昌', speakerColor: '#7a7a8a', text: '但如果……如果我看到的是一个我不认识的她呢？' },
      ],
      choices: [
        {
          text: '冲洗底片，寄给她可能在的地方',
          rippleHint: '时间涟漪：影像中也许藏着回家的路',
          rippleId: 'wu_develop',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '吴德昌将底片小心地放入显影液中。红灯下，影像一点一点浮现——' },
            { speaker: '旁白', speakerColor: '#888888', text: '照片上是照相馆的后院。他妻子站在梧桐树下，一手扶着树干，一手放在肚子上。她在笑。' },
            { speaker: '吴德昌', speakerColor: '#7a7a8a', text: '她……她把手放在肚子上。这是什么意思？' },
            { speaker: '旁白', speakerColor: '#888888', text: '时间涟漪扩散——吴德昌把照片洗了出来，寄往妻子娘家所在的城市。' },
            { speaker: '旁白', speakerColor: '#888888', text: '两年后，一个十五六岁的女孩来到照相馆。她手里攥着那张照片。"你是吴德昌吗？我妈妈让我来找你。"' },
          ]
        },
        {
          text: '烧毁底片——有些影像该永远留在黑暗中',
          rippleHint: '时间涟漪：红灯下的告别',
          rippleId: 'wu_destroy',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '吴德昌把底片举到红灯前，看了最后一眼那些模糊的轮廓。然后他划亮了火柴。' },
            { speaker: '吴德昌', speakerColor: '#7a7a8a', text: '我不需要知道你最后拍了什么。我只需要记得你笑的样子。那是我亲眼见过的，不需要底片。' },
            { speaker: '旁白', speakerColor: '#888888', text: '时间涟漪扩散——火苗在暗房中跳了一下。底片卷曲、变黑、消失。' },
            { speaker: '旁白', speakerColor: '#888888', text: '吴德昌关了暗房的门，再也没有打开过。但他在照相馆橱窗里放了一个空白相框——上面写着一个日期。' },
          ]
        }
      ]
    },

    ending_develop: [
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '（声音发颤）她笑着……手放在肚子上。那是——' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '你明白那意味着什么。' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '（沉默了很久）明白了。三十五年了，终于明白了。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×40。老吴的眼角有泪痕，但他在笑。' },
    ],
    ending_destroy: [
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '那个空白相框……原来是给她留的位置。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '有些框不需要照片。它本身就是一种记忆。' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '是啊。三十五年了，那个框还在橱窗里。路过的人都问里面放的什么。我说："放的是等待。"' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×40。老吴轻轻拍了拍铁盒子，像是在告别。' },
    ],
    conditionalDeparture: [
      {
        afterRipple: 'wu_develop',
        metaRipplesSeen: ['heng_clock_run'],
        dialogs: [
          { speaker: '老吴', speakerColor: '#7a7a8a', text: '对了，那张照片寄出去之后……有个女孩来找我。她说她坐了一夜的火车。' },
          { speaker: '老吴', speakerColor: '#7a7a8a', text: '她手腕上系着红绳。我问她从哪来。她说"从钟声停了的地方来"。很奇怪的说法。' },
        ]
      },
      {
        afterRipple: 'wu_destroy',
        metaRipplesSeen: ['heng_clock_stop'],
        dialogs: [
          { speaker: '老吴', speakerColor: '#7a7a8a', text: '底片烧了之后第二天，我在照相馆门口看到一个白发女孩。十七八岁的样子。' },
          { speaker: '老吴', speakerColor: '#7a7a8a', text: '她盯着橱窗里的空白相框看了很久。然后她说了一句很奇怪的话——"钟停了，但时间没有。"' },
          { speaker: '老吴', speakerColor: '#7a7a8a', text: '我追出去的时候她已经走了。手腕上好像绑着根红绳。' },
        ]
      }
    ]
  },

  // === 神秘老人的故事 ===
  mystic: {
    greeting: [
      { speaker: '???', speakerColor: '#8888cc', text: '……你终于准备好了吗？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '你……你是谁？我觉得……好像在哪里见过你。' },
      { speaker: '???', speakerColor: '#8888cc', text: '你当然见过我。在镜子里。在梦境中。在每一个客人的眼睛里。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '你在说什么？我……我的记忆……为什么有一片空白？' },
      { speaker: '???', speakerColor: '#8888cc', text: '因为你把它们当掉了。用自己的记忆，换取了经营这间当铺的权利。' },
      { speaker: '???', speakerColor: '#8888cc', text: '现在……该看看那段被封存的记忆了。' },
    ],

    memory: {
      title: '????年·时间当铺',
      description: '一切都似曾相识。你站在这间当铺里，但角色互换了——你是客人。',
      background: 'pawnshop_mirror',
      dialogs: [
        { speaker: '旁白', speakerColor: '#888888', text: '画面模糊而扭曲，像是水中的倒影。' },
        { speaker: '旁白', speakerColor: '#888888', text: '你看到了自己——不，是曾经的自己——站在柜台前。而柜台后面坐着的，正是这位神秘的老人。' },
        { speaker: '年轻的你', speakerColor: '#8866aa', text: '求求你……给我多一点时间。我不想失去她。' },
        { speaker: '老当铺主', speakerColor: '#8888cc', text: '你愿意付出什么代价？' },
        { speaker: '年轻的你', speakerColor: '#8866aa', text: '什么都可以！我的记忆、我的过去、我的一切！' },
        { speaker: '老当铺主', speakerColor: '#8888cc', text: '好。那你就用自己的过去，换取经营这间当铺的能力。你将帮助他人改写时间……直到你找到真相。' },
        { speaker: '旁白', speakerColor: '#888888', text: '真相浮出水面——你不是当铺的经营者，你是当铺的囚徒。每一个来到这里的客人，都是你在不同时间线上的可能性。' },
      ],
      choices: [
        {
          text: '关闭当铺——打破时间的循环',
          rippleHint: '终结：接受失去，获得自由',
          rippleId: 'ending_close',
          result: [
            { speaker: '当铺老板', speakerColor: '#8866aa', text: '够了。我不要再做时间的囚徒。' },
            { speaker: '???', speakerColor: '#8888cc', text: '你确定吗？关闭当铺意味着放弃一切——包括那个你拼命想要拯救的人。' },
            { speaker: '当铺老板', speakerColor: '#8866aa', text: '有些失去……必须被接受。只有放手，才能真正前行。' },
            { speaker: '旁白', speakerColor: '#888888', text: '当铺的灯光一盏一盏熄灭。墙上的时钟缓缓停止转动。门外，是清晨的阳光——真实的、流动的、属于你的时间。' },
          ]
        },
        {
          text: '继续经营——成为永恒的当铺主',
          rippleHint: '轮回：在时间中找到意义',
          rippleId: 'ending_stay',
          result: [
            { speaker: '当铺老板', speakerColor: '#8866aa', text: '如果每一个客人都是我……那帮助他们，就是在帮助自己。' },
            { speaker: '???', speakerColor: '#8888cc', text: '你选择留下？即使知道这是一个永恒的循环？' },
            { speaker: '当铺老板', speakerColor: '#8866aa', text: '不是循环。每一次选择都是新的，每一段记忆都有意义。我愿意成为守护这些故事的人。' },
            { speaker: '旁白', speakerColor: '#888888', text: '你重新坐回柜台后方。门外的铃铛再次响起——新的客人推门而入。故事，永远不会结束。' },
          ]
        }
      ],
      hiddenChoice: {
        condition: ['chen_doctor', 'lin_conservative', 'zhou_burn', 'heng_clock_run', 'wu_develop'],
        choice: {
          text: '我想看看所有时间的交汇点',
          rippleHint: '闭环：五条时间线的交汇',
          rippleId: 'ending_loop',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '你的话语在空气中震颤。五条时间涟漪同时回响，共振出一个前所未有的频率。' },
            { speaker: '???', speakerColor: '#8888cc', text: '你……你找到了第三条路？这不在预设的命运之中。' },
            { speaker: '当铺老板', speakerColor: '#8866aa', text: '命运从来不只有两条路。每一个选择的交叉点，都是新的可能。' },
            { speaker: '旁白', speakerColor: '#888888', text: '五段记忆同时浮现——岔路口的少年、病房里的小女孩、邮局的信件、钟楼的最后一声、暗房中浮现的面容。' },
            { speaker: '旁白', speakerColor: '#888888', text: '它们交织在一起，形成了一个完整的环——你帮助的每一个人，都在帮助另一个人。' },
            { speaker: '旁白', speakerColor: '#888888', text: '时间不是一条线，也不是一个循环。它是一张网，而你站在网的中心。' },
            { speaker: '???', speakerColor: '#8888cc', text: '（微笑）也许……你才是真正的当铺主人。不是囚徒，而是编织者。' },
          ]
        }
      }
    },

    ending_close: [
      { speaker: '旁白', speakerColor: '#888888', text: '时间当铺消散在晨光之中，像一场漫长的梦终于醒来。' },
      { speaker: '旁白', speakerColor: '#888888', text: '你站在空旷的街道上，身边是普通的行人，头顶是普通的天空。' },
      { speaker: '旁白', speakerColor: '#888888', text: '你的记忆回来了——不完整，但真实。' },
      { speaker: '旁白', speakerColor: '#888888', text: '这就够了。' },
    ],
    ending_stay: [
      { speaker: '旁白', speakerColor: '#888888', text: '铃铛叮当作响。又一位客人推开了时间当铺的门。' },
      { speaker: '旁白', speakerColor: '#888888', text: '你微笑着抬起头："欢迎光临时间当铺。"' },
      { speaker: '旁白', speakerColor: '#888888', text: '"在这里，每一段过去都值得被珍视。"' },
      { speaker: '旁白', speakerColor: '#888888', text: '"而每一个选择，都是通往未来的钥匙。"' },
    ],
    ending_loop: [
      { speaker: '旁白', speakerColor: '#aa88ff', text: '五条时间线在你的指尖交汇，发出柔和的光芒。' },
      { speaker: '旁白', speakerColor: '#aa88ff', text: '你看到了所有的可能性——不是选择其中一条，而是让它们共存。' },
      { speaker: '旁白', speakerColor: '#aa88ff', text: '当铺没有关闭，也没有继续循环。它变成了一个节点——' },
      { speaker: '旁白', speakerColor: '#aa88ff', text: '一个所有时间线都经过的交汇点。' },
      { speaker: '旁白', speakerColor: '#aa88ff', text: '你终于明白了自己的身份：不是囚徒，不是掌柜，而是时间之网的编织者。' },
      { speaker: '旁白', speakerColor: '#ffcc88', text: '每一个选择都不会消失。它们只是成为了网的一部分。' },
      { speaker: '旁白', speakerColor: '#ffcc88', text: '而你，将永远站在所有故事的交叉点上，见证每一个"如果"成为"曾经"。' },
    ]
  },

  // === 时先生的故事 ===
  shixiansheng: {
    // 普通形态（首次，无ending_stay/ending_close）
    greeting_first: [
      { speaker: '旁白', speakerColor: '#888888', text: '铜镜中的光芒忽然晃动了一下。一道身影从镜面深处浮现。' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '……你修好了这面镜子。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '你是……谁？你从铜镜里出来的？' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '我曾经坐在你现在坐的位置上。很久很久以前。' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '不必惊慌。我只是来看看新掌柜做得怎么样。' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '（他从袖中取出一块碎玻璃，放在柜台上）' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '这是沙漏碎下来的一片。留着吧。也许将来你会明白它的意义。' },
      { speaker: '旁白', speakerColor: '#888888', text: '话音未落，身影便消散在镜面的光晕之中。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得收藏品：碎沙漏玻璃。' },
    ],
    // 真身形态（有ending_stay）
    greeting_true: [
      { speaker: '旁白', speakerColor: '#888888', text: '铜镜发出低沉的嗡鸣声。你感到一股熟悉而沉重的气息从镜面深处涌出。' },
      { speaker: '旁白', speakerColor: '#888888', text: '一个人影从镜中走出——灰蓝长袍，银白长发用旧红绳束着。他的左眼是琥珀色的。' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '你选择留下了。和我当年一样。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '你就是……之前的当铺主人？' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '在你之前，我在这张柜台后面坐了一百二十年。' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '我见过无数个"你"——不同的选择，不同的涟漪，不同的结局。' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '但你是第一个让我觉得……也许该把真正的故事告诉你的人。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '真正的故事？' },
      { speaker: '时先生', speakerColor: '#8899bb', text: '关于这间当铺的起源。关于第一粒沙是怎么开始流动的。' },
    ],
    // 分支对话（仅真身形态）
    branchingGreeting: {
      baseGreeting: 'greeting_true',  // 先播放greeting_true再进入分支
      introDialogs: [
        { speaker: '时先生', speakerColor: '#8899bb', text: '你可以问我三个问题中的一个。每个答案都通向同一个地方——但路径不同。' },
      ],
      branchChoice: [
        { text: '询问"永恒"——当铺为何永恒存在？', branchKey: 'branch_eternity' },
        { text: '询问"馈赠"——你为何把当铺给了我？', branchKey: 'branch_gift' },
        { text: '询问"铜镜"——铜镜里到底是什么？', branchKey: 'branch_mirror' }
      ],
      branch_eternity: [
        { speaker: '时先生', speakerColor: '#8899bb', text: '当铺不是永恒的。它只是……很长。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '每一个掌柜都在当铺里留下自己的时间。我留了一百二十年。在我之前的人留了九十年。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '我们的时间叠加在一起，就成了当铺的寿命。所以它看起来好像永远存在。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '但总有一天，最后一个掌柜会让最后一粒沙落下。那一天……就是当铺的终点。' },
      ],
      branch_gift: [
        { speaker: '时先生', speakerColor: '#8899bb', text: '不是"给"。是"交换"。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '你用自己的过去换取了坐在那张柜台后面的资格。这是你自己的选择。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '只不过你忘了。因为交出记忆就是交易的一部分。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '但我可以告诉你——你交出记忆的那一天，你笑着说："值得。"' },
      ],
      branch_mirror: [
        { speaker: '时先生', speakerColor: '#8899bb', text: '铜镜是当铺最古老的部分。比任何一个掌柜都老。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '它连接着所有掌柜存在过的时间。你修复它的那一刻，就重新接通了这条线。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '镜子里映照的不是你的脸——是你在所有时间线上的叠影。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '包括我的。包括在你之后的那一个。' },
      ]
    },
    // 缺席形态（有ending_close无ending_stay）
    greeting_gone: [
      { speaker: '旁白', speakerColor: '#888888', text: '铜镜微微发光，但没有人影出现。' },
      { speaker: '旁白', speakerColor: '#888888', text: '你凑近镜面，只看到一个模糊的背影——灰蓝色长袍，正在远去。' },
      { speaker: '旁白', speakerColor: '#888888', text: '镜面上慢慢浮现几个字，像是被手指写在雾气上的：' },
      { speaker: '旁白', speakerColor: '#aabbcc', text: '"你选择了离开。所以我也终于可以走了。"' },
      { speaker: '旁白', speakerColor: '#888888', text: '字迹渐渐消散。铜镜恢复了沉寂。' },
    ],

    memory: {
      title: '????年·当铺创立之日',
      description: '空荡荡的房间里，只有一张柜台，一盏灯笼，和一个沙漏。',
      background: 'pawnshop_origin',
      dialogs: [
        { speaker: '旁白', speakerColor: '#888888', text: '画面回溯到一个久远的夜晚。你看到了年轻的时先生——那时他还不叫这个名字。' },
        { speaker: '旁白', speakerColor: '#888888', text: '他站在一间空荡荡的房间里，面前只有一张旧柜台和一个沙漏。' },
        { speaker: '年轻的时先生', speakerColor: '#8899bb', text: '真的要这么做吗？一旦翻转这个沙漏，我的时间就不再属于我了。' },
        { speaker: '旁白', speakerColor: '#888888', text: '他看着沙漏里的沙子——一共只有七粒。每一粒都代表着一段被收集的遗憾。' },
        { speaker: '年轻的时先生', speakerColor: '#8899bb', text: '七个人的遗憾，换来一间可以改写时间的当铺……值得吗？' },
        { speaker: '旁白', speakerColor: '#888888', text: '他深吸一口气，翻转了沙漏。第一粒沙开始坠落。' },
        { speaker: '旁白', speakerColor: '#888888', text: '时间当铺就此诞生。而他，成了第一个把自己典当给时间的人。' },
        { speaker: '旁白', speakerColor: '#888888', text: '——如今，沙漏里只剩最后一粒沙还悬在半空。' },
        { speaker: '时先生', speakerColor: '#8899bb', text: '现在你知道了全部的故事。剩下的，只有一个选择。' },
      ],
      choices: [
        {
          text: '接过沙漏——让第七粒沙由你来守护',
          rippleHint: '继承：延续时间之网',
          rippleId: 'ripple_accept',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '你伸出手，接过那个古老的沙漏。它在你掌心微微震颤。' },
            { speaker: '时先生', speakerColor: '#8899bb', text: '（微笑）谢谢你。从今以后，这间当铺真正属于你了。' },
            { speaker: '旁白', speakerColor: '#888888', text: '第七粒沙静静地悬在半空——它不再坠落，也不再上升。它只是在那里，等待着。' },
            { speaker: '时先生', speakerColor: '#8899bb', text: '红绳给你。（他解下头发上的旧红绳）它会提醒你——时间不是用来拥有的，是用来守护的。' },
            { speaker: '旁白', speakerColor: '#ffcc44', text: '获得收藏品：旧红绳。' },
          ]
        },
        {
          text: '打碎沙漏——让所有的沙子都自由',
          rippleHint: '终结：释放一切束缚',
          rippleId: 'ripple_reject',
          result: [
            { speaker: '旁白', speakerColor: '#888888', text: '你举起沙漏，然后松开手。它在空中翻转了一圈，摔在柜台上，碎成了无数片。' },
            { speaker: '旁白', speakerColor: '#888888', text: '七粒沙散落在碎玻璃之间。它们闪了一下光，然后变得和普通的沙子没有区别。' },
            { speaker: '时先生', speakerColor: '#8899bb', text: '……你做了我一百二十年都没有勇气做的事。' },
            { speaker: '时先生', speakerColor: '#8899bb', text: '（轻声）也好。也许时间本来就不该被装在玻璃瓶子里。' },
            { speaker: '旁白', speakerColor: '#888888', text: '时先生的身影开始变得透明。他看着你，点了点头，然后消散在光芒之中。' },
            { speaker: '旁白', speakerColor: '#ffcc44', text: '获得收藏品：灰烬残片。' },
          ]
        }
      ]
    },

    ending_accept: [
      { speaker: '旁白', speakerColor: '#888888', text: '沙漏安静地立在柜台上。第七粒沙悬而未落。' },
      { speaker: '旁白', speakerColor: '#888888', text: '时先生的身影彻底消失了。但你感到他的一百二十年，正在从铜镜中缓缓流入当铺的每一个角落。' },
      { speaker: '旁白', speakerColor: '#888888', text: '你不再是囚徒，也不再是继承者。你是自己选择留下的人。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×60。时先生的记忆已经归还。' },
    ],
    ending_reject: [
      { speaker: '旁白', speakerColor: '#888888', text: '碎玻璃散落一地。沙漏不复存在。' },
      { speaker: '旁白', speakerColor: '#888888', text: '但奇怪的是，当铺并没有消失。灯笼还在亮着，时钟还在走。' },
      { speaker: '旁白', speakerColor: '#888888', text: '也许当铺从来不需要沙漏。它需要的只是一个愿意坐在柜台后面的人。' },
      { speaker: '旁白', speakerColor: '#888888', text: '获得时间碎片 ×60。束缚已经解除。' },
    ]
  },

  // === 彩蛋对话 ===
  easter_eggs: {
    idle: [
      { speaker: '旁白', speakerColor: '#666688', text: '……时钟的滴答声在空荡荡的当铺里回响。' },
      { speaker: '旁白', speakerColor: '#666688', text: '你凝视着虚空，思绪飘向了某个遥远的地方。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（我……是不是忘了什么很重要的事情？）' },
      { speaker: '旁白', speakerColor: '#666688', text: '一瞬间，你仿佛看到了一个人影站在门外。但你眨了眨眼，什么都没有。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '你感受到一股微弱的时间波动。获得时间碎片 ×5。' },
    ],
    rainy_day: [
      { speaker: '旁白', speakerColor: '#668888', text: '今天外面在下雨。雨滴敲打着当铺的窗棂。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（这雨声……好像在哪里听过。不，不只是听过——）' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（是那个人……在雨中等着我。）' },
      { speaker: '旁白', speakerColor: '#668888', text: '记忆的碎片一闪而过，来不及抓住就消散了。但你的心中多了一丝确信——那个人，是真实存在过的。' },
    ],
    newgame_plus: [
      { speaker: '旁白', speakerColor: '#aa88ff', text: '你推开当铺的门，一切都那么熟悉……又那么陌生。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（等等……我好像来过这里。不，我一直在这里。）' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（那些客人的脸，那些做出的选择……是梦吗？）' },
      { speaker: '旁白', speakerColor: '#aa88ff', text: '你注意到柜台上多了一个旧笔记本。翻开第一页，上面用你的字迹写着——"不要忘记。"' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '时间的轮回再次开始。但这一次，你不完全是从零开始。' },
    ]
  }
};

// ---- 商店升级项目 ----
const SHOP_ITEMS = [
  {
    id: 'repair_bell',
    name: '修复门铃',
    description: '修好门口的铜铃，让更多客人能找到这里。',
    cost: 20,
    shopLevelRequired: 0,
    shopLevelGrant: 1,
    effect: '解锁第二位客人'
  },
  {
    id: 'restore_mirror',
    name: '修复铜镜',
    description: '柜台后方的铜镜似乎映照着另一个世界……',
    cost: 40,
    shopLevelRequired: 1,
    shopLevelGrant: 2,
    effect: '解锁神秘来客'
  },
  {
    id: 'polish_hourglass',
    name: '打磨沙漏',
    description: '让时间之沙流动得更慢一些。',
    cost: 25,
    shopLevelRequired: 0,
    shopLevelGrant: 0,
    effect: '延长游戏时限+50'
  },
  {
    id: 'light_lantern',
    name: '点亮灯笼',
    description: '照亮当铺的每一个角落，也许能找到被遗忘的东西。',
    cost: 30,
    shopLevelRequired: 1,
    shopLevelGrant: 0,
    effect: '解锁老板的记忆碎片'
  },
  {
    id: 'wind_chime',
    name: '挂起风铃',
    description: '风铃声引来更多迷失的旅人。',
    cost: 45,
    shopLevelRequired: 2,
    shopLevelGrant: 3,
    effect: '解锁更多客人'
  },
  {
    id: 'tune_clock',
    name: '校准钟表',
    description: '让所有时间线同步振动。',
    cost: 55,
    shopLevelRequired: 3,
    shopLevelGrant: 4,
    effect: '解锁最终来客'
  },
  {
    id: 'burn_incense',
    name: '点香炉',
    description: '香雾中浮现更多记忆碎片。',
    cost: 35,
    shopLevelRequired: 2,
    shopLevelGrant: 0,
    effect: '额外记忆碎片+20'
  }
];

// ---- 老板记忆碎片（主线解锁内容）----
const OWNER_MEMORIES = [
  {
    id: 'fragment1',
    title: '碎片一：雨中的身影',
    text: '你想起了一个雨天。有人在等你。但你看不清她的脸。',
    unlockCondition: 'light_lantern'
  },
  {
    id: 'fragment2',
    title: '碎片二：破碎的承诺',
    text: '"我会回来的。"你对谁说过这句话？回忆像碎玻璃一样刺痛你。',
    unlockCondition: 'complete_chenbo'
  },
  {
    id: 'fragment3',
    title: '碎片三：时间的代价',
    text: '你终于想起来了——你用自己全部的过去换取了"再来一次"的机会。但那个人……已经不在了。',
    unlockCondition: 'complete_linxiaojie'
  },
  {
    id: 'fragment4',
    title: '碎片四：信上的字迹',
    text: '一封没有寄出的信浮现在脑海中。你认出了那个字迹——是你自己写的。信的最后一行：请替我活下去。',
    unlockCondition: 'complete_xiaozhou'
  },
  {
    id: 'fragment5',
    title: '碎片五：停摆的钟',
    text: '你听到了一声钟响。不是来自外面，而是来自你的身体深处。那是你内心的时间，第一次停止流动的瞬间。',
    unlockCondition: 'complete_aheng'
  },
  {
    id: 'fragment6',
    title: '碎片六：最后的影像',
    text: '你看到了一张照片——上面是你和一个女人的合影。她在笑。你终于记起了她的名字，却发不出声音。',
    unlockCondition: 'complete_laowu'
  }
];

// ---- 程序化背景 ----
const BACKGROUNDS = {
  shop: {
    draw: function(renderer, time) {
      renderer.clear('#12101e');
      renderer.fillGradientRect(0, 0, 480, 200, '#1a1830', '#12101e');
      renderer.fillGradientRect(0, 200, 480, 120, '#1e1a28', '#141018');
      for (let x = 0; x < 480; x += 40) {
        renderer.setAlpha(0.15);
        renderer.ctx.strokeStyle = '#3a2a4a'; renderer.ctx.lineWidth = 1;
        renderer.ctx.beginPath(); renderer.ctx.moveTo(x, 200); renderer.ctx.lineTo(x - 40, 320); renderer.ctx.stroke();
      }
      renderer.resetAlpha();
      renderer.fillRect(250, 180, 200, 60, '#2a1a3e');
      renderer.fillRect(250, 175, 200, 8, '#3a2a4e');
      renderer.strokeRect(250, 180, 200, 60, '#4a3a6a');
      renderer.fillRect(10, 60, 120, 6, '#2a2a3e');
      renderer.fillRect(10, 110, 120, 6, '#2a2a3e');
      renderer.fillRect(30, 48, 12, 12, '#4a3a6a');
      renderer.fillRect(60, 44, 10, 16, '#6a4a3a');
      renderer.fillRect(90, 48, 14, 12, '#3a4a6a');
      renderer.fillRect(20, 98, 10, 12, '#5a3a4a');
      renderer.fillRect(50, 96, 12, 14, '#3a5a4a');
      renderer.fillRect(80, 100, 8, 10, '#6a5a3a');
      renderer.fillRect(350, 40, 60, 80, '#1a2a3e');
      renderer.strokeRect(350, 40, 60, 80, '#3a4a5a');
      renderer.ctx.strokeStyle = '#3a4a5a'; renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(380, 40); renderer.ctx.lineTo(380, 120); renderer.ctx.stroke();
      renderer.ctx.beginPath(); renderer.ctx.moveTo(350, 80); renderer.ctx.lineTo(410, 80); renderer.ctx.stroke();
      const moonGlow = Math.sin(time * 0.01) * 0.05 + 0.15;
      renderer.setAlpha(moonGlow);
      renderer.fillRect(355, 45, 25, 35, '#8888cc');
      renderer.resetAlpha();
      renderer.fillRect(300, 145, 4, 12, '#aa8844');
      const flicker = Math.sin(time * 0.15) * 2 + Math.sin(time * 0.23) * 1;
      renderer.setAlpha(0.7);
      renderer.fillCircle(302, 143 + flicker * 0.3, 3, '#ffaa22');
      renderer.setAlpha(0.2);
      renderer.fillCircle(302, 143 + flicker * 0.3, 12, '#ffaa2244');
      renderer.resetAlpha();
    }
  },
  crossroad: {
    draw: function(renderer, time) {
      renderer.clear('#0c1020');
      renderer.fillGradientRect(0, 0, 480, 160, '#1a2030', '#0c1020');
      renderer.fillGradientRect(0, 160, 480, 160, '#c0c8d0', '#8890a0');
      renderer.setAlpha(0.4);
      for (let x = 0; x < 480; x++) {
        const h = Math.sin(x * 0.015) * 30 + Math.sin(x * 0.007) * 20 + 120;
        renderer.fillRect(x, h, 1, 160 - h, '#2a3040');
      }
      renderer.resetAlpha();
      renderer.setAlpha(0.3);
      renderer.ctx.fillStyle = '#4a4050';
      renderer.ctx.beginPath(); renderer.ctx.moveTo(200, 320); renderer.ctx.lineTo(240, 160);
      renderer.ctx.lineTo(260, 160); renderer.ctx.lineTo(280, 320); renderer.ctx.fill();
      renderer.ctx.beginPath(); renderer.ctx.moveTo(250, 200); renderer.ctx.lineTo(420, 160);
      renderer.ctx.lineTo(430, 170); renderer.ctx.lineTo(280, 220); renderer.ctx.fill();
      renderer.resetAlpha();
      renderer.fillRect(248, 170, 4, 40, '#5a4030');
      renderer.fillRect(235, 168, 30, 3, '#5a4030');
      renderer.fillRect(252, 175, 25, 3, '#5a4030');
      for (let i = 0; i < 30; i++) {
        const sx = (i * 67 + time * 0.3) % 480;
        const sy = (i * 43 + time * 0.5) % 320;
        renderer.setAlpha(0.5 + Math.sin(time * 0.05 + i) * 0.3);
        renderer.fillRect(sx, sy, 1, 1, '#ffffff');
      }
      renderer.resetAlpha();
    }
  },
  hospital: {
    draw: function(renderer, time) {
      renderer.clear('#1a1e20');
      renderer.fillGradientRect(0, 0, 480, 100, '#2a2e30', '#1a1e20');
      renderer.fillRect(0, 100, 480, 4, '#3a3e40');
      renderer.fillGradientRect(0, 200, 480, 120, '#2a2820', '#1a1810');
      for (let x = 0; x < 480; x += 30) {
        for (let y = 200; y < 320; y += 30) {
          if ((x / 30 + y / 30) % 2 === 0) {
            renderer.setAlpha(0.1); renderer.fillRect(x, y, 30, 30, '#4a4840');
          }
        }
      }
      renderer.resetAlpha();
      renderer.fillRect(50, 104, 60, 96, '#3a2a20'); renderer.strokeRect(50, 104, 60, 96, '#5a4a40');
      renderer.fillCircle(100, 155, 3, '#aa8844');
      renderer.fillRect(200, 104, 60, 96, '#3a2a20'); renderer.strokeRect(200, 104, 60, 96, '#5a4a40');
      renderer.fillCircle(250, 155, 3, '#aa8844');
      renderer.fillRect(350, 104, 60, 96, '#3a2a20'); renderer.strokeRect(350, 104, 60, 96, '#5a4a40');
      renderer.fillCircle(400, 155, 3, '#aa8844');
      for (let x = 40; x < 480; x += 150) {
        renderer.fillRect(x, 10, 80, 4, '#aab0b8');
        const flick = Math.random() > 0.02 ? 0.6 : 0.2;
        renderer.setAlpha(flick); renderer.fillRect(x, 14, 80, 20, '#e0e8f0'); renderer.resetAlpha();
      }
      renderer.fillRect(140, 175, 50, 20, '#4a4040');
      renderer.fillRect(145, 195, 4, 10, '#3a3030');
      renderer.fillRect(181, 195, 4, 10, '#3a3030');
    }
  },
  pawnshop_mirror: {
    draw: function(renderer, time) {
      renderer.clear('#0a0a20');
      renderer.fillGradientRect(0, 0, 480, 200, '#1a1840', '#0a0a20');
      renderer.fillGradientRect(0, 200, 480, 120, '#1e1a38', '#141028');
      renderer.setAlpha(0.3);
      renderer.fillRect(30, 100, 200, 60, '#2a1a4e');
      renderer.fillRect(30, 95, 200, 8, '#3a2a5e');
      renderer.resetAlpha();
      renderer.fillRect(250, 180, 200, 60, '#2a1a4e');
      renderer.fillRect(250, 175, 200, 8, '#3a2a5e');
      renderer.strokeRect(250, 180, 200, 60, '#5a4a8a');
      renderer.setAlpha(0.3);
      for (let x = 0; x < 480; x += 2) {
        const wave = Math.sin(x * 0.03 + time * 0.02) * 5;
        renderer.fillRect(x, 160 + wave, 2, 1, '#8888ee');
      }
      renderer.resetAlpha();
      const a = -time * 0.02;
      renderer.setAlpha(0.5);
      renderer.fillCircle(100, 50, 20, '#1a1a3e');
      renderer.ctx.strokeStyle = '#6a6aaa'; renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath(); renderer.ctx.arc(100, 50, 20, 0, Math.PI * 2); renderer.ctx.stroke();
      renderer.ctx.beginPath(); renderer.ctx.moveTo(100, 50);
      renderer.ctx.lineTo(100 + Math.cos(a) * 14, 50 + Math.sin(a) * 14); renderer.ctx.stroke();
      renderer.resetAlpha();
      for (let i = 0; i < 10; i++) {
        const px = (i * 89 + time * 0.2) % 480;
        const py = (i * 67 + time * 0.15) % 320;
        renderer.setAlpha(0.3 + Math.sin(time * 0.03 + i) * 0.15);
        renderer.fillCircle(px, py, 1, '#aa88ff');
      }
      renderer.resetAlpha();
    }
  },
  post_office: {
    draw: function(renderer, time) {
      renderer.clear('#1a1810');
      renderer.fillGradientRect(0, 0, 480, 120, '#2a2618', '#1a1810');
      renderer.fillGradientRect(0, 200, 480, 120, '#2a2218', '#1a1810');
      // 百叶窗光影
      for (let y = 30; y < 120; y += 12) {
        const lightW = Math.sin(time * 0.01 + y * 0.1) * 10 + 60;
        renderer.setAlpha(0.15);
        renderer.fillRect(100, y, lightW, 4, '#ffcc66');
      }
      renderer.resetAlpha();
      // 信件架
      renderer.fillRect(20, 80, 140, 120, '#3a2a1a');
      renderer.strokeRect(20, 80, 140, 120, '#5a4a3a');
      for (let row = 0; row < 4; row++) {
        renderer.fillRect(20, 80 + row * 30, 140, 2, '#5a4a3a');
        for (let col = 0; col < 5; col++) {
          const hasLetter = (row * 5 + col + Math.floor(time * 0.001)) % 3 !== 0;
          if (hasLetter) {
            const c = ['#e8d8c0', '#d0c0a0', '#f0e0c8'][col % 3];
            renderer.fillRect(28 + col * 28, 84 + row * 30, 20, 22, c);
          }
        }
      }
      // 柜台
      renderer.fillRect(200, 160, 260, 40, '#4a3a2a');
      renderer.fillRect(200, 155, 260, 8, '#5a4a3a');
      renderer.strokeRect(200, 160, 260, 40, '#6a5a4a');
      // 邮戳
      renderer.setAlpha(0.3);
      renderer.fillCircle(350, 175, 12, '#aa4444');
      renderer.resetAlpha();
      // 天花板灯
      renderer.fillRect(238, 0, 4, 30, '#5a5a5a');
      const flicker = Math.sin(time * 0.12) * 0.1 + 0.5;
      renderer.setAlpha(flicker);
      renderer.fillCircle(240, 35, 8, '#ffcc44');
      renderer.setAlpha(flicker * 0.3);
      renderer.fillCircle(240, 35, 20, '#ffaa22');
      renderer.resetAlpha();
      // 飘落的灰尘
      for (let i = 0; i < 8; i++) {
        const dx = (i * 73 + time * 0.15) % 480;
        const dy = (i * 47 + time * 0.3) % 320;
        renderer.setAlpha(0.3);
        renderer.fillRect(dx, dy, 1, 1, '#ffddaa');
      }
      renderer.resetAlpha();
    }
  },
  clock_tower: {
    draw: function(renderer, time) {
      renderer.clear('#0e1020');
      // 天空渐变 - 黄昏
      renderer.fillGradientRect(0, 0, 480, 200, '#3a2020', '#1a1030');
      renderer.fillGradientRect(0, 200, 480, 120, '#1a1020', '#0e0e18');
      // 落日
      renderer.setAlpha(0.4);
      renderer.fillCircle(380, 80, 35, '#ff6633');
      renderer.setAlpha(0.2);
      renderer.fillCircle(380, 80, 50, '#ff4422');
      renderer.resetAlpha();
      // 钟面轮廓 (巨大)
      renderer.setAlpha(0.6);
      renderer.fillCircle(240, 140, 70, '#1a1a2e');
      renderer.ctx.strokeStyle = '#6a5a3a'; renderer.ctx.lineWidth = 3;
      renderer.ctx.beginPath(); renderer.ctx.arc(240, 140, 70, 0, Math.PI * 2); renderer.ctx.stroke();
      renderer.ctx.lineWidth = 1;
      // 钟面刻度
      for (let h = 0; h < 12; h++) {
        const angle = (h / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = 240 + Math.cos(angle) * 60;
        const y1 = 140 + Math.sin(angle) * 60;
        const x2 = 240 + Math.cos(angle) * 66;
        const y2 = 140 + Math.sin(angle) * 66;
        renderer.ctx.strokeStyle = '#8a7a5a';
        renderer.ctx.beginPath(); renderer.ctx.moveTo(x1, y1); renderer.ctx.lineTo(x2, y2); renderer.ctx.stroke();
      }
      // 指针
      const hourAngle = time * 0.001 - Math.PI / 2;
      const minAngle = time * 0.01 - Math.PI / 2;
      renderer.ctx.strokeStyle = '#aa8844'; renderer.ctx.lineWidth = 2;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(240, 140);
      renderer.ctx.lineTo(240 + Math.cos(hourAngle) * 35, 140 + Math.sin(hourAngle) * 35); renderer.ctx.stroke();
      renderer.ctx.strokeStyle = '#ccaa66'; renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(240, 140);
      renderer.ctx.lineTo(240 + Math.cos(minAngle) * 50, 140 + Math.sin(minAngle) * 50); renderer.ctx.stroke();
      renderer.resetAlpha();
      // 齿轮装饰
      renderer.setAlpha(0.25);
      const gearAngle = time * 0.005;
      for (let t = 0; t < 8; t++) {
        const ga = gearAngle + (t / 8) * Math.PI * 2;
        renderer.fillRect(60 + Math.cos(ga) * 25, 250 + Math.sin(ga) * 25, 6, 6, '#8a7a5a');
      }
      for (let t = 0; t < 6; t++) {
        const ga = -gearAngle + (t / 6) * Math.PI * 2;
        renderer.fillRect(420 + Math.cos(ga) * 20, 260 + Math.sin(ga) * 20, 5, 5, '#7a6a4a');
      }
      renderer.resetAlpha();
    }
  },
  photo_studio: {
    draw: function(renderer, time) {
      renderer.clear('#1a0a0a');
      // 暗房红色安全灯
      renderer.fillGradientRect(0, 0, 480, 320, '#2a0808', '#1a0505');
      const redGlow = Math.sin(time * 0.02) * 0.05 + 0.2;
      renderer.setAlpha(redGlow);
      renderer.fillCircle(400, 30, 15, '#ff2222');
      renderer.setAlpha(redGlow * 0.5);
      renderer.fillCircle(400, 30, 40, '#ff0000');
      renderer.resetAlpha();
      // 冲洗盘
      renderer.fillRect(100, 180, 120, 20, '#3a3a3a');
      renderer.strokeRect(100, 180, 120, 20, '#5a5a5a');
      // 药水效果
      renderer.setAlpha(0.3);
      for (let x = 105; x < 215; x += 3) {
        const wave = Math.sin(x * 0.1 + time * 0.05) * 2;
        renderer.fillRect(x, 185 + wave, 2, 10, '#8a4422');
      }
      renderer.resetAlpha();
      // 晾绳和照片
      renderer.ctx.strokeStyle = '#5a5a5a'; renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(30, 80); renderer.ctx.lineTo(450, 75); renderer.ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const px = 50 + i * 75;
        const py = 78 + Math.sin(i * 1.5) * 3;
        const show = (i + Math.floor(time * 0.005)) % 4 !== 0;
        if (show) {
          renderer.fillRect(px, py, 30, 40, '#e8d8c0');
          renderer.strokeRect(px, py, 30, 40, '#aaa088');
          renderer.setAlpha(0.3);
          renderer.fillRect(px + 4, py + 4, 22, 28, '#8a7a6a');
          renderer.resetAlpha();
        }
      }
      // 相机
      renderer.fillRect(300, 190, 40, 30, '#2a2a2a');
      renderer.strokeRect(300, 190, 40, 30, '#4a4a4a');
      renderer.fillCircle(320, 205, 8, '#1a1a1a');
      renderer.fillCircle(320, 205, 5, '#3a3a4a');
      renderer.setAlpha(0.5);
      renderer.fillCircle(320, 205, 2, '#6a6a8a');
      renderer.resetAlpha();
      // 底片条
      renderer.fillRect(50, 250, 200, 15, '#1a1a1a');
      for (let i = 0; i < 8; i++) {
        renderer.fillRect(55 + i * 24, 252, 18, 11, '#2a1a0a');
        renderer.strokeRect(55 + i * 24, 252, 18, 11, '#3a2a1a');
      }
    }
  },
  pawnshop_origin: {
    draw: function(renderer, time) {
      renderer.clear('#0a0810');
      renderer.fillGradientRect(0, 0, 480, 200, '#141020', '#0a0810');
      renderer.fillGradientRect(0, 200, 480, 120, '#161218', '#0e0a10');
      // 空荡的房间 - 简陋的墙壁
      for (let x = 0; x < 480; x += 60) {
        renderer.setAlpha(0.08);
        renderer.ctx.strokeStyle = '#3a2a2a'; renderer.ctx.lineWidth = 1;
        renderer.ctx.beginPath(); renderer.ctx.moveTo(x, 200); renderer.ctx.lineTo(x - 30, 320); renderer.ctx.stroke();
      }
      renderer.resetAlpha();
      // 一张简陋的柜台
      renderer.fillRect(200, 185, 160, 35, '#2a1a10');
      renderer.fillRect(200, 180, 160, 8, '#3a2a1a');
      renderer.strokeRect(200, 185, 160, 35, '#4a3a2a');
      // 一盏灯笼（微弱）
      renderer.fillRect(278, 100, 4, 40, '#5a4a3a');
      var lanternGlow = Math.sin(time * 0.03) * 0.1 + 0.3;
      renderer.setAlpha(lanternGlow);
      renderer.fillRect(270, 95, 20, 15, '#aa4422');
      renderer.setAlpha(lanternGlow * 0.5);
      renderer.fillCircle(280, 102, 20, '#ff660033');
      renderer.resetAlpha();
      // 一个沙漏（柜台上）
      renderer.fillRect(250, 176, 10, 4, '#aa8844');
      renderer.fillRect(252, 168, 6, 8, '#ffcc66');
      renderer.fillRect(253, 170, 4, 2, '#ffeeaa');
      renderer.fillRect(252, 174, 6, 4, '#ffcc66');
      // 蒙尘的地板
      renderer.setAlpha(0.05);
      for (let x = 0; x < 480; x += 20) {
        for (let y = 220; y < 320; y += 20) {
          if ((x + y) % 40 === 0) renderer.fillRect(x, y, 20, 20, '#4a4a3a');
        }
      }
      renderer.resetAlpha();
      // 窗户（黑夜）
      renderer.fillRect(60, 50, 50, 70, '#0a0a18');
      renderer.strokeRect(60, 50, 50, 70, '#3a3a4a');
      renderer.ctx.strokeStyle = '#3a3a4a'; renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(85, 50); renderer.ctx.lineTo(85, 120); renderer.ctx.stroke();
      renderer.ctx.beginPath(); renderer.ctx.moveTo(60, 85); renderer.ctx.lineTo(110, 85); renderer.ctx.stroke();
      // 微弱星光
      for (let i = 0; i < 5; i++) {
        renderer.setAlpha(0.3 + Math.sin(time * 0.04 + i * 2) * 0.2);
        renderer.fillRect(65 + i * 8, 55 + (i * 7) % 25, 1, 1, '#aaaacc');
      }
      renderer.resetAlpha();
    }
  },
  hong_kong_clock_tower: {
    draw: function(renderer, time) {
      renderer.clear('#0a1020');
      // 维多利亚港夜空
      renderer.fillGradientRect(0, 0, 480, 180, '#0a1030', '#0a0a20');
      // 星星
      for (let i = 0; i < 40; i++) {
        const sx = (i * 97 + 13) % 480;
        const sy = (i * 37 + 7) % 140;
        renderer.setAlpha(0.3 + Math.sin(time * 0.04 + i * 1.7) * 0.2);
        renderer.fillRect(sx, sy, 1, 1, '#ffffff');
      }
      renderer.resetAlpha();
      // 水面反光
      renderer.fillGradientRect(0, 180, 480, 140, '#0a0a1a', '#080818');
      renderer.setAlpha(0.15);
      for (let x = 0; x < 480; x += 3) {
        const wave = Math.sin(x * 0.04 + time * 0.02) * 3;
        renderer.fillRect(x, 185 + wave, 2, 1, '#4488cc');
      }
      renderer.resetAlpha();
      // 钟楼剪影
      renderer.fillRect(200, 60, 80, 180, '#0a0a15');
      renderer.fillRect(210, 40, 60, 20, '#0a0a15');
      renderer.fillRect(225, 25, 30, 15, '#0a0a15');
      // 大钟面
      renderer.setAlpha(0.7);
      renderer.fillCircle(240, 100, 30, '#1a1a2e');
      renderer.ctx.strokeStyle = '#aa8844'; renderer.ctx.lineWidth = 2;
      renderer.ctx.beginPath(); renderer.ctx.arc(240, 100, 30, 0, Math.PI * 2); renderer.ctx.stroke();
      // 刻度
      renderer.ctx.lineWidth = 1;
      for (let h = 0; h < 12; h++) {
        const angle = (h / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = 240 + Math.cos(angle) * 24;
        const y1 = 100 + Math.sin(angle) * 24;
        const x2 = 240 + Math.cos(angle) * 28;
        const y2 = 100 + Math.sin(angle) * 28;
        renderer.ctx.strokeStyle = '#886633';
        renderer.ctx.beginPath(); renderer.ctx.moveTo(x1, y1); renderer.ctx.lineTo(x2, y2); renderer.ctx.stroke();
      }
      // 指针 - 指向11:47
      const hourAngle = (11.78 / 12) * Math.PI * 2 - Math.PI / 2;
      const minAngle = (47 / 60) * Math.PI * 2 - Math.PI / 2 + time * 0.001;
      renderer.ctx.strokeStyle = '#ccaa44'; renderer.ctx.lineWidth = 2;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(240, 100);
      renderer.ctx.lineTo(240 + Math.cos(hourAngle) * 15, 100 + Math.sin(hourAngle) * 15); renderer.ctx.stroke();
      renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(240, 100);
      renderer.ctx.lineTo(240 + Math.cos(minAngle) * 22, 100 + Math.sin(minAngle) * 22); renderer.ctx.stroke();
      renderer.resetAlpha();
      // 钟摆（摆动）
      var pendAngle = Math.sin(time * 0.03) * 0.3;
      renderer.setAlpha(0.5);
      renderer.ctx.strokeStyle = '#886633'; renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(240, 130);
      renderer.ctx.lineTo(240 + Math.sin(pendAngle) * 40, 200); renderer.ctx.stroke();
      renderer.fillCircle(240 + Math.sin(pendAngle) * 40, 200, 5, '#aa8844');
      renderer.resetAlpha();
      // 远处灯火
      renderer.setAlpha(0.4);
      for (let i = 0; i < 15; i++) {
        const lx = (i * 31 + 5) % 480;
        const ly = 170 + (i % 3) * 4;
        const flicker = Math.sin(time * 0.1 + i * 2) > 0 ? 0.6 : 0.3;
        renderer.setAlpha(flicker);
        renderer.fillRect(lx, ly, 3, 2, '#ffcc44');
      }
      renderer.resetAlpha();
      // 帆布床（角落）
      renderer.setAlpha(0.4);
      renderer.fillRect(40, 220, 80, 20, '#4a3a2a');
      renderer.fillRect(40, 218, 80, 4, '#5a4a3a');
      renderer.resetAlpha();
    }
  },
  darkroom_1989: {
    draw: function(renderer, time) {
      renderer.clear('#1a0505');
      // 暗房红色环境
      renderer.fillGradientRect(0, 0, 480, 320, '#2a0808', '#1a0303');
      // 红色安全灯
      var redGlow = Math.sin(time * 0.015) * 0.08 + 0.25;
      renderer.setAlpha(redGlow);
      renderer.fillCircle(420, 25, 12, '#ff2222');
      renderer.setAlpha(redGlow * 0.4);
      renderer.fillCircle(420, 25, 35, '#ff0000');
      renderer.resetAlpha();
      // 放大机
      renderer.fillRect(50, 100, 30, 100, '#2a2a2a');
      renderer.fillRect(35, 100, 60, 8, '#3a3a3a');
      renderer.fillRect(55, 60, 20, 40, '#333333');
      renderer.fillRect(45, 55, 40, 8, '#444444');
      renderer.setAlpha(0.3);
      renderer.fillCircle(65, 75, 6, '#ff4422');
      renderer.resetAlpha();
      // 显影盘（三个）
      for (let i = 0; i < 3; i++) {
        const bx = 150 + i * 90;
        renderer.fillRect(bx, 200, 70, 15, '#3a3a3a');
        renderer.strokeRect(bx, 200, 70, 15, '#5a5a5a');
        // 药水波纹
        renderer.setAlpha(0.25);
        for (let x = bx + 5; x < bx + 65; x += 3) {
          const wave = Math.sin(x * 0.12 + time * 0.04 + i) * 2;
          renderer.fillRect(x, 203 + wave, 2, 8, i === 0 ? '#aa6622' : i === 1 ? '#666666' : '#334466');
        }
        renderer.resetAlpha();
      }
      // 底片条
      renderer.fillRect(160, 260, 180, 12, '#1a1a1a');
      for (let i = 0; i < 7; i++) {
        renderer.fillRect(165 + i * 24, 261, 18, 10, '#2a1a0a');
        renderer.strokeRect(165 + i * 24, 261, 18, 10, '#3a2a1a');
      }
      // 晾绳和照片
      renderer.ctx.strokeStyle = '#4a4a4a'; renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(20, 70); renderer.ctx.lineTo(460, 65); renderer.ctx.stroke();
      for (let i = 0; i < 5; i++) {
        const px = 40 + i * 90;
        const py = 68 + Math.sin(i * 1.3) * 2;
        var show = (i + Math.floor(time * 0.004)) % 3 !== 0;
        if (show) {
          renderer.fillRect(px, py, 25, 35, '#e0d0b8');
          renderer.strokeRect(px, py, 25, 35, '#998877');
          renderer.setAlpha(0.3);
          renderer.fillRect(px + 3, py + 3, 19, 25, '#7a6a5a');
          renderer.resetAlpha();
        }
      }
      // 铁盒子（桌上）
      renderer.fillRect(300, 180, 40, 20, '#4a4a4a');
      renderer.strokeRect(300, 180, 40, 20, '#6a6a6a');
      renderer.fillRect(315, 178, 10, 3, '#5a5a5a');
    }
  },
  post_office_2010: {
    draw: function(renderer, time) {
      renderer.clear('#1a1a18');
      // 阴天/雨天天空
      renderer.fillGradientRect(0, 0, 480, 150, '#3a3a3e', '#2a2a30');
      // 地面
      renderer.fillGradientRect(0, 200, 480, 120, '#2a2a1a', '#1a1a10');
      // 梧桐树
      renderer.fillRect(330, 80, 12, 140, '#4a3a1a');
      renderer.fillRect(326, 75, 20, 8, '#4a3a1a');
      // 树冠
      renderer.setAlpha(0.7);
      renderer.fillCircle(336, 50, 35, '#3a4a1a');
      renderer.fillCircle(320, 60, 28, '#4a5a2a');
      renderer.fillCircle(352, 58, 25, '#3a4a1a');
      renderer.resetAlpha();
      // 落叶
      for (let i = 0; i < 8; i++) {
        const lx = 280 + (i * 37 + Math.sin(time * 0.02 + i) * 20) % 120;
        const ly = (i * 43 + time * 0.3) % 200 + 60;
        const rot = Math.sin(time * 0.03 + i * 2) * 0.5;
        renderer.setAlpha(0.5);
        renderer.fillRect(lx + rot * 3, ly, 4 + rot, 3, '#8a6a1a');
        renderer.resetAlpha();
      }
      // 邮局建筑（背景）
      renderer.fillRect(30, 80, 200, 140, '#3a3028');
      renderer.fillRect(30, 75, 200, 8, '#4a4038');
      renderer.strokeRect(30, 80, 200, 140, '#5a4a38');
      // 窗户
      renderer.fillRect(50, 100, 40, 50, '#2a2a20');
      renderer.strokeRect(50, 100, 40, 50, '#4a4a38');
      renderer.ctx.strokeStyle = '#4a4a38'; renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath(); renderer.ctx.moveTo(70, 100); renderer.ctx.lineTo(70, 150); renderer.ctx.stroke();
      renderer.ctx.beginPath(); renderer.ctx.moveTo(50, 125); renderer.ctx.lineTo(90, 125); renderer.ctx.stroke();
      renderer.fillRect(120, 100, 40, 50, '#2a2a20');
      renderer.strokeRect(120, 100, 40, 50, '#4a4a38');
      // 后门
      renderer.fillRect(180, 110, 35, 110, '#2a1a10');
      renderer.strokeRect(180, 110, 35, 110, '#4a3a2a');
      renderer.fillCircle(208, 165, 3, '#aa8844');
      // 邮筒（红色）
      renderer.fillRect(260, 160, 30, 50, '#aa3322');
      renderer.fillRect(255, 155, 40, 8, '#882211');
      renderer.fillRect(265, 175, 20, 4, '#661100');
      renderer.strokeRect(260, 160, 30, 50, '#cc4433');
      // 褪色标语
      renderer.setAlpha(0.3);
      renderer.drawText('每一封信都值得被送达', 275, 212, '#887766', 7, 'center');
      renderer.resetAlpha();
      // 雨
      renderer.setAlpha(0.2);
      for (let i = 0; i < 25; i++) {
        const rx = (i * 67 + time * 2) % 480;
        const ry = (i * 43 + time * 3) % 320;
        renderer.fillRect(rx, ry, 1, 6, '#8899aa');
      }
      renderer.resetAlpha();
      // 水坑反光
      renderer.setAlpha(0.1);
      for (let i = 0; i < 5; i++) {
        const px = 50 + i * 90;
        renderer.fillCircle(px, 280 + (i % 2) * 10, 15, '#5566aa');
      }
      renderer.resetAlpha();
    }
  }
};

// ---- 蝴蝶效应数据表 ----
const BUTTERFLY_EFFECTS = {
  lin_blocked: {
    triggerRipple: 'chen_doctor',
    targetClient: 'linxiaojie',
    type: 'block_and_replace',
    butterflyDialogs: 'greeting_butterfly',
    bonusTime: 15
  }
};

// ---- 隐藏事件数据表 ----
const HIDDEN_EVENTS = {
  // 时先生普通形态（首次见面）
  shixiansheng_first: {
    id: 'shixiansheng_first',
    triggerType: 'shop_enter',
    conditions: {
      purchasedItems: ['restore_mirror'],
      metaEndingNotSeen: { ending_stay: true, ending_close: true }
    },
    dialogs: null, // 使用 STORIES.shixiansheng.greeting_first
    storyKey: 'shixiansheng',
    greetingKey: 'greeting_first',
    rewards: { collectible: 'broken_glass', time: 10 }
  },
  // 时先生缺席形态
  shixiansheng_gone: {
    id: 'shixiansheng_gone',
    triggerType: 'shop_enter',
    conditions: {
      purchasedItems: ['restore_mirror'],
      metaEndingSeen: { ending_close: true },
      metaEndingNotSeen: { ending_stay: true }
    },
    dialogs: null,
    storyKey: 'shixiansheng',
    greetingKey: 'greeting_gone',
    rewards: { time: 5 }
  },
  // 林远幽灵（10分钟不操作）
  linyuan_ghost: {
    id: 'linyuan_ghost',
    triggerType: 'idle_in_shop',
    conditions: {
      ripples: ['zhou_burn'],
      minIdleFrames: 36000,
      purchasedItems: ['restore_mirror']
    },
    dialogs: [
      { speaker: '旁白', speakerColor: '#666688', text: '铜镜的表面起了一层薄雾。你感到空气变得冰冷。' },
      { speaker: '旁白', speakerColor: '#666688', text: '一个模糊的人影从镜面深处浮现——不是时先生。是一个年轻人，穿着褪色的外套。' },
      { speaker: '???', speakerColor: '#667788', text: '……信。我的信……你烧了它。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '你是……那封信的主人？' },
      { speaker: '林远', speakerColor: '#667788', text: '我叫林远。我写了那封信给我女儿。我知道她收不到了。' },
      { speaker: '林远', speakerColor: '#667788', text: '但是我想让你知道——即使被烧掉，那些字还活着。它们在灰烬里。' },
      { speaker: '林远', speakerColor: '#667788', text: '（他的手指缓缓碰了碰柜台，那里出现了一枚铜戒指）' },
      { speaker: '林远', speakerColor: '#667788', text: '这是我和她母亲的结婚戒指。帮我保管。' },
      { speaker: '旁白', speakerColor: '#888888', text: '人影消散了。铜镜恢复了平静。但那枚戒指还在柜台上，微微发着温热。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得收藏品：铜戒指。获得时间碎片 ×15。' },
    ],
    rewards: { collectible: 'copper_ring', time: 15 }
  },
  // 银簪揭示（林小姐母亲的信物）
  silver_hairpin_reveal: {
    id: 'silver_hairpin_reveal',
    triggerType: 'shop_enter',
    conditions: {
      metaRipplesSeen: ['chen_doctor', 'lin_conservative'],
      completedClients: ['linxiaojie']
    },
    dialogs: [
      { speaker: '旁白', speakerColor: '#888888', text: '你在柜台抽屉深处发现了一根银簪。不知道是什么时候出现在那里的。' },
      { speaker: '旁白', speakerColor: '#888888', text: '银簪上刻着细小的梅花纹。拿起它的瞬间，一段画面涌入脑海——' },
      { speaker: '旁白', speakerColor: '#cc8899', text: '一位面容温柔的女人正在给小女孩别头发。"小玲，这是妈妈的嫁妆。"' },
      { speaker: '林母', speakerColor: '#cc8899', text: '等你长大了，妈妈就把它送给你。' },
      { speaker: '小玲', speakerColor: '#aa4466', text: '妈妈会一直在我身边对不对？' },
      { speaker: '林母', speakerColor: '#cc8899', text: '（微笑）不管妈妈在不在，这根银簪都会在。它记得我们在一起的每一天。' },
      { speaker: '旁白', speakerColor: '#888888', text: '画面消散了。你低头看着手中的银簪——陈伯选择学医的涟漪救活了林小姐的母亲，' },
      { speaker: '旁白', speakerColor: '#888888', text: '而保守治疗的选择让母女有了最后的时光。两条涟漪交汇在这根银簪上。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得收藏品：银簪。获得时间碎片 ×10。' },
    ],
    rewards: { collectible: 'silver_hairpin', time: 10 }
  },
  // 钟楼幽灵事件
  ghost_clock_tower: {
    id: 'ghost_clock_tower',
    triggerType: 'shop_enter',
    conditions: {
      ripples: ['zhou_burn', 'heng_clock_stop']
    },
    dialogs: [
      { speaker: '旁白', speakerColor: '#888888', text: '你听到了什么——不是来自窗外，而是来自墙壁深处。' },
      { speaker: '旁白', speakerColor: '#888888', text: '一声沉闷的钟响。然后是第二声。然后寂静。' },
      { speaker: '旁白', speakerColor: '#888888', text: '烧毁的信件和停下的钟——两种沉默在时间中碰撞，产生了短暂的回声。' },
      { speaker: '旁白', speakerColor: '#668888', text: '你突然理解了：有些东西被烧掉，有些东西被停下，但它们的痕迹不会消失。' },
      { speaker: '旁白', speakerColor: '#668888', text: '它们变成了幽灵般的回响，在每一个安静的角落等待被听到。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得时间碎片 ×20。' },
    ],
    rewards: { time: 20 }
  },
  // 照片秘密文字
  photo_mystery_text: {
    id: 'photo_mystery_text',
    triggerType: 'shop_enter',
    conditions: {
      ripples: ['zhou_send', 'wu_develop']
    },
    dialogs: [
      { speaker: '旁白', speakerColor: '#888888', text: '柜台上出现了一张泛黄的照片。你确定之前没有放过这东西。' },
      { speaker: '旁白', speakerColor: '#888888', text: '照片上是一个年轻女人，站在一家小书店门口。她在微笑。' },
      { speaker: '旁白', speakerColor: '#888888', text: '翻过来，背面写着一行字："爸，信收到了。谢谢那个邮递员。"' },
      { speaker: '旁白', speakerColor: '#7a7a8a', text: '再下面还有一行更小的字："老吴，谢谢你替我留住了妈妈的样子。"' },
      { speaker: '旁白', speakerColor: '#888888', text: '寄出的信和冲洗的底片——两条涟漪在同一个人身上交汇了。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得时间碎片 ×15。' },
    ],
    rewards: { time: 15 }
  },
  // 铜镜缺席彩蛋（空闲触发）
  mirror_click_gone: {
    id: 'mirror_click_gone',
    triggerType: 'idle_in_shop',
    conditions: {
      minIdleFrames: 6000,
      purchasedItems: ['restore_mirror'],
      metaEndingSeen: { ending_close: true },
      metaEndingNotSeen: { ending_stay: true }
    },
    dialogs: [
      { speaker: '旁白', speakerColor: '#888888', text: '你注意到铜镜的表面微微泛起波纹，像水面被投入了一粒石子。' },
      { speaker: '旁白', speakerColor: '#888888', text: '镜中闪过一行字："谢谢你，让我终于可以停止等待。"' },
      { speaker: '旁白', speakerColor: '#888888', text: '然后镜面恢复了平静。但你觉得铜镜比之前更亮了一些。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得时间碎片 ×5。' },
    ],
    rewards: { time: 5 }
  },
  // 阿蘅二次来访
  aheng_second_visit: {
    id: 'aheng_second_visit',
    triggerType: 'shop_enter',
    conditions: {
      ripples: ['heng_clock_stop'],
      metaRipplesSeen: ['wu_destroy'],
      metaHiddenEventSeen: ['linyuan_ghost']
    },
    dialogs: [
      { speaker: '旁白', speakerColor: '#888888', text: '门铃响了。一个白发女孩走进来——是阿蘅。但她的表情和上次不同。' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '掌柜的，你的铜镜……我刚才路过的时候，看到里面有个人。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '铜镜？你看到了什么？' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '一个穿军装的年轻人。他的手里攥着一枚铜戒指。' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '他看着我，好像在说什么。但镜子太模糊了，我听不清。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（铜镜里的身影……不是时先生。是另一个时间线上的某个人。）' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '他的眼睛……跟我祖父一样。左眼像琥珀。' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '掌柜的，你说……不同的选择，会不会让完全不同的人出现在同一面镜子里？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '也许吧。铜镜连接着所有的时间线。你看到的，可能是另一个"如果"里的某个人。' },
      { speaker: '阿蘅', speakerColor: '#ba6a3a', text: '（轻声）那面镜子……能替我转告他一句话吗？就说——"钟停了，但红绳还在。"' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得时间碎片 ×15。' },
    ],
    rewards: { time: 15 }
  },
  // 老吴二次来访
  laowu_second_visit: {
    id: 'laowu_second_visit',
    triggerType: 'shop_enter',
    conditions: {
      ripples: ['wu_develop'],
      metaRipplesSeen: ['heng_clock_run'],
      metaHiddenEventSeen: ['linyuan_ghost']
    },
    dialogs: [
      { speaker: '旁白', speakerColor: '#888888', text: '老吴又来了。这次他没有抱着铁盒子——他手里拿着一张照片。' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '掌柜的，你看。（他把照片轻轻放在柜台上）' },
      { speaker: '旁白', speakerColor: '#888888', text: '照片上是一个十七八岁的白发女孩。她站在照相馆门口，手腕上缠着红绳，对着镜头微微笑着。' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '上个月，她来我店里。说想拍一张照片寄给远方的人。' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '我问她叫什么。她说叫"蘅"。问她寄给谁。她说——"寄给一座停不下来的钟"。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（阿蘅……她去了老吴的照相馆？两个时间线上的人，在铜镜之外相遇了。）' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '我给她拍了照。然后我做了一件三十五年来第一次做的事——' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '我把她的照片放进了那个空白相框里。橱窗里那个。' },
      { speaker: '老吴', speakerColor: '#7a7a8a', text: '不知道为什么。看到她笑的样子，我突然觉得——那个框不该空着了。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得时间碎片 ×15。' },
    ],
    rewards: { time: 15 }
  },
  // 林小姐二次来访
  lin_second_visit: {
    id: 'lin_second_visit',
    triggerType: 'shop_enter',
    conditions: {
      metaRipplesSeen: ['chen_doctor', 'lin_conservative'],
      metaAnyRippleSeen: [
        ['heng_clock_run', 'heng_clock_stop'],
        ['wu_develop', 'wu_destroy']
      ]
    },
    dialogs: [
      { speaker: '旁白', speakerColor: '#888888', text: '门铃响了两下。林小姐走了进来——但她看起来比上次年轻了许多。不，不是年轻，是释然。' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '掌柜的，我带了两样东西来给你看。' },
      { speaker: '旁白', speakerColor: '#888888', text: '她小心翼翼地从包里取出一根银簪和一本手抄诗集。' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '银簪是妈妈的。诗集是她最后三个月教我抄的。每一首都是她念，我写。' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '我一直以为这些是悲伤的东西。但最近我做了一个梦——' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '梦里妈妈在另一个时间线上活了下来。她在晒太阳，读着同一本诗集。还是那个笑容。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '（在陈伯选择学医的那条涟漪里……林小姐的母亲确实活了下来。这个梦，不是梦。）' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '我不知道那是不是真的。但我醒来之后，第一次觉得——妈妈在某个地方过得很好。' },
      { speaker: '林小姐', speakerColor: '#aa4466', text: '所以我想把诗集留在这里。也许其他来到当铺的人，需要读一读这些诗。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '我会替你保管的。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得时间碎片 ×20。' },
    ],
    rewards: { time: 20 }
  },
  // 时间旅人
  time_traveler: {
    id: 'time_traveler',
    triggerType: 'shop_enter',
    conditions: {
      metaTrueEndingSeen: true,
      metaMaxDays: 30,
      metaAllCollectibles: true
    },
    dialogs: [
      { speaker: '旁白', speakerColor: '#888888', text: '沙漏底座上忽然发出了一道光——你确信沙漏早已碎了，但那道光就是从碎片之间透出来的。' },
      { speaker: '旁白', speakerColor: '#aa88ff', text: '光芒中，一个人影逐渐凝聚。' },
      { speaker: '旁白', speakerColor: '#aa88ff', text: '他穿着一件军装绿的上衣，牛仔蓝的裤子，脚上是一双运动鞋。头发一半白一半黑。' },
      { speaker: '旁白', speakerColor: '#aa88ff', text: '他的左眼映着一个燃烧的暗房，右眼映着一棵落叶的梧桐。' },
      { speaker: '???', speakerColor: '#ff8866', text: '你认识我吗？' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '不……不认识。但你让我想起了所有人。' },
      { speaker: '时间旅人', speakerColor: '#ff8866', text: '（微笑）因为我就是所有人。我是每一个岔路口没有被走过的那条路。' },
      { speaker: '时间旅人', speakerColor: '#ff8866', text: '少年选了从军，我就是那个学医的影子。底片被烧了，我就是那张冲洗出来的照片。' },
      { speaker: '时间旅人', speakerColor: '#ff8866', text: '钟走到了尽头，我就是被修好的那座钟。信寄出去了，我就是那堆灰烬。' },
      { speaker: '时间旅人', speakerColor: '#ff8866', text: '我是所有未被选择的选择的总和。第八粒沙——从未存在过的那一粒。' },
      { speaker: '当铺老板', speakerColor: '#8866aa', text: '你来这里……是要告诉我什么？' },
      { speaker: '时间旅人', speakerColor: '#ff8866', text: '告诉你——不存在错误的选择。因为每一个被放弃的可能性，都变成了我。' },
      { speaker: '时间旅人', speakerColor: '#ff8866', text: '而我活得很好。在所有你没去过的路上，风景都很好看。' },
      { speaker: '时间旅人', speakerColor: '#ff8866', text: '（他向门口走去）该走了。他们都在等我——在每一个"如果"的尽头。' },
      { speaker: '旁白', speakerColor: '#888888', text: '他推开门。你看到门外站着许多人的剪影——少年、女儿、邮差、守钟人、照相师、老人、掌柜。' },
      { speaker: '旁白', speakerColor: '#888888', text: '他们各自走向各自的方向。而那道光，缓缓收拢，回到了沙漏碎片之间。' },
      { speaker: '旁白', speakerColor: '#ffcc44', text: '获得时间碎片 ×30。' },
    ],
    rewards: { time: 30 },
    triggersEnding: 'ending_eighth_sand'
  }
};

// ---- 收藏品数据表 ----
const COLLECTIBLES = {
  silver_hairpin: {
    id: 'silver_hairpin',
    name: '银簪',
    description: '刻着梅花纹的银簪，林小姐母亲的嫁妆。两条时间涟漪在它身上交汇。'
  },
  copper_ring: {
    id: 'copper_ring',
    name: '铜戒指',
    description: '林远和妻子的结婚戒指。从铜镜深处被带出来，微微发着温热。'
  },
  broken_glass: {
    id: 'broken_glass',
    name: '碎沙漏玻璃',
    description: '沙漏上碎下来的一片玻璃。时先生说它有特殊的意义。'
  },
  ash_fragment: {
    id: 'ash_fragment',
    name: '灰烬残片',
    description: '打碎沙漏后残留的碎片。七粒沙的光芒还凝固在上面。'
  },
  red_string: {
    id: 'red_string',
    name: '旧红绳',
    description: '时先生束发用的红绳。他说它会提醒你：时间不是用来拥有的，是用来守护的。'
  }
};

// ---- 共振涟漪数据 ----
const RESONANCE_EFFECTS = {
  doctors_letter: {
    name: '「医者的信」',
    description: '一位医者的选择、一段温暖的陪伴、一封使命必达的信——三条涟漪共振了。',
    requiredRipples: ['chen_doctor', 'lin_conservative', 'zhou_send'],
    bonusTime: 25
  },
  silent_tower: {
    name: '「沉默的钟楼」',
    description: '从军的沉默、停摆的钟声、销毁的影像——三种失去在时间中回响。',
    requiredRipples: ['chen_army', 'heng_clock_stop', 'wu_destroy'],
    bonusTime: 25
  },
  ashes_and_seconds: {
    name: '「灰烬中的秒针」',
    description: '烧毁的信件、放手一搏的手术、走到尽头的钟——三段不甘在灰烬中闪光。',
    requiredRipples: ['zhou_burn', 'lin_surgery', 'heng_clock_run'],
    bonusTime: 30
  },
  reincarnation_eye: {
    name: '「轮回之眼」',
    description: '接过沙漏的人见证了轮回——在任意结局之后，时间之眼睁开。',
    requiredRipples: ['ripple_accept'],
    additionalCondition: { type: 'anyEndingSeen' },
    bonusTime: 30
  },
  mirror_ring: {
    name: '「镜中戒指」',
    description: '烧毁的信引来了幽灵，幽灵留下了戒指——铜镜连接生与死的通道。',
    requiredRipples: ['zhou_burn'],
    additionalCondition: { type: 'hiddenEventTriggered', event: 'linyuan_ghost' },
    bonusTime: 25,
    collectibleReward: 'copper_ring'
  },
  three_generations: {
    name: '「三代人的信物」',
    description: '医者的选择、最后的陪伴、冲洗的底片、停摆的钟——三代人的遗物在此汇聚。',
    requiredRipples: ['lin_conservative', 'wu_develop', 'heng_clock_stop'],
    additionalCondition: { type: 'hasCollectible', item: 'silver_hairpin' },
    bonusTime: 35,
    collectibleReward: 'red_string'
  }
};

// ---- 成就定义 ----
const ACHIEVEMENTS = {
  // === 初识当铺 ===
  first_trade: {
    id: 'first_trade', name: '第一笔生意', category: 'basics',
    description: '完成第一次时间交易', rarity: 1, hidden: false,
    reward: { type: 'time', amount: 10 }
  },
  first_upgrade: {
    id: 'first_upgrade', name: '修缮之始', category: 'basics',
    description: '购买第一件当铺物品', rarity: 1, hidden: false,
    reward: { type: 'time', amount: 5 }
  },
  doorbell: {
    id: 'doorbell', name: '叮——', category: 'basics',
    description: '修复门铃', rarity: 1, hidden: false, reward: null
  },
  survive_3: {
    id: 'survive_3', name: '三日为期', category: 'basics',
    description: '存活超过3天', rarity: 1, hidden: false,
    reward: { type: 'time', amount: 10 }
  },
  apprentice: {
    id: 'apprentice', name: '当铺学徒', category: 'basics',
    description: '购买所有当铺升级', rarity: 3, hidden: false,
    reward: { type: 'title', value: '学徒掌柜' }
  },

  // === 蝴蝶之翼 ===
  first_ripple: {
    id: 'first_ripple', name: '涟漪初现', category: 'butterfly',
    description: '触发第一次蝴蝶效应', rarity: 2, hidden: false,
    reward: { type: 'time', amount: 15 }
  },
  both_paths: {
    id: 'both_paths', name: '命运的岔路', category: 'butterfly',
    description: '在不同周目中为陈伯做出不同选择', rarity: 3, hidden: false,
    reward: { type: 'title', value: '命运编织者' }
  },
  ghost_client: {
    id: 'ghost_client', name: '消失的客人', category: 'butterfly',
    description: '见证蝴蝶效应改变林小姐的命运', rarity: 2, hidden: false,
    reward: { type: 'sprite', value: 'ghost' }
  },
  resonance: {
    id: 'resonance', name: '共振', category: 'butterfly',
    description: '同时存在两个以上涟漪', rarity: 3, hidden: false,
    reward: { type: 'time', amount: 20 }
  },
  hidden_link: {
    id: 'hidden_link', name: '看不见的线', category: 'butterfly',
    description: '发现陈伯和林小姐之间的联系', rarity: 2, hidden: false,
    reward: { type: 'clue', value: '因果之线' }
  },
  all_ripples: {
    id: 'all_ripples', name: '涟漪图鉴', category: 'butterfly',
    description: '在所有周目中见证全部涟漪', rarity: 5, hidden: false,
    reward: { type: 'title', value: '时间观察者' }
  },
  first_resonance: {
    id: 'first_resonance', name: '共鸣', category: 'butterfly',
    description: '触发第一次共振涟漪', rarity: 3, hidden: false,
    reward: { type: 'time', amount: 15 }
  },
  all_resonances: {
    id: 'all_resonances', name: '交响曲', category: 'butterfly',
    description: '在所有周目中触发全部共振涟漪', rarity: 5, hidden: false,
    reward: { type: 'title', value: '时间指挥家' }
  },
  six_connections: {
    id: 'six_connections', name: '六度分隔', category: 'butterfly',
    description: '完成全部六位客人的故事', rarity: 4, hidden: false,
    reward: { type: 'title', value: '命运织网者' }
  },

  // === 记忆深处 ===
  memory_1: {
    id: 'memory_1', name: '碎片·雨中', category: 'story',
    description: '发现第一块记忆碎片', rarity: 2, hidden: false,
    reward: { type: 'time', amount: 10 }
  },
  memory_2: {
    id: 'memory_2', name: '碎片·承诺', category: 'story',
    description: '发现第二块记忆碎片', rarity: 2, hidden: false,
    reward: { type: 'time', amount: 10 }
  },
  memory_3: {
    id: 'memory_3', name: '碎片·代价', category: 'story',
    description: '发现第三块记忆碎片', rarity: 2, hidden: false,
    reward: { type: 'time', amount: 15 }
  },
  memory_4: {
    id: 'memory_4', name: '碎片·字迹', category: 'story',
    description: '发现第四块记忆碎片', rarity: 2, hidden: false,
    reward: { type: 'time', amount: 10 }
  },
  memory_5: {
    id: 'memory_5', name: '碎片·停摆', category: 'story',
    description: '发现第五块记忆碎片', rarity: 2, hidden: false,
    reward: { type: 'time', amount: 10 }
  },
  memory_6: {
    id: 'memory_6', name: '碎片·影像', category: 'story',
    description: '发现第六块记忆碎片', rarity: 3, hidden: false,
    reward: { type: 'time', amount: 15 }
  },
  who_am_i: {
    id: 'who_am_i', name: '我是谁', category: 'story',
    description: '收集全部记忆碎片', rarity: 4, hidden: false,
    reward: { type: 'title', value: '记忆碎片' }
  },
  truth_revealed: {
    id: 'truth_revealed', name: '真相大白', category: 'story',
    description: '完成神秘老人的故事', rarity: 4, hidden: false,
    reward: { type: 'sprite', value: 'ghost' }
  },
  mirror_self: {
    id: 'mirror_self', name: '镜中人', category: 'story',
    description: '在镜中当铺看到过去的自己', rarity: 3, hidden: false,
    reward: { type: 'title', value: '镜中客' }
  },

  // === 抉择之重 ===
  healer_heart: {
    id: 'healer_heart', name: '医者仁心', category: 'choices',
    description: '帮助陈伯选择学医之路', rarity: 2, hidden: false,
    reward: { type: 'sprite', value: 'chenbo_doctor' }
  },
  iron_heart: {
    id: 'iron_heart', name: '铁血丹心', category: 'choices',
    description: '帮助陈伯选择从军之路', rarity: 2, hidden: false,
    reward: { type: 'sprite', value: 'chenbo_army' }
  },
  last_farewell: {
    id: 'last_farewell', name: '最后的告别', category: 'choices',
    description: '帮助林小姐选择保守治疗', rarity: 2, hidden: false,
    reward: null
  },
  last_gamble: {
    id: 'last_gamble', name: '放手一搏', category: 'choices',
    description: '帮助林小姐选择手术', rarity: 2, hidden: false,
    reward: null
  },
  letter_delivered: {
    id: 'letter_delivered', name: '使命必达', category: 'choices',
    description: '帮助小周选择寄出信件', rarity: 2, hidden: false,
    reward: null
  },
  letter_burned: {
    id: 'letter_burned', name: '付之一炬', category: 'choices',
    description: '帮助小周选择烧毁信件', rarity: 2, hidden: false,
    reward: null
  },
  clock_runs: {
    id: 'clock_runs', name: '最后的钟声', category: 'choices',
    description: '帮助阿蘅选择让钟继续走', rarity: 2, hidden: false,
    reward: null
  },
  clock_stops: {
    id: 'clock_stops', name: '沉默之声', category: 'choices',
    description: '帮助阿蘅选择让钟停下来', rarity: 2, hidden: false,
    reward: null
  },
  photo_developed: {
    id: 'photo_developed', name: '重见天日', category: 'choices',
    description: '帮助老吴选择冲洗底片', rarity: 2, hidden: false,
    reward: null
  },
  photo_destroyed: {
    id: 'photo_destroyed', name: '心中的影像', category: 'choices',
    description: '帮助老吴选择销毁底片', rarity: 2, hidden: false,
    reward: null
  },

  // === 当铺主人 ===
  time_rich: {
    id: 'time_rich', name: '时间富翁', category: 'manage',
    description: '持有超过200时间碎片', rarity: 3, hidden: false,
    reward: { type: 'title', value: '时间富翁' }
  },
  frugal: {
    id: 'frugal', name: '精打细算', category: 'manage',
    description: '在时间碎片低于20时购买升级', rarity: 2, hidden: false,
    reward: { type: 'time', amount: 10 }
  },
  perfect_run: {
    id: 'perfect_run', name: '完美经营', category: 'manage',
    description: '每天都有所行动地达到结局', rarity: 4, hidden: false,
    reward: { type: 'title', value: '完美掌柜' }
  },
  day_seven: {
    id: 'day_seven', name: '一周之约', category: 'manage',
    description: '经营当铺满7天', rarity: 2, hidden: false,
    reward: { type: 'time', amount: 15 }
  },
  miser: {
    id: 'miser', name: '守财奴', category: 'manage',
    description: '不购买任何升级完成游戏', rarity: 3, hidden: false,
    reward: { type: 'title', value: '守财奴' }
  },

  // === 结局收藏 ===
  ending_dawn: {
    id: 'ending_dawn', name: '晨光', category: 'endings',
    description: '获得"关闭当铺"结局', rarity: 3, hidden: false,
    reward: { type: 'theme', value: '晨光' }
  },
  ending_eternal: {
    id: 'ending_eternal', name: '永恒', category: 'endings',
    description: '获得"继续经营"结局', rarity: 3, hidden: false,
    reward: { type: 'theme', value: '永恒' }
  },
  ending_timeout: {
    id: 'ending_timeout', name: '沙尽', category: 'endings',
    description: '时间耗尽', rarity: 2, hidden: false, reward: null
  },
  ending_loop_ach: {
    id: 'ending_loop_ach', name: '闭环', category: 'endings',
    description: '发现隐藏结局——五条时间线的交汇', rarity: 5, hidden: true,
    revealedDesc: '集齐特定五个涟漪后在神秘老人的记忆中找到第三条路',
    reward: { type: 'title', value: '时间编织者' }
  },
  triple_gate: {
    id: 'triple_gate', name: '三重门', category: 'endings',
    description: '见证全部三种结局', rarity: 5, hidden: false,
    reward: { type: 'title', value: '时间旅人' }
  },
  quad_gate: {
    id: 'quad_gate', name: '四重门', category: 'endings',
    description: '见证全部四种结局（含隐藏结局）', rarity: 5, hidden: true,
    revealedDesc: '达成全部四个结局：晨光、永恒、沙尽、闭环',
    reward: { type: 'title', value: '超越者' }
  },
  loop_person: {
    id: 'loop_person', name: '轮回者', category: 'endings',
    description: '开始新周目+', rarity: 3, hidden: false,
    reward: { type: 'time', amount: 25 }
  },

  // === 隐藏成就 ===
  waiting_one: {
    id: 'waiting_one', name: '等待的人', category: 'hidden',
    description: '在当铺中静静等待', rarity: 3, hidden: true,
    revealedDesc: '在当铺里什么都不做地等待5分钟',
    reward: { type: 'time', amount: 5 }
  },
  fathers_shadow: {
    id: 'fathers_shadow', name: '父亲的背影', category: 'hidden',
    description: '在某个选择面前犹豫不决', rarity: 4, hidden: true,
    revealedDesc: '在陈伯的记忆中犹豫超过30秒',
    reward: { type: 'sprite', value: 'old_father' }
  },
  poet: {
    id: 'poet', name: '诗人', category: 'hidden',
    description: '在某段记忆中久久驻足', rarity: 3, hidden: true,
    revealedDesc: '在林小姐的记忆中停留超过30秒',
    reward: { type: 'title', value: '时间诗人' }
  },
  rainy_visitor: {
    id: 'rainy_visitor', name: '雨天来客', category: 'hidden',
    description: '在特别的时候造访当铺', rarity: 2, hidden: true,
    revealedDesc: '在"雨天"（特定时段）打开游戏',
    reward: { type: 'time', amount: 8 }
  },
  no_regret: {
    id: 'no_regret', name: '无悔者', category: 'hidden',
    description: '以特别的方式完成一次旅程', rarity: 4, hidden: true,
    revealedDesc: '从未读档完成游戏',
    reward: { type: 'title', value: '无悔者' }
  },
  clutch: {
    id: 'clutch', name: '极限生存', category: 'hidden',
    description: '在最后关头做出抉择', rarity: 4, hidden: true,
    revealedDesc: '时间碎片低于10时完成最终选择',
    reward: { type: 'time', amount: 30 }
  },

  // === 时先生相关 ===
  previous_owner: {
    id: 'previous_owner', name: '前任掌柜', category: 'story',
    description: '完成时先生的故事', rarity: 5, hidden: false,
    reward: { type: 'title', value: '时间继承者' }
  },
  accept_hourglass: {
    id: 'accept_hourglass', name: '接过沙漏', category: 'choices',
    description: '选择接过时先生的沙漏', rarity: 3, hidden: false,
    reward: null
  },
  break_hourglass: {
    id: 'break_hourglass', name: '碎沙成尘', category: 'choices',
    description: '选择打碎时先生的沙漏', rarity: 3, hidden: false,
    reward: null
  },
  mirror_ghost: {
    id: 'mirror_ghost', name: '铜镜中的访客', category: 'hidden',
    description: '在铜镜中遇到意外的来客', rarity: 4, hidden: true,
    revealedDesc: '触发林远幽灵事件',
    reward: { type: 'time', amount: 15 }
  },
  mothers_memento: {
    id: 'mothers_memento', name: '母亲的信物', category: 'story',
    description: '找到林小姐母亲留下的信物', rarity: 3, hidden: false,
    reward: { type: 'time', amount: 10 }
  },
  patient_ghost: {
    id: 'patient_ghost', name: '镜中等待', category: 'hidden',
    description: '以极大的耐心等来了某人', rarity: 4, hidden: true,
    revealedDesc: '在铜镜前静待10分钟触发林远幽灵',
    reward: { type: 'time', amount: 10 }
  },
  all_collectibles: {
    id: 'all_collectibles', name: '拾遗者', category: 'hidden',
    description: '收集了所有散落在时间中的信物', rarity: 5, hidden: true,
    revealedDesc: '收集全部5件收藏品',
    reward: { type: 'title', value: '拾遗者' }
  },
  seventh_sand: {
    id: 'seventh_sand', name: '第七粒沙', category: 'endings',
    description: '到达一切故事的终点', rarity: 5, hidden: true,
    revealedDesc: '达成真结局「第七粒沙」',
    reward: { type: 'title', value: '第七粒沙' }
  },
  five_gates: {
    id: 'five_gates', name: '五重门', category: 'endings',
    description: '见证所有可能的结局', rarity: 5, hidden: true,
    revealedDesc: '达成全部五种结局',
    reward: { type: 'title', value: '万象归一' }
  },
  seven_connections: {
    id: 'seven_connections', name: '七度分隔', category: 'butterfly',
    description: '完成全部七位客人的故事', rarity: 4, hidden: false,
    reward: { type: 'title', value: '全知者' }
  },
  midnight_ghost: {
    id: 'midnight_ghost', name: '午夜钟楼', category: 'hidden',
    description: '在沉默中听到了来自远方的钟声', rarity: 4, hidden: true,
    revealedDesc: '触发钟楼幽灵事件',
    reward: { type: 'time', amount: 20 }
  },
  photo_secret: {
    id: 'photo_secret', name: '照片背后', category: 'hidden',
    description: '发现照片背面的秘密', rarity: 3, hidden: true,
    revealedDesc: '触发照片秘密事件',
    reward: { type: 'time', amount: 15 }
  },

  // === 二次来访 + 时间旅人 ===
  eighth_sand: {
    id: 'eighth_sand', name: '第八粒沙', category: 'endings',
    description: '遇见了所有未被选择的选择', rarity: 5, hidden: true,
    revealedDesc: '触发时间旅人事件，达成隐藏终章',
    reward: { type: 'title', value: '第八粒沙' }
  },
  six_gates: {
    id: 'six_gates', name: '六重门', category: 'endings',
    description: '六种结局全部达成', rarity: 5, hidden: true,
    revealedDesc: '晨光、永恒、沙尽、闭环、第七粒沙、第八粒沙',
    reward: { type: 'title', value: '时间终结者' }
  },
  lin_return: {
    id: 'lin_return', name: '诗集', category: 'hidden',
    description: '林小姐再次来访', rarity: 4, hidden: true,
    revealedDesc: '触发林小姐二次来访隐藏事件',
    reward: { type: 'time', amount: 20 }
  },
  aheng_return: {
    id: 'aheng_return', name: '镜中军装', category: 'hidden',
    description: '阿蘅在铜镜中看到了什么', rarity: 4, hidden: true,
    revealedDesc: '触发阿蘅二次来访隐藏事件',
    reward: { type: 'time', amount: 15 }
  },
  laowu_return: {
    id: 'laowu_return', name: '空白相框', category: 'hidden',
    description: '老吴终于在相框里放了照片', rarity: 4, hidden: true,
    revealedDesc: '触发老吴二次来访隐藏事件',
    reward: { type: 'time', amount: 15 }
  }
};

// ---- 成就分类定义 ----
const ACHIEVEMENT_CATEGORIES = {
  basics:    { name: '初识当铺', icon: '◆', color: '#88aacc' },
  butterfly: { name: '蝴蝶之翼', icon: '◇', color: '#44ddaa' },
  story:     { name: '记忆深处', icon: '◈', color: '#aa88ff' },
  choices:   { name: '抉择之重', icon: '◊', color: '#ff8866' },
  manage:    { name: '当铺主人', icon: '☆', color: '#ffcc44' },
  endings:   { name: '结局收藏', icon: '★', color: '#ff88aa' },
  hidden:    { name: '隐藏', icon: '?', color: '#666688' }
};

// ---- 全部涟漪ID列表 ----
const ALL_RIPPLE_IDS = [
  'chen_doctor', 'chen_army',
  'lin_surgery', 'lin_conservative',
  'zhou_send', 'zhou_burn',
  'heng_clock_run', 'heng_clock_stop',
  'wu_develop', 'wu_destroy',
  'ending_close', 'ending_stay', 'ending_loop',
  'ripple_accept', 'ripple_reject'
];

// ---- 导出为全局对象 ----
const GameData = {
  SPRITES, CLIENTS, STORIES, SHOP_ITEMS, OWNER_MEMORIES,
  BACKGROUNDS, ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, ALL_RIPPLE_IDS,
  BUTTERFLY_EFFECTS, RESONANCE_EFFECTS, HIDDEN_EVENTS, COLLECTIBLES
};
