console.clear();

const prompt = require("prompt-sync")();

let matriz = [];
let linhas = [];

function layout() {
  console.log(`  A   B   C`);
  console.log(`1 ${matriz[0][0]} | ${matriz[0][1]} | ${matriz[0][2]}`);
  console.log(`2 ${matriz[1][0]} | ${matriz[1][1]} | ${matriz[1][2]}`);
  console.log(`3 ${matriz[2][0]} | ${matriz[2][1]} | ${matriz[2][2]}`);
}

function vitoria() {
  for (let i = 0; i < 3; i++) {
    if (matriz[i][0] == matriz[i][1] && matriz[i][0] == matriz[i][2]) {
      return matriz[0][0];
    }
    if (
      matriz[i][0].toLowerCase() == "x" &&
      matriz[i][1] == "x" &&
      matriz[i][0] == matriz[i][2]
    ) {
      return matriz[0][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (matriz[0][i] == matriz[1][i] && matriz[0][i] == matriz[2][i]) {
      return matriz[0][0];
    }
  }

  if (matriz[0][0] == matriz[1][1] && matriz[0][0] == matriz[2][2]) {
    return matriz[0][0];
  }

  if (matriz[0][2] == matriz[1][1] && matriz[0][0] == matriz[2][0]) {
    return matriz[0][2];
  }
}

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    linhas.push(" ");
  }
  matriz.push(linhas);
  linhas = [];
}

layout();

let vez = 0;
for (let i = 0; i < 9; i++) {
  console.log();

  let simbolo = "";
  if (vez == 0) {
    console.log("É a vez do XIS");
    simbolo = "X";
    vez = 1;
  } else {
    console.log("É a vez do BOLA");
    simbolo = "O";
    vez = 0;
  }

  let linha = prompt("Linha 1, 2 ou 3? ");
  let coluna = prompt("Coluna A, B ou C? ");

  if (coluna.toLowerCase() == "a") {
    coluna = 0;
  } else if (coluna.toLowerCase() == "b") {
    coluna = 1;
  } else {
    coluna = 2;
  }

  matriz[linha - 1].splice(coluna, 1, simbolo);

  console.clear();
  console.log(vitoria());
  if (vitoria() != undefined) {
    console.log(`${simbolo} venceu!`);
  }
  layout();
}
