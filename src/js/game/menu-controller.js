import { GameState } from '../consts';
import { Color, drawTextScreen, mainCanvasSize, mouseWasPressed, randInt, vec2 } from '../engine/engine.all';
import { ButtonManager } from './btn-mgr';
import { Button } from './button';
import { stateManager } from './state-mgr';

const titlePos = vec2(0, 0);
const titleColor = new Color(1, 0, 0);
const titleLineColor = new Color(1, 1, 1);
const startButton = new Button(
  mainCanvasSize.x, mainCanvasSize.y, 100, 50, 'Start', new Color(1, 1, 1), new Color(0, 0, 0),
  () => {
    stateManager.setGameState(GameState.PlaceRoads);
  }
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
  },
  gameRender() {
    titlePos.x = mainCanvasSize.x / 2;
    titlePos.y = mainCanvasSize.y / 2 - 50;
    drawTextScreen('Death Estate', titlePos, 75, titleColor, randInt(10, 12), titleLineColor);

    startButton.pos.x = mainCanvasSize.x / 2;
    startButton.pos.y = mainCanvasSize.y / 2 + 50;
    btnMgr.render();
  },
};
