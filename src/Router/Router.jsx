import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import SobrePage from "../pages/SobrePage";
import BookDetailsPage from "../pages/BookDetailsPage";
import { CartPage } from "../pages/CartPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<SobrePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/book/:bookId" element={<BookDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};