import { drawRectScreenSpace, drawTextScreen, mousePosScreen, vec2 } from '../engine/engine.all';

export class Button {
  constructor(x, y, width, height, text, bgColor, textColor, onPressed) {
    this.pos = vec2(x, y);
    this.size = vec2(width, height);
    this.text = text;
    this.bgColor = bgColor;
    this.textColor = textColor;
    this.onPressed = onPressed || (() => {});
  }
  containsMousePos() {
    return mousePosScreen.x >= this.pos.x - this.size.x / 2 &&
      mousePosScreen.y >= this.pos.y - this.size.y / 2 &&
      mousePosScreen.x < this.pos.x + this.size.x / 2 &&
      mousePosScreen.y < this.pos.y + this.size.y / 2;
  }
  pressed() {
    this.onPressed();
  }
  render() {
    drawRectScreenSpace(
      this.pos, this.size, this.bgColor,
    );
    drawTextScreen(
      this.text,
      vec2(
        this.pos.x,
        this.pos.y,
      ),
      20,
      this.textColor,
    );
  }
}
