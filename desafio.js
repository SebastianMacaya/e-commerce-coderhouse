const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
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
  console.log(data);
  data.forEach((producto) => {
    console.log(producto.title);
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

  items.appendChild(fragment);
};
