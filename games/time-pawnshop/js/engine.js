// ============================================================
// 时间当铺 - 游戏引擎
// ============================================================

// ---- 像素渲染器 ----
class PixelRenderer {
  constructor(canvas, width = 480, height = 320) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = width;
    this.height = height;
    canvas.width = width;
    canvas.height = height;
    this.ctx.imageSmoothingEnabled = false;
    this.scale = 1;
    this._resize();
    window.addEventListener('resize', () => this._resize());
  }

  _resize() {
    const maxW = window.innerWidth;
    const maxH = window.innerHeight;
    this.scale = Math.min(Math.floor(maxW / this.width), Math.floor(maxH / this.height));
    if (this.scale < 1) this.scale = 1;
    this.canvas.style.width = this.width * this.scale + 'px';
    this.canvas.style.height = this.height * this.scale + 'px';
  }

  clear(color = '#0a0a12') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  // 绘制像素精灵 (compact string format)
  drawSprite(spriteData, x, y, scale = 1, flipX = false) {
    const { palette, width, data } = spriteData;
    const rows = data.trim().split('\n').map(r => r.trim());
    const ctx = this.ctx;
    for (let row = 0; row < rows.length; row++) {
      for (let col = 0; col < rows[row].length; col++) {
        const ch = rows[row][col];
        if (ch === '.' || ch === ' ') continue;
        const colorIdx = parseInt(ch, 16);
        if (isNaN(colorIdx) || !palette[colorIdx]) continue;
        ctx.fillStyle = palette[colorIdx];
        const px = flipX ? x + (width - 1 - col) * scale : x + col * scale;
        ctx.fillRect(px, y + row * scale, scale, scale);
      }
    }
  }

  // 绘制动画精灵帧
  drawSpriteFrame(spriteData, frameIndex, x, y, scale = 1, flipX = false) {
    if (spriteData.frames) {
      const frame = spriteData.frames[frameIndex % spriteData.frames.length];
      this.drawSprite({ palette: spriteData.palette, width: spriteData.width, data: frame }, x, y, scale, flipX);
    } else {
      this.drawSprite(spriteData, x, y, scale, flipX);
    }
  }

  // 绘制矩形
  fillRect(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
  }

  // 绘制带边框的矩形
  strokeRect(x, y, w, h, color, lineWidth = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(Math.floor(x) + 0.5, Math.floor(y) + 0.5, Math.floor(w), Math.floor(h));
  }

  // 绘制像素文字
  drawText(text, x, y, color = '#fff', size = 8, align = 'left') {
    const ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.font = `${size}px "Pixel", monospace`;
    ctx.textAlign = align;
    ctx.textBaseline = 'top';
    ctx.fillText(text, Math.floor(x), Math.floor(y));
  }

  // 绘制带阴影的文字
  drawTextShadow(text, x, y, color = '#fff', shadowColor = '#000', size = 8, align = 'left') {
    this.drawText(text, x + 1, y + 1, shadowColor, size, align);
    this.drawText(text, x, y, color, size, align);
  }

  // 绘制渐变矩形
  fillGradientRect(x, y, w, h, color1, color2, vertical = true) {
    const ctx = this.ctx;
    const grad = vertical
      ? ctx.createLinearGradient(x, y, x, y + h)
      : ctx.createLinearGradient(x, y, x + w, y);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    ctx.fillStyle = grad;
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
  }

  // 绘制圆
  fillCircle(x, y, r, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(Math.floor(x), Math.floor(y), r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  // 设置透明度
  setAlpha(alpha) {
    this.ctx.globalAlpha = alpha;
  }

  resetAlpha() {
    this.ctx.globalAlpha = 1;
  }

  // 保存/恢复状态
  save() { this.ctx.save(); }
  restore() { this.ctx.restore(); }
}

// ---- 输入管理器 ----
class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = {};
    this.keyJustPressed = {};
    this.mouse = { x: 0, y: 0, clicked: false, down: false };
    this._prevKeys = {};

    window.addEventListener('keydown', e => {
      this.keys[e.code] = true;
      this.keyJustPressed[e.code] = true;
    });
    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });

    canvas.addEventListener('mousemove', e => this._updateMouse(e));
    canvas.addEventListener('mousedown', e => {
      this._updateMouse(e);
      this.mouse.down = true;
      this.mouse.clicked = true;
    });
    canvas.addEventListener('mouseup', e => {
      this.mouse.down = false;
    });
    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      const t = e.touches[0];
      this._updateMouse(t);
      this.mouse.down = true;
      this.mouse.clicked = true;
    }, { passive: false });
    canvas.addEventListener('touchend', e => {
      e.preventDefault();
      this.mouse.down = false;
    }, { passive: false });
    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      this._updateMouse(e.touches[0]);
    }, { passive: false });
  }

  _updateMouse(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    this.mouse.x = (e.clientX - rect.left) * scaleX;
    this.mouse.y = (e.clientY - rect.top) * scaleY;
  }

  isKeyJustPressed(code) {
    return !!this.keyJustPressed[code];
  }

  isKeyDown(code) {
    return !!this.keys[code];
  }

  isClicked() {
    return this.mouse.clicked;
  }

  getMousePos() {
    return { x: this.mouse.x, y: this.mouse.y };
  }

  // 检查点击是否在矩形区域内
  isClickInRect(x, y, w, h) {
    if (!this.mouse.clicked) return false;
    const mx = this.mouse.x;
    const my = this.mouse.y;
    return mx >= x && mx <= x + w && my >= y && my <= y + h;
  }

  // 检查鼠标悬停是否在矩形区域内
  isHoverInRect(x, y, w, h) {
    const mx = this.mouse.x;
    const my = this.mouse.y;
    return mx >= x && mx <= x + w && my >= y && my <= y + h;
  }

  endFrame() {
    this.mouse.clicked = false;
    this.keyJustPressed = {};
  }
}

