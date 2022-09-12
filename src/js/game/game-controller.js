import {
  vec2,
  mousePos,
  cameraPos,
  mouseIsDown,
  mouseWasReleased,
  mouseWasPressed,
  Color,
  drawText,
  lerp,
  percent,
  randVector,
} from '../engine/engine.all';
import { GameState, HouseState, tileSize, TileType } from '../consts';
import { Grid } from './grid';
import { House } from './house';
import { stateManager } from './state-mgr';
import { Button } from './button';
import { ButtonManager } from './btn-mgr';
import { Ghost } from './ghost';
import { clickSound, houseRequestSound, houseSkipSound, invalidSound, pickUpSound, placeHouseSound } from './sounds';

let grid;
// let origCameraPos = vec2();
let origHousePos = vec2();
let dragAnchor = null;
let roadStartCoord = null;
let roadType;
let skipsLeft;
let spawnPos = vec2();
let gameOverTime;

let house;
let currentGhost = null;
let fittableHouse = null;

const ghostRequestPos = vec2(0, -8);

let ghosts = [];

const topTextPos = vec2();
const bottomTextPos = vec2();
let topOffset = vec2();

const placeRoadsText =
`Make roads by clicking and dragging lines
on the grid. Delete by clicking and dragging
on existing roads`;

const requiredRoadsText =
`All roads must connect to an edge of the grid`;

const placeHouseText = 
`Drag and drop the ghosts' house requests! Must touch
a road, not overlap other houses, and be within the grid`

const noMoreMovesText =
`Game over! No more space or skips`;

// roads state buttons

const roadsBtnMgr = new ButtonManager();

const roadsDoneButton = new Button(
  vec2(0, -4), vec2(5, 3),
  'Done', 1.5, new Color(1, 1, 1), new Color(0, 0, 0),
  () => {
    if (grid.allRoadsConnected) {
      stateManager.setGameState(GameState.GhostIncoming);
    }
  },
  false,
);

roadsBtnMgr.addBtn(roadsDoneButton);

// house state buttons

const housesBtnMgr = new ButtonManager();

const rotateButton = new Button(
  vec2(0, -5), vec2(5, 3),
  'Rotate', 1.2, new Color(1, 1, 1), new Color(0, 0, 0),
  () => {
    house.rotate(1);
  },
  false,
);
housesBtnMgr.addBtn(rotateButton);

const skipButton = new Button(
  rotateButton.pos.add(vec2(0, -4)), vec2(5, 3),
  'Skip', 1.5, new Color(1, 1, 1), new Color(0, 0, 0),
  () => {
    if (skipsLeft > 0) {
      house = null;
      skipsLeft -= 1;
      houseSkipSound.play();
      currentGhost.showSkippedText();
      currentGhost.fadeTo(0, 2);
      currentGhost.moveTo(ghostRequestPos.copy().add(vec2(20, 0)), 10)
        .then(ghost => ghost.destroy = true);
      stateManager.setGameState(GameState.GhostIncoming);
    }
    if (skipsLeft <= 0) {
      skipButton.enabled = false;
    }
  },
  false,
  false,
);
housesBtnMgr.addBtn(skipButton);

const droppableBounds = {
  lower: vec2(),
  upper: vec2(),
};

const undroppableBounds = {
  lower: skipButton.pos
    .subtract(skipButton.size.divide(vec2(2)))
    .add(vec2(tileSize / 2)),
  upper: rotateButton.pos
    .add(rotateButton.size.divide(vec2(2)))
    .add(vec2(tileSize / 2)),
};

function spawnNewHouse() {
  house = new House(spawnPos.copy());
  fittableHouse = grid.houseFitsSomewhere(house);
  // console.log('houseFitsSomewhere', !!fittableHouse);
}

function updateGhosts() {
  for (let i = 0; i < ghosts.length; i++) {
    const ghost = ghosts[i];
    ghost.update();
    if (ghost.destroy) {
      ghosts.splice(i, 1);
      i--;
    }
  }
}

