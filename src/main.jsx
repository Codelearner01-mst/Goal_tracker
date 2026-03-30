import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { Goals } from "./goals.jsx";
import { GoalsProvider } from "./utils/context";
import { Header } from "./header";
import { Footer } from "./footer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoalsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/progress" element={<App />} />
          <Route path="/about" element={<App />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GoalsProvider>
  </StrictMode>,
);
