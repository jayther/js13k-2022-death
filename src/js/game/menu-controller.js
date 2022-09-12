import { GameState } from '../consts';
import { Color, drawText, mouseWasPressed, mouseWasReleased, PI, rand, time, vec2 } from '../engine/engine.all';
import { ButtonManager } from './btn-mgr';
import { Button } from './button';
import { Ghost } from './ghost';
import { House } from './house';
import { stateManager } from './state-mgr';

const startButton = new Button(
  vec2(0, -10), vec2(4, 2.5), 'Start', 1.5, new Color(1, 1, 1), new Color(0, 0, 0),
  () => {
    stateManager.setGameState(GameState.PlaceRoads);
  },
  false
);
const btnMgr = new ButtonManager();
btnMgr.addBtn(startButton);

const ghostPos = vec2(5, 0);
const housePos = vec2(-5, 0);

const ghost = new Ghost(ghostPos.copy());
ghost.size = vec2(10);
let house = null;
let lastHouseTime = 0;

function spawnNewHouse() {
  house = new House(vec2());
  const bounds = house.getWorldBounds();
  const midpoint = vec2(
    (bounds[0].x + bounds[1].x) / 2,
    (bounds[0].y + bounds[1].y) / 2,
  );
  const offset = house.pos.subtract(midpoint);
  house.pos.x = housePos.x + offset.x;
  house.pos.y = housePos.y + offset.y;
  house.bounce();
}

// Main Menu
export const menuController = {
  init() {
    spawnNewHouse();
  },
  gameUpdate() {
    // ghost animation
    const alphaRatio = Math.sin(time * PI * 2 / 0.5) / 2 + 0.5;
    const xRatio = Math.sin(time * PI * 2 / 1.3);
    const yRatio = Math.sin(time * PI * 2 / 2.1);
    ghost.color.a = 1 - alphaRatio * 0.2;
    ghost.pos = ghostPos.add(vec2(xRatio * 1, yRatio * 1));

    // house animation
    if (time - lastHouseTime >= 1) {
      spawnNewHouse();
      lastHouseTime = time;
    }

    if (house) {
      house.update();
    }

    if (mouseWasPressed(0)) {
      btnMgr.pressed();
    }
    if (mouseWasReleased(0)) {
      btnMgr.released();
    }
  },
  gameRender() {
    if (house) {
      house.render();
    }
    ghost.render();

    const ratio = Math.sin(time * PI * 2 / 3) / 2 + 0.5;
    drawText('Death Estate', vec2(0, 10), 5, new Color(1, 0, 0), 1.0 + 0.2 * ratio, new Color(1, 1, 1));

    btnMgr.render();
  },
};
