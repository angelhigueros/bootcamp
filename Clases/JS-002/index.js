const form = document.getElementsByTagName("form")[0];

/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo");
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");
/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");
/** @type {HTMLInputElement} */
const selectCategorias = document.getElementById("categoria");

const tbody = document.getElementsByTagName("tbody")[0];

const cantidadTotalEl = document.getElementById("cantidad-total");
const precioTotalEl = document.getElementById("precio-total");
const granTotalEl = document.getElementById("gran-total");

let indice = 1;
let cantidadTotal = 0;
let preciosTotal = 0;
let granTotal = 0;
let currentRow;

/**
 *
 * @param {Event} event
 */
const onSubmit = (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const values = Array.from(data.entries());

  const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

  let codigo = frmCodigo[1];
  const nombre = frmNombre[1];
  const cantidad = frmCantidad[1];
  const precio = frmPrecio[1];
  const categoria = frmCategoria[1];

  const total = cantidad * precio;

  cantidadTotal += parseInt(cantidad);
  preciosTotal += parseFloat(precio);
  granTotal += parseFloat(total);

  let tr;
  if (!codigo) {
    codigo = indice++;
    tr = document.createElement("tr");
    tbody.appendChild(tr);
  } else {
    tr = currentRow;
  }

  tr.dataset.categoria = categoria;
  tr.innerHTML = `<td>${codigo}</td> 
                  <td>${nombre}</td> 
                  <td>${cantidad}</td> 
                  <td>${precio}</td> 
                  <td>${total}</td> 
                  <td><a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onclick="onDelete(event)">Eliminar</a></td> 
                  `;

  cantidadTotalEl.innerHTML = cantidadTotal;
  precioTotalEl.innerHTML = preciosTotal;
  granTotalEl.innerHTML = granTotal;

  form.reset();
  inputNombre.focus();
};

form.addEventListener("submit", onSubmit);

/**
 *
 * @param {Event} event
 */
const onEdit = (event) => {
  event.preventDefault();

  /** @type {HTMLAnchorElement} */
  const anchor = event.target;
  const tr = anchor.parentElement.parentElement;

  const celdas = tr.getElementsByTagName("td");
  const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas;

  inputCodigo.value = tdCodigo.innerText;
  inputNombre.value = tdNombre.innerText;
  inputCantidad.value = tdCantidad.innerText;
  inputPrecio.value = tdPrecio.innerText;
  selectCategorias.value = tr.dataset.categoria;

  currentRow = tr;
};

/**
 *
 * @param {Event} event
 */

const onDelete = (event) => {
  event.preventDefault();
};
