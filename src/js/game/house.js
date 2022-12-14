import { vec2, Color, drawRect, mousePos, randInt, drawTile, time, percent, PI } from '../engine/engine.all';
import {
  HouseState,
  tileSize,
  TileType,
  deltaArray,
  tileMask,
  deltaArrayDirectionMap,
  directionShift,
} from '../consts';

const stateColorMap = [
  new Color(1, 1, 1, 0.3),  // Placing
  null,                     // Placed
  new Color(1, 0, 0, 0.5),   // Invalid
  new Color(1, 1, 1, 0.5),  // Fittable
];

const cw = 1, ccw = 0;

const tileSizeVec2 = vec2(tileSize);

const altSingleIndexOffset = 25;
const altSingleLength = 6;

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
  constructor(pos, tiles = undefined) {
    this.pos = pos;
    this.offset = vec2();
    this.tiles = tiles || createRandomTiles(2);
    // this.tiles = tiles || createRandomTiles(1);
    this.recalculateDirections();
    this.singleTileIndex = -1;
    if (this.tiles.length === 1 && this.tiles[0].length === 1) {
      // randInt seems to limit to zero, so we have to add 1 in rand, then subtract 1
      this.singleTileIndex = randInt(0, altSingleLength + 1) - 1;
      if (this.singleTileIndex > -1) {
        this.singleTileIndex += altSingleIndexOffset;
      }
    }

    // console.table(this.tiles.map(row => row.map(tile => tile.toString(2).padStart(11, '0'))));
    this.state = HouseState.Placing;
    this.bouncing = false;
    this.bounceStartTime = 0;
    this.bounceEndTime = 0;
  }

  bounce() {
    if (this.bouncing) { return; }

    this.bouncing = true;
    this.bounceStartTime = time;
    this.bounceEndTime = time + 0.2;
  }

  recalculateDirections() {
    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles[y].length; x++) {
        const limits = vec2(this.tiles[y].length, this.tiles.length);
        const directionFlags = deltaArray.reduce((accFlags, delta, i) => {
          const pos = vec2(x + delta[0], y + delta[1]);
          if (!pos.arrayCheck(limits)) {
            return accFlags;
          }
          if (!(this.tiles[pos.y][pos.x] & tileMask)) {
            return accFlags;
          }
          return accFlags | deltaArrayDirectionMap[i];
        }, 0);
        
        // reset then re-mask
        this.tiles[y][x] = (this.tiles[y][x] & tileMask) | (directionFlags << directionShift);
      }
    }
  }

  copy() {
    const tiles = [];
    for (let y = 0; y < this.tiles.length; y++) {
      tiles.push([...this.tiles[y]]);
    }
    return new House(this.pos.copy(), tiles);
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
    this.recalculateDirections();
  }

  update() {
    if (!this.bouncing) { return; }

    if (time >= this.bounceEndTime) {
      this.offset.y = 0;
      this.bouncing = false;
    }
    const p = percent(time, this.bounceStartTime, this.bounceEndTime);
    this.offset.y = Math.sin(p * PI) * 1;

  }

  render() {
    for (let y = 0; y < this.tiles.length; y += 1) {
      const tileRow = this.tiles[y];
      for (let x = 0; x < tileRow.length; x += 1) {
        const tile = tileRow[x];
        if (!(tile & tileMask)) { continue; }
        const color = stateColorMap[this.state];
        const renderTilePos = vec2(x, y).multiply(tileSizeVec2).add(this.pos).add(this.offset);

        // if singleTileIndex is properly defined, use that one. otherwise,
        // tiles are indexed according to the direction flags
        const tileIndex = this.singleTileIndex > -1 ? this.singleTileIndex : (tile >> directionShift);
        drawTile(renderTilePos, tileSizeVec2, tileIndex);

        if (color) {
          drawRect(renderTilePos, tileSizeVec2, color);
        }
      }
    }
  }
}
