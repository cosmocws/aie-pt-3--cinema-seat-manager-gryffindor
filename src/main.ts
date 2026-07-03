type EstadoAsiento = 0 | 1;
type MatrizAsientos = EstadoAsiento[][];

const FILAS = 8;
const COLUMNAS = 10;

function formatearNumeroAsiento(numero: number): string {
  return String(numero).padStart(2, "0");
}

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

function normalizarIndice(valor: number, limite: number): number {
  if (valor >= 1 && valor <= limite) {
    return valor - 1;
  }

  if (valor >= 0 && valor < limite) {
    return valor;
  }

  return -1;
}

export function reservarAsiento(sala: MatrizAsientos, fila: number, columna: number): string {
  const filaIndex = normalizarIndice(fila, sala.length);
  const columnaIndex = normalizarIndice(columna, sala[0]?.length ?? 0);

  if (filaIndex === -1 || columnaIndex === -1) {
    return `Reserva fallida: fila ${fila} o columna ${columna} fuera de rango.`;
  }

  if (sala[filaIndex][columnaIndex] === 1) {
    return `Reserva fallida: el asiento F${filaIndex + 1}C${columnaIndex + 1} ya esta ocupado.`;
  }

  sala[filaIndex][columnaIndex] = 1;
  return `Reserva exitosa: asiento F${filaIndex + 1}C${columnaIndex + 1} reservado.`;
}

export function ocuparAsiento(sala: MatrizAsientos, fila: number, columna: number): boolean {
  return reservarAsiento(sala, fila, columna).startsWith("Reserva exitosa");
}

export function contarAsientos(sala: MatrizAsientos): [number, number] {
  let ocupados = 0;
  let disponibles = 0;

  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length; columna++) {
      if (sala[fila][columna] === 1) {
        ocupados += 1;
      } else {
        disponibles += 1;
      }
    }
  }

  return [ocupados, disponibles];
}

export function buscarAsientosContiguos(sala: MatrizAsientos, cantidad: number): [boolean, number, number, number, string] {
  if (cantidad <= 0) {
    return [false, 0, 0, 0, "Busqueda invalida: la cantidad debe ser mayor que cero."];
  }

  if (sala.length === 0 || cantidad > sala[0].length) {
    return [false, 0, 0, 0, `No hay bloques de ${cantidad} asientos contiguos disponibles.`];
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
        return [
          true,
          fila + 1,
          columna + 1,
          columna + cantidad,
          `Asientos contiguos encontrados: fila ${fila + 1}, columnas ${columna + 1} a ${columna + cantidad}.`,
        ];
      }
    }
  }

  return [false, 0, 0, 0, `No hay bloques de ${cantidad} asientos contiguos disponibles.`];
}

export function reservarBloqueContiguo(sala: MatrizAsientos, cantidad: number): string {
  const [encontrado, fila, columnaInicial, columnaFinal, mensaje] = buscarAsientosContiguos(sala, cantidad);

  if (!encontrado) {
    return `Reserva de bloque fallida: ${mensaje}`;
  }

  for (let columna = columnaInicial - 1; columna < columnaFinal; columna++) {
    sala[fila - 1][columna] = 1;
  }

  return `Reserva de bloque exitosa: fila ${fila}, columnas ${columnaInicial} a ${columnaFinal}.`;
}

function crearMapaBase(sala: MatrizAsientos): void {
  const grid = document.querySelector("#seat-grid");
  if (!(grid instanceof HTMLDivElement)) {
    return;
  }

  let html = "";
  for (let fila = 0; fila < sala.length; fila++) {
    html += `<div class=\"mb-2 flex min-w-fit items-center gap-2\"><span class=\"flex h-8 w-8 items-center justify-center text-sm font-bold text-slate-200\">${fila + 1}</span><div class=\"grid grid-cols-10 gap-2\">`;

    for (let columna = 0; columna < sala[fila].length; columna++) {
      html += `<button type=\"button\" class=\"seat-button relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-emerald-500 bg-emerald-700 text-[10px] font-black leading-none text-white tabular-nums transition hover:scale-105 hover:bg-emerald-600\" data-fila=\"${fila + 1}\" data-columna=\"${columna + 1}\" aria-label=\"Fila ${fila + 1} asiento ${columna + 1} Libre\"><img src=\"/seat-free.svg\" alt=\"Asiento libre\" class=\"seat-image pointer-events-none absolute inset-0 h-full w-full object-cover opacity-85\" /><span class=\"pointer-events-none relative z-10 inline-flex w-5 items-center justify-center\">${formatearNumeroAsiento(columna + 1)}</span></button>`;
    }

    html += "</div></div>";
  }

  grid.innerHTML = html;
}

