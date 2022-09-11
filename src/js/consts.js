export const tileSize = 2;

export const TileType = {
  None: 0,
  HousePart: 1,
  Road: 2,
  EphRoad: 3,
  EphDelete: 4,
  DCRoad: 5,
};

export const HouseState = {
  Placing: 0,
  Placed: 1,
  Invalid: 2,
  Fittable: 3,
};

export const deltaArray = [
  [0, 1], // north
  [1, 0], // east
  [0, -1], // south
  [-1, 0], // west
];

export const diagDeltaArray = [
  [1, 1], // NE
  [1, -1], // SE
  [-1, -1], // SW
  [-1, 1], // NW
];

export const orthoDiagDeltaArray = deltaArray.concat(diagDeltaArray);

export const GameState = {
  Idle: 0,
  MainMenu: 1,
  PlaceRoads: 2,
  PlaceHouses: 3,
  GameOver: 4,
  Leaderboard: 5,
};

export const Direction = {
  North: 1 << 0,
  East: 1 << 1,
  South: 1 << 2,
  West: 1 << 3,
  NorthEast: 1 << 4,
  SouthEast: 1 << 5,
  SouthWest: 1 << 6,
  NorthWest: 1 << 7,
};

export const deltaArrayDirectionMap = [
  Direction.North,
  Direction.East,
  Direction.South,
  Direction.West,
  Direction.NorthEast,
  Direction.SouthEast,
  Direction.SouthWest,
  Direction.NorthWest,
];

export const tileMask = 0b111;

export const directionShift = 3;
export const orthoMask = 0b1111;
