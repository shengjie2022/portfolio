// ============================================================
// 废土快递 - 游戏数据
// ============================================================

const TOWN_NAMES = [
    '铁锈镇', '新希望', '弹坑城', '辐光营地', '骸骨驿站',
    '绿洲港', '钢铁堡', '灰烬谷', '避风港', '废墟市集',
    '油桶镇', '幸存者营', '旧金山废墟', '拉斯维加斯残骸',
    '盐湖要塞', '丹佛地堡', '凤凰城绿洲', '达拉斯贸易站'
];

const TOWN_TYPES = {
    trading: { name: '贸易站', color: '#f0c040', goodsBonus: 1.3, modBonus: 0.7 },
    military: { name: '军事基地', color: '#40a0f0', goodsBonus: 0.7, modBonus: 1.5 },
    settlement: { name: '定居点', color: '#60d060', goodsBonus: 1.0, modBonus: 1.0 },
    raider: { name: '掠夺者营地', color: '#f06040', goodsBonus: 0.8, modBonus: 1.2 },
    ruins: { name: '废墟', color: '#a080c0', goodsBonus: 0.5, modBonus: 0.5 }
};

const GOODS = {
    food: { name: '食物', basePrice: 10, icon: '🍖', weight: 1 },
    water: { name: '净水', basePrice: 15, icon: '💧', weight: 1 },
    medicine: { name: '药品', basePrice: 30, icon: '💊', weight: 0.5 },
    ammo: { name: '弹药', basePrice: 25, icon: '🔫', weight: 2 },
    fuel_barrel: { name: '燃油桶', basePrice: 40, icon: '⛽', weight: 3 },
    electronics: { name: '电子元件', basePrice: 50, icon: '🔧', weight: 1 },
    luxuries: { name: '奢侈品', basePrice: 80, icon: '💎', weight: 1 },
    scrap: { name: '废金属', basePrice: 5, icon: '🔩', weight: 3 },
    chemicals: { name: '化学品', basePrice: 35, icon: '🧪', weight: 2 },
    textiles: { name: '织物', basePrice: 20, icon: '🧵', weight: 1 }
};

const MOD_SETS = {
    military: { name: '军用', color: '#4488cc' },
    raider: { name: '掠夺者', color: '#cc4444' },
    civilian: { name: '民用', color: '#88cc44' },
    tech: { name: '高科技', color: '#cc88ff' },
    salvage: { name: '拾荒者', color: '#ccaa44' }
};

const SET_BONUSES = {
    'military_2': {
        name: '急行军',
        desc: '油耗-30%',
        required: { set: 'military', count: 2 },
        effect: { fuelCostMult: 0.7 }
    },
    'raider_2': {
        name: '威慑',
        desc: '强盗逃跑概率+50%',
        required: { set: 'raider', count: 2 },
        effect: { banditFleeMult: 1.5 }
    },
    'civilian_2': {
        name: '舒适驾驶',
        desc: '理智消耗-40%',
        required: { set: 'civilian', count: 2 },
        effect: { sanityCostMult: 0.6 }
    },
    'tech_2': {
        name: '先进雷达',
        desc: '事件预警+60%',
        required: { set: 'tech', count: 2 },
        effect: { eventWarningMult: 1.6 }
    },
    'salvage_2': {
        name: '拾荒大师',
        desc: '战利品+80%',
        required: { set: 'salvage', count: 2 },
        effect: { lootMult: 1.8 }
    },
    'military_3': {
        name: '装甲列车',
        desc: '受伤-50%，油耗-30%',
        required: { set: 'military', count: 3 },
        effect: { damageMult: 0.5, fuelCostMult: 0.7 }
    },
    'tech_3': {
        name: '科技霸权',
        desc: '所有属性+20%',
        required: { set: 'tech', count: 3 },
        effect: { allStatsMult: 1.2 }
    }
};

const MODIFICATIONS = {
    // === 货舱 ===
    cargo_basic: { name: '基础货架', type: 'cargo', set: 'civilian', rarity: 'common', stats: { cargoSpace: 5 }, price: 50 },
    cargo_reinforced: { name: '加固货舱', type: 'cargo', set: 'civilian', rarity: 'uncommon', stats: { cargoSpace: 8, armor: 2 }, price: 120 },
    cargo_military: { name: '军用集装箱', type: 'cargo', set: 'military', rarity: 'rare', stats: { cargoSpace: 10, armor: 5 }, price: 300 },
    cargo_raider: { name: '掠夺者货兜', type: 'cargo', set: 'raider', rarity: 'uncommon', stats: { cargoSpace: 12, armor: -2 }, price: 80 },
    cargo_tech: { name: '压缩仓储', type: 'cargo', set: 'tech', rarity: 'rare', stats: { cargoSpace: 15 }, price: 400 },
    cargo_salvage: { name: '拾荒背包', type: 'cargo', set: 'salvage', rarity: 'common', stats: { cargoSpace: 6, lootBonus: 10 }, price: 60 },

    // === 装甲 ===
    armor_scrap: { name: '废铁装甲', type: 'armor', set: 'salvage', rarity: 'common', stats: { armor: 10, speed: -5 }, price: 40 },
    armor_plate: { name: '钢板装甲', type: 'armor', set: 'civilian', rarity: 'uncommon', stats: { armor: 20, speed: -10 }, price: 150 },
    armor_military: { name: '军用复合装甲', type: 'armor', set: 'military', rarity: 'rare', stats: { armor: 35, speed: -5 }, price: 350 },
    armor_raider: { name: '尖刺装甲', type: 'armor', set: 'raider', rarity: 'uncommon', stats: { armor: 15, combatBonus: 10 }, price: 130 },
    armor_reactive: { name: '反应装甲', type: 'armor', set: 'tech', rarity: 'legendary', stats: { armor: 40, speed: 5 }, price: 800 },

    // === 引擎 ===
    engine_salvage: { name: '拼凑引擎', type: 'engine', set: 'salvage', rarity: 'common', stats: { speed: 10, fuelEfficiency: -10 }, price: 45 },
    engine_standard: { name: '标准引擎', type: 'engine', set: 'civilian', rarity: 'uncommon', stats: { speed: 20, fuelEfficiency: 0 }, price: 160 },
    engine_military: { name: '军用柴油机', type: 'engine', set: 'military', rarity: 'rare', stats: { speed: 25, fuelEfficiency: 15 }, price: 380 },
    engine_turbo: { name: '涡轮增压', type: 'engine', set: 'raider', rarity: 'rare', stats: { speed: 40, fuelEfficiency: -20 }, price: 300 },
    engine_fusion: { name: '微型聚变引擎', type: 'engine', set: 'tech', rarity: 'legendary', stats: { speed: 35, fuelEfficiency: 50 }, price: 1000 },

    // === 雷达 ===
    radar_basic: { name: '基础雷达', type: 'radar', set: 'civilian', rarity: 'common', stats: { detection: 15 }, price: 60 },
    radar_military: { name: '军用扫描仪', type: 'radar', set: 'military', rarity: 'rare', stats: { detection: 35, eventWarning: 20 }, price: 320 },
    radar_salvage: { name: '改装探测器', type: 'radar', set: 'salvage', rarity: 'uncommon', stats: { detection: 20, lootBonus: 15 }, price: 100 },
    radar_tech: { name: '量子感应器', type: 'radar', set: 'tech', rarity: 'legendary', stats: { detection: 50, eventWarning: 40 }, price: 900 },

    // === 武器 ===
    weapon_mg: { name: '车载机枪', type: 'weapon', set: 'military', rarity: 'uncommon', stats: { combatBonus: 20 }, price: 180 },
    weapon_spike: { name: '撞击尖刺', type: 'weapon', set: 'raider', rarity: 'common', stats: { combatBonus: 12, armor: 3 }, price: 70 },
    weapon_laser: { name: '激光炮台', type: 'weapon', set: 'tech', rarity: 'legendary', stats: { combatBonus: 45 }, price: 1200 },
    weapon_salvage: { name: '废料投射器', type: 'weapon', set: 'salvage', rarity: 'uncommon', stats: { combatBonus: 15, lootBonus: 10 }, price: 90 },
    weapon_flamer: { name: '火焰喷射器', type: 'weapon', set: 'raider', rarity: 'rare', stats: { combatBonus: 30 }, price: 280 }
};

const RARITY_COLORS = {
    common: '#aaaaaa',
    uncommon: '#44cc44',
    rare: '#4488ff',
    legendary: '#ff8800'
};

const RARITY_NAMES = {
    common: '普通',
    uncommon: '精良',
    rare: '稀有',
    legendary: '传说'
};

const CREW_NAMES = [
    '辐射眼', '锈骨', '滤芯', '核尘', '暗齿轮', '破风',
    '锈钉', '毒滤', '铁肺', '骨钉', '硝烟', '碎甲',
    '拾荒者', '锈蚀', '滤毒者', '黑轮胎', '无声轮', '锈扳手',
    '废墟客', '灰烬', '铅皮', '暗流', '锈刃', '滤网'
];

const CREW_ROLES = {
    driver: {
        name: '司机',
        icon: '🚗',
        desc: '降低油耗，提升车速',
        effect: { fuelEfficiency: 0.05, speed: 0.03 }  // 每级效果
    },
    mechanic: {
        name: '机械师',
        icon: '🔧',
        desc: '提升修车效率，降低损耗',
        effect: { repairBonus: 0.1, durabilityLoss: -0.05 }
    },
    guard: {
        name: '保镖',
        icon: '⚔️',
        desc: '战斗加成，降低被劫概率',
        effect: { combatBonus: 0.08, banditChance: -0.05 }
    }
};

