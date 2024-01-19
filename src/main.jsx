import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./redux";
import { Provider } from "react-redux";
import {setupListeners} from "@reduxjs/toolkit/query";
import {api} from "./redux/api.js"

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore les vérifications de sérialisation pour les requêtes et réponses RTK Query
        ignoredActions: ['api/executeQuery', 'api/fulfilled'],
        // Augmenter le seuil de temps pour l'avertissement
        warnAfter: 100,
      },
    }).concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
