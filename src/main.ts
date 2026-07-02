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

function buscarAsientosContiguos(sala: MatrizAsientos): {
  encontrado: boolean;
  fila: number;
  columnaInicial: number;
  columnaFinal: number;
  mensaje: string;
} {
  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length - 1; columna++) {
      const asientoActualLibre = sala[fila][columna] === 0;
      const asientoSiguienteLibre = sala[fila][columna + 1] === 0;

      if (asientoActualLibre && asientoSiguienteLibre) {
        return {
          encontrado: true,
          fila: fila + 1,
          columnaInicial: columna + 1,
          columnaFinal: columna + 2,
          mensaje: `Asientos contiguos libres: fila ${fila + 1}, columnas ${columna + 1} y ${columna + 2}.`,
        };
      }
    }
  }

  return {
    encontrado: false,
    fila: 0,
    columnaInicial: 0,
    columnaFinal: 0,
    mensaje: "No hay asientos contiguos disponibles.",
  };
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

const resultadoBusqueda = buscarAsientosContiguos(sala);
console.log(`\n${resultadoBusqueda.mensaje}`);

export {};