// ---- 粒子系统 ----
class Particle {
  constructor(x, y, vx, vy, life, color, size = 2) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.life = life; this.maxLife = life;
    this.color = color; this.size = size;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(x, y, count, config = {}) {
    const {
      color = '#ffcc44',
      colors = null,
      speedMin = 0.2, speedMax = 1,
      lifeMin = 30, lifeMax = 60,
      sizeMin = 1, sizeMax = 3,
      dirMin = 0, dirMax = Math.PI * 2,
      gravity = 0
    } = config;

    for (let i = 0; i < count; i++) {
      const angle = dirMin + Math.random() * (dirMax - dirMin);
      const speed = speedMin + Math.random() * (speedMax - speedMin);
      const life = lifeMin + Math.random() * (lifeMax - lifeMin);
      const size = sizeMin + Math.random() * (sizeMax - sizeMin);
      const c = colors ? colors[Math.floor(Math.random() * colors.length)] : color;
      const p = new Particle(
        x, y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        life, c, size
      );
      p.gravity = gravity;
      this.particles.push(p);
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += (p.gravity || 0);
      p.life--;
      if (p.life <= 0) this.particles.splice(i, 1);
    }
  }

  draw(renderer) {
    for (const p of this.particles) {
      const alpha = p.life / p.maxLife;
      renderer.setAlpha(alpha);
      renderer.fillRect(p.x, p.y, p.size, p.size, p.color);
    }
    renderer.resetAlpha();
  }

  clear() {
    this.particles = [];
  }
}

// ---- 对话系统 ----
class DialogSystem {
  constructor() {
    this.active = false;
    this.queue = [];
    this.currentDialog = null;
    this.displayedText = '';
    this.charIndex = 0;
    this.charTimer = 0;
    this.charSpeed = 2; // 每N帧显示一个字符
    this.finished = false;
    this.choices = null;
    this.selectedChoice = -1;
    this.hoveredChoice = -1;
    this.onComplete = null;
    this.onChoice = null;
    this.portraitAnim = 0;
  }

  // 开始一组对话
  start(dialogs, onComplete = null) {
    this.queue = [...dialogs];
    this.onComplete = onComplete;
    this.active = true;
    this.choices = null;
    this._nextDialog();
  }

  // 显示选择
  showChoices(choiceList, onChoice) {
    this.choices = choiceList;
    this.onChoice = onChoice;
    this.selectedChoice = -1;
    this.hoveredChoice = -1;
    this.active = true;
  }

  _nextDialog() {
    if (this.queue.length === 0) {
      this.active = false;
      this.currentDialog = null;
      if (this.onComplete) this.onComplete();
      return;
    }
    this.currentDialog = this.queue.shift();
    this.displayedText = '';
    this.charIndex = 0;
    this.charTimer = 0;
    this.finished = false;
  }

  update(input) {
    if (!this.active) return;

    this.portraitAnim += 0.05;

    // 选择模式
    if (this.choices) {
      // 更新悬停状态
      const boxX = 60, boxW = 360;
      const startY = 130;
      this.hoveredChoice = -1;
      for (let i = 0; i < this.choices.length; i++) {
        const cy = startY + i * 36;
        if (input.isHoverInRect(boxX, cy, boxW, 30)) {
          this.hoveredChoice = i;
        }
        if (input.isClickInRect(boxX, cy, boxW, 30)) {
          this.selectedChoice = i;
          const choice = this.choices[i];
          this.choices = null;
          this.active = false;
          if (this.onChoice) this.onChoice(choice, i);
          return;
        }
      }
      return;
    }

    // 对话模式
    if (this.currentDialog) {
      if (!this.finished) {
        this.charTimer++;
        if (this.charTimer >= this.charSpeed) {
          this.charTimer = 0;
          this.charIndex++;
          if (this.charIndex >= this.currentDialog.text.length) {
            this.displayedText = this.currentDialog.text;
            this.finished = true;
          } else {
            this.displayedText = this.currentDialog.text.substring(0, this.charIndex);
          }
        }
      }

      // 点击推进
      if (input.isClicked() || input.isKeyJustPressed('Space') || input.isKeyJustPressed('Enter')) {
        if (!this.finished) {
          // 跳过打字效果
          this.displayedText = this.currentDialog.text;
          this.finished = true;
        } else {
          this._nextDialog();
        }
      }
    }
  }

  draw(renderer) {
    if (!this.active) return;

    // 选择模式
    if (this.choices) {
      this._drawChoiceBox(renderer);
      return;
    }

    // 对话框
    if (this.currentDialog) {
      this._drawDialogBox(renderer);
    }
  }

  _drawDialogBox(renderer) {
    const d = this.currentDialog;
    const boxX = 10, boxY = 230, boxW = 460, boxH = 80;

    // 半透明背景
    renderer.setAlpha(0.85);
    renderer.fillRect(boxX, boxY, boxW, boxH, '#1a1a2e');
    renderer.resetAlpha();

    // 边框
    renderer.strokeRect(boxX, boxY, boxW, boxH, '#4a4a6a');
    renderer.strokeRect(boxX + 1, boxY + 1, boxW - 2, boxH - 2, '#2a2a4a');

    // 说话者名字
    if (d.speaker) {
      renderer.fillRect(boxX + 10, boxY - 12, d.speaker.length * 10 + 16, 16, '#2a1a3e');
      renderer.strokeRect(boxX + 10, boxY - 12, d.speaker.length * 10 + 16, 16, '#6a4a8a');
      renderer.drawText(d.speaker, boxX + 18, boxY - 10, d.speakerColor || '#e0c0ff', 10);
    }

    // 对话文字 - 自动换行
    const maxCharsPerLine = 28;
    const lines = this._wrapText(this.displayedText, maxCharsPerLine);
    const textX = boxX + 20;
    for (let i = 0; i < lines.length && i < 4; i++) {
      renderer.drawText(lines[i], textX, boxY + 14 + i * 16, d.textColor || '#ddd', 12);
    }

    // 继续提示
    if (this.finished) {
      const blink = Math.sin(Date.now() * 0.005) > 0;
      if (blink) {
        renderer.drawText('▼', boxX + boxW - 24, boxY + boxH - 18, '#aaa', 10);
      }
    }

    // 头像 (如果有的话通过回调绘制)
    if (d.portrait) {
      const portraitBob = Math.sin(this.portraitAnim) * 1;
      renderer.fillRect(boxX + boxW - 72, boxY - 52, 60, 52, '#1a1a2e');
      renderer.strokeRect(boxX + boxW - 72, boxY - 52, 60, 52, '#4a4a6a');
      if (typeof d.portrait === 'function') {
        d.portrait(renderer, boxX + boxW - 70, boxY - 50 + portraitBob);
      }
    }
  }

