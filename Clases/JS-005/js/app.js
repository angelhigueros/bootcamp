const preloadedState = {
  producto: {},
  productos: [],
};

const store = Redux.createStore(reducer, preloadedState);

let lastestState;

const unsubscrube = store.subscribe(() => {
  let currentState = store.getState();

  if (currentState != lastestState) {
    lastestState = currentState;
    ui.renderForm(currentState.producto);
    ui.renderTable(currentState.productos);
  }
});

ui.onFormSumbit = (producto) => {
  if (producto.codigo) {
    store.dispatch(productStore.productoModificado(producto));
  } else {
    store.dispatch(productStore.productoAgregado(producto));
  }

  store.dispatch(productStore.productoSeleccionado(null));
  inputNombre.focus();
};

ui.onEliminarClick = (codigo) => productStore.productoEliminado(codigo);

ui.onEditarClick = (codigo) => productoSeleccionado(codigo);
