import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import "antd/dist/antd.min.css";
import "./index.css";
import App from "./App";

// eslint-disable-next-line
const consoleError = console.error.bind(console);
// eslint-disable-next-line
console.error = (errObj, ...args) => {
  if (args.includes("findDOMNode")) {
    return;
  }
  consoleError(errObj, ...args);
};

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