  _drawChoiceBox(renderer) {
    // 标题
    renderer.setAlpha(0.9);
    renderer.fillRect(40, 90, 400, this.choices.length * 36 + 60, '#1a1a2e');
    renderer.resetAlpha();
    renderer.strokeRect(40, 90, 400, this.choices.length * 36 + 60, '#6a4a8a');

    renderer.drawTextShadow('做出你的选择...', 240, 100, '#e0c0ff', '#000', 12, 'center');

    const boxX = 60, boxW = 360;
    const startY = 130;
    for (let i = 0; i < this.choices.length; i++) {
      const cy = startY + i * 36;
      const hover = this.hoveredChoice === i;
      const bgColor = hover ? '#3a2a5e' : '#2a1a3e';
      const borderColor = hover ? '#aa88cc' : '#4a3a6a';
      const textColor = hover ? '#fff' : '#ccaaee';

      renderer.fillRect(boxX, cy, boxW, 30, bgColor);
      renderer.strokeRect(boxX, cy, boxW, 30, borderColor);

      const icon = hover ? '► ' : '  ';
      renderer.drawText(icon + this.choices[i].text, boxX + 12, cy + 9, textColor, 10);

      // 如果有涟漪提示
      if (this.choices[i].rippleHint && hover) {
        renderer.drawText('⟡ ' + this.choices[i].rippleHint, boxX + boxW - 8, cy + 10, '#886644', 8, 'right');
      }
    }
  }

  _wrapText(text, maxChars) {
    const lines = [];
    let current = '';
    for (let i = 0; i < text.length; i++) {
      current += text[i];
      if (current.length >= maxChars && text[i] !== '\n') {
        // 尝试在标点处断行
        const breakChars = '，。！？、；：）》…';
        if (i + 1 < text.length && !breakChars.includes(text[i + 1])) {
          lines.push(current);
          current = '';
        }
      }
      if (text[i] === '\n') {
        lines.push(current.slice(0, -1));
        current = '';
      }
    }
    if (current) lines.push(current);
    return lines;
  }
}

// ---- 场景管理器 ----
class SceneManager {
  constructor() {
    this.scenes = {};
    this.currentScene = null;
    this.currentName = '';
    this.transitioning = false;
    this.transitionAlpha = 0;
    this.transitionTarget = '';
    this.transitionData = null;
    this.transitionSpeed = 0.03;
    this.transitionPhase = 'none'; // 'out', 'in', 'none'
  }

  register(name, scene) {
    this.scenes[name] = scene;
  }

  switchTo(name, data = null) {
    if (this.transitioning) return;
    this.transitioning = true;
    this.transitionTarget = name;
    this.transitionData = data;
    this.transitionPhase = 'out';
    this.transitionAlpha = 0;
  }

  switchImmediate(name, data = null) {
    if (this.currentScene && this.currentScene.exit) {
      this.currentScene.exit();
    }
    this.currentScene = this.scenes[name];
    this.currentName = name;
    if (this.currentScene && this.currentScene.enter) {
      this.currentScene.enter(data);
    }
  }

