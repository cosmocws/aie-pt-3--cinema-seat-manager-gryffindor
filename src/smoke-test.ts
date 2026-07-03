import assert from 'node:assert/strict';
import { inicializarSala, reservarAsiento, ocuparAsiento, contarAsientos } from './main.js';

const sala = inicializarSala(3, 3);

const reservaExitosa = reservarAsiento(sala, 1, 1);
const reservaDuplicada = reservarAsiento(sala, 1, 1);
const reservaInvalida = reservarAsiento(sala, 5, 5);
const ocupacionDirecta = ocuparAsiento(sala, 2, 3);

assert.match(reservaExitosa, /Reserva exitosa/);
assert.match(reservaDuplicada, /Reserva fallida/);
assert.match(reservaInvalida, /fuera de rango/);
assert.equal(ocupacionDirecta, true);

const [ocupados, disponibles] = contarAsientos(sala);
assert.equal(ocupados, 2);
assert.equal(disponibles, 7);

console.log('Smoke test OK');
