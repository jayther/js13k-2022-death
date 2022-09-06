import { engineInit } from './engine/engine.all';

import { GameState } from './consts';
import { controllerMap } from './game/controllers';
import { stateManager } from './game/state-mgr';
import { cameraScale, setCameraScale } from './engine/engine.all';

const viewport = { width: 680, height: 940 };
const standardScale = cameraScale;

function gameInit() {
  resize();
  stateManager.init(controllerMap);
  stateManager.sgs(GameState.MainMenu);
  // stateManager.setGameState(GameState.Leaderboard, {
  //   score: randInt(1, 100),
  //   timestamp: Date.now(),
  //   roadCount: randInt(1, 20),
  //   totalMaxScore: 100,
  // });
}

function gameUpdate() {
  stateManager.gameUpdate();
}

function gameUpdatePost() {
}

function gameRender() {
  stateManager.gameRender();
}

function gameRenderPost() {
}

engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);

let resizeTimeout = null;
function debouncedResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resize, 200);
}

function resize() {
  const targetAspectRatio = viewport.width / viewport.height;
  const currentAspectRatio = innerWidth / innerHeight;
  const scale = targetAspectRatio > currentAspectRatio ?
    (innerWidth / viewport.width) :
    (innerHeight / viewport.height);
  setCameraScale(standardScale * scale);
}

window.addEventListener('resize', debouncedResize, false);
