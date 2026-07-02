type EstadoAsiento = 0 | 1;
type MatrizAsientos = EstadoAsiento[][];

const FILAS = 8;
const COLUMNAS = 10;

export function inicializarSala(filas: number, columnas: number): MatrizAsientos {
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

function normalizarIndice(valor: number, limite: number): number | null {
  if (valor >= 0 && valor < limite) {
    return valor;
  }

  if (valor >= 1 && valor <= limite) {
    return valor - 1;
  }

  return null;
}

export function reservarAsiento(sala: MatrizAsientos, fila: number, columna: number): string {
  const filaIndex = normalizarIndice(fila, sala.length);
  const columnaIndex = normalizarIndice(columna, sala[0]?.length ?? 0);

  if (filaIndex === null || columnaIndex === null) {
    return `Reserva fallida: la fila ${fila} o la columna ${columna} están fuera de rango.`;
  }

  if (sala[filaIndex][columnaIndex] === 1) {
    return `Reserva fallida: el asiento F${filaIndex + 1}C${columnaIndex + 1} ya está ocupado.`;
  }

  sala[filaIndex][columnaIndex] = 1;
  return `Reserva exitosa: el asiento F${filaIndex + 1}C${columnaIndex + 1} fue marcado como ocupado.`;
}

export function ocuparAsiento(sala: MatrizAsientos, fila: number, columna: number): boolean {
  return reservarAsiento(sala, fila, columna).startsWith("Reserva exitosa");
}

export function contarAsientos(sala: MatrizAsientos): { ocupados: number; disponibles: number } {
  let ocupados = 0;
  let disponibles = 0;

  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length; columna++) {
      if (sala[fila][columna] === 1) {
        ocupados++;
      } else {
        disponibles++;
      }
    }
  }

  return { ocupados, disponibles };
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

console.log(reservarAsiento(sala, 1, 1));
console.log(reservarAsiento(sala, 1, 1));

const resumen = contarAsientos(sala);
console.log(`\nResumen de la sala: ${resumen.ocupados} ocupados y ${resumen.disponibles} disponibles.`);

export {};
