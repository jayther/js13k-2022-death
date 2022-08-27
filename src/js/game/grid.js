import { Color, drawRect, vec2, randInt, mousePos, sign } from '../engine/engine.all';
import { deltaArray, HouseState, tileSize, TileType } from '../consts';

const tileColorMap = [
  new Color(0.3, 0.3, 0.3), // None
  null,                     // HousePart
  new Color(0.5, 0.5, 0.5), // Road
  new Color(0.4, 0.4, 0.4), // EphRoad
  new Color(0.8, 0.3, 0.3), // EphDelete
  new Color(1, 0, 0),       // DCRoad
];

export class Tile {
  constructor(type, x, y) {
    this.x = x;
    this.y = y;
    this.type = type || 0;
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

  constructor() {
    this.pos = vec2();
    this.tiles = [];
    this.size = vec2(10, 10);
    const total = this.size.x * this.size.y;
    for (let i = 0; i < total; i += 1) {
      this.tiles.push(new Tile(0, i % this.size.x, Math.floor(i / this.size.y)));
    }
    this.allRoadsConnected = false;
    this.houses = [];
    this.snapshotTiles = [];
    for (const tile of this.tiles) {
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
        if (!row[x]) { continue; }
        
        const tileGridPos = houseGridPos.add(vec2(x, y));
        const gridTile = this.getTile(tileGridPos.x, tileGridPos.y);
        if (gridTile.type) {
          return false;
        }
      }
    }
    return true;
  }

  houseIsTouchingRoad(house) {
    const houseGridPos = house.pos.divide(vec2(tileSize));
    const houseTiles = house.tiles;
    for (let y = 0; y < houseTiles.length; y += 1) {
      const row = houseTiles[y];
      for (let x = 0; x < row.length; x += 1) {
        if (!row[x]) { continue; }
        
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
        if (!row[x]) { continue; }
        
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
    if (!beyondLimits) {
      if (gridPos.x < 0) { return null; }
      if (gridPos.x >= this.size.x * tileSize) { return null; }
      if (gridPos.y < 0) { return null; }
      if (gridPos.y >= this.size.y * tileSize) { return null; }
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
    roads.forEach(tile => tile.type = TileType.DCRoad);
    
    const edgeRoads = roads.filter(tile => (
      tile.x === 0 || tile.y === 0 ||
      tile.x === this.size.x - 1 || tile.y === this.size.y - 1
    ));

    if (!edgeRoads.length) {
      this.allRoadsConnected = false;
      return;
    }

    edgeRoads.forEach(tile => this.setConnectedRoads(tile.x, tile.y));

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

  render() {
    for (let y = 0; y < this.size.y; y += 1) {
      for (let x = 0; x < this.size.x; x += 1) {
        const tilePos = vec2(x, y);
        const renderTitlePos = tilePos.multiply(vec2(tileSize)).add(this.pos);
        const tile = this.getTile(x, y);
        const color = tileColorMap[tile.type];
        if (color) {
          drawRect(renderTitlePos, vec2(tileSize), color);
        }
      }
    }
    for (const house of this.houses) {
      house.render();
    }
  }
}