  update(input) {
    if (this.transitioning) {
      if (this.transitionPhase === 'out') {
        this.transitionAlpha += this.transitionSpeed;
        if (this.transitionAlpha >= 1) {
          this.transitionAlpha = 1;
          // 切换场景
          if (this.currentScene && this.currentScene.exit) {
            this.currentScene.exit();
          }
          this.currentScene = this.scenes[this.transitionTarget];
          this.currentName = this.transitionTarget;
          if (this.currentScene && this.currentScene.enter) {
            this.currentScene.enter(this.transitionData);
          }
          this.transitionPhase = 'in';
        }
      } else if (this.transitionPhase === 'in') {
        this.transitionAlpha -= this.transitionSpeed;
        if (this.transitionAlpha <= 0) {
          this.transitionAlpha = 0;
          this.transitioning = false;
          this.transitionPhase = 'none';
        }
      }
    }

    if (this.currentScene && this.currentScene.update) {
      this.currentScene.update(input);
    }
  }

  draw(renderer) {
    if (this.currentScene && this.currentScene.draw) {
      this.currentScene.draw(renderer);
    }

    // 过渡效果
    if (this.transitioning && this.transitionAlpha > 0) {
      renderer.setAlpha(this.transitionAlpha);
      renderer.fillRect(0, 0, renderer.width, renderer.height, '#0a0a12');
      renderer.resetAlpha();
    }
  }
}

// ---- 音频管理器 ----
class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.musicGain = null;
    this.sfxGain = null;
    this.currentMusic = null;
  }

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.3;
      this.musicGain.connect(this.ctx.destination);
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.5;
      this.sfxGain.connect(this.ctx.destination);
      this.enabled = true;
    } catch (e) {
      console.log('Audio not available');
    }
  }

  // 播放简单音效
  playSfx(type) {
    if (!this.enabled) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(this.sfxGain);

    switch (type) {
      case 'click':
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
        break;
      case 'select':
        osc.frequency.value = 600;
        osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
        break;
      case 'ripple':
        osc.type = 'sine';
        osc.frequency.value = 400;
        osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
        break;
      case 'timeGain':
        osc.type = 'triangle';
        osc.frequency.value = 523;
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        const t = ctx.currentTime;
        osc.frequency.setValueAtTime(523, t);
        osc.frequency.setValueAtTime(659, t + 0.1);
        osc.frequency.setValueAtTime(784, t + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
        osc.start(t);
        osc.stop(t + 0.4);
        break;
      case 'door':
        osc.type = 'sawtooth';
        osc.frequency.value = 150;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
        break;
      case 'negative':
        osc.type = 'square';
        osc.frequency.value = 300;
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
        break;
      case 'resonance': {
        // 和弦效果：三个音同时响起
        const freqs = [330, 415, 523];
        for (let i = 0; i < freqs.length; i++) {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.value = freqs[i];
          o.connect(g);
          g.connect(this.sfxGain);
          const start = ctx.currentTime + i * 0.08;
          g.gain.setValueAtTime(0, start);
          g.gain.linearRampToValueAtTime(0.12, start + 0.1);
          g.gain.setValueAtTime(0.12, start + 0.4);
          g.gain.exponentialRampToValueAtTime(0.01, start + 0.8);
          o.start(start);
          o.stop(start + 0.8);
        }
        // 不使用外层 osc，立即停止它
        gain.gain.setValueAtTime(0, ctx.currentTime);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.01);
        break;
      }
      case 'ghost':
        // 幽灵出现：缓慢下降的正弦波
        osc.type = 'sine';
        osc.frequency.value = 600;
        osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1.0);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.0);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.0);
        break;
      case 'collectible': {
        // 清脆铃声：两个八度跳跃
        const cFreqs = [523, 1047, 784];
        for (let i = 0; i < cFreqs.length; i++) {
          const co = ctx.createOscillator();
          const cg = ctx.createGain();
          co.type = 'triangle';
          co.frequency.value = cFreqs[i];
          co.connect(cg);
          cg.connect(this.sfxGain);
          const cstart = ctx.currentTime + i * 0.12;
          cg.gain.setValueAtTime(0.2, cstart);
          cg.gain.exponentialRampToValueAtTime(0.01, cstart + 0.25);
          co.start(cstart);
          co.stop(cstart + 0.25);
        }
        gain.gain.setValueAtTime(0, ctx.currentTime);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.01);
        break;
      }
    }
  }

  // 简单环境音乐 (生成式)
  playAmbient(type = 'shop') {
    if (!this.enabled) return;
    this.stopMusic();

    const ctx = this.ctx;
    const scheduleNote = (freq, startTime, duration, waveType = 'sine', vol = 0.08) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveType;
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(this.musicGain);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(vol, startTime + 0.1);
      gain.gain.setValueAtTime(vol, startTime + duration - 0.2);
      gain.gain.linearRampToValueAtTime(0, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
      return osc;
    };

    const notes = {
      shop: [261.6, 329.6, 392.0, 349.2, 293.7, 261.6, 329.6, 392.0],
      memory: [220.0, 277.2, 329.6, 261.6, 293.7, 220.0, 246.9, 329.6],
      title: [196.0, 246.9, 293.7, 329.6, 293.7, 246.9, 196.0, 220.0],
      ending: [261.6, 311.1, 370.0, 415.3, 370.0, 311.1, 261.6, 293.7],
      origin: [196.0, 220.0, 261.6, 293.7, 261.6, 220.0, 196.0, 174.6]
    };

    const seq = notes[type] || notes.shop;
    let t = ctx.currentTime + 0.1;
    const loop = () => {
      for (const freq of seq) {
        scheduleNote(freq, t, 1.8, 'sine', 0.06);
        scheduleNote(freq * 0.5, t, 1.8, 'triangle', 0.03);
        t += 1.8;
      }
    };

    loop();
    this.currentMusic = setInterval(() => {
      t = ctx.currentTime + 0.1;
      loop();
    }, seq.length * 1800);
  }

  stopMusic() {
    if (this.currentMusic) {
      clearInterval(this.currentMusic);
      this.currentMusic = null;
    }
  }
}

