import { engineInit } from './engine/engine.all';

import { GameState } from './consts';
import { controllerMap } from './game/controllers';
import { stateManager } from './game/state-mgr';

function gameInit() {
  stateManager.init(controllerMap);
  stateManager.setGameState(GameState.MainMenu);
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
