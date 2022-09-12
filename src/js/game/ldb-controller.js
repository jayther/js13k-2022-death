import { mouseWasPressed, Color, vec2, mouseWasReleased, cameraPos, drawText } from '../engine/engine.all';
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

const topPos = vec2(0, 18);
const scoreInfoPos = topPos.add(vec2(0, -5));
const hsTitlePos = topPos.add(vec2(0, -13));
const scoreTopPos = hsTitlePos.add(vec2(3, -5));
const scorePosList = new Array(maxScores);

for (let i = 0; i < scorePosList.length; i++) {
  scorePosList[i] = [
    scoreTopPos.add(vec2(-0.7, -2 * i)),
    scoreTopPos.add(vec2(0.7, -2 * i)),
  ];
}

const btnMgr = new ButtonManager();

const retryBtn = new Button(
  topPos.add(vec2(0, -31)), vec2(5, 3), 'Retry', 1.5, new Color(1, 1, 1), new Color(0, 0, 0),
  () => {
    stateManager.setGameState(GameState.PlaceRoads);
  },
  false,
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
  // remove scores with missing "score" property (from overriding non-mangled version)
  scores = scores.filter(score => typeof score.score === 'number');
  scores.forEach(score => score.dateStr = new Date(score.timestamp).toLocaleDateString());
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
    dateStr: new Date(timestamp).toLocaleDateString(),
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

  drawText('Game over', topPos, 4, titleColor, 0.5, titleLineColor);
  
  drawText(
    `You covered ${currentScore.score} tiles (${Math.floor(currentScore.score / totalMaxScore * 100)}%)\n(road count: ${roadCount}, grid total: ${totalMaxScore})`,
    scoreInfoPos,
    2, scoreColor
  );

  drawText('High Scores', hsTitlePos, 4, titleColor, 0.5, titleLineColor);

  for (let i = 0; i < maxScores; i++) {
    const score = scores[i];
    let dateStr, scoreStr, textColor;

    if (!score) {
      dateStr = '-------------';
      scoreStr = '---';
      textColor = scoreColor;
    } else {
      dateStr = score.dateStr;
      scoreStr = score.score.toString();
      textColor = score.current ? currentScoreColor : scoreColor;
    }
    
    drawText(dateStr, scorePosList[i][0], 2, textColor, undefined, undefined, 'right');
    drawText(scoreStr, scorePosList[i][1], 2, textColor, undefined, undefined, 'left');
  }
}

// Leaderboard
export const leaderboardController = {
  init(opts) {
    totalMaxScore = opts.totalMaxScore;
    roadCount = opts.roadCount;
    loadScores();
    addScore(opts.score, opts.timestamp);

    cameraPos.x = 0;
    cameraPos.y = 0;
  },
  gameUpdate() {
    if (mouseWasPressed(0)) {
      btnMgr.pressed();
    }
    if (mouseWasReleased(0)) {
      btnMgr.released();
    }
    btnMgr.update();
  },
  gameRender() {
    renderScores();
    btnMgr.render();
  },
};
