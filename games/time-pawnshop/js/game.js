// ============================================================
// 时间当铺 v4.1 - 游戏逻辑（含成就系统+隐藏事件+收藏品+真结局+二次来访+时间旅人）
// ============================================================

// ---- 跨周目持久化数据 ----
class MetaSave {
  constructor() {
    this.key = 'timePawnshop_meta';
    this.data = this._load();
  }
  _load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (!raw) return this._default();
      const data = JSON.parse(raw);
      // 迁移：老存档自动获得新字段
      const defaults = this._default();
      for (const key of Object.keys(defaults)) {
        if (!(key in data)) data[key] = defaults[key];
      }
      return data;
    } catch (e) { return this._default(); }
  }
  _default() {
    return {
      achievements: {},       // { id: timestamp }
      endingsSeen: {},        // { ending_close: true, ... }
      totalPlaythroughs: 0,
      allRipplesSeen: {},     // { rippleId: true } 跨周目
      allChoicesMade: {},     // { chen_army: true, chen_doctor: true, ... }
      allResonancesSeen: {},  // { resonanceId: true } 跨周目
      loadCount: {},          // { clientId: number } 读档次数
      titles: [],             // 已获得称号
      sprites: [],            // 已解锁精灵
      themes: [],             // 已解锁主题
      currentTitle: '',
      isNewGamePlus: false,
      collectibles: {},           // { silver_hairpin: true, ... }
      hiddenEventsTriggered: {},  // { linyuan_ghost: true, ... }
      shixianshengChoices: {},    // { ripple_accept: true, ripple_reject: true }
      trueEndingSeen: false,
      maxDaysSurvivedTimeOut: 0   // 时间耗尽结局最高天数
    };
  }
  save() {
    try { localStorage.setItem(this.key, JSON.stringify(this.data)); } catch(e) {}
  }
  hasAchievement(id) { return !!this.data.achievements[id]; }
  unlockAchievement(id) {
    if (this.data.achievements[id]) return false;
    this.data.achievements[id] = Date.now();
    // 处理奖励
    const ach = GameData.ACHIEVEMENTS[id];
    if (ach && ach.reward) {
      if (ach.reward.type === 'title') {
        if (!this.data.titles.includes(ach.reward.value))
          this.data.titles.push(ach.reward.value);
      }
      if (ach.reward.type === 'sprite') {
        if (!this.data.sprites.includes(ach.reward.value))
          this.data.sprites.push(ach.reward.value);
      }
      if (ach.reward.type === 'theme') {
        if (!this.data.themes.includes(ach.reward.value))
          this.data.themes.push(ach.reward.value);
      }
    }
    this.save();
    return true;
  }
  recordEnding(type) {
    this.data.endingsSeen[type] = true;
    this.data.totalPlaythroughs++;
    this.save();
  }
  recordRipple(id) {
    this.data.allRipplesSeen[id] = true;
    this.data.allChoicesMade[id] = true;
    this.save();
  }
  recordResonance(id) {
    this.data.allResonancesSeen[id] = true;
    this.save();
  }
  getUnlockedCount() { return Object.keys(this.data.achievements).length; }
  getTotalCount() { return Object.keys(GameData.ACHIEVEMENTS).length; }

  // 收藏品
  hasCollectible(id) { return !!this.data.collectibles[id]; }
  unlockCollectible(id) {
    if (this.data.collectibles[id]) return false;
    this.data.collectibles[id] = true;
    this.save();
    return true;
  }
  getAllCollectiblesCount() { return Object.keys(this.data.collectibles).length; }

  // 隐藏事件
  hasHiddenEvent(id) { return !!this.data.hiddenEventsTriggered[id]; }
  triggerHiddenEvent(id) {
    this.data.hiddenEventsTriggered[id] = true;
    this.save();
  }

  // 时先生选择
  recordShixianshengChoice(rippleId) {
    this.data.shixianshengChoices[rippleId] = true;
    this.save();
  }
}

// ---- 成就系统 ----
class AchievementSystem {
  constructor(game) {
    this.game = game;
    this.pendingNotifications = [];
    this.activeNotification = null;
    this.notifTimer = 0;
    this.notifDuration = 180; // 3 seconds at 60fps
  }

  // 检查并解锁成就
  check(id) {
    if (this.game.meta.hasAchievement(id)) return;
    if (this.game.meta.unlockAchievement(id)) {
      const ach = GameData.ACHIEVEMENTS[id];
      // 时间碎片奖励直接加到当前游戏
      if (ach.reward && ach.reward.type === 'time') {
        this.game.state.addTime(ach.reward.amount);
      }
      this.pendingNotifications.push(ach);
      this.game.audio.playSfx('select');
    }
  }

  // 批量检查常见条件
  checkAll() {
    const s = this.game.state;
    const m = this.game.meta;

    // 初识当铺
    if (s.completedClients['chenbo']) this.check('first_trade');
    if (Object.keys(s.purchasedItems).length > 0) this.check('first_upgrade');
    if (s.purchasedItems['repair_bell']) this.check('doorbell');
    if (s.day > 3) this.check('survive_3');
    if (s.purchasedItems['repair_bell'] && s.purchasedItems['polish_hourglass'] &&
        s.purchasedItems['light_lantern'] && s.purchasedItems['restore_mirror'] &&
        s.purchasedItems['wind_chime'] && s.purchasedItems['tune_clock'] &&
        s.purchasedItems['burn_incense'])
      this.check('apprentice');

    // 蝴蝶之翼
    if (m.data.allChoicesMade['chen_army'] && m.data.allChoicesMade['chen_doctor'])
      this.check('both_paths');
    if (s.completedClients['linxiaojie'] === 'butterfly')
      this.check('ghost_client');
    if (s.completedClients['linxiaojie'] === 'butterfly')
      this.check('first_ripple');
    // 共振：两个以上涟漪同时存在
    const rippleCount = Object.keys(s.ripples).length;
    if (rippleCount >= 2) this.check('resonance');
    // 看不见的线：发现陈伯和林小姐的联系
    if (s.hasRipple('chen_doctor') && s.completedClients['linxiaojie'])
      this.check('hidden_link');
    // 全图鉴
    const allSeen = GameData.ALL_RIPPLE_IDS.every(id => m.data.allRipplesSeen[id]);
    if (allSeen) this.check('all_ripples');
    // 共振相关
    if (Object.keys(s.triggeredResonances).length > 0) this.check('first_resonance');
    const allResSeen = Object.keys(GameData.RESONANCE_EFFECTS).every(id => m.data.allResonancesSeen[id]);
    if (allResSeen) this.check('all_resonances');
    // 六度分隔
    const allClients = ['chenbo', 'linxiaojie', 'xiaozhou', 'aheng', 'laowu', 'mystic'];
    if (allClients.every(id => s.completedClients[id])) this.check('six_connections');

    // 七度分隔（7角色全完成）
    const allClients7 = ['chenbo', 'linxiaojie', 'xiaozhou', 'aheng', 'laowu', 'mystic', 'shixiansheng'];
    if (allClients7.every(id => s.completedClients[id])) this.check('seven_connections');

    // 记忆深处
    if (s.unlockedMemories.includes('fragment1')) this.check('memory_1');
    if (s.unlockedMemories.includes('fragment2')) this.check('memory_2');
    if (s.unlockedMemories.includes('fragment3')) this.check('memory_3');
    if (s.unlockedMemories.includes('fragment4')) this.check('memory_4');
    if (s.unlockedMemories.includes('fragment5')) this.check('memory_5');
    if (s.unlockedMemories.includes('fragment6')) this.check('memory_6');
    if (s.unlockedMemories.length >= 6) this.check('who_am_i');
    if (s.completedClients['mystic']) this.check('truth_revealed');
    if (s.completedClients['mystic']) this.check('mirror_self');

    // 抉择之重
    if (s.hasRipple('chen_doctor')) this.check('healer_heart');
    if (s.hasRipple('chen_army')) this.check('iron_heart');
    if (s.hasRipple('lin_conservative')) this.check('last_farewell');
    if (s.hasRipple('lin_surgery')) this.check('last_gamble');
    if (s.hasRipple('zhou_send')) this.check('letter_delivered');
    if (s.hasRipple('zhou_burn')) this.check('letter_burned');
    if (s.hasRipple('heng_clock_run')) this.check('clock_runs');
    if (s.hasRipple('heng_clock_stop')) this.check('clock_stops');
    if (s.hasRipple('wu_develop')) this.check('photo_developed');
    if (s.hasRipple('wu_destroy')) this.check('photo_destroyed');
    if (s.hasRipple('ripple_accept')) this.check('accept_hourglass');
    if (s.hasRipple('ripple_reject')) this.check('break_hourglass');

    // 时先生
    if (s.completedClients['shixiansheng']) this.check('previous_owner');

    // 收藏品
    if (m.getAllCollectiblesCount() >= 5) this.check('all_collectibles');

    // 当铺主人
    if (s.timeFragments >= 200) this.check('time_rich');

    // 第七天
    if (s.day >= 7) this.check('day_seven');

    // 结局收藏家
    if (m.data.endingsSeen['ending_close']) this.check('ending_dawn');
    if (m.data.endingsSeen['ending_stay']) this.check('ending_eternal');
    if (m.data.endingsSeen['time_out']) this.check('ending_timeout');
    if (m.data.endingsSeen['ending_loop']) this.check('ending_loop_ach');
    if (m.data.endingsSeen['ending_close'] && m.data.endingsSeen['ending_stay'] &&
        m.data.endingsSeen['time_out']) this.check('triple_gate');
    if (m.data.endingsSeen['ending_close'] && m.data.endingsSeen['ending_stay'] &&
        m.data.endingsSeen['time_out'] && m.data.endingsSeen['ending_loop'])
      this.check('quad_gate');
    if (m.data.totalPlaythroughs >= 2 && m.data.isNewGamePlus) this.check('loop_person');

    // 真结局
    if (m.data.trueEndingSeen) this.check('seventh_sand');

    // 五重门（5种结局全部达成）
    if (m.data.endingsSeen['ending_close'] && m.data.endingsSeen['ending_stay'] &&
        m.data.endingsSeen['time_out'] && m.data.endingsSeen['ending_loop'] &&
        m.data.trueEndingSeen)
      this.check('five_gates');

    // 第八粒沙
    if (m.data.endingsSeen['ending_eighth_sand']) this.check('eighth_sand');

    // 六重门（6种结局全部达成）
    if (m.data.endingsSeen['ending_close'] && m.data.endingsSeen['ending_stay'] &&
        m.data.endingsSeen['time_out'] && m.data.endingsSeen['ending_loop'] &&
        m.data.trueEndingSeen && m.data.endingsSeen['ending_eighth_sand'])
      this.check('six_gates');
  }

  update() {
    if (this.activeNotification) {
      this.notifTimer--;
      if (this.notifTimer <= 0) this.activeNotification = null;
    }
    if (!this.activeNotification && this.pendingNotifications.length > 0) {
      this.activeNotification = this.pendingNotifications.shift();
      this.notifTimer = this.notifDuration;
    }
  }

