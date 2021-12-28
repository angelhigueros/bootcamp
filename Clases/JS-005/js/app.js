const preloadedState = {
  producto: {},
  productos: [],
};

const middlewares = Redux.applyMiddleware(
  loggerMiddleware,
  agregarOModificarProductoMiddleware,
  generadorCodigoProductoBuilder(0)
);

const store = Redux.createStore(reducer, preloadedState, middlewares);

store.subscribe(
  dispatchOnChange(store, (state) => {
    ui.renderForm(state.producto);
    ui.renderTable(state.productos);
  })
);

ui.onFormSumbit = (producto) => {
  store.dispatch(agregarOModificarProducto(producto));
  inputNombre.focus();
};

ui.onEliminarClick = (codigo) => productoEliminado(codigo);

ui.onEditarClick = (codigo) => productoSeleccionado(codigo);

function dispatchOnChange(store, dispatch) {
  let lastestState;

  return function () {
    let currentState = store.getState();

    if (currentState != lastestState) {
      lastestState = currentState;
      dispatch(currentState);
    }
  };
}
