export const ui = {
  onFormSumbit: (data) => {},
  onEliminarClick: (codigo) => {},
  onEditarClick: (codigo) => {},
  sum: (elementos, selector) => {},
  renderForm,
  renderTable,
};

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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const values = Array.from(data.entries());

  const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

  const codigo = parseInt(frmCodigo[1]);
  const nombre = frmNombre[1];
  const cantidad = parseInt(frmCantidad[1]);
  const precio = parseFloat(frmPrecio[1]);
  const categoria = parseInt(frmCategoria[1]);

  ui.onFormSumbit({
    codigo,
    nombre,
    cantidad,
    precio,
    categoria,
  });
});

function renderForm(producto) {
  inputCodigo.value = producto.codigo || "";
  inputNombre.value = producto.nombre || "";
  inputCantidad.value = producto.cantidad || "";
  inputPrecio.value = producto.precio || "";
  selectCategorias.value = producto.categoria || 1;
}

function renderTable(products) {
  const filas = products.map((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.codigo}</td> 
      <td>${item.nombre}</td> 
      <td>${item.cantidad}</td> 
      <td>${item.precio}</td> 
      <td>${item.total}</td> 
      <td> 
          <div class="btn-group">
            <a href="#" title="Editar" class="btn btn-sm btn-outline-secondary"><i class="bi bi-pencil-square"></i></a>
            <a href="#" title="Eliminar" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></a>
          </div>
      </td> 
      `;

    const [editar, eliminar] = tr.getElementsByTagName("a");

    eliminar.addEventListener("click", (event) => {
      event.preventDefault();
      ui.onEliminarClick(item.codigo);
    });

    editar.addEventListener("click", (event) => {
      event.preventDefault();
      ui.onEditarClick(item.codigo);
    });
    return tr;
  });

  tbody.innerHTML = "";
  filas.forEach((tr) => {
    tbody.appendChild(tr);
  });

  cantidadTotalEl.innerHTML = sum(products, (x) => x.cantidad);
  precioTotalEl.innerHTML = sum(products, (x) => x.precio);
  granTotalEl.innerHTML = sum(products, (x) => x.total);

  function sum(elementos, selector) {
    return elementos.map(selector).reduce((a, b) => a + b, 0);
  }
}
