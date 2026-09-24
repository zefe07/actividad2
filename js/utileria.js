

function validarCorreo(correo) {
  if (typeof correo !== "string") return false;
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  return regex.test(correo.trim());
}


function soloLetras(texto) {
  if (typeof texto !== "string") return false;
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/;
  return regex.test(texto.trim());
}


function validarLongitud(numero, maxLongitud) {
  const texto = String(numero).trim();
  if (!/^\d+$/.test(texto)) return false;
  if (!Number.isInteger(maxLongitud) || maxLongitud < 1) return false;
  return texto.length <= maxLongitud;
}


function _parsearFecha(fecha) {
  if (fecha instanceof Date) return isNaN(fecha) ? null : fecha;
  if (typeof fecha !== "string") return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha.trim());
  if (!m) return null;
  const [, a, mes, d] = m.map(Number);
  const f = new Date(a, mes - 1, d);
  return f.getFullYear() === a && f.getMonth() === mes - 1 && f.getDate() === d ? f : null;
}


function calcularEdad(fechaNacimiento) {
  const nacimiento = _parsearFecha(fechaNacimiento);
  const hoy = new Date();
  if (!nacimiento || nacimiento > hoy) return -1;
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const yaCumplio =
    hoy.getMonth() > nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());
  if (!yaCumplio) edad--;
  return edad;
}


function esMayorDeEdad(fechaNacimiento) {
  return calcularEdad(fechaNacimiento) >= 18;
}


function validarPassword(password) {
  if (typeof password !== "string") return false;
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}


function capitalizarNombre(texto) {
  if (typeof texto !== "string") return "";
  return texto
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toLocaleUpperCase("es") + p.slice(1).toLocaleLowerCase("es"))
    .join(" ");
}


function diasParaCumpleanos(fechaNacimiento) {
  const nac = _parsearFecha(fechaNacimiento);
  if (!nac) return -1;
  const hoy = new Date();
  const hoy0 = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  let proximo = new Date(hoy0.getFullYear(), nac.getMonth(), nac.getDate());
  if (proximo < hoy0) proximo = new Date(hoy0.getFullYear() + 1, nac.getMonth(), nac.getDate());
  return Math.round((proximo - hoy0) / 86400000);
}

