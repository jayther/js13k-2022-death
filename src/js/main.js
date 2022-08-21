import { engineInit } from './engine/engine.all';

import { GameState } from './consts';
import { controllerMap, gameInit, setGameStateSetter } from './game/controllers';
let gameState = GameState.Idle;

let curController;

function setGameState(state) { 
  gameState = state;
  curController = controllerMap[gameState];
  curController.init();
}

function gameUpdate() {
  curController.gameUpdate();
}

function gameUpdatePost() {
}

function gameRender() {
  curController.gameRender();
}

function gameRenderPost() {
}

setGameStateSetter(setGameState);

engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
