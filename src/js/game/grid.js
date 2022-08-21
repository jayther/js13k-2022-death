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
    // TODO negative direction not really working
    if (Math.abs(c2.x - c1.x) < Math.abs(c2.y - c1.y)) {
      const endY = c2.y;
      const dir = sign(c2.y - c1.y);
      console.log(endY, dir);
      for (let y = c1.y; y * dir <= c1.y + (endY - c1.y); y += dir) {
        tiles.push(this.getTile(c1.x, y));
      }
    } else {
      const endX = c2.x;
      const dir = sign(c2.x - c1.x);
      for (let x = c1.x; x * dir <= c1.x + (endX - c1.x); x += dir) {
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
