const cards = document.getElementById("cards");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
let carrito = {};

//captura los elementos
const setCarrito = (objeto) => {
  console.log(objeto);
  const producto = {
    id: objeto.querySelector(".comprar").dataset.id,
    title: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent,
  };
  //Si se repite el elemento aumenta
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };
  console.log(carrito);
};

//evento
const addCarrito = (e) => {
  //Consultamos si el elemento tiene la clase

  if (e.target.classList.contains("comprar")) {
    setCarrito(e.target.parentElement);
  }
  //Dentengo eventos hererados del padre
  e.stopPropagation();
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
cards.addEventListener("click", (e) => {
  addCarrito(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};
//pinto las cards con la template
const pintarCards = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector("h5").textContent = producto.title;
    templateCard.querySelector("p").textContent = producto.precio;
    templateCard
      .querySelector("img")
      .setAttribute("src", producto.thumbnailUrl);
    //asigno id dinamico
    templateCard.querySelector(".comprar").dataset.id = producto.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};
