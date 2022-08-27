import { menuController } from './menu-controller';
import { placeRoadsController, placeHousesController } from './game-controller';

// Idle
const idleController = {
  init() {

  },
  gameUpdate() {

  },
  gameRender() {

  },
};

// Leaderboard
const leaderboardController = {
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
