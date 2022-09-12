import {
  Color,
  drawRect,
  drawRectScreenSpace,
  drawText,
  drawTextScreen,
  mousePos,
  mousePosScreen,
  percent,
  time,
  vec2,
} from '../engine/engine.all';
import { clickSound } from './sounds';

const sideColor = new Color(0.2, 0.2, 0.2, 0);
const buttonThickness = 0.5;

export class Button {
  constructor(pos, size, text, textSize, bgColor, textColor, onPressed, screenSpace = true, playSound = true) {
    this.pos = pos;
    this.offset = vec2();
    this.size = size;
    this.text = text;
    this.textSize = textSize;
    this.bgColor = bgColor;
    this.textColor = textColor;
    this.onPressed = onPressed || (() => {});
    this.playSound = playSound;

    this._enabled = true;
    this.visible = true;

    this.screenSpace = screenSpace;
    
    this.animating = false;
    this.animStartTime = 0;
    this.animEndTime = 0;
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
    this.startAnim();
    if (this.playSound) {
      clickSound.play();
    }
  }
  startAnim() {
    this.animating = true;
    this.animStartTime = time;
    this.animEndTime = time + 0.1;
  }
  update() {
    if (!this.animating) { return; }

    if (time >= this.animEndTime) {
      this.offset.y = 0;
      this.animating = false;
      return;
    }

    const p = percent(time, this.animStartTime, this.animEndTime);
    this.offset.y = -buttonThickness + p * buttonThickness;
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

    const currentThickness = buttonThickness + this.offset.y;
    drawR(
      this.pos.add(this.offset).add(vec2(0, -this.size.y / 2 - currentThickness / 2)),
      vec2(this.size.x, currentThickness),
      this.bgColor.subtract(sideColor),
    );
    drawR(this.pos.add(this.offset), this.size, this.bgColor);
    drawT(
      this.text,
      this.pos.add(this.offset),
      this.textSize,
      this.textColor,
    );
  }
}
