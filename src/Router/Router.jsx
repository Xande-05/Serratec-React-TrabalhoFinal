import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import HomePage from "../Pages/HomePage";
import SobrePage from "../Pages/SobrePage";
import BookDetailsPage from "../Pages/BookDetailsPage";
import { CartPage } from "../Pages/CartPage";

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