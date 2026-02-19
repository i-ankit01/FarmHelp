import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLink } from "../components/ButtonLink";
import '../animations/signup.css';
import {
  User,
  Mail,
  Lock,
  Phone,
  CreditCard,
  Tractor,
  ArrowRight,
  ChevronRight,
  Leaf,
} from "lucide-react";
import logo from "../assets//1749736593810.png";

export function UserSignup({ className, ...props }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    aadhar: "",
    land: "",
    crops: [],
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCropChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      crops: checked
        ? [...prev.crops, value]
        : prev.crops.filter((crop) => crop !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/api/v1/farmer/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        alert("Signup Successful!");
        navigate("/signin/user");
      } else {
        setError(data.message || "Signup failed!");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong! Try again.");
    }
  };

  const cropOptions = ["Rice", "Wheat", "Barley", "Oats", "Pulse", "Maize", "Sugarcane", "Others"];

  return (
    <>
      <Header />

      <div className="signup-page">
        {/* Top strip */}
        <div className="signup-top-strip">
          <a href="/" className="signup-brand">
            <img src={logo} alt="Farm Help" />
            <span className="signup-brand-name">Farm <span>Help</span></span>
          </a>
          <ButtonLink text="Company? Sign Up as Company" to="/signup/company" />
        </div>

        {/* Card */}
        <div className="signup-card">
          {/* Header */}
          <div className="signup-card-header">
            <div className="signup-label">New Account</div>
            <h1 className="signup-card-title">Create Your Farmer Profile</h1>
            <p className="signup-card-sub">Join thousands of farmers connecting directly with businesses</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="signup-form-body">

              {/* Personal Info */}
              <div className="form-section">
                <div className="form-section-title">Personal Information</div>
                <div className="grid-2">
                  <div className="field">
                    <label className="field-label">First Name</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><User size={15} /></span>
                      <input
                        name="firstName"
                        type="text"
                        required
                        className="auth-input"
                        placeholder="John"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Last Name</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><User size={15} /></span>
                      <input
                        name="lastName"
                        type="text"
                        required
                        className="auth-input"
                        placeholder="Smith"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="form-section">
                <div className="form-section-title">Contact Details</div>
                <div className="grid-1" style={{ gap: '1rem' }}>
                  <div className="field">
                    <label className="field-label">Email Address</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><Mail size={15} /></span>
                      <input
                        name="email"
                        type="email"
                        required
                        className="auth-input"
                        placeholder="your@email.com"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid-2" style={{ marginTop: '1rem' }}>
                  <div className="field">
                    <label className="field-label">Contact Number</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><Phone size={15} /></span>
                      <input
                        name="contactNo"
                        type="text"
                        required
                        className="auth-input"
                        placeholder="+91 00000 00000"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Aadhar Card No.</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><CreditCard size={15} /></span>
                      <input
                        name="aadhar"
                        type="text"
                        required
                        className="auth-input"
                        placeholder="XXXX XXXX XXXX"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Farm Info */}
              <div className="form-section">
                <div className="form-section-title">Farm Information</div>
                <div className="field" style={{ marginBottom: '1rem' }}>
                  <label className="field-label">Land in Acres</label>
                  <div className="input-wrap">
                    <span className="input-icon-left"><Tractor size={15} /></span>
                    <input
                      name="land"
                      type="number"
                      required
                      className="auth-input"
                      placeholder="e.g. 5"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field-label" style={{ marginBottom: '0.75rem' }}>Crops You Grow</label>
                  <div className="crop-grid">
                    {cropOptions.map((crop) => (
                      <label key={crop} className="crop-checkbox-label">
                        <input
                          type="checkbox"
                          value={crop}
                          onChange={handleCropChange}
                        />
                        {crop}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="form-section">
                <div className="form-section-title">Set Password</div>
                <div className="grid-2">
                  <div className="field">
                    <label className="field-label">Password</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><Lock size={15} /></span>
                      <input
                        name="password"
                        type="password"
                        required
                        className="auth-input"
                        placeholder="••••••••"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Confirm Password</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><Lock size={15} /></span>
                      <input
                        name="confirmPassword"
                        type="password"
                        required
                        className="auth-input"
                        placeholder="••••••••"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && <div className="signup-error">{error}</div>}

              <button type="submit" className="btn-signup">
                Create Account <ArrowRight size={17} />
              </button>
            </div>

            {/* Footer */}
            <div className="signup-card-footer">
              <p>
                Already have an account?{" "}
                <Link to="/signin/user">Sign In</Link>
              </p>
              <p className="signup-terms">
                By signing up, you agree to our{" "}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}