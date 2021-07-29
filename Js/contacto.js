/* ------------------------- simulacion envio correo ------------------------ */

$(document).ready(function () {
  $("#Formulario").submit("submit", function (event) {
    event.preventDefault();
    Swal.fire("Felicitaciones!", "Su email se envio correctamente", "success");
    $("#Formulario")[0].reset();
  });
});
