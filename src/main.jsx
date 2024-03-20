import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./index.css";
import "./style.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation.jsx";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
