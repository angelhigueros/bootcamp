const actionTypes = {
  ProductoAgregado: "producto:agregado",
  ProductoModificado: "producto:modificado",
  ProductoEliminado: "producto:eliminado",
  ProductoSeleccionado: "producto:seleccionado",
  ProductoAgregadoOModicado: "producto:agregado-modificado",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ProductoAgregado:
      return productoAgregadoReducer(state, action);

    case actionTypes.ProductoModificado:
      return productoModificadoReducer(state, action);

    case actionTypes.ProductoEliminado:
      return productoEliminadoReducer(state, action);

    case actionTypes.ProductoSeleccionado:
      return productoSeleccionadoReducer(state, action);

    default:
      return state;
  }
};

// action builder

export const productoSeleccionado = (codigo) => ({
  type: actionTypes.ProductoSeleccionado,
  payload: {
    codigo,
  },
});

export const productoEliminado = (codigo) => ({
  type: actionTypes.ProductoEliminado,
  payload: {
    codigo,
  },
});

export const productoModificado = (payload) => ({
  type: actionTypes.ProductoModificado,
  payload,
});

export const productoAgregado = (payload) => ({
  type: actionTypes.ProductoAgregado,
  payload,
});

export const agregarOModificarProducto = (payload) => ({
  type: actionTypes.ProductoAgregadoOModicado,
  payload,
});

// // Middleware
// function loggerMiddleware(store) {
//   return function distpathcWrapper(next) {
//     return function actionHandler(action) {
//       next(action);
//       const state = store.getState();
//       console.log("distpatch", action);
//       console.log("state", state);
//     };
//   };
// }

export const loggerMiddleware = (store) => (next) => (action) => {
  console.log("distpatch", action);
  const result = next(action);
  console.log("state", store.getState());
  return result;
};

function productoSeleccionadoReducer(state, action) {
  const codigo = action.payload.codigo;
  return {
    ...state,
    producto: state.productos.find((x) => x.codigo === codigo) || {},
  };
}

function productoEliminadoReducer(state, action) {
  const codigo = action.payload.codigo;
  const productos = state.productos.filter((item) => item.codigo != codigo);
  return { ...state, productos };
}

function productoModificadoReducer(state, action) {
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

function productoAgregadoReducer(state, action) {
  const producto = action.payload;
  const total = producto.cantidad * producto.precio;
  return {
    ...state,
    productos: [...state.productos, { ...producto, total }],
  };
}

export const agregarOModificarProductoMiddleware =
  (store) => (next) => (action) => {
    if (action.type != actionTypes.ProductoAgregadoOModicado) {
      return next(action);
    }

    const producto = action.payload;
    const actionToDispatch = producto.codigo
      ? productoModificado(producto)
      : productoAgregado(producto);

    store.dispatch(actionToDispatch);
    return store.dispatch(productoSeleccionado(null));
  };

export function generadorCodigoProductoBuilder(codigoInicial) {
  let codigo = codigoInicial;

  return (store) => (next) => (action) => {
    if (action.type != actionTypes.ProductoAgregado) next(action);

    codigo++;

    const actionToDispatch = {
      ...action,
      payload: {
        ...action.payload,
        codigo,
      },
    };
    action.payload = { ...action.payload, codigo };
    return next(actionToDispatch);
  };
}