// ---- 补间动画工具 ----
class Tween {
  constructor(from, to, duration, easing = 'easeInOut') {
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.elapsed = 0;
    this.easing = easing;
    this.value = from;
    this.done = false;
  }

  update() {
    if (this.done) return this.to;
    this.elapsed++;
    let t = this.elapsed / this.duration;
    if (t >= 1) { t = 1; this.done = true; }

    switch (this.easing) {
      case 'linear': break;
      case 'easeIn': t = t * t; break;
      case 'easeOut': t = 1 - (1 - t) * (1 - t); break;
      case 'easeInOut': t = t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t); break;
    }

    this.value = this.from + (this.to - this.from) * t;
    return this.value;
  }
}

// ---- 存档管理器 ----
class SaveManager {
  constructor(key = 'timePawnshop') {
    this.key = key;
  }

  save(data) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  load() {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

// ---- 涟漪特效 (用于时间涟漪视觉) ----
class RippleEffect {
  constructor() {
    this.ripples = [];
  }

  add(x, y) {
    this.ripples.push({ x, y, radius: 0, maxRadius: 120, alpha: 1, speed: 1.5 });
  }

  update() {
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.radius += r.speed;
      r.alpha = 1 - r.radius / r.maxRadius;
      if (r.alpha <= 0) this.ripples.splice(i, 1);
    }
  }

  draw(renderer) {
    for (const r of this.ripples) {
      renderer.setAlpha(r.alpha * 0.4);
      const ctx = renderer.ctx;
      ctx.strokeStyle = '#aa88ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#6644aa';
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
      ctx.stroke();
    }
    renderer.resetAlpha();
  }
}

// 导出
window.Engine = {
  PixelRenderer,
  InputManager,
  ParticleSystem,
  DialogSystem,
  SceneManager,
  AudioManager,
  Tween,
  SaveManager,
  RippleEffect
};
