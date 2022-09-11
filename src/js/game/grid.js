import { 
  Color, 
  drawRect, 
  vec2, 
  randInt, 
  mousePos, 
  sign, 
  drawTile,
  PI,
  abs,
} from '../engine/engine.all';
import { 
  deltaArray,
  deltaArrayDirectionMap,
  HouseState, 
  tileMask, 
  tileSize, 
  TileType,
} from '../consts';

const tileColorMap = [
  null,                     // None
  null,                     // HousePart
  new Color(0.6, 0.6, 0.6), // Road
  new Color(0.5, 0.5, 0.5), // EphRoad
  new Color(0.8, 0.3, 0.3), // EphDelete
  new Color(1, 0, 0),       // DCRoad
];

const baseColorMap = [
  new Color(0.278, 0.176, 0.235),
  new Color(0.223, 0.125, 0.183),
];

// WSEN
const roadTileRenderMap = [
  null,
  { index: 4, angle: PI }, // ___N
  { index: 4, angle: -PI / 2 }, // __E_
  { index: 1, angle: -PI / 2 }, // __EN
  { index: 4, angle: 0 }, // _S__
  { index: 0, angle: 0 }, // _S_N
  { index: 1, angle: 0 }, // _SE_
  { index: 2, angle: 0 }, // _SEN
  { index: 4, angle: PI / 2 }, // W___
  { index: 1, angle: PI }, // W__N
  { index: 0, angle: PI / 2 }, // W_E_
  { index: 2, angle: -PI / 2 }, // W_EN
  { index: 1, angle: PI / 2 }, // WS__
  { index: 2, angle: PI }, // WS_N
  { index: 2, angle: PI / 2 }, // WSE_
  { index: 3, angle: 0 }, // WSEN
];

const roadTileIndexOffset = 16;
const pilotRoadMinDistance = 3;

export class Tile {
  constructor(type, x, y) {
    this.x = x;
    this.y = y;
    this.type = type || 0;
    this.directionFlags = 0;
    this.pilotRoad = false;
  }
  copy() {
    const tile = new Tile(this.type, this.x, this.y);
    return tile;
  }
  apply(tile) {
    this.type = tile.type;
  }
}

export class Grid {

  constructor(width, height) {
    this.pos = vec2();
    this.tiles = [];
    this.houses = [];
    this.snapshotTiles = [];
    this.allRoadsConnected = false;
    this.hasAvailableSpaces = false;
    this.size = vec2(width, height);
    const total = this.size.x * this.size.y;
    for (let i = 0; i < total; i += 1) {
      const tile = new Tile(0, i % this.size.x, Math.floor(i / this.size.y));
      this.tiles.push(tile);
      this.snapshotTiles.push(tile.copy());
    }
  }

  createSnapshot() {
    this.tiles.forEach((tile, i) => this.snapshotTiles[i].apply(tile));
  }

  houseCanFit(house) {
    const houseBounds = house.getWorldBounds();
    const gridBounds = this.getWorldBounds();
    const withinBounds = (
      houseBounds[0].x >= gridBounds[0].x &&
      houseBounds[0].y >= gridBounds[0].y &&
      houseBounds[1].x <= gridBounds[1].x &&
      houseBounds[1].y <= gridBounds[1].y
    );
    if (!withinBounds) { return false; }

    const houseGridPos = house.pos.divide(vec2(tileSize));
    const houseTiles = house.tiles;
    for (let y = 0; y < houseTiles.length; y += 1) {
      const row = houseTiles[y];
      for (let x = 0; x < row.length; x += 1) {
        if (!(row[x] & tileMask)) { continue; }
        
        const tileGridPos = houseGridPos.add(vec2(x, y));
        const gridTile = this.getTile(tileGridPos.x, tileGridPos.y);
        if (gridTile && gridTile.type) {
          return false;
        }
      }
    }
    return true;
  }

