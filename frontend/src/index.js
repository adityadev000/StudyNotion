import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router-dom" ; 
import {Provider} from "react-redux"
import { configureStore  } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import {Toaster} from "react-hot-toast" ; 

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // enables redux-thunk (enabled by default, this is optional)
      serializableCheck: false, // optional to prevent some warnings
    }),
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>

  </Provider>
  </React.StrictMode>
);
