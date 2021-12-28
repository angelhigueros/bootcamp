import { applyMiddleware, createStore } from "redux";
import { ui } from "./ui";
import * as $store from "./store";

const preloadedState = {
  producto: {},
  productos: [],
};

const middlewares = applyMiddleware(
  $store.loggerMiddleware,
  $store.agregarOModificarProductoMiddleware,
  $store.generadorCodigoProductoBuilder(0)
);

const store = createStore($store.reducer, preloadedState, middlewares);

store.subscribe(
  dispatchOnChange(store, (state) => {
    ui.renderForm(state.producto);
    ui.renderTable(state.productos);
  })
);

ui.onFormSumbit = (producto) => {
  store.dispatch($store.agregarOModificarProducto(producto));
  inputNombre.focus();
};

ui.onEliminarClick = (codigo) => $store.productoEliminado(codigo);

ui.onEditarClick = (codigo) => $store.productoSeleccionado(codigo);

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