  houseFitsSomewhere(house) {
    const h = house.copy();
    h.state = HouseState.Fittable;
    for (const tile of this.tiles) {
      const worldPos = vec2(tile.x, tile.y).multiply(vec2(tileSize));
      h.pos = worldPos;
      for (let i = 0; i < 4; i++) {
        if (this.houseCanFit(h) && this.houseIsTouchingRoad(h)) {
          return h;
        }
        h.rotate(1);
      }
    }
    return null;
  }

  checkAvailableSpaces() {
    const roads = this.tiles.filter(tile => tile.type === TileType.Road);
    for (const road of roads) {
      for (const delta of deltaArray) {
        const neighborPos = vec2(road.x + delta[0], road.y + delta[1]);
        const tile = this.getTile(neighborPos.x, neighborPos.y);
        if (tile && tile.type === TileType.None) {
          this.hasAvailableSpaces = true;
          return;
        }
      }
    }
    this.hasAvailableSpaces = false;
  }

  houseIsTouchingRoad(house) {
    const houseGridPos = house.pos.divide(vec2(tileSize));
    const houseTiles = house.tiles;
    for (let y = 0; y < houseTiles.length; y += 1) {
      const row = houseTiles[y];
      for (let x = 0; x < row.length; x += 1) {
        if (!(row[x] & tileMask)) { continue; }
        
        const tileGridPos = houseGridPos.add(vec2(x, y));
        const gridTiles = deltaArray.map(delta => {
          return this.getTile(tileGridPos.x + delta[0], tileGridPos.y + delta[1]);
        }).filter(tile => tile);

        const touchingRoad = gridTiles.some(tile => tile.type === TileType.Road);
        if (touchingRoad) { return true; }
      }
    }

    return false;
  }

  addHouse(house) {
    house.state = HouseState.Placed;
    this.houses.push(house);
    const houseGridPos = house.pos.divide(vec2(tileSize));
    const houseTiles = house.tiles;
    for (let y = 0; y < houseTiles.length; y += 1) {
      const row = houseTiles[y];
      for (let x = 0; x < row.length; x += 1) {
        if (!(row[x] & tileMask)) { continue; }
        
        const tileGridPos = houseGridPos.add(vec2(x, y));
        this.setTile(tileGridPos.x, tileGridPos.y, TileType.HousePart);
      }
    }
  }

  getWorldSize() {
    return this.size.multiply(vec2(tileSize));
  }

  getWorldBounds() {
    return [this.pos.copy(), this.pos.add(this.size.multiply(vec2(tileSize)))];
  }

  setTile(x, y, type) {
    this.tiles[x + y * this.size.x].type = type;
  }

  getTile(x, y) {
    if (!vec2(x, y).arrayCheck(this.size)) { return null; }
    return this.tiles[x + y * this.size.x];
  }

  getTileFromMousePos() {
    const coords = this.getCoordsFromMousePos();
    if (!coords) { return null; }
    return this.getTile(coords.x, coords.y);
  }

  getCoordsFromMousePos(beyondLimits = false) {
    return this.getCoordsFromPos(mousePos, beyondLimits);
  }

  getCoordsFromPos(worldPos, beyondLimits = false) {
    const gridPos = worldPos.subtract(this.pos).add(vec2(tileSize / 2));
    if (!beyondLimits && !gridPos.arrayCheck(this.size.multiply(vec2(tileSize)))) {
      return null;
    }
    return gridPos.divide(vec2(tileSize)).floor();
  }

  setTileLine(c1, c2, type) {
    const tiles = [];
    if (Math.abs(c2.x - c1.x) < Math.abs(c2.y - c1.y)) {
      // closer to the y-axis
      const startY = Math.max(Math.min(c2.y, c1.y), 0);
      const endY = Math.min(Math.max(c2.y, c1.y), this.size.y - 1);
      for (let y = startY; y <= endY; y += 1) {
        tiles.push(this.getTile(c1.x, y));
      }
    } else {
      // closer to the x-axis
      const startX = Math.max(Math.min(c2.x, c1.x), 0);
      const endX = Math.min(Math.max(c2.x, c1.x), this.size.x - 1);
      for (let x = startX; x <= endX; x += 1) {
        tiles.push(this.getTile(x, c1.y));
      }
    }
    for (const tile of tiles) {
      tile.type = type;
    }
    return tiles;
  }

