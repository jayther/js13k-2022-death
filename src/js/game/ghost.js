import { 
  Color, 
  drawText, 
  drawTile, 
  lerp, 
  percent, 
  time, 
  vec2,
  randInt,
} from '../engine/engine.all';

const ghostTileIndex = 21;
const textOffset = vec2(0, 4);

const requestTexts = [
  'Can you build me this?',
];

const thankTexts = [
  'Thank you!',
];

const skippedTexts = [
  'Aww...',
];

function randFromArr(arr) {
  return arr[randInt(0, arr.length)];
}

export class Ghost {
  constructor(pos) {
    this.pos = pos;
    this.color = new Color(1, 1, 1, 1);
    this.size = vec2(6);
    this.text = null;

    this.moving = false;
    this.startPos = pos.copy();
    this.targetPos = vec2();
    this.moveStartTime = 0;
    this.moveEndTime = 0;
    this.moveResolve = null;

    this.fading = false;
    this.startOpacity = 1;
    this.targetOpacity = 1;
    this.fadeStartTime = 0;
    this.fadeEndTime = 0;
    this.fadeResolve = null;

    this.resizing = false;
    this.startSize = this.size.copy();
    this.targetSize = vec2();
    this.resizeStartTime = 0;
    this.resizeEndTime = 0;
    this.resizeResolve = null;

    this.destroy = false;
  }

  moveTo(pos, speed) {
    this.startPos = this.pos.copy();
    this.targetPos = pos;
    const duration = this.startPos.distance(this.targetPos) / speed;
    this.moveStartTime = time;
    this.moveEndTime = time + duration;
    this.moving = true;
    return new Promise(resolve => this.moveResolve = resolve);
  }

  fadeTo(opacity, duration) {
    this.startOpacity = this.color.a;
    this.targetOpacity = opacity;
    this.fadeStartTime = time;
    this.fadeEndTime = time + duration;
    this.fading = true;
    return new Promise(resolve => this.fadeResolve = resolve);
  }

  resizeTo(size, duration) {
    this.startSize = this.size.copy();
    this.targetSize = size;
    this.resizeStartTime = time;
    this.resizeEndTime = time + duration;
    this.resizing = true;
    return new Promise(resolve => this.resizeResolve = resolve);
  }

  showRequestText() {
    this.text = randFromArr(requestTexts);
  }

  showThankText() {
    this.text = randFromArr(thankTexts);
    setTimeout(() => this.text = null, 1500);
  }

  showSkippedText() {
    this.text = randFromArr(skippedTexts);
  }

  updateMoving() {
    if (!this.moving) { return; }

    if (time >= this.moveEndTime) {
      this.pos = this.targetPos.copy();
      this.moving = false;
      this.moveResolve(this);
      this.moveResolve = null;
      return;
    }

    const p = percent(time, this.moveStartTime, this.moveEndTime);
    this.pos = this.startPos.lerp(this.targetPos, p);
  }
  updateFading() {
    if (!this.fading) { return; }

    if (time >= this.fadeEndTime) {
      this.color.a = this.targetOpacity;
      this.fading = false;
      this.fadeResolve(this);
      this.fadeResolve = null;
      return;
    }

    const p = percent(time, this.fadeStartTime, this.fadeEndTime);
    this.color.a = lerp(p, this.startOpacity, this.targetOpacity);
  }
  updateResizing() {
    if (!this.resizing) { return; }

    if (time >= this.resizeEndTime) {
      this.size = this.targetSize.copy();
      this.resizing = false;
      this.resizeResolve(this);
      this.resizeResolve = null;
      return;
    }

    const p = percent(time, this.resizeStartTime, this.resizeEndTime);
    this.size = this.startSize.lerp(this.targetSize, p);
  }

  update() {
    this.updateMoving();
    this.updateFading();
    this.updateResizing();
  }
  
  render() {
    drawTile(this.pos, this.size, ghostTileIndex, undefined, this.color);

    if (this.text) {
      drawText(this.text, this.pos.add(vec2(0, this.size.y / 2 + 1)), 1, this.color);
    }
  }
}