function pintarMapa(sala: MatrizAsientos): void {
  const botones = document.querySelectorAll(".seat-button");

  for (let i = 0; i < botones.length; i++) {
    const boton = botones[i];
    if (!(boton instanceof HTMLButtonElement)) {
      continue;
    }

    const filaTexto = boton.getAttribute("data-fila");
    const columnaTexto = boton.getAttribute("data-columna");
    if (filaTexto === null || columnaTexto === null) {
      continue;
    }

    const fila = Number(filaTexto) - 1;
    const columna = Number(columnaTexto) - 1;
    const ocupado = sala[fila][columna] === 1;

    boton.className = ocupado
      ? "seat-button relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-rose-500 bg-rose-700 text-[10px] font-black leading-none text-white tabular-nums transition"
      : "seat-button relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-emerald-500 bg-emerald-700 text-[10px] font-black leading-none text-white tabular-nums transition hover:scale-105 hover:bg-emerald-600";
    boton.setAttribute("aria-label", `Fila ${fila + 1} asiento ${columna + 1} ${ocupado ? "Ocupado" : "Libre"}`);

    const imagen = boton.querySelector(".seat-image");
    if (imagen instanceof HTMLImageElement) {
      imagen.src = ocupado ? "/seat-occupied.svg" : "/seat-free.svg";
      imagen.alt = ocupado ? "Asiento ocupado" : "Asiento libre";
    }
  }
}

function alternarAsiento(sala: MatrizAsientos, fila: number, columna: number): string {
  const filaIndex = normalizarIndice(fila, sala.length);
  const columnaIndex = normalizarIndice(columna, sala[0]?.length ?? 0);

  if (filaIndex === -1 || columnaIndex === -1) {
    return `Accion fallida: fila ${fila} o columna ${columna} fuera de rango.`;
  }

  if (sala[filaIndex][columnaIndex] === 1) {
    sala[filaIndex][columnaIndex] = 0;
    return `Asiento F${fila}C${columna} liberado.`;
  }

  sala[filaIndex][columnaIndex] = 1;
  return `Asiento F${fila}C${columna} marcado como ocupado.`;
}

function actualizarPanel(sala: MatrizAsientos, mensaje: string): void {
  const [ocupados, disponibles] = contarAsientos(sala);

  const resumen = document.querySelector("#resumen");
  const estado = document.querySelector("#estado");
  const estadoJson = document.querySelector("#estado-json");

  if (resumen instanceof HTMLParagraphElement) {
    resumen.textContent = `Ocupados: ${ocupados} | Disponibles: ${disponibles}`;
  }

  if (estado instanceof HTMLParagraphElement) {
    estado.textContent = mensaje;
  }

  if (estadoJson instanceof HTMLPreElement) {
    estadoJson.textContent = JSON.stringify(
      [
        ["ocupados", ocupados],
        ["disponibles", disponibles],
        ["ultimoMensaje", mensaje],
      ],
      null,
      2,
    );
  }
}

function iniciarApp(): void {
  const sala = inicializarSala(FILAS, COLUMNAS);
  crearMapaBase(sala);
  pintarMapa(sala);
  actualizarPanel(sala, "Sistema listo. Selecciona un asiento para reservar.");

  const grid = document.querySelector("#seat-grid");
  if (grid instanceof HTMLDivElement) {
    grid.addEventListener("click", (evento) => {
      const objetivo = evento.target;
      if (!(objetivo instanceof Element)) {
        return;
      }

      const boton = objetivo.closest("button.seat-button");
      if (!(boton instanceof HTMLButtonElement)) {
        return;
      }

      const filaTexto = boton.getAttribute("data-fila");
      const columnaTexto = boton.getAttribute("data-columna");

      if (filaTexto === null || columnaTexto === null) {
        return;
      }

      const fila = Number(filaTexto);
      const columna = Number(columnaTexto);
      const mensaje = alternarAsiento(sala, fila, columna);
      window.requestAnimationFrame(() => {
        pintarMapa(sala);
      });
      actualizarPanel(sala, mensaje);
    });
  }

  const botonBloque = document.querySelector("#reservar-bloque");
  if (botonBloque instanceof HTMLButtonElement) {
    botonBloque.addEventListener("click", () => {
      const inputCantidad = document.querySelector("#cantidad");
      if (!(inputCantidad instanceof HTMLInputElement)) {
        return;
      }

      const cantidad = Number(inputCantidad.value);
      const mensaje = reservarBloqueContiguo(sala, cantidad);
      window.requestAnimationFrame(() => {
        pintarMapa(sala);
      });
      actualizarPanel(sala, mensaje);
    });
  }

  const botonReiniciar = document.querySelector("#reiniciar");
  if (botonReiniciar instanceof HTMLButtonElement) {
    botonReiniciar.addEventListener("click", () => {
      for (let fila = 0; fila < sala.length; fila++) {
        for (let columna = 0; columna < sala[fila].length; columna++) {
          sala[fila][columna] = 0;
        }
      }

      window.requestAnimationFrame(() => {
        pintarMapa(sala);
      });
      actualizarPanel(sala, "Sala reiniciada: todos los asientos quedaron libres.");
    });
  }
}

if (typeof document !== "undefined") {
  iniciarApp();
}
