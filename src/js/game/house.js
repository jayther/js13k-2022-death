import { vec2, Color, drawRect, mousePos } from '../engine/engine.all';
import { HouseState, tileSize } from '../consts';

const stateColorMap = {
  [HouseState.Placing]: new Color(),
  [HouseState.Placed]: new Color(0.9, 0.9, 0.9),
};

export class House {
  constructor() {
    this.pos = vec2(20, 20);
    this.tiles = [
      [1, 1],
      [1, 0],
    ];
    this.state = HouseState.Placing;
  }

  getWorldBounds() {
    const width = this.tiles[0].length;
    const height = this.tiles.length;
    return [this.pos.copy(), this.pos.add(vec2(width, height))];
  }

  isClicked() {
    const localPos = mousePos.subtract(this.pos).add(vec2(tileSize / 2)).divide(vec2(tileSize)).floor();
    const tileRow = this.tiles[localPos.y];
    if (!tileRow) { return false; }

    return !!tileRow[localPos.x];
  }

  render() {
    for (let y = 0; y < this.tiles.length; y += 1) {
      const tileRow = this.tiles[y];
      for (let x = 0; x < tileRow.length; x += 1) {
        const tile = tileRow[x];
        if (!tile) { continue; }
        const color = stateColorMap[this.state] || new Color(1, 0, 0);
        const renderTilePos = vec2(x, y).multiply(vec2(tileSize)).add(this.pos);
        drawRect(renderTilePos, vec2(tileSize), color);
      }
    }
  }
}
