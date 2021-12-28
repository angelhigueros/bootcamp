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

const preloadedState = {
  producto: {},
  productos: [],
};

let indice = 0;
const reducer = (state, action) => {
  if (action.type == "producto:agregado") {
    indice++;
    const producto = action.payload;
    const codigo = indice;
    const total = producto.cantidad * producto.precio;
    return {
      ...state,
      productos: [...state.productos, { ...action.payload, codigo, total }],
    };
  }
  if (action.type == "producto:modificado") {
    const producto = action.payload;
    const productos = state.productos.slice();
    const codigo = producto.codigo;
    const total = producto.cantidad * producto.precio;
    const old = productos.find((item) => item.codigo === codigo);
    const index = productos.indexOf(old);
    productos[index] = { ...producto, total };

    return {
      ...state,
      productos,
    };
  }

  if (action.type == "producto:eliminado") {
    const codigo = action.payload.codigo;
    const productos = state.productos.filter((item) => item.codigo != codigo);
    return { ...state, productos };
  }

  if (action.type == "producto:seleccionado") {
    const codigo = action.payload.codigo;
    return {
      ...state,
      producto: state.productos.find((x) => x.codigo === codigo) || {},
    };
  }

  return state;
};

const store = Redux.createStore(reducer, preloadedState);

let lastestState;

const unsubscrube = store.subscribe(() => {
  let currentState = store.getState();

  if (currentState != lastestState) {
    lastestState = currentState;
    console.log("estado", store.getState());
    renderTable(currentState.productos);
    renderForm(currentState.producto);
  }
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
      store.dispatch({
        type: "producto:eliminado",
        payload: {
          codigo: item.codigo,
        },
      });
    });

    editar.addEventListener("click", (event) => {
      event.preventDefault();
      store.dispatch({
        type: "producto:seleccionado",
        payload: {
          codigo: item.codigo,
        },
      });
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

/**
 *
 * @param {Event} event
 */
const onSubmit = (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const values = Array.from(data.entries());

  const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

  const codigo = parseInt(frmCodigo[1]);
  const nombre = frmNombre[1];
  const cantidad = parseInt(frmCantidad[1]);
  const precio = parseFloat(frmPrecio[1]);
  const categoria = parseInt(frmCategoria[1]);

  if (codigo) {
    store.dispatch({
      type: "producto:modificado",
      payload: {
        codigo,
        nombre,
        cantidad,
        precio,
        categoria,
      },
    });
  } else {
    store.dispatch({
      type: "producto:agregado",
      payload: {
        codigo,
        nombre,
        cantidad,
        precio,
        categoria,
      },
    });
  }

  store.dispatch({
    type: "producto:seleccionado",
    payload: {
      codigo: null,
    },
  });
  inputNombre.focus();
};

form.addEventListener("submit", onSubmit);

store.dispatch({
  type: "producto:agregado",
  payload: {
    nombre: "prueba",
    cantidad: 3,
    precio: 10,
    categoria: 2,
  },
});

store.dispatch({
  type: "producto:agregado",
  payload: {
    nombre: "prueba 2",
    cantidad: 3,
    precio: 20,
    categoria: 3,
  },
});

store.dispatch({
  type: "producto:modificado",
  payload: {
    codigo: 1,
    nombre: "iPhone",
    cantidad: 5,
    precio: 20,
    categoria: 3,
  },
});

// store.dispatch({
//   type: "producto:eliminado",
//   payload: {
//     codigo: 2,
//   },
// });

// unsubscrube();
