import React from "react";
import ReactDom from "react-dom";

const container = document.getElementById("root");
const App = () => (
  <div>
    <h1>Hola react</h1>
  </div>
);

ReactDom.render(<App />, container);

// intall
// npm install react reactDom
// npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader
// npm install babel-preset-es2015