  draw(renderer) {
    if (!this.activeNotification) return;
    const ach = this.activeNotification;
    const alpha = Math.min(1, this.notifTimer / 20, (this.notifDuration - this.notifTimer + 20) / 20);

    renderer.setAlpha(alpha * 0.95);
    renderer.fillRect(90, 28, 300, 42, '#1a1a2e');
    renderer.strokeRect(90, 28, 300, 42, '#ffcc44');
    renderer.setAlpha(alpha);

    // 星星
    const stars = '★'.repeat(ach.rarity) + '☆'.repeat(Math.max(0, 5 - ach.rarity));
    renderer.drawText('成就解锁!', 100, 32, '#ffcc44', 8);
    renderer.drawText(stars, 160, 32, '#ffaa22', 8);
    renderer.drawText(ach.name, 100, 46, '#ffffff', 11);
    renderer.drawText(ach.hidden ? '(隐藏成就)' : ach.description, 100, 60, '#aaaacc', 7);

    // 奖励提示
    if (ach.reward) {
      let rewardText = '';
      if (ach.reward.type === 'time') rewardText = `+${ach.reward.amount} ◈`;
      else if (ach.reward.type === 'title') rewardText = `称号: ${ach.reward.value}`;
      else if (ach.reward.type === 'sprite') rewardText = '精灵解锁';
      else if (ach.reward.type === 'theme') rewardText = '主题解锁';
      renderer.drawText(rewardText, 380, 50, '#88cc88', 8, 'right');
    }
    renderer.resetAlpha();
  }
}

// ---- 游戏状态 ----
class GameState {
  constructor() {
    this.timeFragments = 100;
    this.day = 1;
    this.maxDays = 30;
    this.shopLevel = 0;
    this.completedClients = {};
    this.ripples = {};
    this.purchasedItems = {};
    this.unlockedMemories = [];
    this.currentClient = null;
    this.gamePhase = 'title';
    this.endingType = null;
    this.ownerFragmentsFound = 0;
    this.dayClientServed = false;
    this.dayShopManaged = false;
    this.triggeredResonances = {};
    this.hiddenEventsTriggeredThisRun = {};

    // 成就追踪统计
    this.stats = {
      daysWithAction: 0,      // 有操作的天数
      totalUpgrades: 0,        // 升级次数
      hasLoaded: false,         // 是否读过档
      idleFrames: 0,            // 空闲帧数
      memoryStayFrames: {},     // 记忆场景停留帧数 { clientId: frames }
      choiceHesitateFrames: 0,  // 选择犹豫帧数
      peakTimeFragments: 100,   // 最高时间碎片
      dayActions: {}            // 每天是否有操作 { day: true }
    };
  }

  addTime(amount) {
    this.timeFragments += amount;
    if (this.timeFragments > this.stats.peakTimeFragments)
      this.stats.peakTimeFragments = this.timeFragments;
  }

  spendTime(amount) {
    if (this.timeFragments >= amount) {
      this.timeFragments -= amount;
      return true;
    }
    return false;
  }

  addRipple(id) { this.ripples[id] = true; }
  hasRipple(id) { return !!this.ripples[id]; }

  nextDay() {
    this.day++;
    this.timeFragments -= 5;
    this.dayClientServed = false;
    this.dayShopManaged = false;
  }

  isGameOver() {
    return this.timeFragments <= 0 || this.day > this.maxDays;
  }

  recordDayAction() {
    this.stats.dayActions[this.day] = true;
  }

  // 数据驱动：检查角色是否被蝴蝶效应阻止
  _isClientBlocked(clientId) {
    for (const effect of Object.values(GameData.BUTTERFLY_EFFECTS)) {
      if (effect.type === 'block_and_replace' &&
          effect.targetClient === clientId &&
          this.hasRipple(effect.triggerRipple)) {
        return effect;
      }
    }
    return null;
  }

  getAvailableClients(meta) {
    const clients = [];
    for (const [id, client] of Object.entries(GameData.CLIENTS)) {
      if (this.completedClients[id]) continue;
      if (client.unlockDay > this.day) continue;
      if (client.requiredShopLevel > this.shopLevel) continue;
      if (this._isClientBlocked(id)) continue;
      // 时先生特殊条件：仅在真身形态（有ending_stay）时通过标准客户流程
      if (client.metaCondition === 'shixiansheng') {
        if (!meta || !meta.data.endingsSeen['ending_stay']) continue;
        if (!this.purchasedItems['restore_mirror']) continue;
      }
      clients.push(client);
    }
    return clients;
  }

  getAvailableItems() {
    return GameData.SHOP_ITEMS.filter(item => {
      if (this.purchasedItems[item.id]) return false;
      if (item.shopLevelRequired > this.shopLevel) return false;
      return true;
    });
  }

  toSaveData() {
    return {
      timeFragments: this.timeFragments, day: this.day, maxDays: this.maxDays,
      shopLevel: this.shopLevel, completedClients: this.completedClients,
      ripples: this.ripples, purchasedItems: this.purchasedItems,
      unlockedMemories: this.unlockedMemories, ownerFragmentsFound: this.ownerFragmentsFound,
      triggeredResonances: this.triggeredResonances,
      hiddenEventsTriggeredThisRun: this.hiddenEventsTriggeredThisRun,
      stats: this.stats
    };
  }
  loadSaveData(data) { Object.assign(this, data); }
}

// ============================================================
// 标题场景
// ============================================================
class TitleScene {
  constructor(game) {
    this.game = game;
    this.time = 0;
    this.particles = new Engine.ParticleSystem();
    this.phase = 'title';
    this.introDialogs = [
      { speaker: '旁白', speakerColor: '#888888', text: '在城市最古老的巷弄深处，有一家没有招牌的店。' },
      { speaker: '旁白', speakerColor: '#888888', text: '人们传说，这里可以典当"时间"——用记忆换取命运的改变。' },
      { speaker: '旁白', speakerColor: '#888888', text: '而你，就是这家当铺的主人。' },
      { speaker: '旁白', speakerColor: '#888888', text: '只是……你不记得自己为什么会在这里。' },
      { speaker: '旁白', speakerColor: '#888888', text: '大钟敲响了。新的一天开始了。门外，似乎有人来了……' },
    ];
  }

  enter() {
    this.time = 0;
    this.phase = 'title';
    this.game.audio.playAmbient('title');
    // 检查雨天成就
    this._checkRainDay();
  }

  exit() { this.game.audio.stopMusic(); }

  _checkRainDay() {
    const now = new Date();
    const h = now.getHours();
    const isRainy = (h >= 2 && h <= 5 || h >= 18 && h <= 21) && now.getDate() % 2 === 1;
    if (isRainy) {
      this.game.achievements.check('rainy_visitor');
    }
  }

  update(input) {
    this.time++;
    if (this.time % 8 === 0) {
      this.particles.emit(Math.random() * 480, 320, 1, {
        colors: ['#ffcc44', '#aa88ff', '#4488cc'],
        speedMin: 0.3, speedMax: 0.8, lifeMin: 80, lifeMax: 150,
        dirMin: -Math.PI * 0.8, dirMax: -Math.PI * 0.2, sizeMin: 1, sizeMax: 3
      });
    }
    this.particles.update();

    if (this.phase === 'title') {
      if (this.time > 60 && (input.isClicked() || input.isKeyJustPressed('Space') || input.isKeyJustPressed('Enter'))) {
        this.game.audio.playSfx('click');

        // 检查新周目+
        const meta = this.game.meta;
        if (meta.data.totalPlaythroughs > 0) {
          meta.data.isNewGamePlus = true;
          meta.save();
          this.phase = 'intro';
          this.game.dialog.start(GameData.STORIES.easter_eggs.newgame_plus, () => {
            this.game.dialog.start(this.introDialogs, () => {
              this.game.state.gamePhase = 'shop';
              this.game.scenes.switchTo('shop');
            });
          });
        } else {
          this.phase = 'intro';
          this.game.dialog.start(this.introDialogs, () => {
            this.game.state.gamePhase = 'shop';
            this.game.scenes.switchTo('shop');
          });
        }
      }
    } else if (this.phase === 'intro') {
      this.game.dialog.update(input);
    }
  }

  draw(renderer) {
    renderer.clear('#08081a');
    for (let i = 0; i < 50; i++) {
      const sx = (i * 97.3 + this.time * 0.02) % 480;
      const sy = (i * 53.7) % 320;
      const bright = Math.sin(this.time * 0.03 + i) * 0.3 + 0.5;
      renderer.setAlpha(bright);
      renderer.fillRect(sx, sy, 1, 1, '#ffffff');
    }
    renderer.resetAlpha();
    this.particles.draw(renderer);

    const clockAlpha = Math.sin(this.time * 0.02) * 0.1 + 0.3;
    renderer.setAlpha(clockAlpha);
    renderer.fillCircle(240, 130, 50, '#1a1a3e');
    renderer.ctx.strokeStyle = '#4a4a8a'; renderer.ctx.lineWidth = 2;
    renderer.ctx.beginPath(); renderer.ctx.arc(240, 130, 50, 0, Math.PI * 2); renderer.ctx.stroke();
    const a1 = this.time * 0.02, a2 = this.time * 0.002;
    renderer.ctx.strokeStyle = '#8888cc'; renderer.ctx.lineWidth = 2;
    renderer.ctx.beginPath(); renderer.ctx.moveTo(240, 130);
    renderer.ctx.lineTo(240 + Math.cos(a1) * 30, 130 + Math.sin(a1) * 30); renderer.ctx.stroke();
    renderer.ctx.lineWidth = 1; renderer.ctx.beginPath(); renderer.ctx.moveTo(240, 130);
    renderer.ctx.lineTo(240 + Math.cos(a2) * 20, 130 + Math.sin(a2) * 20); renderer.ctx.stroke();
    renderer.resetAlpha();

    if (this.phase === 'title') {
      const titleAlpha = Math.min(1, this.time / 60);
      renderer.setAlpha(titleAlpha * 0.2);
      renderer.fillCircle(240, 210, 80, '#6644aa');
      renderer.setAlpha(titleAlpha);
      renderer.drawTextShadow('时 间 当 铺', 240, 195, '#e8d0ff', '#2a1a3e', 24, 'center');
      renderer.drawTextShadow('Time Pawnshop', 240, 225, '#8866aa', '#1a0a2e', 10, 'center');
      if (this.time > 60) {
        if (Math.sin(this.time * 0.06) > 0)
          renderer.drawTextShadow('— 点击开始 —', 240, 280, '#887766', '#000', 10, 'center');
      }
      renderer.resetAlpha();

      // 成就统计
      const unlocked = this.game.meta.getUnlockedCount();
      const total = this.game.meta.getTotalCount();
      if (unlocked > 0) {
        renderer.drawText(`成就: ${unlocked}/${total}`, 240, 300, '#555555', 8, 'center');
      }
    }

    renderer.drawText('v4.1', 460, 308, '#333', 8);
    this.game.dialog.draw(renderer);
    this.game.achievements.draw(renderer);
  }
}

