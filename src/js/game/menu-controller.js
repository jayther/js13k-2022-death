import { GameState } from '../consts';
import { Color, drawText, mouseWasPressed, mouseWasReleased, rand, vec2 } from '../engine/engine.all';
import { ButtonManager } from './btn-mgr';
import { Button } from './button';
import { stateManager } from './state-mgr';

const startButton = new Button(
  vec2(0, -2), vec2(4, 2.5), 'Start', 1.5, new Color(1, 1, 1), new Color(0, 0, 0),
  () => {
    stateManager.setGameState(GameState.PlaceRoads);
  },
  false
);
const btnMgr = new ButtonManager();
btnMgr.addBtn(startButton);

// Main Menu
export const menuController = {
  init() {

  },
  gameUpdate() {
    if (mouseWasPressed(0)) {
      btnMgr.pressed();
    }
    if (mouseWasReleased(0)) {
      btnMgr.released();
    }
  },
  gameRender() {
    drawText('Death Estate', vec2(0, 4), 5, new Color(1, 0, 0), rand(1.0, 1.2), new Color(1, 1, 1));

    btnMgr.render();
  },
};
