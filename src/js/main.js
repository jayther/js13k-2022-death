import { engineInit, drawRect, vec2, Color, cameraPos, mouseIsDown, mousePos, mousePosScreen, mouseToScreen, cameraScale } from './engine/engine.all';
import { Grid } from './game/grid';

const grid = new Grid();
// let origCameraPos = vec2();
// let dragAnchor = vec2();
// let dragging = false;
let mouseDown = false;

function gameInit() {
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

  if (mouseIsDown(0)) {
    mouseDown = true;
  } else {
    if (mouseDown) {
      mouseDown = false;
      console.log('tile type clicked:', grid.getTileFromMousePos());
    }
  }
}

function gameUpdatePost() {

}

function gameRender() {
  grid.render();
}

function gameRenderPost() {

}

engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