// ============================================================
// 当铺场景
// ============================================================
class ShopScene {
  constructor(game) {
    this.game = game;
    this.time = 0;
    this.particles = new Engine.ParticleSystem();
    this.phase = 'idle';
    this.clientSprite = null;
    this.clientX = -30;
    this.clientTargetX = 170;
    this.floatingTexts = [];
    this.buttons = [];
    this.notification = null;
    this.notificationTimer = 0;
    this.idleTime = 0;
    this.idleTriggered = false;
  }

  enter(data) {
    this.time = 0;
    this.phase = 'idle';
    this.clientSprite = null;
    this.clientX = -30;
    this.idleTime = 0;
    this.idleTriggered = false;
    this.game.audio.playAmbient('shop');
    this._updateButtons();

    if (data && data.fromMemory) {
      this._showNotification(data.message || '记忆已归还');
      // 检查共振涟漪
      this._checkResonanceEffects();
    }
    if (data && data.butterflyEffect)
      this._handleButterflyEffect(data.butterflyClient);
    if (this.game.state.isGameOver()) {
      this.game.scenes.switchTo('ending', { type: 'time_out' });
      return;
    }

    // 检查隐藏事件（shop_enter触发类型）
    this._checkHiddenEvents('shop_enter');

    // 检查成就
    this.game.achievements.checkAll();
  }

  exit() {}

  _updateButtons() {
    this.buttons = [];
    const state = this.game.state;
    const clients = state.getAvailableClients(this.game.meta);

    if (!state.dayClientServed && clients.length > 0) {
      this.buttons.push({
        x: 50, y: 260, w: 90, h: 28, text: '接待客人', icon: '◆',
        action: () => this._startClientVisit()
      });
    }
    this.buttons.push({
      x: 155, y: 260, w: 90, h: 28, text: '经营当铺', icon: '◇',
      action: () => this.game.scenes.switchTo('manage')
    });
    this.buttons.push({
      x: 260, y: 260, w: 90, h: 28, text: '记忆殿堂', icon: '★',
      action: () => this.game.scenes.switchTo('achievements')
    });
    this.buttons.push({
      x: 365, y: 260, w: 90, h: 28, text: '结束今天', icon: '☽',
      action: () => this._endDay()
    });
  }

  _startClientVisit() {
    const clients = this.game.state.getAvailableClients(this.game.meta);
    if (clients.length === 0) return;
    const client = clients[0];
    this.game.state.currentClient = client;
    this.clientSprite = client.sprite;
    this.clientX = -30;
    this.phase = 'client_enter';
    this.game.audio.playSfx('door');
    this.game.state.recordDayAction();
    this.idleTime = 0;
  }

  // 数据驱动：选择问候语
  _selectGreeting(clientId, story) {
    // 检查是否有蝴蝶效应变体问候语
    for (const effect of Object.values(GameData.BUTTERFLY_EFFECTS)) {
      if (effect.type === 'greeting_variant' &&
          effect.targetClient === clientId &&
          this.game.state.hasRipple(effect.triggerRipple)) {
        const variantGreeting = story[effect.greetingKey];
        if (variantGreeting) return variantGreeting;
      }
    }
    // 回退到默认问候语
    return story.greeting || story.greeting_normal;
  }

  _endDay() {
    const state = this.game.state;
    state.nextDay();
    this.game.audio.playSfx('click');
    this.idleTime = 0;

    if (state.isGameOver()) {
      this.game.scenes.switchTo('ending', { type: 'time_out' });
      return;
    }

    this._showNotification(`第 ${state.day} 天 | 剩余时间: ${state.timeFragments}`);
    this._updateButtons();

    // 数据驱动蝴蝶效应检查
    const pendingButterfly = this._getPendingButterflyClients();
    if (pendingButterfly) {
      setTimeout(() => this._handleButterflyEffect(pendingButterfly), 1000);
    }

    this.game.achievements.checkAll();
  }

  // 数据驱动：查找待触发的蝴蝶效应客户
  _getPendingButterflyClients() {
    const state = this.game.state;
    for (const effect of Object.values(GameData.BUTTERFLY_EFFECTS)) {
      if (effect.type === 'block_and_replace' &&
          state.hasRipple(effect.triggerRipple) &&
          !state.completedClients[effect.targetClient]) {
        const client = GameData.CLIENTS[effect.targetClient];
        if (client && client.unlockDay <= state.day &&
            client.requiredShopLevel <= state.shopLevel) {
          return effect.targetClient;
        }
      }
    }
    return null;
  }

  // 数据驱动：处理蝴蝶效应
  _handleButterflyEffect(clientId) {
    const state = this.game.state;
    const blockEffect = state._isClientBlocked(clientId);
    if (!blockEffect) return;

    const story = GameData.STORIES[clientId];
    const dialogs = story[blockEffect.butterflyDialogs];
    if (!dialogs) return;

    this.phase = 'dialog';
    this.game.dialog.start(dialogs, () => {
      state.completedClients[clientId] = 'butterfly';
      state.addTime(blockEffect.bonusTime);
      this.game.audio.playSfx('ripple');
      this._showNotification(`蝴蝶效应! 时间碎片 +${blockEffect.bonusTime}`);
      this._addFloatingText(`+${blockEffect.bonusTime}`, 240, 180, '#ffcc44');
      this.phase = 'idle';
      this._updateButtons();
      this.game.achievements.checkAll();
    });
  }

  // 分支对话系统（时先生真身形态）
  _handleBranchingGreeting(client, story) {
    const bg = story.branchingGreeting;
    // 先播放介绍对话
    this.game.dialog.start(bg.introDialogs, () => {
      // 显示分支选择
      this.phase = 'dialog';
      this.game.dialog.showChoices(
        bg.branchChoice.map(b => ({ text: b.text, branchKey: b.branchKey })),
        (choice) => {
          const branchDialogs = bg[choice.branchKey];
          if (branchDialogs) {
            this.game.dialog.start(branchDialogs, () => {
              // 分支对话结束后进入记忆
              this.phase = 'memory_transition';
              this.game.scenes.switchTo('memory', { clientId: client.id });
            });
          } else {
            this.phase = 'memory_transition';
            this.game.scenes.switchTo('memory', { clientId: client.id });
          }
        }
      );
    });
  }

  // 隐藏事件系统
  _checkHiddenEvents(triggerType) {
    const state = this.game.state;
    const meta = this.game.meta;
    for (const [eventId, event] of Object.entries(GameData.HIDDEN_EVENTS)) {
      if (event.triggerType !== triggerType) continue;
      // 已在MetaSave中触发过的不再重复
      if (meta.hasHiddenEvent(eventId)) continue;
      // 本周目已触发的不再重复
      if (state.hiddenEventsTriggeredThisRun[eventId]) continue;
      // 检查条件
      if (!this._checkHiddenEventConditions(event.conditions, state, meta)) continue;
      // 触发事件
      this._fireHiddenEvent(event);
      return; // 每次只触发一个
    }
  }

  _checkHiddenEventConditions(conds, state, meta) {
    if (!conds) return true;
    // 需要的涟漪（当前周目）
    if (conds.ripples) {
      if (!conds.ripples.every(r => state.hasRipple(r))) return false;
    }
    // 需要的涟漪（跨周目，MetaSave中）
    if (conds.metaRipplesSeen) {
      if (!conds.metaRipplesSeen.every(r => meta.data.allRipplesSeen[r])) return false;
    }
    // 需要的购买项
    if (conds.purchasedItems) {
      if (!conds.purchasedItems.every(item => state.purchasedItems[item])) return false;
    }
    // 需要完成的客户
    if (conds.completedClients) {
      if (!conds.completedClients.every(c => state.completedClients[c])) return false;
    }
    // 空闲帧数检查
    if (conds.minIdleFrames) {
      if (this.idleTime < conds.minIdleFrames) return false;
    }
    // 需要看过的结局
    if (conds.metaEndingSeen) {
      for (const ending of Object.keys(conds.metaEndingSeen)) {
        if (!meta.data.endingsSeen[ending]) return false;
      }
    }
    // 需要没看过的结局
    if (conds.metaEndingNotSeen) {
      for (const ending of Object.keys(conds.metaEndingNotSeen)) {
        if (meta.data.endingsSeen[ending]) return false;
      }
    }
    // 需要看过真结局
    if (conds.metaTrueEndingSeen && !meta.data.trueEndingSeen) return false;
    // 需要time_out最高天数
    if (conds.metaMaxDays && (meta.data.maxDaysSurvivedTimeOut || 0) < conds.metaMaxDays) return false;
    // 需要全部收藏品
    if (conds.metaAllCollectibles && meta.getAllCollectiblesCount() < Object.keys(GameData.COLLECTIBLES).length) return false;
    // 需要看过的隐藏事件（跨周目）
    if (conds.metaHiddenEventSeen) {
      if (!conds.metaHiddenEventSeen.every(e => meta.hasHiddenEvent(e))) return false;
    }
    // 需要看过的任一涟漪组（跨周目，每组至少一个）
    if (conds.metaAnyRippleSeen) {
      for (const group of conds.metaAnyRippleSeen) {
        if (!group.some(r => meta.data.allRipplesSeen[r])) return false;
      }
    }
    return true;
  }

  _fireHiddenEvent(event) {
    const state = this.game.state;
    const meta = this.game.meta;
    // 获取对话内容
    let dialogs = event.dialogs;
    if (!dialogs && event.storyKey && event.greetingKey) {
      dialogs = GameData.STORIES[event.storyKey][event.greetingKey];
    }
    if (!dialogs) return;

    this.phase = 'dialog';
    this.game.audio.playSfx('ghost');
    this.game.dialog.start(dialogs, () => {
      // 发放奖励
      if (event.rewards) {
        if (event.rewards.time) {
          state.addTime(event.rewards.time);
          this._addFloatingText(`+${event.rewards.time}`, 240, 180, '#ffcc44');
        }
        if (event.rewards.collectible) {
          meta.unlockCollectible(event.rewards.collectible);
          this.game.audio.playSfx('collectible');
          const coll = GameData.COLLECTIBLES[event.rewards.collectible];
          if (coll) this._showNotification(`获得收藏品: ${coll.name}`);
        }
      }
      // 标记已触发
      meta.triggerHiddenEvent(event.id);
      state.hiddenEventsTriggeredThisRun[event.id] = true;

      // triggersEnding: 触发结局
      if (event.triggersEnding) {
        this.game.scenes.switchTo('ending', { type: event.triggersEnding });
        return;
      }

      // 隐藏事件相关成就
      if (event.id === 'linyuan_ghost') {
        this.game.achievements.check('mirror_ghost');
        this.game.achievements.check('patient_ghost');
      }
      if (event.id === 'silver_hairpin_reveal') {
        this.game.achievements.check('mothers_memento');
      }
      if (event.id === 'ghost_clock_tower') {
        this.game.achievements.check('midnight_ghost');
      }
      if (event.id === 'photo_mystery_text') {
        this.game.achievements.check('photo_secret');
      }
      if (event.id === 'lin_second_visit') this.game.achievements.check('lin_return');
      if (event.id === 'aheng_second_visit') this.game.achievements.check('aheng_return');
      if (event.id === 'laowu_second_visit') this.game.achievements.check('laowu_return');

      this.phase = 'idle';
      this._updateButtons();
      this.game.achievements.checkAll();
    });
  }

