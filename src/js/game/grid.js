import { Color, drawRect, vec2, randInt, mousePos, sign } from '../engine/engine.all';
import { deltaArray, HouseState, tileSize, TileType } from '../consts';


export class Tile {
  constructor(type) {
    this.type = type || 0;
  }
}

export class Grid {

  constructor() {
    this.pos = vec2();
    this.tiles = [];
    this.size = vec2(10, 10);
    const total = this.size.x * this.size.y;
    for (let i = 0; i < total; i += 1) {
      this.tiles.push(new Tile(0));
    }
    this.houses = [];
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

  getCoordsFromMousePos() {
    return this.getCoordsFromPos(mousePos);
  }

  getCoordsFromPos(worldPos) {
    const gridPos = worldPos.subtract(this.pos).add(vec2(tileSize / 2));
    if (gridPos.x < 0) { return null; }
    if (gridPos.x >= this.size.x * tileSize) { return null; }
    if (gridPos.y < 0) { return null; }
    if (gridPos.y >= this.size.y * tileSize) { return null; }
    return gridPos.divide(vec2(tileSize)).floor();
  }

  setTileLine(c1, c2, type) {
    const tiles = [];
    if (Math.abs(c2.x - c1.x) < Math.abs(c2.y - c1.y)) {
      // closer to the y-axis
      const startY = Math.min(c2.y, c1.y);
      const endY = Math.max(c2.y, c1.y);
      for (let y = startY; y <= endY; y += 1) {
        tiles.push(this.getTile(c1.x, y));
      }
    } else {
      // closer to the x-axis
      const startX = Math.min(c2.x, c1.x);
      const endX = Math.max(c2.x, c1.x);
      for (let x = startX; x <= endX; x += 1) {
        tiles.push(this.getTile(x, c1.y));
      }
    }
    for (const tile of tiles) {
      tile.type = type;
    }
    return tiles;
  }

  clearEphRoads() {
    for (const tile of this.tiles) {
      if (tile.type === TileType.EphRoad) {
        tile.type = TileType.None;
      }
    }
  }

  render() {
    for (let y = 0; y < this.size.y; y += 1) {
      for (let x = 0; x < this.size.x; x += 1) {
        const tilePos = vec2(x, y);
        const renderTitlePos = tilePos.multiply(vec2(tileSize)).add(this.pos);
        const tile = this.getTile(x, y);
        let color = null;
        switch (tile.type) {
        case TileType.None:
          color = new Color(0.3, 0.3, 0.3);
          break;
        case TileType.Road:
          color = new Color(0.5, 0.5, 0.5);
          break;
        case TileType.EphRoad:
          color = new Color(0.4, 0.4, 0.4);
          break;
        default:
          color = null;
          break;
        }
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
