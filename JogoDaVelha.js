const prompt = require("prompt-sync")();

let matriz = [];
let linhas = [];
let armazenaCoordenadas = [""];
let vencedores = [0, 0];

// Função que preenche a matriz com espaço
function preencheMatriz() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      linhas.push(" ");
    }
    matriz.push(linhas);
    linhas = [];
  }
}

// Função para montar o layout
function layout() {
  console.log(`  A   B   C`);
  console.log(`1 ${matriz[0][0]} | ${matriz[0][1]} | ${matriz[0][2]}`);
  console.log(`2 ${matriz[1][0]} | ${matriz[1][1]} | ${matriz[1][2]}`);
  console.log(`3 ${matriz[2][0]} | ${matriz[2][1]} | ${matriz[2][2]}`);
}

// Função para verificar se houve vencedor
function vitoria() {
  for (let i = 0; i < 3; i++) {
    if (
      matriz[i][0] == matriz[i][1] &&
      matriz[i][0] == matriz[i][2] &&
      matriz[i][0] != " "
    ) {
      return matriz[0][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      matriz[0][i] == matriz[1][i] &&
      matriz[0][i] == matriz[2][i] &&
      matriz[0][i] != " "
    ) {
      return matriz[0][0];
    }
  }
  if (
    matriz[0][0] == matriz[1][1] &&
    matriz[0][0] == matriz[2][2] &&
    matriz[0][0] != " "
  ) {
    return matriz[0][0];
  }
  if (
    matriz[0][2] == matriz[1][1] &&
    matriz[0][2] == matriz[2][0] &&
    matriz[0][2] != " "
  ) {
    return matriz[0][2];
  }
}

while (true) {
  // Chamas a funções para preencher e exibir matriz e layout
  console.clear();
  preencheMatriz();
  layout();

  // Loop que limita 9 Jogadas
  let vez = 0;
  for (let i = 0; i < 9; i++) {
    console.log();

    // Alternância X / O
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

    let repetiu = false;
    let linha = 0;
    let coluna = "";
    let coordenadas = "";
    let invalido = true;
    do {
      do {
        // Coordenadas
        if (repetiu) {
          coordenadas = prompt(
            `Ops! Essa coordenada já foi preenchida. Escolha outra! `
          ).toLowerCase();
          repetiu = false;
        } else {
          coordenadas = prompt(
            "Digite as coordenadas. Exemplo A1, 2B, C3: "
          ).toLowerCase();
        }
        coordenadas = coordenadas.split("", coordenadas.length);

        for (let i = 0; i < coordenadas.length; i++) {
          console.log(coordenadas[i]);
          if (
            coordenadas[i] == "a" ||
            coordenadas[i] == "b" ||
            coordenadas[i] == "c" ||
            coordenadas[i] == "1" ||
            coordenadas[i] == "2" ||
            coordenadas[i] == "3"
          ) {
            invalido = false;
          } else {
            invalido = true;
          }
        }
      } while (invalido);

      console.log(coordenadas);

      if (
        coordenadas[0] == "a" ||
        coordenadas[0] == "b" ||
        coordenadas[0] == "c"
      ) {
        coluna = coordenadas[0];
        linha = +coordenadas[1];
      } else {
        coluna = coordenadas[1];
        linha = +coordenadas[0];
      }

      for (let i = 0; i < armazenaCoordenadas.length; i++) {
        if (armazenaCoordenadas[i] == linha + coluna) {
          repetiu = true;
        }
      }
      if (!repetiu) {
        armazenaCoordenadas.push(linha + coluna);
      }
    } while (repetiu);

    console.log(coluna, linha);

    // Ajusta as colunas para índices
    if (coluna == "a") {
      coluna = 0;
    } else if (coluna == "b") {
      coluna = 1;
    } else {
      coluna = 2;
    }

    // Preenche X ou O com as coordenadas
    matriz[linha - 1].splice(coluna, 1, simbolo);

    // Verifica se houve vencedor
    console.clear();
    if (vitoria() != undefined) {
      if (vitoria() == "X") {
        vencedores[0] += 1;
      } else {
        vencedores[1] += 1;
      }
      console.log(`${simbolo} venceu!`);
      i = 9;
    }
    console.log();
    layout();
    console.log();
  }

  // Jogar de novo?
  const denovo = prompt("Desejam jogar novamente? Sim(S) ou Não(N)? ");
  if (denovo.toLowerCase() == "n") {
    break;
  }

  // Limpa as listas para nova jogada
  matriz = [];
  linhas = [];
}

console.clear();
console.log("############### PLACAR ###############");
console.log(
  `########### XIS ${vencedores[0]} x ${vencedores[1]} BOLA ###########\n`
);
