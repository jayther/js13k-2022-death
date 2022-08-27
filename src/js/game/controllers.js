import { menuController } from './menu-controller';
import { placeRoadsController, placeHousesController } from './game-controller';
import { leaderboardController } from './ldb-controller';

// Idle
const idleController = {
  init() {

  },
  gameUpdate() {

  },
  gameRender() {

  },
};

export const controllerMap = [
  idleController,
  menuController,
  placeRoadsController,
  placeHousesController,
  leaderboardController,
];
