import {
  vec2,
  mousePos,
  cameraPos,
  mouseIsDown,
  mouseWasReleased,
  mouseWasPressed,
  keyWasPressed,
  drawTextScreen,
  Color,
} from '../engine/engine.all';
import { GameState, HouseState, tileSize, TileType } from '../consts';
import { Grid } from './grid';
import { House } from './house';
import { menuController } from './menu-controller';
import { stateManager } from './state-mgr';

const grid = new Grid(15, 15);
// let origCameraPos = vec2();
let origHousePos = vec2();
let dragAnchor = vec2();
let dragging = false;
let mouseDown = false;
let rightClickDown = false;
let roadStartCoord;
let roadType;
let skipsLeft;

let house;

function spawnNewHouse() {
  house = new House(-8, -8);
}

// Idle
const idleController = {
  init() {

  },
  gameUpdate() {

  },
  gameRender() {

  },
};

// Place Roads
const placeRoadsController = {
  init() {
    const gridSize = grid.getWorldSize();
    cameraPos.x = grid.pos.x + gridSize.x / 2 - tileSize / 2;
    cameraPos.y = grid.pos.y + gridSize.y / 2 - tileSize / 2;
  },
  gameUpdate() {
    // if (mouseWasReleased(0)) {
    //   const tile = grid.getTileFromMousePos();
    //   if (tile) {
    //     tile.type = tile.type === TileType.Road ? TileType.None : TileType.Road;
    //   }
    // }
    if (mouseWasPressed(0)) {
      roadStartCoord = grid.getCoordsFromMousePos();
      if (roadStartCoord) {
        grid.createSnapshot();
        const tile = grid.getTileFromMousePos();
        // this should always return a tile since roadStartCoord should only
        // be non-null if it's clicked inside the grid
        if (tile.type === TileType.Road || tile.type === TileType.DCRoad) {
          roadType = TileType.EphDelete;
        } else {
          roadType = TileType.EphRoad;
        }
      }
    }
    if (mouseIsDown(0)) {
      if (roadStartCoord) {
        grid.resetToSnapshot();
        const roadEndCoord = grid.getCoordsFromMousePos(true);
        grid.setTileLine(roadStartCoord, roadEndCoord, roadType);
      }
    }
    if (mouseWasReleased(0)) {
      if (roadStartCoord) {
        grid.resetToSnapshot();
        const roadEndCoord = grid.getCoordsFromMousePos(true);
        if (roadType === TileType.EphRoad) {
          grid.setTileLine(roadStartCoord, roadEndCoord, TileType.Road);
        } else {
          grid.setTileLine(roadStartCoord, roadEndCoord, TileType.None);
        }
        grid.checkRoadConnection();
      }
    }
    if (mouseWasReleased(2) && grid.allRoadsConnected) {
      stateManager.setGameState(GameState.PlaceHouses);
    }
  },
  gameRender() {
    grid.render();
  },
};

// Place Houses
const placeHousesController = {
  init() {
    skipsLeft = 3;
    spawnNewHouse();
  },
  gameUpdate() {
    // if (mouseIsDown(0)) {
    //   if (!dragging) {
    //     dragAnchor = mousePosScreen.copy();
    //     origCameraPos = cameraPos.copy();
    //     dragging = true;
    //   }
    //   cameraPos.x = origCameraPos.x + -(mousePosScreen.x - dragAnchor.x) / cameraScale;
    //   cameraPos.y = origCameraPos.y + (mousePosScreen.y - dragAnchor.y) / cameraScale;
    // } else {
    //   if (dragging) {
    //     dragging = false;
    //   }
    // }
  
    if (mouseIsDown(2)) {
      rightClickDown = true;
    } else {
      if (rightClickDown) {
        rightClickDown = false;
        house.rotate(1);
      }
    }

    // S or down arrow key
    if (keyWasPressed(40) && skipsLeft > 0) {
      spawnNewHouse();
      skipsLeft -= 1;
    }
  
    if (mouseIsDown(0)) {
      if (!mouseDown) {
        mouseDown = true;
        if (house.isClicked()) {
          house.state = HouseState.Placing;
          origHousePos = house.pos.copy();
          dragAnchor = mousePos.copy();
          dragging = true;
        }
      }
      if (dragging) {
        house.pos.x = origHousePos.x + (mousePos.x - dragAnchor.x);
        house.pos.y = origHousePos.y + (mousePos.y - dragAnchor.y);
      }
    } else {
      if (mouseDown) {
        mouseDown = false;
        if (dragging) {
          house.pos.x = Math.floor((house.pos.x + tileSize / 2) / tileSize) * tileSize;
          house.pos.y = Math.floor((house.pos.y + tileSize / 2) / tileSize) * tileSize;
          if (grid.houseCanFit(house) && grid.houseIsTouchingRoad(house)) {
            grid.addHouse(house);
            spawnNewHouse();
          } else {
            house.state = HouseState.Invalid;
          }
          dragging = false;
        }
        // const clicked = house.isClicked();
        // console.log('clicked', clicked);
        // const tile = grid.getTileFromMousePos();
        // if (tile) {
        //   console.log('tile.type', tile.type);
        // }
      }
    }
  },
  gameRender() {
    grid.render();
    // for (const house of houses) {
    //   house.render();
    // }
    house.render();

    drawTextScreen(`Skips left: ${skipsLeft}`, vec2(15, 15), 20, new Color(1, 1, 1), undefined, undefined, 'left');
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
