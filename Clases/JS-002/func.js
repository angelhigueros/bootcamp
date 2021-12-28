function mensaje(prefijo, formateador) {
  return function (texto) {
    return formateador(prefijo, texto);
  };
}

const bienvenida = mensaje("hola", (p, t) => "¡" + p + " " + t + "!");
const despedida = mensaje("adios", (p, t) => p + " " + t + "... :(");

console.log(bienvenida("mundo"));
console.log(despedida("mundo"));
