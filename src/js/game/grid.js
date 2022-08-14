import { Color, drawRect, vec2, randInt, mousePos } from '../engine/engine.all';

const tileSize = 2;

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
      this.tiles.push(new Tile(randInt(0, 2)));
    }
  }

  setTile(x, y, type) {
    this.tiles[x + y * this.size.x].type = type;
  }

  getTile(x, y) {
    return this.tiles[x + y * this.size.x];
  }

  getTileFromMousePos() {
    const gridPos = mousePos.subtract(this.pos).add(vec2(tileSize / 2));
    if (gridPos.x < 0) { return null; }
    if (gridPos.x >= this.size.x * tileSize) { return null; }
    if (gridPos.y < 0) { return null; }
    if (gridPos.y >= this.size.y * tileSize) { return null; }
    const coords = gridPos.divide(vec2(tileSize)).floor();
    return this.getTile(coords.x, coords.y);
  }

  render() {
    for (let y = 0; y < this.size.y; y += 1) {
      for (let x = 0; x < this.size.x; x += 1) {
        const tilePos = vec2(x, y);
        const renderTitlePos = tilePos.add(this.pos).multiply(vec2(tileSize));
        const tile = this.getTile(x, y);
        let color;
        switch (tile.type) {
        case 0:
          color = new Color(0.3, 0.3, 0.3);
          break;
        case 1:
        default:
          color = new Color(1, 1, 1);
          break;
        }
        drawRect(renderTitlePos, vec2(tileSize), color);
      }
    }
  }
}