const EVENTS = {
    bandit: {
        name: '强盗伏击',
        icon: '🏴‍☠️',
        desc: '一群衣衫褴褛的强盗从废墟后冲出，挡住了去路！',
        baseChance: 0.3,
        choices: [
            {
                text: '⚔️ 战斗',
                desc: '用武力击退他们（可能损失耐久但能获得物资）',
                type: 'combat'
            },
            {
                text: '💰 贿赂',
                desc: '用瓶盖打发他们（损失金钱）',
                type: 'bribe'
            },
            {
                text: '🏃 逃跑',
                desc: '全速逃离（损失时间，可能翻车）',
                type: 'flee'
            }
        ]
    },
    merchant: {
        name: '神秘商人',
        icon: '🎭',
        desc: '一个戴着防毒面具的商人从暗处现身，手中晃动着闪光的旧世界货币...',
        baseChance: 0.12,
        choices: [
            {
                text: '🪙 交易旧世界货币',
                desc: '用旧世界货币换取传说级零件',
                type: 'trade_legendary'
            },
            {
                text: '💬 讨价还价',
                desc: '试着用瓶盖购买稀有物品',
                type: 'trade_caps'
            },
            {
                text: '👋 离开',
                desc: '无视他继续赶路',
                type: 'ignore'
            }
        ]
    },
    radiation: {
        name: '辐射风暴',
        icon: '☢️',
        desc: '地平线上涌来一片绿光闪烁的风暴云，辐射探测器疯狂鸣叫！',
        baseChance: 0.2,
        choices: [
            {
                text: '🏕️ 停车避险',
                desc: '找掩体等待风暴过去（消耗食物和时间）',
                type: 'shelter'
            },
            {
                text: '🚀 硬闯过去',
                desc: '全速冲过辐射区（乘员可能生病）',
                type: 'push_through'
            }
        ]
    },
    breakdown: {
        name: '车辆故障',
        icon: '🔧',
        desc: '引擎发出刺耳的金属声后熄火了，烟雾从引擎盖下冒出...',
        baseChance: 0.15,
        choices: [
            {
                text: '🔧 修理',
                desc: '尝试修复（机械师技能影响结果）',
                type: 'repair'
            },
            {
                text: '🚶 步行求援',
                desc: '派人去最近的城镇求助（消耗大量时间）',
                type: 'walk_help'
            }
        ]
    },
    abandoned: {
        name: '废弃车辆',
        icon: '🚛',
        desc: '路边停着一辆锈迹斑斑的废弃卡车，似乎还有些东西可以搜刮...',
        baseChance: 0.18,
        choices: [
            {
                text: '🔍 搜索',
                desc: '仔细搜索车辆（可能找到有价值的东西）',
                type: 'search'
            },
            {
                text: '⚠️ 警惕通过',
                desc: '可能是陷阱，小心绕过',
                type: 'avoid'
            }
        ]
    },
    survivor: {
        name: '幸存者',
        icon: '🧑',
        desc: '一个瘦弱的幸存者在路边挥手，请求搭载到下一个城镇...',
        baseChance: 0.15,
        choices: [
            {
                text: '🤝 搭载',
                desc: '好心搭载他（消耗食物，可能有好报）',
                type: 'pickup'
            },
            {
                text: '🚫 拒绝',
                desc: '在这个世界，信任是奢侈品',
                type: 'refuse'
            }
        ]
    }
};

const ORDER_CARGO_TYPES = [
    { name: '医疗物资', icon: '💊', dangerMult: 1.0 },
    { name: '武器弹药', icon: '🔫', dangerMult: 1.5 },
    { name: '食物补给', icon: '🍖', dangerMult: 0.8 },
    { name: '电子设备', icon: '📡', dangerMult: 1.2 },
    { name: '建筑材料', icon: '🧱', dangerMult: 0.6 },
    { name: '珍贵文物', icon: '🏺', dangerMult: 1.8 },
    { name: '核燃料', icon: '☢️', dangerMult: 2.0 },
    { name: '净水设备', icon: '💧', dangerMult: 1.0 }
];

// 用于旧世界货币交易的传说级物品池
const LEGENDARY_POOL = [
    'armor_reactive', 'engine_fusion', 'radar_tech', 'weapon_laser'
];

// ============================================================
// 成就系统数据
// ============================================================

const ACHIEVEMENT_CATEGORIES = {
    survival: { name: '生存之路', icon: '🛤️', desc: '在废土中挣扎求存' },
    trading: { name: '商人之道', icon: '💰', desc: '用瓶盖书写传奇' },
    mechanical: { name: '机械狂潮', icon: '🔧', desc: '打造终极战车' },
    combat: { name: '战斗荣耀', icon: '⚔️', desc: '用铁与火开路' },
    events: { name: '命运抉择', icon: '🎭', desc: '每个选择都有代价' },
    crew: { name: '乘员羁绊', icon: '👥', desc: '在末世中建立信任' },
    orders: { name: '订单传奇', icon: '📦', desc: '使命必达的快递人' },
    hidden: { name: '隐藏成就', icon: '❓', desc: '意料之外的发现' }
};