  // 检查共振涟漪
  _checkResonanceEffects() {
    const state = this.game.state;
    const meta = this.game.meta;
    for (const [resId, res] of Object.entries(GameData.RESONANCE_EFFECTS)) {
      if (state.triggeredResonances[resId]) continue;
      const allMet = res.requiredRipples.every(r => state.hasRipple(r));
      if (!allMet) continue;
      // 检查附加条件
      if (res.additionalCondition) {
        const ac = res.additionalCondition;
        if (ac.type === 'anyEndingSeen' && Object.keys(meta.data.endingsSeen).length === 0) continue;
        if (ac.type === 'hiddenEventTriggered' && !meta.hasHiddenEvent(ac.event)) continue;
        if (ac.type === 'hasCollectible' && !meta.hasCollectible(ac.item)) continue;
      }
      state.triggeredResonances[resId] = true;
      state.addTime(res.bonusTime);
      meta.recordResonance(resId);
      this.game.audio.playSfx('resonance');
      this._showNotification(`共振涟漪! ${res.name} 时间碎片 +${res.bonusTime}`);
      this._addFloatingText(`+${res.bonusTime}`, 240, 160, '#44ffaa');
      // 共振奖励收藏品
      if (res.collectibleReward) {
        const isNew = meta.unlockCollectible(res.collectibleReward);
        if (isNew) {
          this.game.audio.playSfx('collectible');
          const coll = GameData.COLLECTIBLES[res.collectibleReward];
          if (coll) {
            setTimeout(() => this._showNotification(`获得收藏品: ${coll.name}`), 2000);
          }
        }
      }
    }
  }

  _showNotification(text) { this.notification = text; this.notificationTimer = 180; }
  _addFloatingText(text, x, y, color = '#ffcc44') {
    this.floatingTexts.push({ text, x, y, color, life: 60, maxLife: 60 });
  }

  update(input) {
    this.time++;
    this.particles.update();

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 0.5; ft.life--;
      if (ft.life <= 0) this.floatingTexts.splice(i, 1);
    }
    if (this.notificationTimer > 0) this.notificationTimer--;

    // 烛火粒子
    if (this.time % 30 === 0) {
      this.particles.emit(300 + Math.random() * 10, 148, 1, {
        colors: ['#ffaa22', '#ff8800'], speedMin: 0.1, speedMax: 0.3,
        lifeMin: 20, lifeMax: 40, dirMin: -Math.PI * 0.7, dirMax: -Math.PI * 0.3,
        sizeMin: 1, sizeMax: 2
      });
    }

    switch (this.phase) {
      case 'idle':
        // 空闲检测（5分钟 = 18000帧@60fps）
        this.idleTime++;
        if (input.isClicked() || Object.keys(input.keyJustPressed).length > 0) {
          this.idleTime = 0;
        }
        if (this.idleTime > 18000 && !this.idleTriggered) {
          this.idleTriggered = true;
          this.game.achievements.check('waiting_one');
          this.game.state.addTime(5);
          this.phase = 'dialog';
          this.game.dialog.start(GameData.STORIES.easter_eggs.idle, () => {
            this._addFloatingText('+5', 240, 180, '#ffcc44');
            this.phase = 'idle';
          });
          break;
        }

        // 检查空闲触发的隐藏事件
        if (this.idleTime > 0 && this.idleTime % 600 === 0) {
          this._checkHiddenEvents('idle_in_shop');
          if (this.phase !== 'idle') break;
        }

        for (const btn of this.buttons) {
          if (input.isClickInRect(btn.x, btn.y, btn.w, btn.h)) {
            this.game.audio.playSfx('click');
            btn.action();
            break;
          }
        }
        break;

      case 'client_enter':
        this.clientX += 3;
        if (this.clientX >= this.clientTargetX) {
          this.clientX = this.clientTargetX;
          this.phase = 'dialog';
          const client = this.game.state.currentClient;
          const story = GameData.STORIES[client.id];
          // 泛化分支对话系统
          if (story.branchingGreeting) {
            const bg = story.branchingGreeting;
            if (bg.baseGreeting) {
              // 时先生：先播放基础问候再分支
              this.game.dialog.start(story[bg.baseGreeting], () => {
                this._handleBranchingGreeting(client, story);
              });
            } else {
              // 阿蘅/老吴/小周：先播放greeting再直接进入分支
              const greeting = this._selectGreeting(client.id, story);
              this.game.dialog.start(greeting, () => {
                this._handleBranchingGreeting(client, story);
              });
            }
          } else {
            const greeting = this._selectGreeting(client.id, story);
            this.game.dialog.start(greeting, () => {
              this.phase = 'memory_transition';
              this.game.scenes.switchTo('memory', { clientId: client.id });
            });
          }
        }
        break;

      case 'dialog':
        this.game.dialog.update(input);
        break;
    }
  }

  draw(renderer) {
    GameData.BACKGROUNDS.shop.draw(renderer, this.time);

    // 涟漪图谱（墙上可视化）
    this._drawRippleGraph(renderer);

    const shopkeepBob = Math.sin(this.time * 0.03) * 1;
    renderer.drawSprite(GameData.SPRITES.shopkeeper, 280, 130 + shopkeepBob, 3);

    if (this.clientSprite && (this.phase === 'client_enter' || this.phase === 'dialog')) {
      const sprite = GameData.SPRITES[this.clientSprite];
      if (sprite) {
        const bob = Math.sin(this.time * 0.04) * 1;
        renderer.drawSprite(sprite, this.clientX, 140 + bob, 3);
      }
    }

    this.particles.draw(renderer);
    this._drawHUD(renderer);

    if (this.phase === 'idle') this._drawButtons(renderer);

    for (const ft of this.floatingTexts) {
      const alpha = ft.life / ft.maxLife;
      renderer.setAlpha(alpha);
      renderer.drawTextShadow(ft.text, ft.x, ft.y, ft.color, '#000', 12, 'center');
      renderer.resetAlpha();
    }

    if (this.notificationTimer > 0) {
      const alpha = Math.min(1, this.notificationTimer / 30);
      renderer.setAlpha(alpha * 0.9);
      const nw = this.notification.length * 8 + 40;
      renderer.fillRect(240 - nw / 2, 76, nw, 24, '#1a1a3e');
      renderer.strokeRect(240 - nw / 2, 76, nw, 24, '#6a4a8a');
      renderer.setAlpha(alpha);
      renderer.drawText(this.notification, 240, 81, '#e0c0ff', 10, 'center');
      renderer.resetAlpha();
    }

    this.game.dialog.draw(renderer);
    this.game.achievements.draw(renderer);
  }

  _drawRippleGraph(renderer) {
    const state = this.game.state;
    const ripples = state.ripples;
    if (Object.keys(ripples).length === 0 && Object.keys(state.completedClients).length === 0) return;

    // 8节点布局
    const nodes = [
      { id: 'shop', x: 195, y: 35, label: '铺' },
      { id: 'chenbo', x: 155, y: 50, label: '陈' },
      { id: 'linxiaojie', x: 195, y: 55, label: '林' },
      { id: 'xiaozhou', x: 235, y: 50, label: '周' },
      { id: 'aheng', x: 165, y: 75, label: '蘅' },
      { id: 'laowu', x: 225, y: 75, label: '吴' },
      { id: 'mystic', x: 195, y: 90, label: '?' },
      { id: 'shixiansheng', x: 195, y: 105, label: '时' }
    ];

    // 连线定义（基于因果关系）
    const edges = [
      // 铺 -> 各角色
      { from: 'shop', to: 'chenbo', condition: () => state.completedClients['chenbo'] },
      { from: 'shop', to: 'linxiaojie', condition: () => state.completedClients['linxiaojie'] },
      { from: 'shop', to: 'xiaozhou', condition: () => state.completedClients['xiaozhou'] },
      { from: 'shop', to: 'aheng', condition: () => state.completedClients['aheng'] },
      { from: 'shop', to: 'laowu', condition: () => state.completedClients['laowu'] },
      { from: 'shop', to: 'mystic', condition: () => state.completedClients['mystic'] },
      // 蝴蝶效应连线
      { from: 'chenbo', to: 'linxiaojie', condition: () => ripples['chen_doctor'] || ripples['chen_army'], color: () => ripples['chen_doctor'] ? '#44ff88' : '#ff8844' },
      { from: 'linxiaojie', to: 'xiaozhou', condition: () => ripples['lin_conservative'] || ripples['lin_surgery'], color: () => '#88aaff' },
      { from: 'chenbo', to: 'aheng', condition: () => ripples['chen_army'] || ripples['chen_doctor'], color: () => '#ffaa44' },
      { from: 'xiaozhou', to: 'laowu', condition: () => ripples['zhou_send'] || ripples['zhou_burn'], color: () => '#aa88ff' },
      // 神秘老人连线
      { from: 'aheng', to: 'mystic', condition: () => state.completedClients['mystic'], color: () => '#8888ff' },
      { from: 'laowu', to: 'mystic', condition: () => state.completedClients['mystic'], color: () => '#8888ff' },
      // 时先生连线
      { from: 'mystic', to: 'shixiansheng', condition: () => state.completedClients['shixiansheng'], color: () => '#8899bb' },
      { from: 'shop', to: 'shixiansheng', condition: () => state.completedClients['shixiansheng'], color: () => '#8899bb' },
    ];

    renderer.setAlpha(0.35);

    // 绘制连线
    for (const edge of edges) {
      if (!edge.condition()) continue;
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      if (!fromNode || !toNode) continue;
      const color = edge.color ? edge.color() : '#6644aa';
      const glow = Math.sin(this.time * 0.05) * 0.15 + 0.25;
      renderer.setAlpha(glow);
      renderer.ctx.strokeStyle = color;
      renderer.ctx.lineWidth = 1;
      renderer.ctx.beginPath();
      renderer.ctx.moveTo(fromNode.x, fromNode.y);
      renderer.ctx.lineTo(toNode.x, toNode.y);
      renderer.ctx.stroke();
    }

    // 绘制节点
    renderer.setAlpha(0.35);
    for (const n of nodes) {
      if (n.id === 'shop') {
        renderer.fillCircle(n.x, n.y, 5, '#aa88ff');
        renderer.drawText(n.label, n.x, n.y + 6, '#aa88ff', 6, 'center');
        continue;
      }
      const active = state.completedClients[n.id];
      const color = active ? '#aa88ff' : '#333355';
      renderer.fillCircle(n.x, n.y, 4, color);
      renderer.drawText(n.label, n.x, n.y + 5, color, 6, 'center');
    }

    renderer.resetAlpha();
  }

  _drawHUD(renderer) {
    const state = this.game.state;
    renderer.setAlpha(0.8);
    renderer.fillRect(0, 0, 480, 22, '#0a0a1e');
    renderer.resetAlpha();
    renderer.drawText(`第 ${state.day} 天`, 10, 5, '#aaaacc', 10);
    renderer.drawText(`时间碎片: ${state.timeFragments}`, 140, 5, '#ffcc44', 10);
    // 5级星级显示
    const maxStars = 5;
    const filledStars = Math.min(state.shopLevel + 1, maxStars);
    renderer.drawText(`当铺等级: ${'★'.repeat(filledStars)}${'☆'.repeat(maxStars - filledStars)}`, 310, 5, '#aa88ff', 10);

    // 成就小徽章
    const uc = this.game.meta.getUnlockedCount();
    if (uc > 0) renderer.drawText(`✦${uc}`, 465, 5, '#ffaa22', 9, 'right');
  }

  _drawButtons(renderer) {
    for (const btn of this.buttons) {
      const hover = this.game.input.isHoverInRect(btn.x, btn.y, btn.w, btn.h);
      renderer.fillRect(btn.x, btn.y, btn.w, btn.h, hover ? '#3a2a5e' : '#2a1a3e');
      renderer.strokeRect(btn.x, btn.y, btn.w, btn.h, hover ? '#aa88cc' : '#4a3a6a');
      renderer.drawText(btn.icon + ' ' + btn.text, btn.x + btn.w / 2, btn.y + 8,
        hover ? '#fff' : '#ccaaee', 10, 'center');
    }
  }
}

