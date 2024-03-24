import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
<<<<<<< Updated upstream
import store from "./store/stores";
=======
import { Provider } from "react-redux";
import { store } from "./store/index.store";
>>>>>>> Stashed changes

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
<<<<<<< Updated upstream
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
=======
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
>>>>>>> Stashed changes
);
