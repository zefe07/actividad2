# utileria.js

> Librería JavaScript **sin frameworks y sin componentes visuales** para validar y formatear los datos de un formulario de registro.

## Qué problema resuelve

En cada formulario web se escriben otra vez las mismas validaciones (correo, nombre, teléfono, contraseña, edad) y casi siempre con errores: se olvidan los acentos y la ñ, se calcula mal la edad cuando aún no llega el cumpleaños, o se aceptan contraseñas débiles.

**utileria.js** junta todo en un solo archivo. Son funciones pequeñas que reciben un dato y devuelven `true`/`false`, un número o un texto ya corregido.

- **Autor:** Zeferino velasco Martinez — Instituto Tecnológico de Oaxaca
- **Materia:** programacion web
- **Demo en vivo (GitHub Pages):** https://.github.io/utileria/
- **Video demo (1 min):** 

## Instalación

Copia el archivo `js/utileria.js` a tu proyecto e inclúyelo **antes** de tu propio código:

```html
<script src="js/utileria.js"></script>
```

> Si dejas `utileria.js` en la misma carpeta que tu HTML, la ruta es simplemente `<script src="utileria.js"></script>`.

No necesita `npm` ni dependencias. Al cargarlo, todas las funciones quedan disponibles de forma global.

## Uso

### Funciones obligatorias

#### `validarCorreo(correo)` → `boolean`
Valida el formato de un correo electrónico.

```js
validarCorreo("zefe@itoaxaca.edu.mx"); // true
validarCorreo("zefe@");                // false
validarCorreo("zefe@correo");          // false (falta la extensión)
```

#### `soloLetras(texto)` → `boolean`
Acepta mayúsculas, minúsculas, vocales acentuadas, ñ, ü y espacios entre palabras.

```js
soloLetras("José Núñez"); // true
soloLetras("Ana María");  // true
soloLetras("Ana123");     // false
```

#### `validarLongitud(numero, maxLongitud)` → `boolean`
Verdadero si el valor es un número entero con entre 1 y `maxLongitud` dígitos.

```js
validarLongitud(9511234567, 10);  // true  (10 dígitos)
validarLongitud(95112345678, 10); // false (11 dígitos)
validarLongitud("12a4", 10);      // false (no es un número)
```

#### `calcularEdad(fechaNacimiento)` → `number`
Recibe `"AAAA-MM-DD"` o un objeto `Date`. Devuelve la edad como número entero, o `-1` si la fecha es inválida o futura.

```js
calcularEdad("2000-05-15"); // 26 (depende de la fecha actual)
calcularEdad("2000-02-31"); // -1 (fecha imposible)
calcularEdad("2099-01-01"); // -1 (fecha futura)
```

#### `esMayorDeEdad(fechaNacimiento)` → `boolean`
Verdadero si la persona tiene 18 años o más.

```js
esMayorDeEdad("2000-05-15"); // true
esMayorDeEdad("2015-01-01"); // false
```

#### `validarPassword(password)` → `boolean`
Exige mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.

```js
validarPassword("Zefe#2026"); // true
validarPassword("zefe1234");  // false (sin mayúscula ni carácter especial)
validarPassword("Ab#1");      // false (menos de 8 caracteres)
```

### Sección libre (funciones propias)

#### `capitalizarNombre(texto)` → `string`
Quita espacios sobrantes y corrige mayúsculas y minúsculas de un nombre, respetando los acentos.

```js
capitalizarNombre("  jOSÉ   pérez  "); 
capitalizarNombre("MARÍA lópez");     
```

#### `diasParaCumpleanos(fechaNacimiento)` → `number`
Cuántos días faltan para el próximo cumpleaños. Devuelve `0` si es hoy y `-1` si la fecha es inválida.

```js
diasParaCumpleanos("2000-12-25"); //  93
diasParaCumpleanos("hola");       // -1
```

### Ejemplo completo con un formulario

```js
const nombre = document.getElementById("nombre").value;
const correo = document.getElementById("correo").value;
const fecha  = document.getElementById("nacimiento").value;
const pass   = document.getElementById("password").value;

if (soloLetras(nombre) && validarCorreo(correo) && validarPassword(pass) && esMayorDeEdad(fecha)) {
  alert("Bienvenido, " + capitalizarNombre(nombre) + ". Tienes " + calcularEdad(fecha) + " años.");
} else {
  alert("Revisa tus datos.");
}
```

### Prueba rápida en la consola

```js
console.log(validarCorreo("zefe@itoaxaca.edu.mx")); // true
console.log(soloLetras("José Núñez"));              // true
console.log(validarLongitud(9511234567, 10));       // true
console.log(calcularEdad("2000-05-15"));            // 26
console.log(esMayorDeEdad("2015-01-01"));           // false
console.log(validarPassword("Zefe#2026"));          // true
console.log(capitalizarNombre("  jOSÉ   pérez  ")); // "José Pérez"
console.log(diasParaCumpleanos("2000-12-25"));      // días restantes
```

## Páginas incluidas


| `index.html` | Formulario de registro que usa las validaciones y muestra un modal con la edad calculada. Tiene un botón que 
que al terminar de registrar o llenar el formulario nos lleva al login.

| `login.html` | Login que usa `validarCorreo` y `validarPassword`. |

No hay conexión a base de datos todo corre en el navegador.

## Capturas de pantalla
las capturas las tengo en la carpeta img.

## Video

[Ver el video demo (1 min)]https://youtu.be/pSzQs8Mmp6k

