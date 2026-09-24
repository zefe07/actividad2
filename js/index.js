
    const $ = (id) => document.getElementById(id);

    function marcar(idCampo, esValido, mensaje) {
      $(idCampo).classList.toggle("invalido", !esValido);
      $(idCampo).classList.toggle("valido", esValido);
      $("err-" + idCampo).textContent = esValido ? "" : mensaje;
      return esValido;
    }
    

    function abrirModal(nombre, fecha) {
      const edad = calcularEdad(fecha);
      $("modalNombre").textContent = nombre;
      $("modalEdad").textContent = edad;
      $("modalMayor").textContent = esMayorDeEdad(fecha) ? "Eres mayor de edad." : "Eres menor de edad.";
      const dias = diasParaCumpleanos(fecha);
      $("modalCumple").textContent = dias === 0 ? "¡Hoy es tu cumpleaños!" : "Faltan " + dias + " días para tu cumpleaños.";
      $("fondoModal").classList.add("abierto");
      $("cerrarModal").focus();
    }
    function cerrarModal() { $("fondoModal").classList.remove("abierto"); }

    $("formulario").addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = $("nombre").value;
      const fecha = $("nacimiento").value;

      const resultados = [
        marcar("nombre", soloLetras(nombre), "Usa solo letras (se permiten acentos)."),
        marcar("correo", validarCorreo($("correo").value), "Escribe un correo válido, por ejemplo nombre@dominio.com."),
        marcar("telefono", validarLongitud($("telefono").value, 10), "Escribe solo números, máximo 10 dígitos."),
        marcar("nacimiento", calcularEdad(fecha) >= 0, "Elige una fecha de nacimiento válida."),
        marcar("password", validarPassword($("password").value), "Mínimo 8 caracteres con mayúscula, minúscula, número y símbolo."),
      ];

      if (resultados.every(Boolean)) abrirModal(capitalizarNombre(nombre), fecha);
    });

    $("cerrarModal").addEventListener("click", cerrarModal);
    $("fondoModal").addEventListener("click", (e) => { if (e.target === $("fondoModal")) cerrarModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarModal(); });
