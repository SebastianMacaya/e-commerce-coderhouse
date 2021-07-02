const initProductos = () => {
  //inicializo mis variables
  let precioDeLaCompra = 0;
  let cantidadHardware;
  const listaHardware = [];

  //Obtengo elementos del DOM con los ID
  const formCantidadHardware = document.getElementById("formCantidadHardware");
  const inputCantidadHardware = document.getElementById("cantidadHardware");
  const cantidadSeleccionada = document.getElementById("cantidadSeleccionada");

  const formCrearProducto = document.getElementById("crearProducto");
  const inputMarca = document.getElementById("inputMarca");
  const inputModelo = document.getElementById("inputModelo");
  const inputPrecio = document.getElementById("inputPrecio");

  const resultadoDeLaCompra = document.getElementById("resultadoDeLaCompra");

  //oculto el form de crear productos
  formCrearProducto.style.display = "none";

  //AGREGO EVENTO AL ENVIAR CANTIDAD DE HARDWARE A CREAR
  formCantidadHardware.addEventListener("submit", (e) => {
    //evito el comportamiento normal del submit
    e.preventDefault();

    //asigno el valor numerico a cantidad de hardware
    cantidadHardware = Number(inputCantidadHardware.value);

    //oculto el form de la cantidad de hardware
    formCantidadHardware.style.display = "none";

    cantidadSeleccionada.textContent = `Has seleccionado ${cantidadHardware} hardwares`;
    formCrearProducto.style.display = "block";
  });

  //AGREGO EVENTO AL ENVIAR LOS PRODUCTOS
  formCrearProducto.addEventListener("submit", (e) => {
    e.preventDefault();

    const marca = inputMarca.value;
    const modelo = inputModelo.value;
    const precio = inputPrecio.value;
    //guardo el producto en el array
    const producto = { marca, modelo, precio };
    listaHardware.push(producto);

    inputMarca.value = "";
    inputModelo.value = "";
    inputPrecio.value = "";
    //oculto el form una vez que se cumpla la cantidad a agregar
    if (listaHardware.length === cantidadHardware) {
      formCrearProducto.style.display = "none";
      crearProductos();
    }
  });

  const crearProductos = () => {
    for (const producto of listaHardware) {
      crearProducto(producto);
    }
  };

  const crearProducto = (producto) => {
    const template = document.getElementById("producto");
    const productoElement = template.content.cloneNode(true);

    productoElement.getElementById(
      "nombre"
    ).textContent = `Marca: ${producto.marca}`;
    productoElement.getElementById(
      "modelo"
    ).textContent = `Modelo: ${producto.modelo}`;
    productoElement.getElementById(
      "precio"
    ).textContent = `$ ${producto.precio}`;
    productoElement.getElementById("comprar").addEventListener("click", () => {
      precioDeLaCompra += Number(producto.precio);

      resultadoDeLaCompra.textContent = `Lleva usted gastados $${precioDeLaCompra}`;
    });

    document.body.appendChild(productoElement);
  };
};

initProductos();
