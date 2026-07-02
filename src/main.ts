type EstadoAsiento = 0 | 1;
type MatrizAsientos = EstadoAsiento[][];

const FILAS = 8;
const COLUMNAS = 10;

// Crea una matriz de asientos con todas las posiciones disponibles (0).
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

// Convierte indices 1-based o 0-based a un indice interno valido.
function normalizarIndice(valor: number, limite: number): number | null {
  if (valor >= 0 && valor < limite) {
    return valor;
  }

  if (valor >= 1 && valor <= limite) {
    return valor - 1;
  }

  return null;
}

// Intenta reservar un asiento y devuelve un mensaje claro del resultado.
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
  return `Reserva confirmada: el asiento F${filaIndex + 1}C${columnaIndex + 1} fue marcado como ocupado.`;
}

// Mantiene compatibilidad con usos anteriores devolviendo true/false.
export function ocuparAsiento(sala: MatrizAsientos, fila: number, columna: number): boolean {
  return reservarAsiento(sala, fila, columna).startsWith("Reserva confirmada");
}

// Cuenta cuantos asientos estan ocupados y disponibles.
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

// Busca dos asientos contiguos libres de forma horizontal en una misma fila.
function buscarAsientosContiguos(sala: MatrizAsientos, cantidad = 2): {
  encontrado: boolean;
  fila: number;
  columnaInicial: number;
  columnaFinal: number;
  mensaje: string;
} {
  if (cantidad <= 0) {
    return {
      encontrado: false,
      fila: 0,
      columnaInicial: 0,
      columnaFinal: 0,
      mensaje: "Busqueda invalida: la cantidad de asientos debe ser mayor que cero.",
    };
  }

  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna <= sala[fila].length - cantidad; columna++) {
      let bloqueLibre = true;

      for (let offset = 0; offset < cantidad; offset++) {
        if (sala[fila][columna + offset] !== 0) {
          bloqueLibre = false;
          break;
        }
      }

      if (bloqueLibre) {
        return {
          encontrado: true,
          fila: fila + 1,
          columnaInicial: columna + 1,
          columnaFinal: columna + cantidad,
          mensaje: `Asientos contiguos encontrados: fila ${fila + 1}, columnas ${columna + 1} a ${columna + cantidad}.`,
        };
      }
    }
  }

  return {
    encontrado: false,
    fila: 0,
    columnaInicial: 0,
    columnaFinal: 0,
    mensaje: `No hay bloques de ${cantidad} asientos contiguos disponibles.`,
  };
}

// Reserva automaticamente un bloque contiguo horizontal si existe disponibilidad.
function reservarBloqueContiguo(sala: MatrizAsientos, cantidad: number): string {
  const resultado = buscarAsientosContiguos(sala, cantidad);

  if (!resultado.encontrado) {
    return `Reserva de bloque fallida: ${resultado.mensaje}`;
  }

  for (let columna = resultado.columnaInicial - 1; columna < resultado.columnaFinal; columna++) {
    sala[resultado.fila - 1][columna] = 1;
  }

  return `Reserva de bloque confirmada: fila ${resultado.fila}, columnas ${resultado.columnaInicial} a ${resultado.columnaFinal}.`;
}

// Imprime la matriz de asientos con encabezados de filas y columnas.
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

// Marca toda la sala como ocupada para simular escenarios de alta demanda.
function llenarSala(sala: MatrizAsientos): void {
  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length; columna++) {
      sala[fila][columna] = 1;
    }
  }
}

// Muestra resumen de ocupacion para apoyar la operacion diaria.
function mostrarResumen(sala: MatrizAsientos): void {
  const { ocupados, disponibles } = contarAsientos(sala);
  console.log(`Resumen: ${ocupados} ocupados, ${disponibles} disponibles.`);
}

// Ejecuta un escenario con titulo, estado visual y busqueda de contiguos.
function ejecutarEscenario(nombre: string, sala: MatrizAsientos): void {
  console.log(`\n================ ${nombre} ================`);
  mostrarSala(sala);
  mostrarResumen(sala);
  console.log(buscarAsientosContiguos(sala, 2).mensaje);
}

const salaVacia = inicializarSala(FILAS, COLUMNAS);
ejecutarEscenario("Escenario 1: Sala vacia", salaVacia);

const salaParcial = inicializarSala(FILAS, COLUMNAS);
console.log("\nOperaciones de reserva en sala parcialmente ocupada:");
console.log(reservarAsiento(salaParcial, 1, 1));
console.log(reservarAsiento(salaParcial, 1, 1));
console.log(reservarAsiento(salaParcial, 4, 5));
console.log(reservarAsiento(salaParcial, 7, 9));
console.log(reservarBloqueContiguo(salaParcial, 3));
ejecutarEscenario("Escenario 2: Sala parcialmente ocupada", salaParcial);

const salaCasiLlena = inicializarSala(FILAS, COLUMNAS);
llenarSala(salaCasiLlena);
salaCasiLlena[0][1] = 0;
salaCasiLlena[2][4] = 0;
salaCasiLlena[4][7] = 0;
salaCasiLlena[7][9] = 0;
console.log("\nReserva de bloque en sala casi llena:");
console.log(reservarBloqueContiguo(salaCasiLlena, 2));
ejecutarEscenario("Escenario 3: Sala casi llena (asientos sueltos)", salaCasiLlena);

const salaLlena = inicializarSala(FILAS, COLUMNAS);
llenarSala(salaLlena);
ejecutarEscenario("Escenario 4: Sala completamente llena", salaLlena);

console.log("\nValidacion de errores de operacion:");
console.log(reservarAsiento(salaLlena, 8, 10));
console.log(reservarAsiento(salaLlena, 10, 12));

export {};
