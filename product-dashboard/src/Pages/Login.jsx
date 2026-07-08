import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";
import loginImage from "../assets/Register.jpg";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Login Successful!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="container-fluid auth-bg min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row auth-card shadow-lg">

        {/* Left Image */}
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src={loginImage}
            alt="Login"
            className="auth-image"
          />
        </div>

        {/* Right Side */}
        <div className="col-lg-6 col-md-12 bg-white p-5 d-flex align-items-center">
          <form className="w-100" onSubmit={handleLogin}>

            <h2 className="fw-bold mb-2">
              Log In to Admin Panel
            </h2>

            <p className="text-secondary mb-4">
              Enter your email id and password below
            </p>

            <div className="mb-3">
              <label className="form-label fw-bold">
                EMAIL ID
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email id"
                value={loginData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">
                PASSWORD
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-dark w-100 py-3 mb-4">
              Log In
            </button>

            <p className="text-center text-secondary mb-0">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-dark text-decoration-none fw-semibold"
              >
                Register
              </Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;