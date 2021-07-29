const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
let carrito = {};

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
  //agrego que se guarde en localstorage
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    pintarCarrito();
  }
});

cards.addEventListener("click", (e) => {
  addCarrito(e);
});
items.addEventListener("click", (e) => {
  btnAumentarDisminuir(e);
});

/* ------------ Traer productos (Reemplazo Js vanilla por Jquery) ----------- */
const fetchData = async () => {
  const URLGET = "api.json";
  $.get(URLGET, async function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta;
      const data = await misDatos;
      pintarCards(data);
    }
  });
};

/* ---------------------------- Pintar productos ---------------------------- */
const pintarCards = (data) => {
  data.forEach((item) => {
    templateCard.querySelector("h5").textContent = item.title;
    templateCard.querySelector("p").textContent = item.precio;
    templateCard.querySelector("button").dataset.id = item.id;
    templateCard.querySelector("img").setAttribute("src", item.thumbnailUrl);

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

// Agregar al carrito
const addCarrito = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCarrito = (item) => {
  const producto = {
    title: item.querySelector("h5").textContent,
    precio: item.querySelector("p").textContent,
    id: item.querySelector("button").dataset.id,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  carrito[producto.id] = { ...producto };

  pintarCarrito();
};

/* ----------------------------- Pintar carrito ----------------------------- */
const pintarCarrito = () => {
  items.innerHTML = "";

  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.title;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector("span").textContent =
      producto.precio * producto.cantidad;
    //botones
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  pintarFooter();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarFooter = () => {
  footer.innerHTML = "";

  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `;
    return;
  }

  /* --------------------- sumar cantidad y sumar totales --------------------- */
  var nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );

  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  /* ---------------- Agrego nº de cantidad en el logo carrito ---------------- */
  $(".badgeCarrito")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);

  footer.appendChild(fragment);

  const boton = document.querySelector("#vaciar-carrito");
  boton.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
  });
};

const btnAumentarDisminuir = (e) => {
  if (e.target.classList.contains("btn-info")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
  }

  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    } else {
      carrito[e.target.dataset.id] = { ...producto };
    }
    pintarCarrito();
  }
  e.stopPropagation();
};

/* ---------------- Agrego boton  finalizar compra con jQuery --------------- */
$("body").append(
  '<button id="btn1" class="btn btn-success w-100 ">Finalizar compra</button>'
);
/* ------------------------ Asociamos el evento click ----------------------- */
$("#btn1").click(function () {
  if (jQuery.isEmptyObject(carrito)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe seleccionar algun producto primero!",
    });
  } else Swal.fire("Gracias por confiar en nosotros", "Su pedido se realizo correctamente!", "success");

  carrito = {};
  pintarCarrito();
});

/* --------------------------- Animaciones Jquery --------------------------- */
/* ------------ Agrego botón y un div con jQuery y oculto el div ------------ */
$("body").prepend(
  '<button id="btn1" class="btn btn-warning w-100">Descuento Hot Sale 50% OFF</button>'
);
$("body").prepend(`<div id="div1" class="text-center" style="height: auto">
                        <h3 class="text-center">¡CODIGO DE DESCUENTO! 50% OFF</h3>
                        <h4>CODIGO: CAMADA14470</h4>
                    </div>`);
$("#div1").hide();
//Muestro el div usando toggle

$("#btn1").click(() => {
  $("#div1").toggle("slow");
});
