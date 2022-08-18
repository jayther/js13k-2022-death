import { engineInit, drawRect, vec2, Color, cameraPos, mouseIsDown, mousePos, mousePosScreen, mouseToScreen, cameraScale } from './engine/engine.all';
import { Grid } from './game/grid';
import { tileSize, TileType } from './consts';
import { House } from './game/house';

const grid = new Grid();
// let origCameraPos = vec2();
let origHousePos = vec2();
let dragAnchor = vec2();
let dragging = false;
let mouseDown = false;
let rightClickDown = false;

const houses = [];
let house;

function gameInit() {
  const gridSize = grid.getWorldSize();
  cameraPos.x = grid.pos.x + gridSize.x / 2 - tileSize / 2;
  cameraPos.y = grid.pos.y + gridSize.y / 2 - tileSize / 2;

  spawnNewHouse();
}

function spawnNewHouse() {
  house = new House();
}

function gameUpdate() {
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

  if (mouseIsDown(0)) {
    if (!mouseDown) {
      mouseDown = true;
      if (house.isClicked()) {
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
        }
        dragging = false;
      } else {
        const tile = grid.getTileFromMousePos();
        if (tile) {
          tile.type = TileType.Road;
        }
      }
      // const clicked = house.isClicked();
      // console.log('clicked', clicked);
      // const tile = grid.getTileFromMousePos();
      // if (tile) {
      //   console.log('tile.type', tile.type);
      // }
    }
  }
}

function gameUpdatePost() {

}

function gameRender() {
  grid.render();
  // for (const house of houses) {
  //   house.render();
  // }
  house.render();
}

function gameRenderPost() {

}

engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
