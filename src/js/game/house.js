import { vec2, Color, drawRect, mousePos, randInt, drawTile } from '../engine/engine.all';
import {
  HouseState,
  tileSize,
  TileType,
  deltaArray,
  Direction,
  tileMask,
  deltaArrayDirectionMap,
  directionShift,
  orthoDiagDeltaArray,
  orthoMask,
} from '../consts';

const stateColorMap = [
  new Color(),              // Placing
  new Color(0.9, 0.9, 0.9), // Placed
  new Color(1, 0.3, 0.3),   // Invalid
  new Color(1, 1, 1, 0.5),  // Fittable
];

const cw = 1, ccw = 0;

const tileSizeVec2 = vec2(tileSize);
const tileDrawSize = vec2(tileSize * 0.75);
const neighborOffset = 1 / 8;

const NE = Direction.North | Direction.East | Direction.NorthEast;
const SE = Direction.South | Direction.East | Direction.SouthEast;
const SW = Direction.South | Direction.West | Direction.SouthWest;
const NW = Direction.North | Direction.West | Direction.NorthWest;

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
    this.tiles = tiles || createRandomTiles(2);
    this.recalculateDirections();

    // console.table(this.tiles.map(row => row.map(tile => tile.toString(2).padStart(11, '0'))));
    this.state = HouseState.Placing;
  }

  recalculateDirections() {
    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles[y].length; x++) {
        const limits = vec2(this.tiles[y].length, this.tiles.length);
        const directionFlags = orthoDiagDeltaArray.reduce((accFlags, delta, i) => {
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

  render() {
    for (let y = 0; y < this.tiles.length; y += 1) {
      const tileRow = this.tiles[y];
      for (let x = 0; x < tileRow.length; x += 1) {
        const tile = tileRow[x];
        if (!(tile & tileMask)) { continue; }
        const color = stateColorMap[this.state] || new Color(1, 0, 0);
        const renderTilePos = vec2(x, y).multiply(tileSizeVec2).add(this.pos);
        // drawRect(renderTilePos, tileDrawSize, color);
        const directionFlags = (tile >> directionShift) & orthoMask;
        drawTile(renderTilePos, tileSizeVec2, directionFlags);
        
        // if (directionFlags & Direction.North) {
        //   drawRect(renderTilePos.add(vec2(0, neighborOffset).multiply(tileSizeVec2)), tileDrawSize, color);
        // }
        // if (directionFlags & Direction.East) {
        //   drawRect(renderTilePos.add(vec2(neighborOffset, 0).multiply(tileSizeVec2)), tileDrawSize, color);
        // }
        // if (directionFlags & Direction.South) {
        //   drawRect(renderTilePos.add(vec2(0, -neighborOffset).multiply(tileSizeVec2)), tileDrawSize, color);
        // }
        // if (directionFlags & Direction.West) {
        //   drawRect(renderTilePos.add(vec2(-neighborOffset, 0).multiply(tileSizeVec2)), tileDrawSize, color);
        // }
        // if ((directionFlags & NE) === NE) {
        //   drawRect(renderTilePos.add(vec2(neighborOffset, neighborOffset).multiply(tileSizeVec2)), tileDrawSize, color);
        // }
        // if ((directionFlags & SE) === SE) {
        //   drawRect(renderTilePos.add(vec2(neighborOffset, -neighborOffset).multiply(tileSizeVec2)), tileDrawSize, color);
        // }
        // if ((directionFlags & SW) === SW) {
        //   drawRect(renderTilePos.add(vec2(-neighborOffset, -neighborOffset).multiply(tileSizeVec2)), tileDrawSize, color);
        // }
        // if ((directionFlags & NW) === NW) {
        //   drawRect(renderTilePos.add(vec2(-neighborOffset, neighborOffset).multiply(tileSizeVec2)), tileDrawSize, color);
        // }
      }
    }
  }
}
