import { GameState } from '../consts';

class StateManager {
  constructor() {
    /**
     * controllerMap
     */
    this.cm = null;
    this.gs = GameState.Idle;
  }
  init(controllerMap) {
    this.cm = controllerMap;
  }
  /**
   * setGameState
   * @param {GameState} gameState 
   * @param {*} opts 
   */
  sgs(gameState, opts) {
    this.gs = gameState;
    this.cc = this.cm[gameState];
    this.cc.init(opts);
  }
  gameUpdate() {
    this.cc.gameUpdate();
  }
  gameRender() {
    this.cc.gameRender();
  }
}

export const stateManager = new StateManager();
