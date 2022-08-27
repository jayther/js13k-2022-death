import { engineInit, randInt } from './engine/engine.all';

import { GameState } from './consts';
import { controllerMap } from './game/controllers';
import { stateManager } from './game/state-mgr';

function gameInit() {
  stateManager.init(controllerMap);
  stateManager.setGameState(GameState.MainMenu);
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
