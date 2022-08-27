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
};

export const deltaArray = [
  [0, 1], // north
  [1, 0], // east
  [0, -1], // south
  [-1, 0], // west
];

export const GameState = {
  Idle: 0,
  MainMenu: 1,
  PlaceRoads: 2,
  PlaceHouses: 3,
  Leaderboard: 4,
};
