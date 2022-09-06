
export class ButtonManager {
  constructor() {
    /**
     * @type {Button[]}
     */
    this.buttons = [];
    /**
     * @type {Button}
     */
    this.pressedButton = null;
  }

  addBtn(button) {
    this.buttons.push(button);
  }
  removeBtn(button) {
    const index = this.buttons.indexOf(button);
    if (index > -1) {
      this.buttons.splice(index, 1);
    }
  }

  pressed() {
    this.pressedButton = null;
    
    for (let i = this.buttons.length - 1; i >= 0 && !this.pressedButton; i--) {
      const button = this.buttons[i];
      if (button.cmp()) {
        this.pressedButton = button;
      }
    }

    return !!this.pressedButton;
  }

  released() {
    if (!this.pressedButton) { return false; }

    if (this.pressedButton.cmp()) {
      this.pressedButton.pressed();
    }

    this.pressedButton = null;

    return true;
  }

  render() {
    this.buttons.forEach(button => button.render());
  }
}
