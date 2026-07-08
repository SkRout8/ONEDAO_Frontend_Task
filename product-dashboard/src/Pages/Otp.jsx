import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import heroImg from "../assets/Register.jpg";
import "./Register.css";

function Otp() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    if (otp.includes("")) {
      toast.error("Please enter OTP");
      return;
    }

    toast.success("OTP Verified Successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="auth-bg d-flex justify-content-center align-items-center">
      <div className="auth-card shadow-lg">
        <div className="row g-0 h-100">

          {/* Left Image */}
          <div className="col-md-6 d-none d-md-block">
            <img src={heroImg} alt="Background" className="auth-image" />
          </div>

          {/* Right Side */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="form-section text-center">

              <h2 className="fw-bold mb-2">
                Verify your email
              </h2>

              <p className="text-muted mb-2">
                Enter the OTP sent to
              </p>

              <strong className="d-block mb-4">{email}</strong>

              <div className="d-flex justify-content-center gap-3 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                  />
                ))}
              </div>

              <button
                className="btn btn-dark w-100 py-3"
                onClick={handleVerify}
              >
                Proceed
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Otp;