const angel = {
  nombre: "Angel",
  apellido: "Higueros",
  edad: 20,
  direccion: {
    ciudad: "Guatemala",
    municipio: "Guatemala",
  },
};

const angel2 = {
  ...angel,
  apellido: "Cifuentes ",
  telefono: 42843075,
  direccion: {
    ...angel.direccion,
  },
};

angel2.direccion.municipio = "cayala";

// const angel2 = Object.assign({}, angel, { apellido: "Cifuentes" });
// angel2.apellido = "Cifuentes";

// console.log("Angel", angel);
// console.log("Angel 2 ", angel2);

//Areglos inmutables

const numeros = [1, 2, 3];

const numeros2 = [...numeros, 4];
// numeros2.push(4)

const index = numeros.indexOf(2);
const numeros3 = [...numeros.slice(0, index), 1.5, ...numeros.slice(index)];

const numeros4 = numeros.filter((x) => x != 2);


const numeros5 = numeros.map(x => x == 2 ? 100 : x)

console.log("numeros: ", numeros);
console.log("numeros 2: ", numeros2);
console.log("numeros 3: ", numeros3);
console.log("numeros 4: ", numeros4);
console.log("numeros 5: ", numeros5);