// ============================================================
// 记忆场景
// ============================================================
class MemoryScene {
  constructor(game) {
    this.game = game;
    this.time = 0;
    this.clientId = null;
    this.storyData = null;
    this.phase = 'enter';
    this.particles = new Engine.ParticleSystem();
    this.rippleEffect = new Engine.RippleEffect();
    this.enterTimer = 0;
    this.exitTimer = 0;
    this.choiceWaitTime = 0;
  }

  enter(data) {
    this.time = 0;
    this.clientId = data.clientId;
    this.storyData = GameData.STORIES[this.clientId].memory;
    this.phase = 'enter';
    this.enterTimer = 0;
    this.exitTimer = 0;
    this.choiceWaitTime = 0;
    this.rippleEffect = new Engine.RippleEffect();
    this.game.audio.playAmbient('memory');
  }

  exit() { this.game.audio.stopMusic(); }

  update(input) {
    this.time++;
    this.particles.update();
    this.rippleEffect.update();

    // 记忆停留时间追踪
    if (!this.game.state.stats.memoryStayFrames[this.clientId])
      this.game.state.stats.memoryStayFrames[this.clientId] = 0;
    this.game.state.stats.memoryStayFrames[this.clientId]++;

    if (this.phase === 'enter') {
      this.enterTimer++;
      if (this.enterTimer % 4 === 0) {
        this.particles.emit(240, 160, 3, {
          colors: ['#aa88ff', '#6644aa', '#ccaaff'],
          speedMin: 1, speedMax: 3, lifeMin: 20, lifeMax: 40, sizeMin: 1, sizeMax: 3
        });
      }
      if (this.enterTimer > 60) {
        this.phase = 'dialog';
        this.game.dialog.start(this.storyData.dialogs, () => {
          this.phase = 'choice';
          this.choiceWaitTime = 0;
          // 构建选择列表（可能含隐藏选项）
          const choices = this._buildChoices();
          this.game.dialog.showChoices(choices, (choice, index) => {
            this._onChoice(choice, index);
          });
        });
      }
      return;
    }

    // 选择犹豫时间追踪
    if (this.phase === 'choice') {
      this.choiceWaitTime++;
      this.game.state.stats.choiceHesitateFrames = this.choiceWaitTime;

      // 隐藏成就：在陈伯记忆中犹豫超过30秒
      if (this.clientId === 'chenbo' && this.choiceWaitTime > 1800)
        this.game.achievements.check('fathers_shadow');

      // 隐藏成就：在林小姐记忆中停留超过30秒（诗人）
      if (this.clientId === 'linxiaojie' &&
          this.game.state.stats.memoryStayFrames['linxiaojie'] > 1800)
        this.game.achievements.check('poet');
    }

    if (this.phase === 'dialog' || this.phase === 'choice' || this.phase === 'result')
      this.game.dialog.update(input);

    if (this.phase === 'exit') {
      this.exitTimer++;
      if (this.exitTimer > 60) this._returnToShop();
    }

    if (this.time % 15 === 0) {
      this.particles.emit(Math.random() * 480, Math.random() * 320, 1, {
        colors: ['#aa88ff22', '#6644aa44'], speedMin: 0.05, speedMax: 0.2,
        lifeMin: 40, lifeMax: 80, sizeMin: 1, sizeMax: 2, dirMin: -Math.PI, dirMax: 0
      });
    }
  }

  // 构建选择列表，注入隐藏选项
  _buildChoices() {
    const choices = [...this.storyData.choices];
    if (this.storyData.hiddenChoice) {
      const hc = this.storyData.hiddenChoice;
      const allMet = hc.condition.every(r => this.game.state.hasRipple(r));
      if (allMet) {
        choices.push(hc.choice);
      }
    }
    return choices;
  }

  _onChoice(choice, index) {
    this.game.state.addRipple(choice.rippleId);
    this.game.meta.recordRipple(choice.rippleId);
    this.game.audio.playSfx('ripple');
    this.rippleEffect.add(240, 160);

    this.particles.emit(240, 160, 20, {
      colors: ['#aa88ff', '#ffcc44', '#6644aa'],
      speedMin: 1, speedMax: 4, lifeMin: 30, lifeMax: 60, sizeMin: 1, sizeMax: 3
    });

    this.phase = 'result';
    this.game.dialog.start(choice.result, () => {
      const endingKey = this._getEndingKey(choice.rippleId);
      const endingDialogs = GameData.STORIES[this.clientId][endingKey];
      if (endingDialogs) {
        this.game.dialog.start(endingDialogs, () => {
          this._playConditionalDeparture(choice.rippleId, () => this._completeMemory(choice));
        });
      } else {
        this._playConditionalDeparture(choice.rippleId, () => this._completeMemory(choice));
      }
    });
  }

  _getEndingKey(rippleId) {
    const map = {
      'chen_army': 'ending_army', 'chen_doctor': 'ending_doctor',
      'lin_surgery': 'ending_surgery', 'lin_conservative': 'ending_conservative',
      'zhou_send': 'ending_send', 'zhou_burn': 'ending_burn',
      'heng_clock_run': 'ending_clock_run', 'heng_clock_stop': 'ending_clock_stop',
      'wu_develop': 'ending_develop', 'wu_destroy': 'ending_destroy',
      'ending_close': 'ending_close', 'ending_stay': 'ending_stay',
      'ending_loop': 'ending_loop',
      'ripple_accept': 'ending_accept', 'ripple_reject': 'ending_reject'
    };
    return map[rippleId] || 'ending';
  }

  _playConditionalDeparture(rippleId, onComplete) {
    const story = GameData.STORIES[this.clientId];
    if (!story.conditionalDeparture) { onComplete(); return; }
    const meta = this.game.meta;
    for (const dep of story.conditionalDeparture) {
      if (dep.afterRipple !== rippleId) continue;
      let met = true;
      if (dep.metaRipplesSeen && !dep.metaRipplesSeen.every(r => meta.data.allRipplesSeen[r])) met = false;
      if (dep.metaHiddenEventSeen && !dep.metaHiddenEventSeen.every(e => meta.hasHiddenEvent(e))) met = false;
      if (met) { this.game.dialog.start(dep.dialogs, onComplete); return; }
    }
    onComplete();
  }

  _completeMemory(choice) {
    const state = this.game.state;
    const meta = this.game.meta;
    const client = GameData.CLIENTS[this.clientId];
    state.completedClients[this.clientId] = choice.rippleId;
    state.addTime(client.timeReward);
    state.dayClientServed = true;
    this.game.audio.playSfx('timeGain');
    this._checkOwnerMemoryUnlock();

    // 时先生特殊处理
    if (this.clientId === 'shixiansheng') {
      meta.recordShixianshengChoice(choice.rippleId);
      // 收藏品奖励
      if (choice.rippleId === 'ripple_accept') {
        meta.unlockCollectible('red_string');
        this.game.audio.playSfx('collectible');
      } else if (choice.rippleId === 'ripple_reject') {
        meta.unlockCollectible('ash_fragment');
        this.game.audio.playSfx('collectible');
      }
    }

    this.game.achievements.checkAll();

    if (choice.rippleId === 'ending_close' || choice.rippleId === 'ending_stay' ||
        choice.rippleId === 'ending_loop') {
      state.endingType = choice.rippleId;
      // 极限生存检查
      if (state.timeFragments <= 10) this.game.achievements.check('clutch');
    }

    this.phase = 'exit';
  }

  _checkOwnerMemoryUnlock() {
    const state = this.game.state;
    for (const mem of GameData.OWNER_MEMORIES) {
      if (state.unlockedMemories.includes(mem.id)) continue;
      let unlock = false;
      // 通用解锁条件匹配
      if (mem.unlockCondition.startsWith('complete_')) {
        const clientId = mem.unlockCondition.replace('complete_', '');
        if (state.completedClients[clientId]) unlock = true;
      } else if (state.purchasedItems[mem.unlockCondition]) {
        unlock = true;
      }
      if (unlock) { state.unlockedMemories.push(mem.id); state.ownerFragmentsFound++; }
    }
  }

  _returnToShop() {
    const state = this.game.state;
    if (state.endingType) {
      this.game.scenes.switchTo('ending', { type: state.endingType });
      return;
    }

    // 时先生完成后检查真结局条件
    if (this.clientId === 'shixiansheng' && this._checkTrueEndingConditions()) {
      this.game.scenes.switchTo('ending', { type: 'ending_seventh_sand' });
      return;
    }

    // 数据驱动蝴蝶效应检查
    const pendingButterfly = this._findPendingButterfly();

    this.game.scenes.switchTo('shop', {
      fromMemory: true,
      message: `记忆归还完毕 | 时间碎片 +${GameData.CLIENTS[this.clientId].timeReward}`,
      butterflyEffect: !!pendingButterfly,
      butterflyClient: pendingButterfly
    });
  }

  _checkTrueEndingConditions() {
    const meta = this.game.meta;
    // 需要3个基础结局
    const basicEndings = ['ending_close', 'ending_stay', 'ending_loop'];
    if (!basicEndings.every(e => meta.data.endingsSeen[e])) return false;
    // 需要时先生两种选择都做过
    if (!meta.data.shixianshengChoices['ripple_accept']) return false;
    if (!meta.data.shixianshengChoices['ripple_reject']) return false;
    // 需要5件收藏品
    const allCollectibles = Object.keys(GameData.COLLECTIBLES);
    if (!allCollectibles.every(c => meta.hasCollectible(c))) return false;
    return true;
  }

