import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "./components/ui/GridBackground.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

// Wait for full page load
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // ⏳ Delay for 2 seconds before hiding (adjust as needed)
    setTimeout(() => {
      preloader.classList.add("hidden"); // fade out
      setTimeout(() => {
        preloader.remove(); // remove after transition
      }, 500); // match fade-out duration in CSS
    }, 2000); // 👈 2 seconds delay here
  }
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <GridBackground>
          <App />
        </GridBackground>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
