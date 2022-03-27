import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import "antd/dist/antd.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",

  cache: new InMemoryCache({
    typePolicies: {
        AssetsStatistic: {
          merge: true,
        },
      },
  }),
});

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
    <BrowserRouter>
      <ConfigProvider locale={ptBR}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
