import React from "react";
import ReactDom from "react-dom";
import "./index.css";

const container = document.getElementById("root");
const App = () => (
  <div className="app">
    <h1>Hola react</h1>
  </div>
);

ReactDom.render(<App />, container);



// intall
// npm install react reactDom
// npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader
// npm i -D html-webpack-plugin
// npm i -D clean-webpack-plugin
// npm install -D style-loader css-loader
// npm install -D mini-css-extract-plugin
//  npm install -D webpack-dev-server
// npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh