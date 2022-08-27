import { mouseWasPressed, mainCanvasSize, Color, vec2, drawTextScreen } from '../engine/engine.all';
import { ButtonManager } from './btn-mgr';
import { Button } from './button';
import { stateManager } from './state-mgr';
import { GameState } from '../consts';

const titleColor = new Color(1, 0, 0);
const titleLineColor = new Color(1, 1, 1);
const scoreColor = new Color(1, 1, 1);
const currentScoreColor = new Color(1, 1, 0);

const storageKey = 'deathestate_jayther_ldb';
const memStorage = {};

const maxScores = 5;
let currentScore;
let scores = [];
let totalMaxScore = 0;
let roadCount = 0;
let localStorageAvail = true;

const btnMgr = new ButtonManager();

const retryBtn = new Button(
  mainCanvasSize.x, mainCanvasSize.y, 100, 50, 'Retry', new Color(1, 1, 1), new Color(0, 0, 0),
  () => {
    stateManager.setGameState(GameState.PlaceRoads);
  }
)

btnMgr.addBtn(retryBtn);

function loadScores() {
  let scoresStr = null;
  if (localStorageAvail) {
    try {
      scoresStr = window.localStorage.getItem(storageKey);
    } catch (e) {
      // localStorage not available
      localStorageAvail = false;
    }
  } else {
    scoresStr = memStorage[storageKey] || null;
  }

  if (scoresStr) {
    scores = JSON.parse(scoresStr);
  }
}

function saveScores() {
  const normalizedScores = scores.map(score => ({
    score: score.score,
    timestamp: score.timestamp,
  }));
  const scoresStr = JSON.stringify(normalizedScores);
  if (localStorageAvail) {
    try {
      window.localStorage.setItem(storageKey, scoresStr);
    } catch (e) {
      // localStorage not available
      localStorageAvail = false;
    }
  }
  if (!localStorageAvail) {
    memStorage[storageKey] = scoresStr;
  }
}

function addScore(score, timestamp) {
  currentScore = {
    score,
    timestamp,
    current: true,
  };
  scores.push(currentScore);
  scores.sort((a, b) => {
    const diff = b.score - a.score;
    return diff === 0 ? (b.timestamp - a.timestamp) : diff;
  });
  while (scores.length > maxScores) {
    scores.pop();
  }
  saveScores();
}

function renderScores() {
  const topPos = vec2(mainCanvasSize.x / 2, mainCanvasSize.y / 2 - 250);

  drawTextScreen('Game over', topPos, 45, titleColor, 5, titleLineColor);
  
  drawTextScreen(
    `You covered ${currentScore.score} tiles (${Math.floor(currentScore.score / totalMaxScore * 100)}%)\n(road count: ${roadCount}, grid total: ${totalMaxScore})`,
    topPos.add(vec2(0, 45)),
    30, scoreColor
  );

  const scoreTopPos = topPos.add(vec2(50, 200));
  const titlePos = topPos.add(vec2(0, 145));
  drawTextScreen('High Scores', titlePos, 45, titleColor, 5, titleLineColor);

  for (let i = 0; i < maxScores; i++) {
    const score = scores[i];
    let dateStr, scoreStr, textColor;

    if (!score) {
      dateStr = '-------------';
      scoreStr = '---';
      textColor = scoreColor;
    } else {
      const date = new Date(score.timestamp);
      dateStr = date.toLocaleDateString();
      scoreStr = score.score.toString();
      textColor = score.current ? currentScoreColor : scoreColor;
    }
    
    drawTextScreen(dateStr, scoreTopPos.add(vec2(-5, 35 * i)), 30, textColor, undefined, undefined, 'right');
    drawTextScreen(scoreStr, scoreTopPos.add(vec2(5, 35 * i)), 30, textColor, undefined, undefined, 'left');
  }
}

// Leaderboard
export const leaderboardController = {
  init(opts) {
    totalMaxScore = opts.totalMaxScore;
    roadCount = opts.roadCount;
    loadScores();
    addScore(opts.score, opts.timestamp);
  },
  gameUpdate() {
    if (mouseWasPressed(0)) {
      btnMgr.pressed();
    }
  },
  gameRender() {
    renderScores();
    retryBtn.pos.x = mainCanvasSize.x / 2;
    retryBtn.pos.y = mainCanvasSize.y / 2 + 150;
    btnMgr.render();
  },
};
