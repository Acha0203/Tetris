//フィールドサイズ
const FIELD_COL = 10;
const FIELD_ROW = 20;

//ブロック一つのサイズ(ピクセル)
const BLOCK_SIZE = 30;

//スクリーンサイズ
const SCREEN_W = BLOCK_SIZE * FIELD_COL;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

//テトロミノのサイズ
const TETRO_SIZE = 4;

//初期位置
const START_X = FIELD_COL / 2 - TETRO_SIZE / 2;
const START_Y = 0;

const TETRO_COLORS = [
  '#000', //0空
  '#6CF', //1水色
  '#F92', //2オレンジ
  '#66F', //3青
  '#C5C', //4紫
  '#FD2', //5黄色
  '#F44', //6赤
  '#5B5', //7緑
];

const TETRO_TYPES = [
  [], // 0.空っぽ

  [
    // 1.I
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // 2.L
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // 3.J
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // 4.T
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // 5.O
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // 6.Z
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // 7.S
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
];

//テトロミノ本体
let tetro;

//テトロミノの形
let tetro_t;

tetro_t = Math.floor(Math.random() * (TETRO_TYPES.length - 1)) + 1;
tetro = TETRO_TYPES[tetro_t];

//テトロミノの座標
let tetro_x = 0;
let tetro_y = 0;

//フィールド本体
let field = [];

//落ちるスピード
const GAME_SPEED = 1000;

let can = document.getElementById('can');
let con = can.getContext('2d');

can.width = SCREEN_W;
can.height = SCREEN_H;
can.style.border = '4px solid #555';

init();
drawAll();

setInterval(dropTetro, GAME_SPEED);

//初期化
function init() {
  //フィールドのクリア
  for (let y = 0; y < FIELD_ROW; y++) {
    field[y] = [];
    for (let x = 0; x < FIELD_COL; x++) {
      field[y][x] = 0;
    }
  }
}

//ブロック１つを描画する
function drawBlock(x, y, c) {
  let px = x * BLOCK_SIZE;
  let py = y * BLOCK_SIZE;
  con.fillStyle = TETRO_COLORS[c];
  con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
  con.strokeStyle = 'black';
  con.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
}

//全部描画する
function drawAll() {
  con.clearRect(0, 0, SCREEN_W, SCREEN_H);

  for (let y = 0; y < FIELD_ROW; y++) {
    for (let x = 0; x < FIELD_COL; x++) {
      if (field[y][x]) {
        drawBlock(x, y, field[y][x]);
      }
    }
  }

  for (let y = 0; y < TETRO_SIZE; y++) {
    for (let x = 0; x < TETRO_SIZE; x++) {
      if (tetro[y][x]) {
        drawBlock(tetro_x + x, tetro_y + y, tetro_t);
      }
    }
  }
}

//ブロックの衝突判定
function checkMove(mx, my, ntetro) {
  if (ntetro === undefined) ntetro = tetro;

  for (let y = 0; y < TETRO_SIZE; y++) {
    for (let x = 0; x < TETRO_SIZE; x++) {
      if (ntetro[y][x]) {
        let nx = tetro_x + mx + x;
        let ny = tetro_y + my + y;

        if (
          ny < 0 ||
          nx < 0 ||
          ny >= FIELD_ROW ||
          nx >= FIELD_COL ||
          field[ny][nx]
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

// テトロの回転
function rotate() {
  let ntetro = [];

  for (let y = 0; y < TETRO_SIZE; y++) {
    ntetro[y] = [];
    for (let x = 0; x < TETRO_SIZE; x++) {
      ntetro[y][x] = tetro[TETRO_SIZE - x - 1][y];
    }
  }

  return ntetro;
}

// ブロックの落ちる処理
function dropTetro() {
  if (checkMove(0, 1)) tetro_y++;
  else {
    fixTetro();
    tetro_t = Math.floor(Math.random() * (TETRO_TYPES.length - 1)) + 1;
    tetro = TETRO_TYPES[tetro_t];
    tetro_x = START_X;
    tetro_y = START_Y;
  }
  drawAll();
}

//テトロを固定する
function fixTetro() {
  for (let y = 0; y < TETRO_SIZE; y++) {
    for (let x = 0; x < TETRO_SIZE; x++) {
      if (tetro[y][x]) {
        field[tetro_y + y][tetro_x + x] = tetro_t;
      }
    }
  }
}

document.onkeydown = function (e) {
  switch (e.key) {
    case 'ArrowLeft': // 左
      if (checkMove(-1, 0)) tetro_x--;
      break;
    case 'ArrowUp': // 上
      if (checkMove(0, -1)) tetro_y--;
      break;
    case 'ArrowRight': // 右
      if (checkMove(1, 0)) tetro_x++;
      break;
    case 'ArrowDown': // 下
      if (checkMove(0, 1)) tetro_y++;
      break;
    case ' ': // スペース
      let ntetro = rotate();
      if (checkMove(0, 0, ntetro)) tetro = rotate();
      break;
  }

  drawAll();
};
