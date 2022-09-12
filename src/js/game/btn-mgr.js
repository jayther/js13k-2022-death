
export class ButtonManager {
  constructor() {
    this.buttons = [];
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
      if (button.containsMousePos()) {
        this.pressedButton = button;
      }
    }

    return !!this.pressedButton;
  }

  released() {
    if (!this.pressedButton) { return false; }

    if (this.pressedButton.containsMousePos()) {
      this.pressedButton.pressed();
    }

    this.pressedButton = null;

    return true;
  }

  update() {
    this.buttons.forEach(button => button.update());
  }
  render() {
    this.buttons.forEach(button => button.render());
  }
}
