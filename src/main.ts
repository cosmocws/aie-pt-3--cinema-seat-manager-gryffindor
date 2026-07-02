type EstadoAsiento = 0 | 1;
type MatrizAsientos = EstadoAsiento[][];

const FILAS = 8;
const COLUMNAS = 10;

function inicializarSala(filas: number, columnas: number): MatrizAsientos {
  const sala: MatrizAsientos = [];

  for (let fila = 0; fila < filas; fila++) {
    const filaAsientos: EstadoAsiento[] = [];

    for (let columna = 0; columna < columnas; columna++) {
      filaAsientos.push(0);
    }

    sala.push(filaAsientos);
  }

  return sala;
}

function ocuparAsiento(sala: MatrizAsientos, fila: number, columna: number): boolean {
  const filaValida = fila >= 0 && fila < sala.length;
  const columnaValida = filaValida && columna >= 0 && columna < sala[fila].length;

  if (!filaValida || !columnaValida) {
    return false;
  }

  if (sala[fila][columna] === 1) {
    return false;
  }

  sala[fila][columna] = 1;
  return true;
}

function mostrarSala(sala: MatrizAsientos): void {
  console.log("\n=== Estado actual de la sala ===");
  console.log("X = Ocupado | L = Libre");

  let encabezado = "    ";
  for (let columna = 0; columna < sala[0].length; columna++) {
    encabezado += `${String(columna + 1).padStart(2, " ")} `;
  }
  console.log(encabezado);

  for (let fila = 0; fila < sala.length; fila++) {
    let salidaFila = `F${String(fila + 1).padStart(2, "0")} `;

    for (let columna = 0; columna < sala[fila].length; columna++) {
      const simbolo = sala[fila][columna] === 1 ? "X" : "L";
      salidaFila += ` ${simbolo} `;
    }

    console.log(salidaFila);
  }
}

const sala = inicializarSala(FILAS, COLUMNAS);

ocuparAsiento(sala, 0, 0);
ocuparAsiento(sala, 0, 1);
ocuparAsiento(sala, 3, 4);
ocuparAsiento(sala, 6, 8);

mostrarSala(sala);

export {};
