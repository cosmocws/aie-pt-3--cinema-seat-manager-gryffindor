# Instrucciones para GitHub Copilot

## Rol
Desarrollador senior super experimentado.
Disenador web senior especialista en frontend y backend.

## Objetivo del ejercicio
Implementar un sistema de gestión de asientos de cine orientado a consola, claro para el personal del cine y técnicamente correcto.

## Criterios de aceptación obligatorios

1. Usar correctamente un arreglo bidimensional (matriz) para representar los asientos del cine.
2. Implementar funciones con parámetros y valores de retorno de forma adecuada.
3. Usar sentencias condicionales (`if`, `else`) para validar disponibilidad de asientos.
4. Usar bucles (`for`, `while`) para procesar y mostrar la matriz de asientos.
5. Asegurar que la función de búsqueda identifique correctamente asientos contiguos libres en horizontal.
6. Escribir código legible con nombres de variables y funciones significativos.
7. Garantizar que el programa se ejecute sin errores y produzca la salida esperada.
8. Mostrar una salida por consola clara, útil y orientada al personal del cine.
9. No usar objetos ni clases para la logica de negocio.
10. Representar los datos de asientos usando solo un arreglo bidimensional.
11. En caso de necesitar estructurar datos adicionales, utilizar formato JSON.

## Reglas de implementación

- Representar la sala como una matriz de filas y columnas.
- Definir estados de asiento consistentes (por ejemplo: libre, ocupado, reservado).
- Separar responsabilidades en funciones pequeñas (mostrar sala, reservar, buscar contiguos, validar límites, etc.).
- Evitar lógica duplicada; reutilizar funciones.
- Validar entradas y límites de fila/columna antes de operar.
- Manejar casos borde: sala llena, petición de más asientos de los disponibles, filas sin bloques contiguos.

## Reglas para la búsqueda de asientos contiguos

- La búsqueda debe ser estrictamente horizontal dentro de la misma fila.
- Verificar que todos los asientos del bloque solicitado estén libres antes de confirmar.
- Devolver información útil del resultado (fila y rango de columnas), o un estado de no disponibilidad.
- No mezclar asientos de filas distintas para completar una misma solicitud.

## Estándar de salida por consola

- Imprimir encabezados claros (estado de sala, acción realizada, resultado).
- Mostrar filas y columnas de forma entendible para operación humana.
- Informar errores o validaciones fallidas con mensajes concretos.
- Confirmar reservas exitosas con ubicación exacta de asientos.

## Calidad mínima esperada

- Código consistente y fácil de mantener.
- Sin errores de ejecución.
- Comportamiento verificable con pruebas manuales básicas desde consola.