  resetToSnapshot() {
    this.tiles.forEach((tile, i) => tile.apply(this.snapshotTiles[i]));
  }

  checkRoadConnection() {
    const roads = this.tiles.filter(tile => tile.type === TileType.Road || tile.type === TileType.DCRoad);
    roads.forEach(tile => {
      tile.type = TileType.DCRoad;
      tile.pilotRoad = false;
    });
    
    const edgeRoads = roads.filter(tile => (
      tile.x === 0 || tile.y === 0 ||
      tile.x === this.size.x - 1 || tile.y === this.size.y - 1
    ));

    if (!edgeRoads.length) {
      this.allRoadsConnected = false;
      return;
    }

    const pilotRoads = [];
    edgeRoads.forEach(tile => {
      const hasNearbyPilot = pilotRoads.some(pilotRoad => (
        abs(pilotRoad.x - tile.x) <= pilotRoadMinDistance &&
        abs(pilotRoad.y - tile.y) <= pilotRoadMinDistance
      ));
      if (!hasNearbyPilot || tile.type === TileType.DCRoad) {
        tile.pilotRoad = true;
        pilotRoads.push(tile);
      }
      this.setConnectedRoads(tile.x, tile.y);
    });

    this.allRoadsConnected = roads.every(road => road.type === TileType.Road);
  }

  setConnectedRoads(x, y) {
    const tile = this.getTile(x, y);
    if (!tile) { return; }
    if (tile.type !== TileType.DCRoad) { return; }

    tile.type = TileType.Road;

    for (const delta of deltaArray) {
      this.setConnectedRoads(x + delta[0], y + delta[1]);
    }
  }

  recalculateDirections() {
    const roads = this.tiles.filter(tile => tile.type === TileType.Road);
    for (const road of roads) {
      road.directionFlags = deltaArray.reduce((accFlags, delta, i) => {
        const pos = vec2(road.x + delta[0], road.y + delta[1]);
        if (pos.arrayCheck(this.size)) {
          const tile = this.getTile(pos.x, pos.y);
          if (!tile || tile.type !== TileType.Road) {
            return accFlags;
          }
        } else if (!road.pilotRoad) {
          return accFlags;
        }
        return accFlags | deltaArrayDirectionMap[i];
      }, 0);
    }
  }

  getCounts() {
    const totalCount = this.size.x * this.size.y;
    let houseTileCount = 0;
    let roadCount = 0;

    for (const tile of this.tiles) {
      if (tile.type === TileType.HousePart) {
        houseTileCount += 1;
      } else if (tile.type === TileType.Road) {
        roadCount += 1;
      }
    }

    return {
      totalCount,
      houseTileCount,
      roadCount,
    };
  }

  render() {
    for (const tile of this.tiles) {
      let tileIndex = -1;
      let tileAngle = 0;
      const tilePos = vec2(tile.x, tile.y);
      const renderTilePos = tilePos.multiply(vec2(tileSize)).add(this.pos);
      const color = tileColorMap[tile.type] || baseColorMap[(tile.x + tile.y) % 2];
      if (tile.type === TileType.Road) {
        const roadTileData = roadTileRenderMap[tile.directionFlags];
        if (roadTileData) {
          tileIndex = roadTileData.index + roadTileIndexOffset;
          tileAngle = roadTileData.angle;
        }
      }
      if (tileIndex > -1) {
        drawTile(renderTilePos, vec2(tileSize), tileIndex, undefined, undefined, tileAngle);
      } else if (color) {
        drawRect(renderTilePos, vec2(tileSize), color);
      }
    }
    for (const house of this.houses) {
      house.render();
    }
  }
}