  _findPendingButterfly() {
    const state = this.game.state;
    for (const effect of Object.values(GameData.BUTTERFLY_EFFECTS)) {
      if (effect.type === 'block_and_replace' &&
          state.hasRipple(effect.triggerRipple) &&
          !state.completedClients[effect.targetClient]) {
        const client = GameData.CLIENTS[effect.targetClient];
        if (client && client.unlockDay <= state.day &&
            client.requiredShopLevel <= state.shopLevel) {
          return effect.targetClient;
        }
      }
    }
    return null;
  }

  draw(renderer) {
    const bg = GameData.BACKGROUNDS[this.storyData.background];
    if (bg) bg.draw(renderer, this.time);
    else renderer.clear('#1a1a2e');

    renderer.setAlpha(0.1);
    renderer.fillRect(0, 0, 480, 320, '#220044');
    renderer.resetAlpha();
    for (let y = 0; y < 320; y += 3) {
      renderer.setAlpha(0.04); renderer.fillRect(0, y, 480, 1, '#000000');
    }
    renderer.resetAlpha();

    this.particles.draw(renderer);
    this.rippleEffect.draw(renderer);

    if (this.phase === 'enter') {
      const alpha = 1 - this.enterTimer / 60;
      renderer.setAlpha(alpha);
      renderer.fillRect(0, 0, 480, 320, '#0a0a12');
      renderer.resetAlpha();
      if (this.enterTimer > 20) {
        renderer.setAlpha(Math.min(1, (this.enterTimer - 20) / 20));
        renderer.drawTextShadow(this.storyData.title, 240, 140, '#e0c0ff', '#000', 16, 'center');
        renderer.drawTextShadow(this.storyData.description, 240, 170, '#aa88cc', '#000', 9, 'center');
        renderer.resetAlpha();
      }
    }
    if (this.phase === 'exit') {
      renderer.setAlpha(this.exitTimer / 60);
      renderer.fillRect(0, 0, 480, 320, '#0a0a12');
      renderer.resetAlpha();
    }

    renderer.setAlpha(0.6);
    renderer.drawText('◈ 记忆潜入中', 10, 306, '#aa88ff', 8);
    renderer.resetAlpha();

    this.game.dialog.draw(renderer);
    this.game.achievements.draw(renderer);
  }
}

// ============================================================
// 经营场景
// ============================================================
class ManageScene {
  constructor(game) {
    this.game = game;
    this.time = 0;
    this.items = [];
    this.memoryFragments = [];
    this.scrollY = 0;
    this.notification = null;
    this.notificationTimer = 0;
  }

  enter() { this.time = 0; this.scrollY = 0; this._refreshItems(); }
  exit() {}

  _refreshItems() {
    this.items = this.game.state.getAvailableItems();
    this.memoryFragments = GameData.OWNER_MEMORIES.filter(m =>
      this.game.state.unlockedMemories.includes(m.id));
  }
  _showNotification(text) { this.notification = text; this.notificationTimer = 120; }

  update(input) {
    this.time++;
    if (this.notificationTimer > 0) this.notificationTimer--;

    if (input.isClickInRect(10, 10, 80, 24) || input.isKeyJustPressed('Escape')) {
      this.game.audio.playSfx('click');
      this.game.scenes.switchTo('shop');
      return;
    }

    const startY = 80;
    for (let i = 0; i < this.items.length; i++) {
      const iy = startY + i * 56 - this.scrollY;
      if (input.isClickInRect(30, iy, 420, 48)) { this._purchaseItem(this.items[i]); break; }
    }

    const fragStartY = startY + this.items.length * 56 + 40;
    for (let i = 0; i < this.memoryFragments.length; i++) {
      const fy = fragStartY + i * 40 - this.scrollY;
      if (input.isClickInRect(30, fy, 420, 34)) {
        this.game.audio.playSfx('select');
        const frag = this.memoryFragments[i];
        this.game.dialog.start([
          { speaker: '记忆碎片', speakerColor: '#ffcc44', text: frag.title },
          { speaker: '旁白', speakerColor: '#888888', text: frag.text }
        ]);
        break;
      }
    }

    if (input.isKeyDown('ArrowDown')) this.scrollY += 3;
    if (input.isKeyDown('ArrowUp')) this.scrollY = Math.max(0, this.scrollY - 3);
    this.game.dialog.update(input);
  }

  _purchaseItem(item) {
    const state = this.game.state;
    if (state.timeFragments < item.cost) {
      this.game.audio.playSfx('negative');
      this._showNotification('时间碎片不足!');
      return;
    }

    // 精打细算成就：低于20时升级
    if (state.timeFragments < 20) this.game.achievements.check('frugal');

    state.spendTime(item.cost);
    state.purchasedItems[item.id] = true;
    state.stats.totalUpgrades++;
    state.recordDayAction();
    if (item.shopLevelGrant > state.shopLevel) state.shopLevel = item.shopLevelGrant;
    if (item.id === 'polish_hourglass') { state.maxDays += 10; state.addTime(50); }

    // 点香炉效果：额外记忆碎片
    if (item.id === 'burn_incense') { state.addTime(20); }

    this.game.audio.playSfx('timeGain');
    this._showNotification(`已购买: ${item.name} | ${item.effect}`);
    this._refreshItems();

    if (item.id === 'light_lantern') {
      const mem = GameData.OWNER_MEMORIES.find(m => m.unlockCondition === 'light_lantern');
      if (mem && !state.unlockedMemories.includes(mem.id)) {
        state.unlockedMemories.push(mem.id);
        state.ownerFragmentsFound++;
        this._refreshItems();
        setTimeout(() => {
          this.game.audio.playSfx('ripple');
          this._showNotification('解锁了新的记忆碎片!');
        }, 500);
      }
    }

    this.game.achievements.checkAll();
  }

  draw(renderer) {
    renderer.clear('#0e0e1e');
    renderer.fillGradientRect(0, 0, 480, 40, '#1a1a3e', '#0e0e1e');
    renderer.drawTextShadow('◇ 当铺经营', 240, 12, '#e0c0ff', '#000', 14, 'center');

    const backHover = this.game.input.isHoverInRect(10, 10, 80, 24);
    renderer.fillRect(10, 10, 80, 24, backHover ? '#3a2a5e' : '#2a1a3e');
    renderer.strokeRect(10, 10, 80, 24, '#4a3a6a');
    renderer.drawText('← 返回', 20, 15, backHover ? '#fff' : '#aaa', 10);
    renderer.drawText(`时间碎片: ${this.game.state.timeFragments}`, 380, 15, '#ffcc44', 10, 'right');

    renderer.fillRect(20, 55, 440, 1, '#333355');
    renderer.drawText('可用升级:', 30, 60, '#8888aa', 10);

    const startY = 80;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const iy = startY + i * 56 - this.scrollY;
      if (iy < 40 || iy > 310) continue;
      const hover = this.game.input.isHoverInRect(30, iy, 420, 48);
      const canAfford = this.game.state.timeFragments >= item.cost;
      renderer.fillRect(30, iy, 420, 48, hover ? '#2a2244' : '#1a1a2e');
      renderer.strokeRect(30, iy, 420, 48, hover ? '#6a4a8a' : '#333355');
      renderer.drawText(item.name, 44, iy + 6, canAfford ? '#e0c0ff' : '#666666', 12);
      renderer.drawText(item.description, 44, iy + 24, canAfford ? '#aa88cc' : '#555555', 8);
      renderer.drawText(`${item.cost} ◈`, 420, iy + 10, canAfford ? '#ffcc44' : '#665533', 10, 'right');
      renderer.drawText(item.effect, 420, iy + 28, '#668866', 8, 'right');
    }
    if (this.items.length === 0)
      renderer.drawText('暂无可用升级', 240, startY + 10, '#555555', 10, 'center');

    const fragStartY = startY + this.items.length * 56 + 30;
    if (this.memoryFragments.length > 0) {
      renderer.fillRect(20, fragStartY - 10, 440, 1, '#333355');
      renderer.drawText(`记忆碎片 (${this.memoryFragments.length}/${GameData.OWNER_MEMORIES.length}):`, 30, fragStartY, '#ffcc44', 10);
      for (let i = 0; i < this.memoryFragments.length; i++) {
        const frag = this.memoryFragments[i];
        const fy = fragStartY + 20 + i * 40 - this.scrollY;
        if (fy < 40 || fy > 310) continue;
        const hover = this.game.input.isHoverInRect(30, fy, 420, 34);
        renderer.fillRect(30, fy, 420, 34, hover ? '#2a2a1e' : '#1a1a1e');
        renderer.strokeRect(30, fy, 420, 34, '#555533');
        renderer.drawText('◈ ' + frag.title, 44, fy + 10, '#ffcc88', 10);
      }
    }

    // 收藏品展示
    const collectibles = Object.values(GameData.COLLECTIBLES)
      .filter(c => this.game.meta.hasCollectible(c.id));
    if (collectibles.length > 0) {
      const collStartY = fragStartY + (this.memoryFragments.length > 0 ? 20 + this.memoryFragments.length * 40 + 20 : 0);
      renderer.fillRect(20, collStartY - 10, 440, 1, '#335533');
      const totalColls = Object.keys(GameData.COLLECTIBLES).length;
      renderer.drawText(`信物 (${collectibles.length}/${totalColls}):`, 30, collStartY, '#88ccaa', 10);
      for (let i = 0; i < collectibles.length; i++) {
        const coll = collectibles[i];
        const cy = collStartY + 20 + i * 34 - this.scrollY;
        if (cy < 40 || cy > 310) continue;
        renderer.fillRect(30, cy, 420, 28, '#1a1e1a');
        renderer.strokeRect(30, cy, 420, 28, '#335533');
        renderer.drawText('◆ ' + coll.name, 44, cy + 4, '#88ccaa', 10);
        renderer.drawText(coll.description, 44, cy + 16, '#667766', 7);
      }
    }

    if (this.notificationTimer > 0) {
      const alpha = Math.min(1, this.notificationTimer / 30);
      renderer.setAlpha(alpha * 0.9);
      const nw = this.notification.length * 8 + 40;
      renderer.fillRect(240 - nw / 2, 290, nw, 24, '#1a3a1a');
      renderer.strokeRect(240 - nw / 2, 290, nw, 24, '#4a8a4a');
      renderer.setAlpha(alpha);
      renderer.drawText(this.notification, 240, 295, '#aaffaa', 10, 'center');
      renderer.resetAlpha();
    }

    this.game.dialog.draw(renderer);
    this.game.achievements.draw(renderer);
  }
}

// ============================================================
// 成就展示场景（记忆殿堂）
// ============================================================
class AchievementScene {
  constructor(game) {
    this.game = game;
    this.time = 0;
    this.selectedCategory = 'basics';
    this.scrollY = 0;
    this.particles = new Engine.ParticleSystem();
    this.categories = Object.keys(GameData.ACHIEVEMENT_CATEGORIES);
  }

  enter() { this.time = 0; this.scrollY = 0; }
  exit() {}

