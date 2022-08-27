import { vec2, Color, drawRect, mousePos, randInt } from '../engine/engine.all';
import { HouseState, tileSize, TileType, deltaArray } from '../consts';

const stateColorMap = [
  new Color(),              // Placing
  new Color(0.9, 0.9, 0.9), // Placed
  new Color(1, 0.3, 0.3),   // Invalid
];

const cw = 1, ccw = 0;

function createRandomTiles(maxExtent) {
  const side = maxExtent * 2 - 1;
  const numTiles = randInt(1, side**2 + 1);
  const tiles = [];
  const houseCoords = [];
  for (let i = 0; i < side; i++) {
    tiles.push(new Array(side).fill(TileType.None));
  }
  for (let i = 0; i < numTiles; i++) {
    let x, y;
    if (i === 0) {
      x = randInt(0, side);
      y = randInt(0, side);
      houseCoords.push([x, y]);
    } else {
      const baseCoord = houseCoords[randInt(0, houseCoords.length)];
      const eligibleCoords = deltaArray.map(delta => {
        let neighborCoord = [
          baseCoord[0] + delta[0],
          baseCoord[1] + delta[1],
        ];
        if (neighborCoord[0] < 0) { return null; }
        if (neighborCoord[0] >= side) { return null; }
        if (neighborCoord[1] < 0) { return null; }
        if (neighborCoord[1] >= side) { return null; }

        if (tiles[neighborCoord[1]][neighborCoord[0]] !== TileType.None) {
          return null;
        }

        return neighborCoord;
      }).filter(coord => coord);

      if (!eligibleCoords.length) {
        continue;
      }

      const useCoord = eligibleCoords[randInt(0, eligibleCoords.length)];
      [x, y] = useCoord;
      houseCoords.push(useCoord);
    }

    tiles[y][x] = TileType.HousePart;
  }

  // trim non-house-parts
  // trim rows
  for (let y = tiles.length - 1; y >= 0; y--) {
    if (tiles[y].every(tile => tile === TileType.None)) {
      tiles.splice(y, 1);
    }
  }
  // trim columns
  for (let x = side - 1; x >= 0; x--) {
    if (tiles.map(row => row[x]).every(tile => tile === TileType.None)) {
      tiles.forEach(row => row.splice(x, 1));
    }
  }

  return tiles;
}

export class House {
  constructor(x, y) {
    this.pos = vec2(x, y);
    this.tiles = createRandomTiles(2);

    this.state = HouseState.Placing;
  }

  getWorldBounds() {
    const width = this.tiles[0].length * tileSize;
    const height = this.tiles.length * tileSize;
    return [this.pos.copy(), this.pos.add(vec2(width, height))];
  }

  isClicked() {
    const localPos = mousePos.subtract(this.pos).add(vec2(tileSize / 2)).divide(vec2(tileSize)).floor();
    const tileRow = this.tiles[localPos.y];
    if (!tileRow) { return false; }

    return !!tileRow[localPos.x];
  }

  rotate(direction) {
    const width = this.tiles.length;
    const height = this.tiles[0].length;
    const rotatedTiles = new Array(height);

    for (let y = 0; y < height; y++) {
      rotatedTiles[y] = new Array(width).fill(TileType.None);
    }

    // mirror at 45-degree angle from origin
    // we're traversing the original tiles so we're using the new tiles' width
    for (let y = 0; y < width; y++) {
      for (let x = 0; x < height; x++) {
        rotatedTiles[x][y] = this.tiles[y][x];
      }
    }

    // unmirroring in an axis is effectively rotating it
    if (direction === cw) {
      // unmirror in the x-axis
      rotatedTiles.reverse();
    } else {
      // unmirror in the y-axis
      rotatedTiles.forEach(row => row.reverse());
    }
    this.tiles = rotatedTiles;
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
