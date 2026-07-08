import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";
import registerImage from "../assets/Register.jpg";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Save email in Local Storage
    localStorage.setItem("userEmail", email);

    toast.success("Registration Successful!");

    setTimeout(() => {
      navigate("/otp");
    }, 2000);
  };

  return (
    <div className="container-fluid auth-bg min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row auth-card shadow-lg">

        {/* Left Image */}
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src={registerImage}
            alt="Register"
            className="auth-image"
          />
        </div>

        {/* Right Form */}
        <div className="col-lg-6 auth-form bg-white">
          <form className="w-100 p-3" onSubmit={handleRegister}>

            <h2 className="auth-title">
              Register to Admin Panel
            </h2>

            <p className="auth-subtitle">
              Enter your email id and password below
            </p>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">EMAIL ID</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email id"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">PASSWORD</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label">CONFIRM PASSWORD</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-dark auth-btn">
              Register
            </button>

            <div className="auth-footer">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;