// Place Roads
export const placeRoadsController = {
  init() {
    grid = new Grid(15, 15);
    dragAnchor = null;
    roadStartCoord = null;
    house = null;

    const gridSize = grid.getWorldSize();
    cameraPos.x = grid.pos.x + gridSize.x / 2 - tileSize / 2;
    cameraPos.y = grid.pos.y + gridSize.y / 2 - tileSize / 2;
    roadsDoneButton.pos.x = grid.pos.x + gridSize.x / 2 - tileSize / 2;
    roadsDoneButton.enabled = false;

    topTextPos.x = roadsDoneButton.pos.x;
    topTextPos.y = grid.pos.y + gridSize.y - tileSize / 2 + 5;
    bottomTextPos.x = roadsDoneButton.pos.x;
    bottomTextPos.y = roadsDoneButton.pos.y - 4;

    skipsLeft = 3;

    const gridBounds = grid.getWorldBounds();
    const growAmount = 4 * tileSize;

    droppableBounds.lower = gridBounds[0].subtract(vec2(growAmount));
    droppableBounds.upper = gridBounds[1].add(vec2(growAmount)); // house pos is bottom left
    
    spawnPos.x = grid.pos.x + gridSize.x / 2 - tileSize / 2;
    spawnPos.y = -8;

    ghostRequestPos.x = grid.pos.x + gridSize.x - 5;

    ghosts = [];
  },
  gameUpdate() {
    if (mouseWasPressed(0)) {
      if (!roadsBtnMgr.pressed()) {
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
    }
    if (mouseWasReleased(0)) {
      roadsBtnMgr.released();

      if (roadStartCoord) {
        grid.resetToSnapshot();
        const roadEndCoord = grid.getCoordsFromMousePos(true);
        if (roadType === TileType.EphRoad) {
          grid.setTileLine(roadStartCoord, roadEndCoord, TileType.Road);
          placeHouseSound.play();
        } else {
          grid.setTileLine(roadStartCoord, roadEndCoord, TileType.None);
          invalidSound.play();
        }
        grid.checkRoadConnection();
        grid.recalculateDirections();
        roadsDoneButton.enabled = grid.allRoadsConnected;
      }

      roadStartCoord = null;
    }

    if (mouseIsDown(0) && roadStartCoord) {
      grid.resetToSnapshot();
      const roadEndCoord = grid.getCoordsFromMousePos(true);
      grid.setTileLine(roadStartCoord, roadEndCoord, roadType);
    }
    // if (mouseWasReleased(2) && grid.allRoadsConnected) {
    //   stateManager.setGameState(GameState.PlaceHouses);
    // }
  },
  gameRender() {
    grid.render();
    drawText(placeRoadsText, topTextPos, 1.5);
    if (!grid.allRoadsConnected) {
      drawText(requiredRoadsText, bottomTextPos, 1.5);
    }
    roadsBtnMgr.render();
  },
};

export const ghostIncomingController = {
  init() {
    skipButton.enabled = false;
    rotateButton.enabled = false;
    // setTimeout(() => {
    //   stateManager.setGameState(GameState.PlaceHouses);
    // }, 5000);
    currentGhost = new Ghost(vec2(40, -20));
    currentGhost.moveTo(ghostRequestPos, 15).then(() => {
      stateManager.setGameState(GameState.PlaceHouses);
    });
    ghosts.push(currentGhost);
  },
  gameUpdate() {
    updateGhosts();
  },
  gameRender() {
    grid.render();
    // drawTile(ghostRequestPos, vec2(6), ghostTileIndex);
    if (house) {
      house.render();
    }
    for (const ghost of ghosts) {
      ghost.render();
    }

    // if (fittableHouse) {
    //   fittableHouse.render();
    // }

    drawText(
      placeHouseText,
      topTextPos,
      1.5,
    );
    drawText(
      'right-click\nworks too',
      rotateButton.pos.add(vec2(3, 0.5)), 1,
      undefined,
      undefined, undefined,
      'left',
    )
    drawText(
      `Skips left: ${skipsLeft}`,
      skipButton.pos.add(vec2(3, 0)), 1.5,
      undefined,
      undefined, undefined,
      'left',
    );
    housesBtnMgr.render();
  },
};

// Place Houses
export const placeHousesController = {
  init() {
    skipButton.enabled = skipsLeft > 0;
    rotateButton.enabled = true;
    currentGhost.showRequestText();

    grid.checkAvailableSpaces();
    
    spawnNewHouse();
    if (grid.hasAvailableSpaces && (fittableHouse || skipsLeft > 0)) {
      houseRequestSound.play();
    }
    
    house.bounce();
  },
  gameUpdate() {
    updateGhosts();
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

    house.update();
  
    if (mouseWasReleased(2)) {
      house.rotate(1);
      clickSound.play();
    }

    if (mouseWasPressed(0)) {
      if (!housesBtnMgr.pressed() && house.isClicked()) {
        pickUpSound.play();
        house.state = HouseState.Placing;
        origHousePos = house.pos.copy();
        dragAnchor = mousePos.copy();
      }
    }

    if (mouseWasReleased(0)) {
      housesBtnMgr.released();
      if (dragAnchor) {
        house.pos.x = Math.floor((house.pos.x + tileSize / 2) / tileSize) * tileSize;
        house.pos.y = Math.floor((house.pos.y + tileSize / 2) / tileSize) * tileSize;

        const bounds = house.getWorldBounds();
        const midpoint = vec2(
          (bounds[0].x + bounds[1].x) / 2,
          (bounds[0].y + bounds[1].y) / 2,
        );
        if (
          midpoint.x >= undroppableBounds.lower.x &&
          midpoint.x <= undroppableBounds.upper.x &&
          midpoint.y >= undroppableBounds.lower.y &&
          midpoint.y <= undroppableBounds.upper.y
        ) {
          house.pos.x = origHousePos.x;
          house.pos.y = origHousePos.y;
        }

        if (grid.houseCanFit(house) && grid.houseIsTouchingRoad(house)) {
          placeHouseSound.play();
          grid.addHouse(house);
          currentGhost.showThankText();
          currentGhost.resizeTo(vec2(1), 1);
          currentGhost.moveTo(midpoint.copy(), 10).then(ghost => {
            return ghost.fadeTo(0, 1);
          }).then(ghost => {
            ghost.destroy = true;
          });
          house = null;
          stateManager.setGameState(GameState.GhostIncoming);
        } else {
          invalidSound.play();
          house.state = HouseState.Invalid;
        }
        dragAnchor = null;
      }
    }
  
    if (mouseIsDown(0) && dragAnchor) {
      house.pos.x = origHousePos.x + (mousePos.x - dragAnchor.x);
      house.pos.y = origHousePos.y + (mousePos.y - dragAnchor.y);

      const bounds = house.getWorldBounds();
      if (bounds[0].x < droppableBounds.lower.x) {
        house.pos.x = droppableBounds.lower.x;
      } else if (bounds[1].x > droppableBounds.upper.x) {
        house.pos.x = droppableBounds.upper.x - (bounds[1].x - bounds[0].x);
      }
      if (bounds[0].y < droppableBounds.lower.y) {
        house.pos.y = droppableBounds.lower.y;
      } else if (bounds[1].y > droppableBounds.upper.y) {
        house.pos.y = droppableBounds.upper.y - (bounds[1].y - bounds[0].y);
      }
    }
    
    // skipping while the current piece does not fit causes a "double game over",
    // so we're making sure we're still in the same state
    if (stateManager.gameState === GameState.PlaceHouses && (!grid.hasAvailableSpaces || (!fittableHouse && skipsLeft <= 0))) {
      if (currentGhost) {
        currentGhost.showSkippedText();
        
        currentGhost.fadeTo(0, 2);
        currentGhost.moveTo(ghostRequestPos.copy().add(vec2(20, 0)), 10)
          .then(ghost => ghost.destroy = true);
      }
      houseSkipSound.play();
      stateManager.setGameState(GameState.GameOver);
    }
  },
  gameRender() {
    grid.render();
    for (const ghost of ghosts) {
      ghost.render();
    }
    house.render();

    // if (fittableHouse) {
    //   fittableHouse.render();
    // }

    drawText(
      placeHouseText,
      topTextPos,
      1.5,
    );
    drawText(
      'right-click\nworks too',
      rotateButton.pos.add(vec2(3, 0.5)), 1,
      undefined,
      undefined, undefined,
      'left',
    )
    drawText(
      `Skips left: ${skipsLeft}`,
      skipButton.pos.add(vec2(3, 0)), 1.5,
      undefined,
      undefined, undefined,
      'left',
    );
    housesBtnMgr.render();
  },
};

// Game over
export const gameOverController = {
  init() {
    rotateButton.enabled = false;
    skipButton.enabled = false;
    gameOverTime = Date.now();
  },
  gameUpdate() {
    updateGhosts();

    const now = Date.now();
    const since = now - gameOverTime;

    topOffset = randVector(lerp(percent(since, 0, 1000), 1, 0));

    if (since >= 3000) {
      const counts = grid.getCounts();
      stateManager.setGameState(GameState.Leaderboard, {
        timestamp: now,
        totalMaxScore: counts.totalCount,
        score: counts.houseTileCount,
        roadCount: counts.roadCount,
      });
    }
  },
  gameRender() {
    grid.render();
    house.render();
    for (const ghost of ghosts) {
      ghost.render();
    }

    drawText(
      noMoreMovesText,
      topTextPos.add(topOffset),
      1.5,
    );
    drawText(
      'right-click\nworks too',
      rotateButton.pos.add(vec2(3, 0.5)), 1,
      new Color(1, 1, 1, 0.5),
      undefined, undefined,
      'left',
    )
    drawText(
      `Skips left: ${skipsLeft}`,
      skipButton.pos.add(vec2(3, 0)), 1.5,
      new Color(1, 1, 1, 0.5),
      undefined, undefined,
      'left',
    );
    housesBtnMgr.render();
  },

};
