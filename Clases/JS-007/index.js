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

/**
 *
 * @param {Event} event
 */
const onSubmit = (event) => {
  event.preventDefault();

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

// unsubscrube();
