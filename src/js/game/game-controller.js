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

/**
 * @type {Grid}
 */
let grid;
// let origCameraPos = vec2();
let origHousePos = vec2();
let dragAnchor = null;
let roadStartCoord = null;
let roadType;
let skipsLeft;
let spawnPos = vec2();
let gameOverTime;

/**
 * @type {House}
 */
let house;
/**
 * @type {House}
 */
let fittableHouse = null;

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
`Place houses! Must touch a road, not overlap
other houses, and be within the grid`

const noMoreMovesText =
`Game over! No more space or skips`;

// roads state buttons

const roadsBtnMgr = new ButtonManager();

const roadsDoneButton = new Button(
  vec2(0, -4), vec2(5, 3),
  'Done', 1.5, new Color(1, 1, 1), new Color(0, 0, 0),
  () => {
    if (grid.arc) {
      stateManager.sgs(GameState.PlaceHouses);
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
      skipsLeft -= 1;
      spawnNewHouse();
    }
    if (skipsLeft <= 0) {
      skipButton.enabled = false;
    }
  },
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
  fittableHouse = grid.hfs(house);
  // console.log('houseFitsSomewhere', !!fittableHouse);
}

// Place Roads
export const placeRoadsController = {
  init() {
    grid = new Grid(15, 15);
    dragAnchor = null;
    roadStartCoord = null;
    const gridSize = grid.gws();
    cameraPos.x = grid.pos.x + gridSize.x / 2 - tileSize / 2;
    cameraPos.y = grid.pos.y + gridSize.y / 2 - tileSize / 2;
    roadsDoneButton.pos.x = grid.pos.x + gridSize.x / 2 - tileSize / 2;
    roadsDoneButton.enabled = false;

    topTextPos.x = roadsDoneButton.pos.x;
    topTextPos.y = grid.pos.y + gridSize.y - tileSize / 2 + 5;
    bottomTextPos.x = roadsDoneButton.pos.x;
    bottomTextPos.y = roadsDoneButton.pos.y - 4;
  },
  gameUpdate() {
    if (mouseWasPressed(0)) {
      if (!roadsBtnMgr.pressed()) {
        roadStartCoord = grid.gcfmp();
        if (roadStartCoord) {
          grid.csst();
          const tile = grid.gtfmp();
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
        grid.rtsst();
        const roadEndCoord = grid.gcfmp(true);
        if (roadType === TileType.EphRoad) {
          grid.setTileLine(roadStartCoord, roadEndCoord, TileType.Road);
        } else {
          grid.setTileLine(roadStartCoord, roadEndCoord, TileType.None);
        }
        grid.crc();
        roadsDoneButton.enabled = grid.arc;
      }

      roadStartCoord = null;
    }

    if (mouseIsDown(0) && roadStartCoord) {
      grid.rtsst();
      const roadEndCoord = grid.gcfmp(true);
      grid.setTileLine(roadStartCoord, roadEndCoord, roadType);
    }
    // if (mouseWasReleased(2) && grid.allRoadsConnected) {
    //   stateManager.setGameState(GameState.PlaceHouses);
    // }
  },
  gameRender() {
    grid.render();
    drawText(placeRoadsText, topTextPos, 1.5);
    if (!grid.arc) {
      drawText(requiredRoadsText, bottomTextPos, 1.5);
    }
    roadsBtnMgr.render();
  },
};

// Place Houses
export const placeHousesController = {
  init() {
    const gridSize = grid.gws();
    spawnPos.x = grid.pos.x + gridSize.x / 2 - tileSize / 2;
    spawnPos.y = -8;
    skipsLeft = 3;
    skipButton.enabled = true;

    const gridBounds = grid.gwb();
    const growAmount = 4 * tileSize;

    droppableBounds.lower = gridBounds[0].subtract(vec2(growAmount));
    droppableBounds.upper = gridBounds[1].add(vec2(growAmount)); // house pos is bottom left

    grid.cvs();
    
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
  
    if (mouseWasReleased(2)) {
      house.rotate(1);
    }

    if (mouseWasPressed(0)) {
      if (!housesBtnMgr.pressed() && house.ic()) {
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

        const bounds = house.gwb();
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

        if (grid.hcf(house) && grid.hitr(house)) {
          grid.ah(house);
          grid.cvs();
          spawnNewHouse();
        } else {
          house.state = HouseState.Invalid;
        }
        dragAnchor = null;
      }
    }
  
    if (mouseIsDown(0) && dragAnchor) {
      house.pos.x = origHousePos.x + (mousePos.x - dragAnchor.x);
      house.pos.y = origHousePos.y + (mousePos.y - dragAnchor.y);

      const bounds = house.gwb();
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
    
    if (!grid.hvs || (!fittableHouse && skipsLeft <= 0)) {
      stateManager.sgs(GameState.GameOver);
    }
  },
  gameRender() {
    grid.render();
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
    const now = Date.now();
    const since = now - gameOverTime;

    topOffset = randVector(lerp(percent(since, 0, 1000), 1, 0));

    if (since >= 3000) {
      const counts = grid.c();
      stateManager.sgs(GameState.Leaderboard, {
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
