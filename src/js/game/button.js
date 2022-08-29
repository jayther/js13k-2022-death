import {
  drawRect,
  drawRectScreenSpace,
  drawText,
  drawTextScreen,
  mousePos,
  mousePosScreen,
  vec2,
} from '../engine/engine.all';

export class Button {
  constructor(pos, size, text, textSize, bgColor, textColor, onPressed, screenSpace = true) {
    this.pos = pos;
    this.size = size;
    this.text = text;
    this.textSize = textSize;
    this.bgColor = bgColor;
    this.textColor = textColor;
    this.onPressed = onPressed || (() => {});

    this._enabled = true;
    this.visible = true;

    this.screenSpace = screenSpace;
  }

  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    this.bgColor.a = value ? 1 : 0.5;
    this.textColor.a = value ? 1 : 0.5;
  }
  containsMousePos() {
    if (!this.enabled || !this.visible) { return false; }

    const mp = this.screenSpace ? mousePosScreen : mousePos;
    return mp.x >= this.pos.x - this.size.x / 2 &&
      mp.y >= this.pos.y - this.size.y / 2 &&
      mp.x < this.pos.x + this.size.x / 2 &&
      mp.y < this.pos.y + this.size.y / 2;
  }
  pressed() {
    this.onPressed();
  }
  render() {
    if (!this.visible) { return; }
    
    let drawR, drawT;
    if (this.screenSpace) {
      drawR = drawRectScreenSpace;
      drawT = drawTextScreen;
    } else {
      drawR = drawRect;
      drawT = drawText;
    }

    drawR(this.pos, this.size, this.bgColor);
    drawT(
      this.text,
      this.pos,
      this.textSize,
      this.textColor,
    );
  }
}