const ACHIEVEMENTS = {
    // === 生存之路 (6个) ===
    first_delivery: {
        id: 'first_delivery', category: 'survival', name: '第一步',
        desc: '完成第一次送货', icon: '👣',
        condition: { type: 'orders_completed', value: 1 },
        reward: { type: 'caps', value: 50 }, hidden: false
    },
    road_warrior: {
        id: 'road_warrior', category: 'survival', name: '公路战士',
        desc: '累计行驶500公里', icon: '🛣️',
        condition: { type: 'distance_traveled', value: 500 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    wasteland_veteran: {
        id: 'wasteland_veteran', category: 'survival', name: '废土老兵',
        desc: '累计行驶2000公里', icon: '🏅',
        condition: { type: 'distance_traveled', value: 2000 },
        reward: { type: 'title', value: '废土老兵' }, hidden: false
    },
    explorer: {
        id: 'explorer', category: 'survival', name: '探险家',
        desc: '访问所有城镇', icon: '🗺️',
        condition: { type: 'all_towns_visited', value: true },
        reward: { type: 'caps', value: 200 }, hidden: false
    },
    fuel_miser: {
        id: 'fuel_miser', category: 'survival', name: '节油大师',
        desc: '单次旅行油耗低于基础值50%', icon: '⛽',
        condition: { type: 'fuel_efficient_trip', value: 0.5 },
        reward: { type: 'caps', value: 80 }, hidden: false
    },
    near_death: {
        id: 'near_death', category: 'survival', name: '死里逃生',
        desc: '车辆耐久低于5%时到达城镇', icon: '💀',
        condition: { type: 'arrive_low_hp', value: 5 },
        reward: { type: 'caps', value: 150 }, hidden: false
    },

    // === 商人之道 (7个) ===
    first_profit: {
        id: 'first_profit', category: 'trading', name: '初次盈利',
        desc: '第一次通过交易获利', icon: '🪙',
        condition: { type: 'first_trade_profit', value: true },
        reward: { type: 'caps', value: 30 }, hidden: false
    },
    trade_master: {
        id: 'trade_master', category: 'trading', name: '交易大师',
        desc: '累计交易利润达到2000瓶盖', icon: '💹',
        condition: { type: 'total_trade_profit', value: 2000 },
        reward: { type: 'caps', value: 200 }, hidden: false
    },
    buy_low_sell_high: {
        id: 'buy_low_sell_high', category: 'trading', name: '低买高卖',
        desc: '单次交易利润超过200%', icon: '📈',
        condition: { type: 'single_trade_profit_pct', value: 200 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    market_monopoly: {
        id: 'market_monopoly', category: 'trading', name: '市场垄断',
        desc: '同时持有5种以上商品', icon: '🏬',
        condition: { type: 'hold_goods_types', value: 5 },
        reward: { type: 'caps', value: 80 }, hidden: false
    },
    caps_hoarder: {
        id: 'caps_hoarder', category: 'trading', name: '瓶盖囤积者',
        desc: '同时持有3000瓶盖', icon: '🏦',
        condition: { type: 'caps_held', value: 3000 },
        reward: { type: 'caps', value: 150 }, hidden: false
    },
    black_market: {
        id: 'black_market', category: 'trading', name: '黑市常客',
        desc: '与神秘商人交易5次', icon: '🎭',
        condition: { type: 'merchant_trades', value: 5 },
        reward: { type: 'unlock_mod', value: 'engine_blackmarket' }, hidden: false
    },
    old_world_collector: {
        id: 'old_world_collector', category: 'trading', name: '旧世界收藏家',
        desc: '累计获得10枚旧世界货币', icon: '🏛️',
        condition: { type: 'old_coins_collected', value: 10 },
        reward: { type: 'caps', value: 300 }, hidden: false
    },

    // === 机械狂潮 (7个) ===
    first_mod: {
        id: 'first_mod', category: 'mechanical', name: '改装入门',
        desc: '安装第一个改装件', icon: '🔩',
        condition: { type: 'mods_installed', value: 1 },
        reward: { type: 'caps', value: 30 }, hidden: false
    },
    full_set: {
        id: 'full_set', category: 'mechanical', name: '套装收集者',
        desc: '激活任意一个套装效果', icon: '🎴',
        condition: { type: 'set_bonus_activated', value: 1 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    legendary_collector: {
        id: 'legendary_collector', category: 'mechanical', name: '传说收藏',
        desc: '拥有3件传说级改装件', icon: '🌟',
        condition: { type: 'legendary_mods_owned', value: 3 },
        reward: { type: 'unlock_mod', value: 'weapon_wargod' }, hidden: false
    },
    all_slots_filled: {
        id: 'all_slots_filled', category: 'mechanical', name: '全副武装',
        desc: '同时装满所有5个改装槽', icon: '🛡️',
        condition: { type: 'all_slots_equipped', value: true },
        reward: { type: 'caps', value: 120 }, hidden: false
    },
    repair_master: {
        id: 'repair_master', category: 'mechanical', name: '修理专家',
        desc: '累计修理车辆20次', icon: '🔧',
        condition: { type: 'total_repairs', value: 20 },
        reward: { type: 'unlock_mod', value: 'tool_universal' }, hidden: false
    },
    speed_demon: {
        id: 'speed_demon', category: 'mechanical', name: '速度恶魔',
        desc: '车辆速度属性达到80以上', icon: '💨',
        condition: { type: 'vehicle_speed', value: 80 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    iron_fortress: {
        id: 'iron_fortress', category: 'mechanical', name: '铁壁堡垒',
        desc: '车辆装甲属性达到60以上', icon: '🏰',
        condition: { type: 'vehicle_armor', value: 60 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },

    // === 战斗荣耀 (6个) ===
    first_blood: {
        id: 'first_blood', category: 'combat', name: '初战告捷',
        desc: '赢得第一次战斗', icon: '🗡️',
        condition: { type: 'combats_won', value: 1 },
        reward: { type: 'caps', value: 50 }, hidden: false
    },
    battle_hardened: {
        id: 'battle_hardened', category: 'combat', name: '身经百战',
        desc: '累计赢得10次战斗', icon: '⚔️',
        condition: { type: 'combats_won', value: 10 },
        reward: { type: 'caps', value: 200 }, hidden: false
    },
    pacifist: {
        id: 'pacifist', category: 'combat', name: '和平主义者',
        desc: '连续5次遭遇战斗选择非暴力解决', icon: '☮️',
        condition: { type: 'consecutive_peaceful', value: 5 },
        reward: { type: 'caps', value: 150 }, hidden: false
    },
    bandit_bane: {
        id: 'bandit_bane', category: 'combat', name: '强盗克星',
        desc: '击退20波强盗', icon: '🏴',
        condition: { type: 'bandits_defeated', value: 20 },
        reward: { type: 'caps', value: 250 }, hidden: false
    },
    no_damage: {
        id: 'no_damage', category: 'combat', name: '毫发无损',
        desc: '一次战斗中零伤害获胜', icon: '✨',
        condition: { type: 'flawless_victory', value: 1 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    bribe_master: {
        id: 'bribe_master', category: 'combat', name: '贿赂大师',
        desc: '累计贿赂强盗花费超过500瓶盖', icon: '💸',
        condition: { type: 'total_bribe_spent', value: 500 },
        reward: { type: 'caps', value: 80 }, hidden: false
    },

    // === 命运抉择 (7个) ===
    event_survivor: {
        id: 'event_survivor', category: 'events', name: '事件幸存者',
        desc: '经历20次随机事件', icon: '🎲',
        condition: { type: 'events_handled', value: 20 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    radiation_walker: {
        id: 'radiation_walker', category: 'events', name: '辐射行者',
        desc: '成功穿越5次辐射风暴', icon: '☢️',
        condition: { type: 'radiation_survived', value: 5 },
        reward: { type: 'caps', value: 120 }, hidden: false
    },
    lucky_star: {
        id: 'lucky_star', category: 'events', name: '幸运星',
        desc: '连续3次事件获得正面结果', icon: '⭐',
        condition: { type: 'consecutive_good_events', value: 3 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    good_samaritan: {
        id: 'good_samaritan', category: 'events', name: '好撒玛利亚人',
        desc: '搭载5名幸存者', icon: '🤝',
        condition: { type: 'survivors_helped', value: 5 },
        reward: { type: 'caps', value: 150 }, hidden: false
    },
    scavenger: {
        id: 'scavenger', category: 'events', name: '拾荒专家',
        desc: '成功搜索10辆废弃车辆', icon: '🔍',
        condition: { type: 'vehicles_searched', value: 10 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    breakdown_survivor: {
        id: 'breakdown_survivor', category: 'events', name: '故障克星',
        desc: '成功修复8次车辆故障事件', icon: '🛠️',
        condition: { type: 'breakdowns_fixed', value: 8 },
        reward: { type: 'caps', value: 120 }, hidden: false
    },
    event_variety: {
        id: 'event_variety', category: 'events', name: '百态人生',
        desc: '经历过所有6种事件类型', icon: '🌈',
        condition: { type: 'all_event_types_seen', value: true },
        reward: { type: 'caps', value: 200 }, hidden: false
    },

    // === 乘员羁绊 (7个) ===
    first_recruit: {
        id: 'first_recruit', category: 'crew', name: '初次招募',
        desc: '招募第一名乘员', icon: '🤝',
        condition: { type: 'crew_recruited', value: 1 },
        reward: { type: 'caps', value: 30 }, hidden: false
    },
    full_crew: {
        id: 'full_crew', category: 'crew', name: '满员出发',
        desc: '同时拥有3名乘员', icon: '👥',
        condition: { type: 'crew_count', value: 3 },
        reward: { type: 'caps', value: 80 }, hidden: false
    },
    crew_diversity: {
        id: 'crew_diversity', category: 'crew', name: '各司其职',
        desc: '同时拥有3种不同职业的乘员', icon: '🎭',
        condition: { type: 'crew_all_roles', value: true },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    crew_level_up: {
        id: 'crew_level_up', category: 'crew', name: '经验丰富',
        desc: '任一乘员达到5级', icon: '📈',
        condition: { type: 'crew_max_level', value: 5 },
        reward: { type: 'caps', value: 120 }, hidden: false
    },
    crew_healer: {
        id: 'crew_healer', category: 'crew', name: '妙手回春',
        desc: '治愈10次乘员伤病', icon: '💊',
        condition: { type: 'crew_healed', value: 10 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    sanity_keeper: {
        id: 'sanity_keeper', category: 'crew', name: '心灵守护',
        desc: '全程保持所有乘员理智值在50以上', icon: '🧠',
        condition: { type: 'crew_sanity_maintained', value: 50 },
        reward: { type: 'caps', value: 150 }, hidden: false
    },
    crew_veteran: {
        id: 'crew_veteran', category: 'crew', name: '老战友',
        desc: '同一乘员随行完成10次送货', icon: '🎖️',
        condition: { type: 'crew_deliveries', value: 10 },
        reward: { type: 'caps', value: 200 }, hidden: false
    },

    // === 订单传奇 (7个) ===
    order_starter: {
        id: 'order_starter', category: 'orders', name: '新手快递员',
        desc: '完成3个订单', icon: '📦',
        condition: { type: 'orders_completed', value: 3 },
        reward: { type: 'caps', value: 80 }, hidden: false
    },
    order_expert: {
        id: 'order_expert', category: 'orders', name: '资深快递员',
        desc: '完成10个订单', icon: '📬',
        condition: { type: 'orders_completed', value: 10 },
        reward: { type: 'caps', value: 200 }, hidden: false
    },
    speed_delivery: {
        id: 'speed_delivery', category: 'orders', name: '闪电快递',
        desc: '在时限的50%内完成一个订单', icon: '⚡',
        condition: { type: 'fast_delivery', value: 50 },
        reward: { type: 'caps', value: 120 }, hidden: false
    },
    dangerous_cargo: {
        id: 'dangerous_cargo', category: 'orders', name: '危险品专家',
        desc: '完成5个危险系数≥1.5的订单', icon: '☣️',
        condition: { type: 'dangerous_orders', value: 5 },
        reward: { type: 'caps', value: 150 }, hidden: false
    },
    long_haul: {
        id: 'long_haul', category: 'orders', name: '长途跋涉',
        desc: '完成一个路程≥300公里的订单', icon: '🛤️',
        condition: { type: 'long_distance_order', value: 300 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    perfect_delivery: {
        id: 'perfect_delivery', category: 'orders', name: '完美送达',
        desc: '完成一个订单且车辆耐久度≥90%', icon: '🏆',
        condition: { type: 'perfect_order', value: 90 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    legendary_courier: {
        id: 'legendary_courier', category: 'orders', name: '传奇快递员',
        desc: '完成所有主线订单', icon: '👑',
        condition: { type: 'all_main_orders', value: true },
        reward: { type: 'unlock_vehicle', value: 'iron_fortress' }, hidden: false
    },

    // === 隐藏成就 (6个) ===
    ghost_rider: {
        id: 'ghost_rider', category: 'hidden', name: '幽灵骑士',
        desc: '在夜间（0燃油）到达城镇', icon: '👻',
        condition: { type: 'arrive_no_fuel', value: true },
        reward: { type: 'caps', value: 200 }, hidden: true
    },
    all_in: {
        id: 'all_in', category: 'hidden', name: '孤注一掷',
        desc: '瓶盖归零后完成一次送货', icon: '🎰',
        condition: { type: 'deliver_broke', value: true },
        reward: { type: 'caps', value: 300 }, hidden: true
    },
    merchant_friend: {
        id: 'merchant_friend', category: 'hidden', name: '商人之友',
        desc: '在同一个城镇买卖同一种商品3次', icon: '🤡',
        condition: { type: 'same_town_trade', value: 3 },
        reward: { type: 'caps', value: 100 }, hidden: true
    },
    road_rage: {
        id: 'road_rage', category: 'hidden', name: '公路狂怒',
        desc: '连续3次选择战斗解决遭遇', icon: '😤',
        condition: { type: 'consecutive_fights', value: 3 },
        reward: { type: 'caps', value: 120 }, hidden: true
    },
    walking_dead: {
        id: 'walking_dead', category: 'hidden', name: '行尸走肉',
        desc: '所有乘员同时处于生病状态', icon: '🧟',
        condition: { type: 'all_crew_sick', value: true },
        reward: { type: 'caps', value: 150 }, hidden: true
    },
    completionist: {
        id: 'completionist', category: 'hidden', name: '完美主义者',
        desc: '解锁除隐藏成就外的所有成就', icon: '🌟',
        condition: { type: 'all_non_hidden_unlocked', value: true },
        reward: { type: 'title', value: '废土传奇' }, hidden: true
    }
};

// 成就解锁的特殊改装件
const SPECIAL_MODS = {
    engine_blackmarket: {
        name: '黑市引擎', type: 'engine', set: 'tech', rarity: 'legendary',
        stats: { speed: 45, fuelEfficiency: 30 }, price: 0,
        desc: '来历不明的高性能引擎，传说由战前工厂秘密生产'
    },
    weapon_wargod: {
        name: '战神之矛', type: 'weapon', set: 'military', rarity: 'legendary',
        stats: { combatBonus: 55, armor: 5 }, price: 0,
        desc: '由传说级零件熔铸而成的终极武器'
    },
    tool_universal: {
        name: '万能扳手', type: 'radar', set: 'salvage', rarity: 'legendary',
        stats: { detection: 30, repairBonus: 50 }, price: 0,
        desc: '修理大师的毕生心血，可以修好任何东西'
    }
};

// 成就解锁的特殊载具皮肤
const SPECIAL_VEHICLES = {
    iron_fortress: {
        name: '钢铁堡垒',
        desc: '传奇快递员的终极座驾，集攻防于一体',
        bonusStats: { armor: 20, speed: 10, cargoSpace: 5 }
    }
};


// ============================================================
// 废土快递 v3.0 - 派系、货物时效、零点碎片、任务链、收藏品数据
// ============================================================

// ========== 派系系统 ==========
const FACTIONS = {
    salvagers: {
        id: 'salvagers',
        name: '拾荒者联盟',
        shortName: '拾荒者',
        color: '#ffaa00',
        bgColor: '#ffaa0022',
        icon: '⚙️',
        territory: 'rusty', // 锈蚀平原
        stance: 'neutral',    // 中立偏友好
        desc: '机械崇拜者，在废墟中搜寻旧世界技术，变异免疫体质让他们成为废土最顽强的一群人。',
        goals: '收集旧世界技术，对抗灰烬之子的「变异者清除」教义。',
        likes: '零件、机械、探索废墟',
        hates: '灰烬之子、宗教狂热、旧世界秩序'
    },
    ashkins: {
        id: 'ashkins',
        name: '灰烬之子',
        shortName: '灰烬之子',
        color: '#999999',
        bgColor: '#99999922',
        icon: '🕯️',
        territory: 'bones',  // 骨骸盆地
        stance: 'complex',    // 复杂
        desc: '废土宗教组织，医疗水平最高。他们维护秩序，但对「变异者」持敌意，有极端净化派分支。',
        goals: '维护废土秩序，清除变异威胁，恢复旧世界信仰。',
        likes: '秩序、医疗、纯净事物',
        hates: '变异者、拾荒者的变异免疫论'
    },
    rustwheel: {
        id: 'rustwheel',
        name: '锈轮商会',
        shortName: '锈轮',
        color: '#cc2222',
        bgColor: '#cc222222',
        icon: '📜',
        territory: 'canyon', // 裂缝峡谷
        stance: 'absolute',  // 绝对中立
        desc: '废土最大的情报网络与贸易组织。只要有钱，他们什么都卖，什么都买，不问来路。',
        goals: '保持贸易路线畅通，任何破坏稳定的行为都是敌人。',
        likes: '瓶盖、情报、走私通道',
        hates: '破坏交易的人、战争'
    },
        ironspine: {
        id: 'ironspine',
        name: '钢铁脊梁',
        shortName: '钢铁脊梁',
        color: '#44aa44',
        bgColor: '#44aa4422',
        icon: '🎖️',
        territory: 'military', // 军事区
        stance: 'order',       // 秩序优先
        desc: '前军事人员组成，高度组织化，维持废土路线秩序。',
        goals: '恢复旧世界秩序，压制派系冲突，建立废土秩序。',
        likes: '秩序、服从、旧世界军火',
        hates: '无政府主义、强盗、混乱'
    },
    pureearth: {
        id: 'pureearth',
        name: '净土农联',
        shortName: '净土',
        color: '#88cc44',
        bgColor: '#88cc4422',
        icon: '🌾',
        territory: 'oasis',   // 再生绿洲
        stance: 'friendly',   // 友好中立
        desc: '废土上最重要的粮食生产者，保护食物链是他们唯一的信条。',
        goals: '保护粮食生产，不参与政治。',
        likes: '食物、水、和平',
        hates: '破坏食物供应链的行为'
    },
    zerseekers: {
        id: 'zerseekers',
        name: '零点追寻者',
        shortName: '追寻者',
        color: '#44ff88',
        bgColor: '#44ff8822',
        icon: '🔮',
        territory: 'nomadic', // 游牧
        stance: 'neutral',    // 超然
        desc: '追寻大寂静真相的神秘组织，寻找零点设施入口，不参与派系政治。',
        goals: '找到零点协议的真相。',
        likes: '真相、零点碎片、旧世界记录',
        hates: '隐瞒真相者'
    }
};

// 派系关系矩阵（动态，可在游戏过程中改变）
const FACTION_RELATIONS = {
    salvagers: { ashkins: -2, rustwheel: 1, ironspine: 0, pureearth: 1, zerseekers: 2 },
    ashkins: { salvagers: -2, rustwheel: 0, ironspine: 1, pureearth: 0, zerseekers: -1 },
    rustwheel: { salvagers: 1, ashkins: 0, ironspine: 0, pureearth: 1, zerseekers: 1 },
    ironspine: { salvagers: 0, ashkins: 1, rustwheel: 0, pureearth: 1, zerseekers: 0 },
    pureearth: { salvagers: 1, ashkins: 0, rustwheel: 1, ironspine: 1, zerseekers: 0 },
    zerseekers: { salvagers: 2, ashkins: -1, rustwheel: 1, ironspine: 0, pureearth: 0 }
};

// 派系声望等级
const FACTION_REP_LEVELS = [
    { level: -2, name: '敌对', color: '#cc3333', priceMult: 1.3, entry: '禁止进入', canTrade: false },
    { level: -1, name: '不信任', color: '#cc8800', priceMult: 1.15, entry: '可能被盘问', canTrade: true },
    { level: 0,  name: '中立',   color: '#aaaaaa', priceMult: 1.0,  entry: '正常通行',  canTrade: true },
    { level: 1,  name: '友善',   color: '#44cc44', priceMult: 0.9,  entry: '优惠待遇',  canTrade: true },
    { level: 2,  name: '信赖',   color: '#22ff88', priceMult: 0.8,  entry: 'VIP通行',  canTrade: true }
];

// 派系专属改装件
const FACTION_MODS = {
    salvagers_mod: {
        name: '拾荒者导航模块', type: 'radar', set: 'salvage', rarity: 'rare', faction: 'salvagers',
        stats: { detection: 40, lootBonus: 30 }, price: 0,
        desc: '拾荒者联盟的制式装备，显示所有废墟位置，探索奖励+30%'
    },
    ashkin_blessing: {
        name: '灰烬祝福护符', type: 'armor', set: 'military', rarity: 'rare', faction: 'ashkins',
        stats: { armor: 25, radiationResist: 50 }, price: 0,
        desc: '灰烬之子祭司的祝福，大幅降低辐射伤害'
    },
    rustwheel_pass: {
        name: '锈轮通行证', type: 'radar', set: 'civilian', rarity: 'rare', faction: 'rustwheel',
        stats: { detection: 20, eventWarning: 30 }, price: 0,
        desc: '锈轮商会的VIP通行证，解锁走私路线，情报费用-50%'
    },
    ironspine_badge: {
        name: '军事通行徽章', type: 'radar', set: 'military', rarity: 'rare', faction: 'ironspine',
        stats: { detection: 30, combatBonus: 15 }, price: 0,
        desc: '钢铁脊梁的授权徽章，通过所有检查站无需盘问'
    },
    pureearth_cooler: {
        name: '净土保温箱', type: 'cargo', set: 'civilian', rarity: 'rare', faction: 'pureearth',
        stats: { cargoSpace: 8, foodDecayRate: -70 }, price: 0,
        desc: '净土农联的特殊设备，食物腐败速度-70%'
    },
    zer_fragment_device: {
        name: '零点碎片装置', type: 'radar', set: 'tech', rarity: 'legendary', faction: 'zerseekers',
        stats: { detection: 60, eventWarning: 50 }, price: 0,
        desc: '零点追寻者的神秘装置，在零点设施附近时有特殊感应'
    }
};

// 城镇派系归属（用于派系任务和检查站）
const TOWN_FACTION_MAP = {
    trading: ['salvagers', 'rustwheel', 'pureearth'],
    military: ['ironspine', 'ashkins'],
    settlement: ['pureearth', 'rustwheel'],
    raider: ['rustwheel', 'salvagers'],
    ruins: ['zerseekers', 'salvagers']
};

// ========== 货物时效系统 ==========
// 易腐货物列表
const PERISHABLE_GOODS = ['food', 'water'];

// 货物质量等级
const QUALITY_LEVELS = [
    { level: 4, name: '完好',  min: 100, color: '#44ff44', priceMult: 1.0,  icon: '✨' },
    { level: 3, name: '良好',  min: 75,  color: '#aaff44', priceMult: 0.85, icon: '👍' },
    { level: 2, name: '勉强',  min: 50,  color: '#ffaa00', priceMult: 0.6,  icon: '⚠️' },
    { level: 1, name: '腐败',  min: 0,   color: '#cc3333', priceMult: 0.0,  icon: '☠️' }
];

// ========== 乘员羁绊系统 ==========
const BOND_STAGES = [
    { level: 0, name: '陌生',   threshold: 0,  desc: '刚刚认识，默契不足', color: '#888888' },
    { level: 1, name: '熟悉',   threshold: 3,  desc: '共同经历了几次旅行', color: '#aaaaaa' },
    { level: 2, name: '信任',   threshold: 5,  desc: '互相掩护，默契配合', color: '#44aaff' },
    { level: 3, name: '挚友',   threshold: 8,  desc: '生死与共，牢不可破', color: '#ff88ff' }
];

// 羁绊组合技能
const BOND_SKILLS = {
    'guard_driver': {
        name: '双保险',
        desc: '保镖+司机联手，零伤害击退强盗概率+30%',
        bonus: { banditZeroDmgChance: 0.3 }
    },
    'guard_mechanic': {
        name: '战地修理',
        desc: '保镖+机械师组合，战斗中受伤后自动修复10点',
        bonus: { battleAutoRepair: 10 }
    },
    'driver_guide': {
        name: '废土领航',
        desc: '司机+向导组合，路线信息更精确，预期遭遇显示+1',
        bonus: { routeInfoBonus: 1 }
    },
    'mechanic_driver': {
        name: '省油搭档',
        desc: '机械师+司机组合，油耗额外-15%',
        bonus: { fuelBonus: 15 }
    }
};

// 乘员个人剧情数据
const CREW_STORIES = {
    medic: {
        id: 'medic',
        title: '沉默的双手',
        name: '赤脚医生',
        role: 'medic',
        icon: '💉',
        desc: '曾经是灰烬之子的医生，因某种原因离开',
        nodes: [
            {
                id: 'n1', turnMin: 3, trigger: 'auto',
                text: '在一次事件中，医护员展现了极其专业的急救技术。',
                choices: [
                    { text: '询问她的过去', effect: 'story_advance', flag: 'ask_about_past' },
                    { text: '保持沉默，不追问', effect: 'story_advance', flag: 'respect_privacy' }
                ]
            },
            {
                id: 'n2', turnMin: 8, trigger: 'flag_ask_about_past',
                text: '她发现你经常在拾荒者联盟地盘活动，欲言又止...',
                choices: [
                    { text: '追问原因', effect: 'reputation_shift', shift: { ashkins: -1, salvagers: 1 } },
                    { text: '等她自己开口', effect: 'story_advance' }
                ]
            },
            {
                id: 'n3', turnMin: 12, trigger: 'always',
                text: '灰烬之子派人来找她，要求她回去。',
                choices: [
                    { text: '帮助她躲避', effect: 'story_advance', flag: 'helped_escape', rewards: { salvagers: 1, ashkins: -2 } },
                    { text: '交人', effect: 'reputation_shift', shift: { ashkins: 2, salvagers: -2 }, crewLeave: true }
                ]
            },
            {
                id: 'n4', turnMin: 16, trigger: 'flag_helped_escape',
                text: '她在废土上找到了失散的家人，决定离开你的队伍。',
                choices: [
                    { text: '祝福她，送别', effect: 'story_complete', rewards: { money: 200 }, item: 'medical_manual' },
                    { text: '挽留她留下', effect: 'no_effect' }
                ]
            },
            {
                id: 'n5', trigger: 'story_complete',  // 仅当羁绊达到「挚友」时触发
                text: '结局：她带着家人参加了你的传奇结局，告诉你她永远不会忘记废土上的这段时光。',
                choices: [{ text: '珍重再见', effect: 'finale_bond', endingBonus: 'medic_ending' }]
            }
        ]
    },
    hunter: {
        id: 'hunter',
        title: '废土猎人',
        name: '独狼',
        role: 'guard',
        icon: '🏹',
        desc: '废土上的老猎人，不喜欢说话，但枪法很准',
        nodes: [
            {
                id: 'n1', turnMin: 3, trigger: 'auto',
                text: '在一次遭遇战中，独狼展现了惊人的射击技术，三发三中。',
                choices: [
                    { text: '称赞他的枪法', effect: 'bond_gain', bonus: 2 },
                    { text: '保持低调', effect: 'bond_gain', bonus: 1 }
                ]
            },
            {
                id: 'n2', turnMin: 8, trigger: 'always',
                text: '独狼告诉你他曾经有一个搭档，但在一次任务中被强盗杀死了。',
                choices: [
                    { text: '表示理解', effect: 'bond_gain', bonus: 2, flag: 'shared_grief' },
                    { text: '提议让他做你的搭档', effect: 'bond_gain', bonus: 3, flag: 'partnership_offer' }
                ]
            },
            {
                id: 'n3', turnMin: 12, trigger: 'flag_partnership_offer',
                text: '独狼说：「我不会再让任何人因为我而死。」他的眼神变得坚定。',
                choices: [
                    { text: '「那就让我们都活着。」', effect: 'story_advance', flag: 'trust_earned' },
                    { text: '沉默接受', effect: 'story_advance' }
                ]
            },
            {
                id: 'n4', turnMin: 16, trigger: 'flag_trust_earned',
                text: '你陷入了困境，独狼拼死保护了你，身负重伤。',
                choices: [
                    { text: '照顾他直到康复', effect: 'story_advance', flag: 'bond_deepened' }
                ]
            },
            {
                id: 'n5', trigger: 'story_complete',
                text: '结局：独狼成为了你最信任的战友，永远不会离开。',
                choices: [{ text: '默契点头', effect: 'finale_bond', endingBonus: 'hunter_ending' }]
            }
        ]
    },
    scavenger: {
        id: 'scavenger',
        title: '废墟之子',
        name: '废墟之子',
        role: 'driver',
        icon: '🔦',
        desc: '在废墟中长大的孩子，对废土了如指掌',
        nodes: [
            {
                id: 'n1', turnMin: 3, trigger: 'auto',
                text: '废墟之子带你抄了一条隐蔽的捷径，省了大量燃油。',
                choices: [
                    { text: '「你怎么知道这条路的？」', effect: 'story_advance', flag: 'ask_origin' },
                    { text: '感谢但不多问', effect: 'bond_gain', bonus: 1 }
                ]
            },
            {
                id: 'n2', turnMin: 8, trigger: 'flag_ask_origin',
                text: '她透露自己小时候在废墟中长大，对每一块废铁都了如指掌。',
                choices: [
                    { text: '「想带我去看看吗？」', effect: 'story_advance', flag: 'invited_home' },
                    { text: '「你的家人呢？」', effect: 'story_advance', flag: 'asked_family' }
                ]
            },
            {
                id: 'n3', turnMin: 12, trigger: 'flag_invited_home',
                text: '废墟之子带你去了她的「家」——一个隐藏的废墟避难所。',
                choices: [
                    { text: '尊重她的秘密', effect: 'story_advance', flag: 'secret_kept' },
                    { text: '询问能否常来', effect: 'story_advance', flag: 'shared_home' }
                ]
            },
            {
                id: 'n4', turnMin: 16, trigger: 'always',
                text: '避难所遭遇了闯入者，废墟之子决定和你一起离开。',
                choices: [
                    { text: '一起击退入侵者', effect: 'story_advance', flag: 'defended_together' }
                ]
            },
            {
                id: 'n5', trigger: 'story_complete',
                text: '结局：废墟之子把她的避难所钥匙交给了你，成为了永远的伙伴。',
                choices: [{ text: '接过钥匙', effect: 'finale_bond', endingBonus: 'scavenger_ending' }]
            }
        ]
    },
    mechanic: {
        id: 'mechanic',
        title: '机械之心',
        name: '齿轮',
        role: 'mechanic',
        icon: '🔩',
        desc: '话不多，但总能让坏掉的机器重新运转',
        nodes: [
            {
                id: 'n1', turnMin: 3, trigger: 'auto',
                text: '齿轮修好了一台连老机械师都放弃的引擎，代价是连续工作了12小时。',
                choices: [
                    { text: '「休息一下吧。」', effect: 'bond_gain', bonus: 2 },
                    { text: '「你为什么这么拼命？」', effect: 'story_advance', flag: 'ask_motive' }
                ]
            },
            {
                id: 'n2', turnMin: 8, trigger: 'flag_ask_motive',
                text: '齿轮沉默了很久：「我想证明...机器比人可靠。」',
                choices: [
                    { text: '「那你会修我吗？」', effect: 'story_advance', flag: 'personal_question' },
                    { text: '尊重她的沉默', effect: 'bond_gain', bonus: 2 }
                ]
            },
            {
                id: 'n3', turnMin: 12, trigger: 'flag_personal_question',
                text: '齿轮愣住了，然后轻声说：「...会的。」',
                choices: [
                    { text: '不多说什么，拍拍她的肩', effect: 'story_advance', flag: 'trust_moment' }
                ]
            },
            {
                id: 'n4', turnMin: 16, trigger: 'always',
                text: '齿轮发现你车上的引擎有严重缺陷，会在长途旅行中导致事故。她花了一整夜修复了它。',
                choices: [
                    { text: '感谢她，付加班费', effect: 'story_advance', flag: 'paid_overtime' },
                    { text: '「别太累了。」', effect: 'story_advance', flag: 'showed_care' }
                ]
            },
            {
                id: 'n5', trigger: 'story_complete',
                text: '结局：齿轮说「也许...人也能像机器一样可靠。」她决定留下来。',
                choices: [{ text: '微笑', effect: 'finale_bond', endingBonus: 'mechanic_ending' }]
            }
        ]
    },
    wanderer: {
        id: 'wanderer',
        title: '零点碎片',
        name: '无名',
        role: 'driver',
        icon: '🌙',
        desc: '一个神秘的漫游者，似乎知道很多旧世界的秘密',
        nodes: [
            {
                id: 'n1', turnMin: 3, trigger: 'auto',
                text: '无名在废墟中找到了一块奇怪的碎片，它发出淡淡的绿光。',
                choices: [
                    { text: '「那是什么？」', effect: 'story_advance', flag: 'asked_fragment' },
                    { text: '「交给我处理。」', effect: 'reputation_shift', shift: { zerseekers: -1 } }
                ]
            },
            {
                id: 'n2', turnMin: 8, trigger: 'flag_asked_fragment',
                text: '无名说：「零点碎片。大寂静的真相就藏在里面...如果你想找的话。」',
                choices: [
                    { text: '「带我去。」', effect: 'story_advance', flag: 'accepted_quest', rewards: { zeroFragments: 1 } },
                    { text: '「我对真相没兴趣。」', effect: 'story_advance' }
                ]
            },
            {
                id: 'n3', turnMin: 12, trigger: 'flag_accepted_quest',
                text: '零点追寻者开始出现在你的旅途中，无名告诉你，他们是你的盟友。',
                choices: [
                    { text: '「你也是追寻者？」', effect: 'story_advance', flag: 'revealed_identity' },
                    { text: '接受这个事实', effect: 'story_advance' }
                ]
            },
            {
                id: 'n4', turnMin: 16, trigger: 'flag_revealed_identity',
                text: '无名：「我曾经是零点追寻者的首领...但我选择离开，去寻找我失去的人。」',
                choices: [
                    { text: '「你失去了谁？」', effect: 'story_advance', flag: 'heard_story' },
                    { text: '「你的秘密很安全。」', effect: 'story_advance', flag: 'kept_secret' }
                ]
            },
            {
                id: 'n5', trigger: 'story_complete',
                text: '结局：无名说「谢谢你让我重新相信...废土上还有值得守护的东西。」',
                choices: [{ text: '握手', effect: 'finale_bond', endingBonus: 'wanderer_ending' }]
            }
        ]
    }
};

// ========== 零点碎片系统 ==========
const ZERO_FRAGMENTS = [
    {
        id: 'fragment_1', index: 1, name: '系统日志残页',
        lore: `2077年11月14日 03:27:11\n自动防御系统检测到[数据损坏]\n目标清单生成中...\n[警告] 目标清单包含[数据损坏]个条目\n授权码：零点\n执行确认：[已确认]`,
        locationHint: '骨骸盆地的旧军事设施',
        discoveryMethod: 'explore_military'
    },
    {
        id: 'fragment_2', index: 2, name: '诺克斯动力内部备忘录',
        lore: `诺克斯动力公司为[已涂黑]项目设计的原型能源系统。\n设计者备注：\n「当它启动的那一刻，\n我们就知道我们打开了潘多拉的盒子。\n但我们停不下来了。」`,
        locationHint: '拾荒者联盟的「残骸王」戈尔',
        discoveryMethod: 'salvager_quest'
    },
    {
        id: 'fragment_3', index: 3, name: '幸存者名单',
        lore: `零点协议避难所名单（部分）\n[姓名已涂黑] - 研究员 - 状态：已撤离\n[姓名已涂黑] - 首席科学家 - 状态：最后记录于零点\n[姓名已涂黑] - 行政主管 - 状态：拒绝撤离`,
        locationHint: '废墟深处的旧世界档案馆',
        discoveryMethod: 'ruins_explore'
    },
    {
        id: 'fragment_4', index: 4, name: '辐射地图',
        lore: `[地图显示] 零点协议设施位置：北纬34.2°，西经118.4°\n深度：地下约300米\n入口状态：[已封锁，需零点碎片激活]\n幸存者计数：0 → 3 → ???`,
        locationHint: '锈轮商会的情报网络中',
        discoveryMethod: 'rustwheel_intel'
    },
    {
        id: 'fragment_5', index: 5, name: '最后的日志',
        lore: `第87年3月17日\n他们找到了零点。我不知道该庆幸还是恐惧。\n零点博士说：「我们已经启动了它。没有回头路。」\n我问他：「你确定吗？」\n他只是笑了一下：「不，但我更害怕不知道答案。」`,
        locationHint: '净土农联的旧世界图书馆',
        discoveryMethod: 'pureearth_library'
    },
    {
        id: 'fragment_6', index: 6, name: '零点协议原件',
        lore: `零点协议 - 机密\n目标：在末日后的废墟中重建旧世界知识体系\n执行条件：全球核打击后自动激活\n设施设计：独立能源 + 空气循环 + 食物合成 + 知识库\n最终指令：[权限不足，无法读取]`,
        locationHint: '钢铁脊梁的旧档案库',
        discoveryMethod: 'ironspine_archive'
    },
    {
        id: 'fragment_7', index: 7, name: '零点真相',
        lore: `我是零点博士的意识备份。\n大寂静不是意外——是计划。\n旧世界的精英们在核打击前建造了零点设施，\n目的是让人类在废土的「自然选择」中存活，\n然后在适当的时机，由他们来「重建」世界。\n但他们没有预料到——我们变异了，我们成长了，我们有了废土自己的文明。\n现在，选择权在你手中：\n启动零点，让一切重来？\n还是摧毁它，让废土的自由延续？`,
        locationHint: '零点设施最深处',
        discoveryMethod: 'zero_facility'
    }
];

// ========== 派系任务链 ==========
// 每个派系3条任务链，每链3个节点
const FACTION_MISSIONS = {
    salvagers: [
        {
            id: 'sal_salvage1', name: '设备寻回', desc: '拾荒者联盟需要你帮忙找回旧世界设备',
            nodes: [
                {
                    id: 'n1', desc: '戈尔委托你寻找一台旧世界医疗器械',
                    action: 'travel', targetType: 'ruins', reward: { caps: 300, salvagers: 1 },
                    flavor: '「废土上那台机器也许能救很多人的命。」'
                },
                {
                    id: 'n2', desc: '护送医疗器械前往拾荒者边界',
                    action: 'deliver', targetType: 'settlement', reward: { caps: 200, salvagers: 1 },
                    flavor: '「小心，灰烬之子可能会找麻烦。」'
                },
                {
                    id: 'n3', desc: '戈尔分享一个关于拾荒者变异免疫的秘密',
                    action: 'story', reward: { caps: 500, salvagers: 2, zeroFragment: 1 },
                    flavor: '「你会发现，这个世界的真相比我们想象的要复杂得多。」'
                }
            ]
        },
        {
            id: 'sal_scavenge2', name: '废墟侦察', desc: '探索未知废墟，收集技术情报',
            nodes: [
                { id: 'n1', desc: '前往骨骸盆地边缘的一个未知废墟', action: 'travel', targetType: 'ruins', reward: { caps: 250, salvagers: 1 } },
                { id: 'n2', desc: '在废墟中找到并记录旧世界技术痕迹', action: 'explore', targetType: 'ruins', reward: { caps: 300, salvagers: 1, item: 'salvager_map' } },
                { id: 'n3', desc: '将情报带回给戈尔', action: 'deliver', targetType: 'trading', reward: { caps: 400, salvagers: 2 } }
            ]
        },
        {
            id: 'sal_defend3', name: '边界冲突', desc: '帮助拾荒者应对灰烬之子的扩张',
            nodes: [
                { id: 'n1', desc: '拦截一批试图进入拾荒者地盘的灰烬之子商队', action: 'combat', reward: { caps: 350, salvagers: 2 } },
                { id: 'n2', desc: '护送拾荒者难民前往安全地带', action: 'escort', reward: { caps: 200, salvagers: 1 } },
                { id: 'n3', desc: '在拾荒者与灰烬之子之间选择立场', action: 'choice', reward: { salvagers: 2, ashkins: -2 }, choiceText: '选择帮助拾荒者彻底对抗灰烬之子？' }
            ]
        }
    ],
    ashkins: [
        {
            id: 'ash_medical1', name: '医疗援助', desc: '灰烬之子需要药品和医疗人员',
            nodes: [
                { id: 'n1', desc: '运送一批药品到灰烬之子医疗站', action: 'deliver', targetType: 'military', goods: 'medicine', reward: { caps: 280, ashkins: 1 } },
                { id: 'n2', desc: '护送受伤的灰烬之子祭司前往治疗', action: 'escort', reward: { caps: 200, ashkins: 1 } },
                { id: 'n3', desc: '帮助灰烬之子建立新的医疗点', action: 'build', reward: { caps: 400, ashkins: 2, factionMod: 'ashkin_blessing' } }
            ]
        },
        {
            id: 'ash_purify2', name: '净化任务', desc: '清除变异威胁',
            nodes: [
                { id: 'n1', desc: '调查锈蚀平原的变异生物活动', action: 'travel', targetType: 'raider', reward: { caps: 250, ashkins: 1 } },
                { id: 'n2', desc: '清除变异巢穴', action: 'combat', reward: { caps: 350, ashkins: 2 } },
                { id: 'n3', desc: '决定巢穴残余的处理方式', action: 'choice', reward: { ashkins: 1 }, choiceText: '全部销毁还是留一部分研究？' }
            ]
        },
        {
            id: 'ash_truth3', name: '信仰考验', desc: '灰烬之子对你的信仰考验',
            nodes: [
                { id: 'n1', desc: '参加灰烬之子的净化仪式', action: 'event', reward: { ashkins: 1 } },
                { id: 'n2', desc: '接受一项考验：穿越辐射区', action: 'radiation', reward: { caps: 300, ashkins: 2 } },
                { id: 'n3', desc: '揭示你与拾荒者的关系', action: 'choice', reward: { ashkins: -1, salvagers: 1 }, choiceText: '向灰烬之子坦白你与拾荒者的合作？' }
            ]
        }
    ],
    rustwheel: [
        {
            id: 'rus_intel1', name: '情报交易', desc: '锈轮商会需要你帮忙传递情报',
            nodes: [
                { id: 'n1', desc: '从钢铁脊梁的情报贩子处取得一份密件', action: 'travel', targetType: 'military', reward: { caps: 200, rustwheel: 1 } },
                { id: 'n2', desc: '穿越裂缝峡谷将情报送给锈轮接头人', action: 'travel', targetType: 'raider', reward: { caps: 250, rustwheel: 1 } },
                { id: 'n3', desc: '锈轮回报：分享了一条隐藏走私路线', action: 'story', reward: { caps: 300, rustwheel: 2, factionMod: 'rustwheel_pass' } }
            ]
        },
        {
            id: 'rus_smuggle2', name: '灰色运输', desc: '运送不被其他派系接受的货物',
            nodes: [
                { id: 'n1', desc: '接受一批「特殊货物」', action: 'deliver', targetType: 'trading', goods: 'chemicals', reward: { caps: 400, rustwheel: 1 } },
                { id: 'n2', desc: '绕过钢铁脊梁的检查站', action: 'stealth', reward: { caps: 350, rustwheel: 1 } },
                { id: 'n3', desc: '锈轮给了你锈轮通行证作为回报', action: 'story', reward: { caps: 200, rustwheel: 2, factionMod: 'rustwheel_pass' } }
            ]
        },
        {
            id: 'rus_war3', name: '战争推手', desc: '锈轮商会在派系战争中两面下注',
            nodes: [
                { id: 'n1', desc: '向拾荒者提供虚假情报', action: 'choice', reward: { rustwheel: 2, salvagers: -2 }, choiceText: '是否配合锈轮的阴谋？' },
                { id: 'n2', desc: '同时向灰烬之子出售路线情报', action: 'choice', reward: { rustwheel: 1, ashkins: 1 } },
                { id: 'n3', desc: '锈轮商会的最终「感谢」', action: 'story', reward: { caps: 800, rustwheel: 2, zeroFragment: 1 } }
            ]
        }
    ],
    ironspine: [
        {
            id: 'iro_patrol1', name: '路线巡逻', desc: '维护废土路线的安全',
            nodes: [
                { id: 'n1', desc: '巡逻锈蚀平原与净土交界区域', action: 'travel', targetType: 'settlement', reward: { caps: 250, ironspine: 1 } },
                { id: 'n2', desc: '击退一伙强盗对贸易路线的骚扰', action: 'combat', reward: { caps: 300, ironspine: 1 } },
                { id: 'n3', desc: '将俘虏移交钢铁脊梁', action: 'deliver', targetType: 'military', reward: { caps: 200, ironspine: 2 } }
            ]
        },
        {
            id: 'iro_explore2', name: '旧世探索', desc: '寻找旧世界军事设施',
            nodes: [
                { id: 'n1', desc: '报告一个未知废墟的位置', action: 'travel', targetType: 'ruins', reward: { caps: 300, ironspine: 1 } },
                { id: 'n2', desc: '护送钢铁脊梁先遣队前往废墟', action: 'escort', reward: { caps: 250, ironspine: 1 } },
                { id: 'n3', desc: '从废墟中取回旧世界档案', action: 'explore', reward: { caps: 400, ironspine: 2, zeroFragment: 1 } }
            ]
        },
        {
            id: 'iro_order3', name: '秩序捍卫', desc: '钢铁脊梁的秩序任务',
            nodes: [
                { id: 'n1', desc: '镇压净土农联边界的一次冲突', action: 'combat', reward: { caps: 300, ironspine: 1, pureearth: -1 } },
                { id: 'n2', desc: '强制执行钢铁脊梁的「废土管理条例」', action: 'choice', reward: { ironspine: 2 }, choiceText: '严格执行还是睁一只眼闭一只眼？' },
                { id: 'n3', desc: '钢铁脊梁授予你军事通行徽章', action: 'story', reward: { caps: 500, ironspine: 2, factionMod: 'ironspine_badge' } }
            ]
        }
    ],
    pureearth: [
        {
            id: 'pur_farm1', name: '粮食护送', desc: '保护食物供应链',
            nodes: [
                { id: 'n1', desc: '护送一批粮食前往盐碱滩的难民点', action: 'deliver', targetType: 'ruins', goods: 'food', reward: { caps: 250, pureearth: 1 } },
                { id: 'n2', desc: '击退沿途的饿狼（强盗）', action: 'combat', reward: { caps: 200, pureearth: 1 } },
                { id: 'n3', desc: '净土农联邀请你参加丰收节', action: 'story', reward: { caps: 300, pureearth: 2, factionMod: 'pureearth_cooler' } }
            ]
        },
        {
            id: 'pur_water2', name: '净水行动', desc: '寻找和维护水源',
            nodes: [
                { id: 'n1', desc: '寻找一个新的地下水脉', action: 'explore', targetType: 'ruins', reward: { caps: 280, pureearth: 1 } },
                { id: 'n2', desc: '保护水源不被污染', action: 'combat', reward: { caps: 250, pureearth: 1 } },
                { id: 'n3', desc: '建立新的净水站', action: 'build', reward: { caps: 400, pureearth: 2 } }
            ]
        },
        {
            id: 'pur_peace3', name: '和平使者', desc: '在派系冲突中维护和平',
            nodes: [
                { id: 'n1', desc: '调解拾荒者与灰烬之子的边界争端', action: 'choice', reward: { pureearth: 2, salvagers: 1, ashkins: 1 } },
                { id: 'n2', desc: '护送谈判代表安全通过危险区域', action: 'escort', reward: { caps: 300, pureearth: 1 } },
                { id: 'n3', desc: '净土农联视你为和平使者', action: 'story', reward: { caps: 500, pureearth: 2, factionMod: 'pureearth_cooler' } }
            ]
        }
    ],
    zerseekers: [
        {
            id: 'zer_seek1', name: '碎片追寻', desc: '寻找零点碎片',
            nodes: [
                { id: 'n1', desc: '无名交给你一块发光的碎片', action: 'story', reward: { zeroFragment: 1, zerseekers: 1 }, flavor: '「这是第一块碎片。它会指引你找到更多。」' },
                { id: 'n2', desc: '根据碎片指引前往下一个地点', action: 'travel', targetType: 'ruins', reward: { zeroFragment: 1, zerseekers: 1 } },
                { id: 'n3', desc: '收集第三块碎片', action: 'explore', reward: { zeroFragment: 1, zerseekers: 2 } }
            ]
        },
        {
            id: 'zer_truth2', name: '真相挖掘', desc: '追寻大寂静的真相',
            nodes: [
                { id: 'n1', desc: '搜集旧世界记录以拼凑碎片信息', action: 'explore', reward: { caps: 300, zerseekers: 1, zeroFragment: 1 } },
                { id: 'n2', desc: '与零点追寻者交换情报', action: 'deliver', targetType: 'trading', reward: { zerseekers: 1 } },
                { id: 'n3', desc: '揭示零点设施的入口位置', action: 'story', reward: { caps: 400, zerseekers: 2, zeroFragment: 1 } }
            ]
        },
        {
            id: 'zer_final3', name: '零点入口', desc: '找到零点设施',
            nodes: [
                { id: 'n1', desc: '收集至少5块碎片', action: 'condition', condition: 'fragments_5', reward: { zerseekers: 2 } },
                { id: 'n2', desc: '前往零点设施入口', action: 'travel', targetType: 'ruins', reward: { zerseekers: 2, factionMod: 'zer_fragment_device' } },
                { id: 'n3', desc: '启动零点协议的最后一步', action: 'finale', reward: { zeroFragment: 1 } }
            ]
        }
    ]
};

// ========== 收藏品系统 ==========
const COLLECTIBLES = {
    // 旧世界记录
    old_world_records: [
        { id: 'rec_1', name: '战前报纸', desc: '一张日期为2077年11月10日的报纸，头条是「诺克斯动力股价创历史新高」', rarity: 1 },
        { id: 'rec_2', name: '家庭照片', desc: '一个已经褪色的相框，里面是一张幸福的四口之家合影', rarity: 1 },
        { id: 'rec_3', name: '儿童涂鸦', desc: '一张画满彩色涂鸦的纸，最上面写着「爸爸加油」', rarity: 1 },
        { id: 'rec_4', name: '结婚证', desc: '一份2065年的结婚证，新郎的名字被涂黑', rarity: 2 },
        { id: 'rec_5', name: '日记残页', desc: '2077年11月13日的日记：「今晚的天空很奇怪，我不知道该害怕还是该期待」', rarity: 2 },
        { id: 'rec_6', name: '军人徽章', desc: '一枚美国陆军少校的军衔徽章，背面刻着名字', rarity: 2 },
        { id: 'rec_7', name: '诺克斯动力名片', desc: '一张印有诺克斯动力logo的名片，头衔是「首席研究员」', rarity: 3 },
        { id: 'rec_8', name: '零点设施钥匙', desc: '一把设计精密的钥匙，上面的编号已经模糊', rarity: 4 }
    ],
    // 派系徽章
    faction_badges: [
        { id: 'bad_sal', name: '拾荒者徽章', desc: '拾荒者联盟的成员徽章，上面刻着齿轮与火焰', rarity: 2, faction: 'salvagers' },
        { id: 'bad_ash', name: '灰烬徽章', desc: '灰烬之子的净化徽章，象征纯洁与秩序', rarity: 2, faction: 'ashkins' },
        { id: 'bad_rus', name: '锈轮硬币', desc: '锈轮商会内部流通的特制硬币，可以兑换特殊服务', rarity: 2, faction: 'rustwheel' },
        { id: 'bad_iro', name: '钢铁徽章', desc: '钢铁脊梁的军事徽章，代表荣誉与服从', rarity: 2, faction: 'ironspine' },
        { id: 'bad_pur', name: '丰收徽章', desc: '净土农联的年度丰收节纪念徽章', rarity: 2, faction: 'pureearth' },
        { id: 'bad_zer', name: '零点印记', desc: '零点追寻者的神秘标记，会随碎片数量发光', rarity: 3, faction: 'zerseekers' }
    ],
    // 特殊物品
    special_items: [
        { id: 'spec_1', name: '老奶奶的护身符', desc: '一个干枯的护身符，据说能带来好运，降低被抢劫概率5%', rarity: 2, passive: { banditChance: -5 } },
        { id: 'spec_2', name: '废土地图碎片', desc: '一张旧世界地图的残片，标注了某条隐藏路线', rarity: 2, passive: { routeShortcut: true } },
        { id: 'spec_3', name: '零点碎片装置蓝图', desc: '零点追寻者的技术蓝图，描述了零点碎片装置的原理', rarity: 3 },
        { id: 'spec_4', name: '医学手册', desc: '医护员留下的医疗手册，增加救治成功率', rarity: 2, passive: { crewHealBonus: 20 } }
    ]
};

// ========== 8种结局定义 ==========
const ENDINGS = {
    // 商业传奇：完成10个订单，净资产超过5000瓶盖
    trade_legend: {
        id: 'trade_legend', name: '商业传奇', color: '#f0c040',
        desc: '你成为废土上最成功的货运商人，瓶盖堆积如山，传说流传在每一个贸易站。',
        condition: { type: 'trade_legend', orders: 10, money: 5000 },
        flavor: '当你拥有足够的财富时，整个废土都会为你让路。'
    },
    // 钢铁盟友：钢铁脊梁声望最高（友善+）
    iron_alliance: {
        id: 'iron_alliance', name: '钢铁盟友', color: '#44aa44',
        desc: '钢铁脊梁接纳你为荣誉成员，你获得了一辆军用货车和一面旗帜。',
        condition: { type: 'faction_ending', faction: 'ironspine', level: 1 },
        flavor: '在废土的秩序与混乱之间，你选择了秩序。',
        reward: { vehicle: 'military_truck', title: '钢铁之子' }
    },
    // 拾荒之王：拾荒者联盟声望最高
    salvage_king: {
        id: 'salvage_king', name: '拾荒之王', color: '#ffaa00',
        desc: '你成为拾荒者联盟的新任首领，带领他们在废土上继续搜寻旧世界的遗产。',
        condition: { type: 'faction_ending', faction: 'salvagers', level: 1 },
        flavor: '在废墟中，你找到了比瓶盖更重要的东西——意义。',
        reward: { title: '残骸王' }
    },
    // 锈轮合伙人：锈轮商会声望最高
    rustwheel_partner: {
        id: 'rustwheel_partner', name: '锈轮合伙人', color: '#cc2222',
        desc: '锈轮商会视你为最可信赖的合伙人，你获得了锈轮商会的分红权和专属走私路线。',
        condition: { type: 'faction_ending', faction: 'rustwheel', level: 1 },
        flavor: '在这个世界上，最可靠的不是枪炮，而是人脉。',
        reward: { title: '锈轮之友', income: 100 }
    },
    // 净土守护：净土农联声望最高
    earth_guardian: {
        id: 'earth_guardian', name: '净土守护', color: '#88cc44',
        desc: '你成为净土农联的守护者，保护着废土上最后的食物来源。',
        condition: { type: 'faction_ending', faction: 'pureearth', level: 1 },
        flavor: '食物是废土上最珍贵的东西，而你选择了守护它。',
        reward: { title: '净土之盾' }
    },
    // 灰烬信徒：灰烬之子声望最高
    ash_believer: {
        id: 'ash_believer', name: '灰烬信徒', color: '#999999',
        desc: '灰烬之子视你为先知，你的名字被写入了他们的经文。',
        condition: { type: 'faction_ending', faction: 'ashkins', level: 1 },
        flavor: '在灰烬中，你看到了秩序的种子。',
        reward: { title: '净化者' }
    },
    // 零点追寻者：收集7块零点碎片
    zero_seeker: {
        id: 'zero_seeker', name: '零点追寻者', color: '#44ff88',
        desc: '你找到了所有零点碎片，踏入了零点设施，面对了大寂静的真相。',
        condition: { type: 'zero_ending', fragments: 7 },
        flavor: '真相不一定美丽，但它让你自由。',
        reward: { title: '零点行者', ending: 'true' }
    },
    // 废土独狼：所有派系声望均未达到友善
    lone_wolf: {
        id: 'lone_wolf', name: '废土独狼', color: '#cccccc',
        desc: '你不属于任何派系，不受任何约束。在废土的每一个角落，你都是自由的传说。',
        condition: { type: 'lone_wolf' },
        flavor: '最好的归属，是没有归属。',
        reward: { title: '废土传奇', freeplay: true }
    }
};

// ========== 派系动态事件（派系战争） ==========
const FACTION_WAR_EVENTS = [
    {
        id: 'war_sal_ash', factions: ['salvagers', 'ashkins'],
        trigger: 'salvagers_rep >= 1 && ashkins_rep >= 1', // 双方都和玩家友好时触发
        name: '派系冲突：拾荒者 vs 灰烬之子',
        desc: '两个派系在边界爆发了冲突！路线可能受到影响。',
        effect: { routeDanger: 1.5, tradePriceShift: { food: 1.3, ammo: 1.2 } }
    },
    {
        id: 'war_iro_rus', factions: ['ironspine', 'rustwheel'],
        trigger: 'ironspine_rep >= 1 && rustwheel_rep >= 1',
        name: '秩序对峙：钢铁脊梁 vs 锈轮商会',
        desc: '钢铁脊梁对锈轮的走私活动发起了清剿！',
        effect: { rustwheelPriceMult: 1.5, ironspinePatrol: true }
    },
    {
        id: 'peace_all', factions: ['pureearth'],
        trigger: 'pureearth_rep >= 2',
        name: '丰收节：废土和平',
        desc: '净土农联发起了一次全废土范围的停火协议！',
        effect: { routeDanger: 0.7, allFactionRepBonus: 0.5 }
    }
];

// ========== v3.0 新增成就 ==========
const ACHIEVEMENTS_V3 = {
    // 派系传奇
    faction_master: {
        id: 'faction_master', category: 'factions', name: '派系大师',
        desc: '与所有派系达到友善以上', icon: '🏛️',
        condition: { type: 'all_factions_friendly', value: true },
        reward: { type: 'caps', value: 500 }, hidden: false
    },
    faction_ally: {
        id: 'faction_ally', category: 'factions', name: '派系盟友',
        desc: '与任意一个派系达到信赖', icon: '🤝',
        condition: { type: 'faction_rep', value: 2 },
        reward: { type: 'caps', value: 200 }, hidden: false
    },
    neutral_walker: {
        id: 'neutral_walker', category: 'factions', name: '中立行者',
        desc: '不使用武力解决3次强盗遭遇', icon: '⚖️',
        condition: { type: 'peaceful_resolutions', value: 3 },
        reward: { type: 'caps', value: 150 }, hidden: false
    },
    faction_warrior: {
        id: 'faction_warrior', category: 'factions', name: '派系战士',
        desc: '完成任意一个派系的所有任务链', icon: '⚔️',
        condition: { type: 'faction_mission_complete', value: 1 },
        reward: { type: 'caps', value: 300 }, hidden: false
    },
    faction_shopping: {
        id: 'faction_shopping', category: 'factions', name: '派系血拼',
        desc: '使用派系折扣购买10次商品', icon: '🛒',
        condition: { type: 'faction_trades', value: 10 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    // 零点追寻
    fragment_collector: {
        id: 'fragment_collector', category: 'zero', name: '碎片猎人',
        desc: '收集3块零点碎片', icon: '🔮',
        condition: { type: 'zero_fragments', value: 3 },
        reward: { type: 'caps', value: 300 }, hidden: false
    },
    truth_seeker: {
        id: 'truth_seeker', category: 'zero', name: '真相追寻者',
        desc: '收集全部7块零点碎片', icon: '🔍',
        condition: { type: 'zero_fragments', value: 7 },
        reward: { type: 'title', value: '零点行者' }, hidden: false
    },
    zero_activator: {
        id: 'zero_activator', category: 'zero', name: '零点启动者',
        desc: '触发真结局，进入零点设施', icon: '⚡',
        condition: { type: 'triggered_true_ending', value: true },
        reward: { type: 'title', value: '零点行者' }, hidden: true
    },
    // 角色故事
    crew_story_complete: {
        id: 'crew_story_complete', category: 'crew_stories', name: '命运交织',
        desc: '完成任意一个乘员的个人剧情', icon: '📖',
        condition: { type: 'crew_story_complete', value: 1 },
        reward: { type: 'caps', value: 200 }, hidden: false
    },
    all_crew_stories: {
        id: 'all_crew_stories', category: 'crew_stories', name: '废土群像',
        desc: '完成所有乘员的个人剧情', icon: '📚',
        condition: { type: 'all_crew_stories_complete', value: true },
        reward: { type: 'title', value: '灵魂收集者' }, hidden: true
    },
    bond_skills: {
        id: 'bond_skills', category: 'crew_stories', name: '羁绊之力',
        desc: '激活一个羁绊组合技能', icon: '✨',
        condition: { type: 'bond_skill_activated', value: 1 },
        reward: { type: 'caps', value: 150 }, hidden: false
    },
    // 易腐货物
    fresh_keeper: {
        id: 'fresh_keeper', category: 'perishable', name: '保鲜达人',
        desc: '将食物保持完好（100%质量）到达目的地', icon: '🧊',
        condition: { type: 'fresh_delivery', value: true },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    perishables_trader: {
        id: 'perishables_trader', category: 'perishable', name: '鲜活贸易',
        desc: '通过易腐货物贸易累计获利500瓶盖', icon: '🥬',
        condition: { type: 'perishable_profit', value: 500 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    // 收藏家
    collector_basic: {
        id: 'collector_basic', category: 'collectibles', name: '收藏入门',
        desc: '收集5种不同的收藏品', icon: '🗃️',
        condition: { type: 'collectibles', value: 5 },
        reward: { type: 'caps', value: 100 }, hidden: false
    },
    collector_advanced: {
        id: 'collector_advanced', category: 'collectibles', name: '收藏达人',
        desc: '收集20种不同的收藏品', icon: '🏺',
        condition: { type: 'collectibles', value: 20 },
        reward: { type: 'caps', value: 200 }, hidden: false
    },
    old_world_eyes: {
        id: 'old_world_eyes', category: 'collectibles', name: '旧世界之眼',
        desc: '收集全部旧世界记录', icon: '📜',
        condition: { type: 'all_old_world_records', value: true },
        reward: { type: 'title', value: '历史学家' }, hidden: true
    },
    // 结局
    every_ending: {
        id: 'every_ending', category: 'endings', name: '全结局制霸',
        desc: '体验所有8种结局', icon: '🎭',
        condition: { type: 'endings_count', value: 8 },
        reward: { type: 'title', value: '废土传奇' }, hidden: true
    },
    trade_ending: {
        id: 'trade_ending', category: 'endings', name: '商业传奇',
        desc: '达成「商业传奇」结局', icon: '💰',
        condition: { type: 'ending_achieved', value: 'trade_legend' },
        reward: { type: 'caps', value: 500 }, hidden: false
    },
    lone_ending: {
        id: 'lone_ending', category: 'endings', name: '废土独狼',
        desc: '达成「废土独狼」结局', icon: '🐺',
        condition: { type: 'ending_achieved', value: 'lone_wolf' },
        reward: { type: 'caps', value: 500 }, hidden: false
    },
    // 多周目
    newgame_plus: {
        id: 'newgame_plus', category: 'meta', name: '再来一局',
        desc: '完成一局游戏后开始新游戏', icon: '🔄',
        condition: { type: 'games_completed', value: 2 },
        reward: { type: 'caps', value: 300 }, hidden: true
    },
    veteran_player: {
        id: 'veteran_player', category: 'meta', name: '资深玩家',
        desc: '游玩5局游戏', icon: '🏅',
        condition: { type: 'games_completed', value: 5 },
        reward: { type: 'caps', value: 500 }, hidden: true
    },
    // 特殊隐藏
    wasteland_expert: {
        id: 'wasteland_expert', category: 'hidden', name: '废土专家',
        desc: '在废土老兵难度下达成分数超过10000', icon: '🏆',
        condition: { type: 'high_score', value: 10000 },
        reward: { type: 'title', value: '废土传奇' }, hidden: true
    },
    collector_extreme: {
        id: 'collector_extreme', category: 'hidden', name: '完美收藏家',
        desc: '收集全部收藏品', icon: '💎',
        condition: { type: 'all_collectibles', value: true },
        reward: { type: 'title', value: '收藏之王' }, hidden: true
    },
    ending_triggered_zero: {
        id: 'ending_triggered_zero', category: 'endings', name: '零点选择',
        desc: '在真结局中做出选择', icon: '⚡',
        condition: { type: 'true_ending_choice', value: true },
        reward: { type: 'title', value: '零点行者' }, hidden: true
    }
};

// 合并v3.0成就到主成就表
for (const [id, ach] of Object.entries(ACHIEVEMENTS_V3)) {
    ACHIEVEMENTS[id] = ach;
}

// 派系成就分类更新
ACHIEVEMENT_CATEGORIES.factions = { name: '派系传奇', icon: '🏛️', desc: '在派系博弈中找到自己的位置' };
ACHIEVEMENT_CATEGORIES.zero = { name: '零点追寻', icon: '🔮', desc: '追寻大寂静的真相' };
ACHIEVEMENT_CATEGORIES.crew_stories = { name: '角色故事', icon: '📖', desc: '与乘员建立深厚羁绊' };
ACHIEVEMENT_CATEGORIES.perishable = { name: '鲜活贸易', icon: '🥬', desc: '掌握易腐货物的经营之道' };
ACHIEVEMENT_CATEGORIES.collectibles = { name: '收藏家', icon: '🗃️', desc: '收集废土上的遗物与记忆' };
ACHIEVEMENT_CATEGORIES.endings = { name: '结局霸业', icon: '🎭', desc: '解锁所有结局' };
ACHIEVEMENT_CATEGORIES.meta = { name: '元成就', icon: '🏅', desc: '超越游戏本身的成就' };

// ========== 结局分数计算 ==========
const SCORE_WEIGHTS = {
    ordersCompleted: 50,
    distanceTraveled: 1,
    combatsWon: 30,
    moneyEarned: 0.5,
    eventsHandled: 10,
    achievements: 100,
    zeroFragments: 200,
    endingBonus: {
        trade_legend: 1000,
        lone_wolf: 1000,
        iron_alliance: 1500,
        salvage_king: 1500,
        rustwheel_partner: 1500,
        earth_guardian: 1500,
        ash_believer: 1500,
        zero_seeker: 3000
    }
};
