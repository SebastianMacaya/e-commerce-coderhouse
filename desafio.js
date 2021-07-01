// array
const listaHardware = [];

// constructor

class Hardware {
  constructor(marca, modelo, precio) {
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
  }
  // funcion leer
  leer() {
    console.log("Usted Creo " + this.modelo + "al precio de $" + this.precio);
  }
}

//Creando objeto por usuario
var cantidadDeHardWare = parseInt(
  prompt("Ingrese cuantos hardware quiere agregar")
);

for (i = 0; i < cantidadDeHardWare; i++) {
  let marca = prompt("Ingrese la marca");
  let modelo = prompt("Ingrese el modelo");
  let precio = parseInt(prompt("Ingrese el precio"));
  const obj = new Hardware(marca, modelo, precio);
  //Guardo los hardware en un array
  listaHardware.push(obj);
  obj.leer();
}

console.log(listaHardware);

//test beta
let total = 0;

let isConfirmed = true;

//El usuario elige el hardware  a comprar
const comprar = () => {
  return parseInt(prompt(mensaje));
};

//Mensaje estatico de lista de compra
let mensaje = `
¿Qué le gustaría comprar?
 0:Salir`;
//funcion que muestra la lista de hardware para comprar
function listaCompra() {
  for (i = 0; i < cantidadDeHardWare; i++) {
    mensaje += `\n ${i + 1}:${listaHardware[i].marca} $ ${
      listaHardware[i].precio
    }`;
  }
}
listaCompra(mensaje);

//Inicio switch
let result = 0;

while (isConfirmed) {
  result = comprar();

  switch (true) {
    case result > 0 && result <= cantidadDeHardWare:
      total += listaHardware[result - 1].precio;
      break;
    case result == 0:
      isConfirmed = confirm("Seguro que quiere salir?");
      isConfirmed = !isConfirmed;
      alert("Usted nos debe $" + total);
      alert("Gracias por elegirnos");
      break;

    default:
      alert("Dato incorrecto, por favor vuelva a intentar");
      break;
  }
}
