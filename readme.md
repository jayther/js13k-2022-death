Death Estate - JS13K Games 2022 - Death
=======================================

[![pages-build-deployment](https://github.com/jayther/js13k-2022-death/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/jayther/js13k-2022-death/actions/workflows/pages/pages-build-deployment)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Gulp](https://img.shields.io/badge/GULP-%23CF4647.svg?style=for-the-badge&logo=gulp&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

Death Estate, a packing-puzzle city builder! Build roads, then try to place as many houses that can fit for ghosts to live in.

## Game Links

Try the submitted entry at: https://dev.js13kgames.com/games/death-estate

Try the current state of the game at: https://jayther.github.io/js13k-2022-death/

## Instructions

(Instructions in-game, but also described below)

In the first phase, build roads by click-and-dragging on the grid. When you're ready, click Done.

In the houses phase, ghosts will come in and request peculiarly-shaped houses for you to place. Drag-and-drop the houses onto the grid to place them (must touch a road and not intersect other houses). You can click "Rotate" or right-click to rotate the house, or click "Skip" to skip the current ghost's request.

Game is over when you've run out of skips or there are no where to build. Points are based on the number of tiles covered by houses.

# Developing

## Setup

1. Make sure to use Node 16.x with npm 8.x
   1. `nvm use` to use the current version in `.nvmrc`
2. `npm i`

## Build

1. `npm run build`

This will make a build in `dist/` folder.

## Local dev

This will require 2 terminals.

1. `npm run watch`
2. `npm run server`, which will serve `dist`

In browser, go to http://127.0.0.1:8080

Note that `npm run watch` won't build right away until a change in `src/` has occurred.

## Deploy

1. Build with `npm run build`, which will update the `docs/` folder
2. Push to main

# License

[MIT](LICENSE)
