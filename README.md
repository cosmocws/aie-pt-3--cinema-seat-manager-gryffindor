# Gestor de Asientos de Cine

Aplicacion web para gestionar reservas de asientos en una sala de cine usando TypeScript, HTML y Tailwind (Vite).

## Objetivo

Permitir al personal del cine visualizar una sala de 8 filas x 10 columnas y cambiar el estado de cada asiento con clic.

## Caracteristicas

- Mapa visual de asientos centrado en pantalla.
- Estado por asiento con cambio de color e icono:
  - Libre.
  - Ocupado.
- Numeracion de asientos en formato uniforme: 01, 02, 03 ... 10.
- Reserva/liberacion individual con clic (toggle).
- Reserva de bloque contiguo horizontal.
- Reinicio completo de sala.
- Resumen en tiempo real de ocupados y disponibles.
- Estado adicional mostrado en formato JSON.

## Reglas de implementacion aplicadas

- Datos de asientos representados solo con arreglo bidimensional.
- Sin clases para la logica principal.
- Busqueda de contiguos estrictamente horizontal en una misma fila.
- Validaciones de rango para fila y columna.

## Estructura principal

- index.html: estructura de la interfaz.
- src/main.ts: logica de negocio y comportamiento UI.
- src/style.css: carga de Tailwind.
- public/seat-free.svg y public/seat-occupied.svg: iconos de asiento.

## Requisitos

- Node.js 18+
- npm

## Comandos

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Validar TypeScript:

```bash
npm run typecheck
```

Build de produccion:

```bash
npm run build
```

Prueba de humo:

```bash
npm run smoke
```

## Uso

1. Abre la app en el navegador (Vite suele usar http://localhost:5173).
2. Haz clic en un asiento para alternar entre libre y ocupado.
3. Usa el campo de cantidad y el boton de bloque para reservar asientos contiguos.
4. Usa Reiniciar para limpiar toda la sala.

## Estado actual de la sala

- Filas: 1 a 8.
- Columnas: 1 a 10.
- Etiqueta visual de asiento: 01 a 10.
