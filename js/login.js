
    const $ = (id) => document.getElementById(id);

    function marcar(idCampo, esValido, mensaje) {
      $(idCampo).classList.toggle("invalido", !esValido);
      $(idCampo).classList.toggle("valido", esValido);
      $("err-" + idCampo).textContent = esValido ? "" : mensaje;
      return esValido;
    }

    $("login").addEventListener("submit", (e) => {
      e.preventDefault(); 
      const correoOk = marcar("correo", validarCorreo($("correo").value), "Escribe un correo válido.");
      const passOk = marcar("password", validarPassword($("password").value), "Mínimo 8 caracteres con mayúscula, minúscula, número y símbolo.");
      const res = $("resultado");
      res.classList.toggle("ok", correoOk && passOk);
      res.textContent = correoOk && passOk ? "Datos válidos. ¡Bienvenido!" : "";
    });
  