  update(input) {
    this.time++;
    this.particles.update();

    if (this.time % 20 === 0) {
      this.particles.emit(Math.random() * 480, 320, 1, {
        colors: ['#ffcc4444', '#aa88ff44'],
        speedMin: 0.1, speedMax: 0.3, lifeMin: 60, lifeMax: 100,
        dirMin: -Math.PI * 0.8, dirMax: -Math.PI * 0.2, sizeMin: 1, sizeMax: 2
      });
    }

    // 返回
    if (input.isClickInRect(10, 10, 80, 24) || input.isKeyJustPressed('Escape')) {
      this.game.audio.playSfx('click');
      this.game.scenes.switchTo('shop');
      return;
    }

    // 分类标签点击
    const tabY = 50;
    let tabX = 15;
    for (const cat of this.categories) {
      const catDef = GameData.ACHIEVEMENT_CATEGORIES[cat];
      const tw = catDef.name.length * 10 + 20;
      if (input.isClickInRect(tabX, tabY, tw, 20)) {
        this.selectedCategory = cat;
        this.scrollY = 0;
        this.game.audio.playSfx('click');
      }
      tabX += tw + 6;
    }

    // 滚动
    if (input.isKeyDown('ArrowDown')) this.scrollY += 4;
    if (input.isKeyDown('ArrowUp')) this.scrollY = Math.max(0, this.scrollY - 4);
  }

  draw(renderer) {
    renderer.clear('#08081a');
    this.particles.draw(renderer);

    // 标题
    renderer.fillGradientRect(0, 0, 480, 40, '#1a1a3e', '#08081a');
    renderer.drawTextShadow('★ 记忆殿堂', 240, 8, '#ffcc88', '#000', 14, 'center');
    renderer.drawText('"每一块碎片，都是某个时间线上的你"', 240, 26, '#666688', 8, 'center');

    // 返回按钮
    const backHover = this.game.input.isHoverInRect(10, 10, 80, 24);
    renderer.fillRect(10, 10, 80, 24, backHover ? '#3a2a5e' : '#2a1a3e');
    renderer.strokeRect(10, 10, 80, 24, '#4a3a6a');
    renderer.drawText('← 返回', 20, 15, backHover ? '#fff' : '#aaa', 10);

    // 总进度
    const uc = this.game.meta.getUnlockedCount();
    const tc = this.game.meta.getTotalCount();
    renderer.drawText(`${uc}/${tc} (${Math.floor(uc / tc * 100)}%)`, 465, 15, '#ffcc44', 9, 'right');

    // 分类标签
    const tabY = 50;
    let tabX = 15;
    for (const cat of this.categories) {
      const catDef = GameData.ACHIEVEMENT_CATEGORIES[cat];
      const tw = catDef.name.length * 10 + 20;
      const active = this.selectedCategory === cat;
      const hover = this.game.input.isHoverInRect(tabX, tabY, tw, 20);
      renderer.fillRect(tabX, tabY, tw, 20, active ? '#2a1a3e' : hover ? '#1a1a2e' : '#0e0e1e');
      renderer.strokeRect(tabX, tabY, tw, 20, active ? catDef.color : '#333355');
      renderer.drawText(catDef.icon + ' ' + catDef.name, tabX + 6, tabY + 5,
        active ? catDef.color : '#666688', 8);

      // 该分类已解锁数
      const catAchs = Object.values(GameData.ACHIEVEMENTS).filter(a => a.category === cat);
      const catUnlocked = catAchs.filter(a => this.game.meta.hasAchievement(a.id)).length;
      if (catUnlocked > 0) {
        renderer.drawText(`${catUnlocked}`, tabX + tw - 8, tabY + 2, '#ffcc44', 7, 'right');
      }
      tabX += tw + 6;
    }

    // 成就列表
    const achievements = Object.values(GameData.ACHIEVEMENTS)
      .filter(a => a.category === this.selectedCategory);
    const listY = 78;

    renderer.save();
    renderer.ctx.beginPath();
    renderer.ctx.rect(0, listY, 480, 242);
    renderer.ctx.clip();

    for (let i = 0; i < achievements.length; i++) {
      const ach = achievements[i];
      const ay = listY + i * 46 - this.scrollY;
      if (ay < listY - 46 || ay > 320) continue;

      const unlocked = this.game.meta.hasAchievement(ach.id);
      const bgColor = unlocked ? '#1a1a2e' : '#0e0e18';
      const borderColor = unlocked ? '#4a3a6a' : '#222233';

      renderer.fillRect(15, ay, 450, 40, bgColor);
      renderer.strokeRect(15, ay, 450, 40, borderColor);

      if (unlocked) {
        const stars = '★'.repeat(ach.rarity);
        renderer.drawText(stars, 25, ay + 4, '#ffaa22', 8);
        renderer.drawText(ach.name, 25 + ach.rarity * 10 + 5, ay + 4, '#e0c0ff', 11);
        const desc = ach.hidden ? (ach.revealedDesc || ach.description) : ach.description;
        renderer.drawText(desc, 25, ay + 22, '#aa88cc', 8);

        if (ach.reward) {
          let tag = '';
          if (ach.reward.type === 'time') tag = `+${ach.reward.amount}◈`;
          else if (ach.reward.type === 'title') tag = ach.reward.value;
          else if (ach.reward.type === 'sprite') tag = '精灵';
          else if (ach.reward.type === 'theme') tag = '主题';
          else if (ach.reward.type === 'clue') tag = '线索';
          renderer.drawText(tag, 455, ay + 14, '#668866', 8, 'right');
        }
      } else {
        renderer.drawText('🔒', 25, ay + 4, '#444444', 10);
        if (ach.hidden) {
          renderer.drawText('???', 45, ay + 4, '#444455', 11);
          renderer.drawText('隐藏成就 — 继续探索吧', 25, ay + 22, '#333344', 8);
        } else {
          renderer.drawText(ach.name, 45, ay + 4, '#555566', 11);
          renderer.drawText(ach.description, 25, ay + 22, '#333344', 8);
        }
        const stars = '☆'.repeat(ach.rarity);
        renderer.drawText(stars, 455, ay + 14, '#333344', 8, 'right');
      }
    }
    renderer.restore();

    // 底部当前称号
    const meta = this.game.meta.data;
    if (meta.titles.length > 0) {
      renderer.fillRect(0, 300, 480, 20, '#0a0a1e');
      const title = meta.currentTitle || meta.titles[meta.titles.length - 1];
      renderer.drawText(`当前称号: 「${title}」`, 240, 305, '#aa88cc', 9, 'center');
    }

    this.game.achievements.draw(renderer);
  }
}

// ============================================================
// 结局场景
// ============================================================
class EndingScene {
  constructor(game) {
    this.game = game;
    this.time = 0;
    this.type = 'time_out';
    this.phase = 'fadeIn';
    this.particles = new Engine.ParticleSystem();
    this.textLines = [];
    this.displayedLines = 0;
    this.lineTimer = 0;
  }

  enter(data) {
    this.time = 0;
    this.type = data ? data.type : 'time_out';
    this.phase = 'fadeIn';
    this.displayedLines = 0;
    this.lineTimer = 0;
    this.game.audio.playAmbient('ending');
    this._setupEnding();

    // 标记真结局
    if (this.type === 'ending_seventh_sand') {
      this.game.meta.data.trueEndingSeen = true;
      this.game.meta.save();
    }

    // 跟踪time_out最高天数
    if (this.type === 'time_out') {
      const currentDay = this.game.state.day;
      if (currentDay > this.game.meta.data.maxDaysSurvivedTimeOut) {
        this.game.meta.data.maxDaysSurvivedTimeOut = currentDay;
        this.game.meta.save();
      }
    }

    // 标记第八粒沙
    if (this.type === 'ending_eighth_sand') {
      this.game.meta.data.endingsSeen['ending_eighth_sand'] = true;
      this.game.meta.save();
    }

    // 记录结局
    this.game.meta.recordEnding(this.type);

    // 检查完美经营
    const state = this.game.state;
    const allDaysActive = Object.keys(state.stats.dayActions).length >= state.day - 1;
    if (allDaysActive && state.day > 3) this.game.achievements.check('perfect_run');

    // 守财奴检查
    if (state.stats.totalUpgrades === 0 && (this.type === 'ending_close' || this.type === 'ending_stay' || this.type === 'ending_loop'))
      this.game.achievements.check('miser');

    // 无悔者检查
    if (!state.stats.hasLoaded && (this.type === 'ending_close' || this.type === 'ending_stay' || this.type === 'ending_loop'))
      this.game.achievements.check('no_regret');

    this.game.achievements.checkAll();
  }

  exit() {}

