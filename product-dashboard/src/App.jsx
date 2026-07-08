import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Otp from "./Pages/Otp";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
        <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </BrowserRouter>
  );
}

export default App;