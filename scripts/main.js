const BLOCK_SIZE = 30;
//テトロミノのサイズ
const TETRO_SIZE = 4;

//テトロミノ本体
let tetro = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
];

let can = document.getElementById('can');
let con = can.getContext('2d');

for (let y = 0; y < TETRO_SIZE; y++) {
  for (let x = 0; x < TETRO_SIZE; x++) {
    if (tetro[y][x]) {
      let px = x * BLOCK_SIZE;
      let py = y * BLOCK_SIZE;
      con.fillStyle = 'red';
      con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
      con.strokeStyle = 'black';
      con.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
}