  _setupEnding() {
    switch (this.type) {
      case 'ending_close':
        this.textLines = [
          { text: '【 终章 · 晨光 】', color: '#e0c0ff', size: 16 },
          { text: '', color: '#000', size: 8 },
          { text: '时间当铺的大门缓缓关闭。', color: '#cccccc', size: 10 },
          { text: '你走出那扇门，走进了真实的世界。', color: '#cccccc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '你失去了操纵时间的能力，', color: '#aaaaaa', size: 10 },
          { text: '但你重新拥有了自己的过去。', color: '#aaaaaa', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '那些被你改写的记忆，那些做出的选择——', color: '#aa88cc', size: 10 },
          { text: '它们不会消失。它们已经成为新的真实。', color: '#aa88cc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '"时间不是用来典当的。"', color: '#ffcc88', size: 12 },
          { text: '"它是用来活过的。"', color: '#ffcc88', size: 12 },
          { text: '', color: '#000', size: 8 },
          { text: '—— 终 ——', color: '#e0c0ff', size: 14 },
        ]; break;
      case 'ending_stay':
        this.textLines = [
          { text: '【 终章 · 永恒 】', color: '#e0c0ff', size: 16 },
          { text: '', color: '#000', size: 8 },
          { text: '你重新坐回柜台后方。', color: '#cccccc', size: 10 },
          { text: '时钟继续转动，门铃再次响起。', color: '#cccccc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '一位新的客人推门而入——', color: '#aaaaaa', size: 10 },
          { text: '他的眼中，有着似曾相识的迷茫。', color: '#aaaaaa', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '你微笑着说："欢迎光临时间当铺。"', color: '#aa88cc', size: 10 },
          { text: '"在这里，每一段过去都值得被珍视。"', color: '#aa88cc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '也许这就是你存在的意义——', color: '#ffcc88', size: 12 },
          { text: '在时间的缝隙中，守护那些被遗忘的选择。', color: '#ffcc88', size: 12 },
          { text: '', color: '#000', size: 8 },
          { text: '—— 终 ——', color: '#e0c0ff', size: 14 },
        ]; break;
      case 'ending_loop':
        this.textLines = [
          { text: '【 终章 · 闭环 】', color: '#aa88ff', size: 16 },
          { text: '', color: '#000', size: 8 },
          { text: '五条时间线在你的指尖交汇。', color: '#cccccc', size: 10 },
          { text: '岔路口的少年、病房里的女孩、未寄出的信——', color: '#cccccc', size: 10 },
          { text: '钟楼最后的回响、暗房中浮现的面容。', color: '#cccccc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '它们不是分离的故事。', color: '#aaaaaa', size: 10 },
          { text: '它们是同一张网的不同丝线。', color: '#aaaaaa', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '你不是囚徒，也不是掌柜。', color: '#aa88cc', size: 10 },
          { text: '你是这张网的编织者。', color: '#aa88cc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '每一个"如果"都不会消失。', color: '#ffcc88', size: 12 },
          { text: '它们都成了"曾经"的一部分。', color: '#ffcc88', size: 12 },
          { text: '', color: '#000', size: 8 },
          { text: '"时间不是线，不是环。它是网。"', color: '#44ffaa', size: 12 },
          { text: '"而每一个交叉点，都是一个故事。"', color: '#44ffaa', size: 12 },
          { text: '', color: '#000', size: 8 },
          { text: '—— 真·终 ——', color: '#aa88ff', size: 14 },
        ]; break;
      case 'ending_seventh_sand':
        this.textLines = [
          { text: '【 真·终章 · 第七粒沙 】', color: '#ffcc88', size: 16 },
          { text: '', color: '#000', size: 8 },
          { text: '沙漏里曾有七粒沙。', color: '#cccccc', size: 10 },
          { text: '每一粒都是一个人的遗憾——被收集，被封存，被用来点亮这间当铺。', color: '#cccccc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '第一粒沙是一个少年的岔路口。', color: '#d0a878', size: 10 },
          { text: '第二粒沙是一个女儿的眼泪。', color: '#aa4466', size: 10 },
          { text: '第三粒沙是一封未寄出的信。', color: '#4a8aba', size: 10 },
          { text: '第四粒沙是一座停摆的钟。', color: '#ba6a3a', size: 10 },
          { text: '第五粒沙是一卷未冲洗的底片。', color: '#7a7a8a', size: 10 },
          { text: '第六粒沙是一个站在镜前的人。', color: '#8888cc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '而第七粒沙……', color: '#ffcc88', size: 12 },
          { text: '是你。', color: '#ffcc88', size: 14 },
          { text: '', color: '#000', size: 8 },
          { text: '你接过了沙漏，又打碎了它。你关上了门，又推开了它。', color: '#aa88cc', size: 10 },
          { text: '你看到了所有的选择，所有的涟漪，所有的交汇——', color: '#aa88cc', size: 10 },
          { text: '然后你把它们都收进了口袋。', color: '#aa88cc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '银簪、铜戒指、碎玻璃、灰烬、红绳。', color: '#e0c0ff', size: 10 },
          { text: '五件遗物，五个故事的交叉点，五段被守护的时间。', color: '#e0c0ff', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '时间当铺的灯笼缓缓熄灭。', color: '#888888', size: 10 },
          { text: '不是因为时间耗尽，而是因为——', color: '#888888', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '所有需要被改写的过去，都已经被改写了。', color: '#ffcc88', size: 12 },
          { text: '所有需要被守护的记忆，都已经被守护了。', color: '#ffcc88', size: 12 },
          { text: '', color: '#000', size: 8 },
          { text: '时间当铺，永久歇业。', color: '#e0c0ff', size: 14 },
          { text: '感谢光临。', color: '#e0c0ff', size: 14 },
          { text: '', color: '#000', size: 8 },
          { text: '—— 真·终 ——', color: '#ffcc88', size: 16 },
        ]; break;
      case 'ending_eighth_sand':
        this.textLines = [
          { text: '【 隐·终章 · 第八粒沙 】', color: '#ff8866', size: 16 },
          { text: '', color: '#000', size: 8 },
          { text: '沙漏碎了。', color: '#cccccc', size: 10 },
          { text: '但碎片之间，有一粒沙从未存在过——直到现在。', color: '#cccccc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '它是所有未被选择的选择的总和。', color: '#aaaaaa', size: 10 },
          { text: '是从军时没有学医的那条路，是手术台上没有犹豫的那一刀。', color: '#d0a878', size: 10 },
          { text: '是寄出的信同时也被烧掉的瞬间。', color: '#4a8aba', size: 10 },
          { text: '是钟走到尽头的同时也被修好的那个除夕夜。', color: '#ba6a3a', size: 10 },
          { text: '是底片冲洗出来又被投入火中的那个暗房下午。', color: '#7a7a8a', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '一个穿着混搭年代衣裳的人从沙漏碎片中站了起来。', color: '#aa88ff', size: 10 },
          { text: '他有一半白发一半黑发。他的左眼映着1962年的烈日，右眼映着2010年的秋雨。', color: '#aa88ff', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '"我是所有人，也不是任何人。"', color: '#e0c0ff', size: 12 },
          { text: '"我是每一个岔路口没有被走过的那条路。"', color: '#e0c0ff', size: 12 },
          { text: '', color: '#000', size: 8 },
          { text: '他微笑着走向门口。门外站着一个少年、一个女儿、一个邮差、', color: '#cccccc', size: 10 },
          { text: '一个守钟人、一个照相师、一个老人、一个掌柜。', color: '#cccccc', size: 10 },
          { text: '他们各自走向各自的方向。', color: '#cccccc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '而你站在当铺中央，看着空荡荡的沙漏底座。', color: '#888888', size: 10 },
          { text: '上面刻着一行字，是你从未注意过的：', color: '#888888', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '"时间不需要当铺。当铺需要时间。"', color: '#ffcc88', size: 14 },
          { text: '', color: '#000', size: 8 },
          { text: '时间当铺，永久歇业。感谢光临。', color: '#e0c0ff', size: 14 },
          { text: '—— 以及，欢迎回家。 ——', color: '#ff8866', size: 16 },
        ]; break;
      default:
        this.textLines = [
          { text: '【 时间耗尽 】', color: '#aa4444', size: 16 },
          { text: '', color: '#000', size: 8 },
          { text: '沙漏中最后一粒沙落下。', color: '#cccccc', size: 10 },
          { text: '当铺的灯光渐渐黯淡。', color: '#cccccc', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '你没能找到所有的答案，', color: '#aaaaaa', size: 10 },
          { text: '但你帮助过的那些人，会记住你的选择。', color: '#aaaaaa', size: 10 },
          { text: '', color: '#000', size: 8 },
          { text: '"时间到了。"', color: '#886666', size: 12 },
          { text: '', color: '#000', size: 8 },
          { text: '—— 未完待续 ——', color: '#aa8888', size: 14 },
        ]; break;
    }
  }

  update(input) {
    this.time++;
    this.particles.update();

    if (this.phase === 'fadeIn' && this.time > 60) this.phase = 'text';
    if (this.phase === 'text') {
      this.lineTimer++;
      if (this.lineTimer > 40 && this.displayedLines < this.textLines.length) {
        this.lineTimer = 0; this.displayedLines++;
      }
    }

    if (this.time % 5 === 0) {
      const colors = this.type === 'ending_close' ? ['#ffcc44', '#ffeeaa']
        : this.type === 'ending_stay' ? ['#aa88ff', '#6644aa']
        : this.type === 'ending_loop' ? ['#44ffaa', '#88ffcc', '#aa88ff']
        : this.type === 'ending_seventh_sand' ? ['#ffcc88', '#aa88ff', '#44ffaa', '#ff8866', '#88ccff']
        : this.type === 'ending_eighth_sand' ? ['#ff8866', '#ffcc88', '#aa88ff', '#44ffaa', '#88ccff', '#e0c0ff']
        : ['#884444', '#aa6666'];
      this.particles.emit(Math.random() * 480, 320, 1, {
        colors, speedMin: 0.2, speedMax: 0.6, lifeMin: 60, lifeMax: 120,
        dirMin: -Math.PI * 0.8, dirMax: -Math.PI * 0.2, sizeMin: 1, sizeMax: 2
      });
    }

    if (this.displayedLines >= this.textLines.length) {
      if (input.isClicked() || input.isKeyJustPressed('Space')) {
        // 重置游戏状态
        this.game.state = new GameState();
        this.game.scenes.switchTo('title');
      }
    }
  }

  draw(renderer) {
    renderer.clear('#08081a');
    this.particles.draw(renderer);

    if (this.phase === 'fadeIn') {
      const alpha = Math.min(1, this.time / 60);
      renderer.setAlpha(1 - alpha);
      renderer.fillRect(0, 0, 480, 320, '#000000');
      renderer.resetAlpha();
      return;
    }

    const startY = 40;
    for (let i = 0; i < this.displayedLines; i++) {
      const line = this.textLines[i];
      const alpha = Math.min(1, (this.displayedLines - i) * 0.3);
      renderer.setAlpha(alpha);
      renderer.drawTextShadow(line.text, 240, startY + i * 18, line.color, '#000', line.size, 'center');
    }
    renderer.resetAlpha();

    if (this.displayedLines >= this.textLines.length) {
      if (Math.sin(this.time * 0.05) > 0)
        renderer.drawText('点击重新开始', 240, 300, '#666666', 9, 'center');

      const state = this.game.state;
      const clientCount = Object.keys(state.completedClients).length;
      const fragCount = state.ownerFragmentsFound;
      const achCount = this.game.meta.getUnlockedCount();
      renderer.setAlpha(0.5);
      renderer.drawText(
        `客人: ${clientCount} | 碎片: ${fragCount}/${GameData.OWNER_MEMORIES.length} | 天数: ${state.day} | 成就: ${achCount}`,
        240, 286, '#555555', 8, 'center');
      renderer.resetAlpha();
    }

    this.game.achievements.draw(renderer);
  }
}

// ============================================================
// 主游戏类
// ============================================================
class Game {
  constructor() {
    const canvas = document.getElementById('gameCanvas');
    this.renderer = new Engine.PixelRenderer(canvas, 480, 320);
    this.input = new Engine.InputManager(canvas);
    this.audio = new Engine.AudioManager();
    this.dialog = new Engine.DialogSystem();
    this.scenes = new Engine.SceneManager();
    this.save = new Engine.SaveManager();
    this.meta = new MetaSave();
    this.state = new GameState();
    this.achievements = new AchievementSystem(this);

    this.scenes.register('title', new TitleScene(this));
    this.scenes.register('shop', new ShopScene(this));
    this.scenes.register('memory', new MemoryScene(this));
    this.scenes.register('manage', new ManageScene(this));
    this.scenes.register('achievements', new AchievementScene(this));
    this.scenes.register('ending', new EndingScene(this));

    this.scenes.switchImmediate('title');

    const initAudio = () => {
      this.audio.init();
      if (this.scenes.currentName === 'title') this.audio.playAmbient('title');
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio);
    window.addEventListener('keydown', initAudio);
  }

  update() {
    this.scenes.update(this.input);
    this.achievements.update();
    this.input.endFrame();
  }

  draw() {
    this.scenes.draw(this.renderer);
  }

  run() {
    const loop = () => { this.update(); this.draw(); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
}

window.Game = Game;
window.GameState = GameState;
