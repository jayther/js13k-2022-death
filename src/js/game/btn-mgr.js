
export class ButtonManager {
  constructor() {
    this.buttons = [];
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
    let foundBtn = false;
    for (let i = this.buttons.length - 1; i >= 0 && !foundBtn; i--) {
      const button = this.buttons[i];
      if (button.containsMousePos()) {
        foundBtn = true;
        button.pressed();
      }
    }
  }

  render() {
    this.buttons.forEach(button => button.render());
  }
}
