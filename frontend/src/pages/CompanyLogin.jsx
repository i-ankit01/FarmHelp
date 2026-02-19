import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ButtonLink";
import axios from "axios";
import { Mail, Lock, ArrowRight, ChevronRight, Building2, TrendingUp, ShieldCheck, Handshake } from "lucide-react";
import logo from "../assets//1749736593810.png";
import '../animations/companylogin.css';

export function CompanyLogin({ className, ...props }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/company/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("company_token", response.data.token);
        navigate("/dashboard/company");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <>

      <Header />

      <div className="clogin-page">
        {/* ── LEFT PANEL ── */}
        <div className="clogin-left">
          <div className="clogin-left-glow" />
          <div className="clogin-left-content">
            <a href="/" className="clogin-brand">
              <img src={logo} alt="Farm Help" />
              <span className="clogin-brand-name">Farm <span>Help</span></span>
            </a>

            <div className="clogin-left-label">For Companies</div>

            <h2 className="clogin-left-title">
              Source Directly<br />
              From <em>Verified</em><br />
              Farmers.
            </h2>

            <p className="clogin-left-desc">
              Connect with thousands of farmers across India. Get fresh produce at better prices — no middlemen, complete transparency.
            </p>

            <ul className="clogin-features">
              {[
                "Access to 5,000+ verified farmers",
                "Consistent quality and supply",
                "Transparent pricing",
                "Real-time delivery tracking",
              ].map((item) => (
                <li key={item} className="clogin-feature-item">
                  <span className="clogin-feature-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="clogin-deco-text">BIZ</div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="clogin-right">
          <div className="clogin-box">
            <div className="clogin-box-header">
              <div className="clogin-box-icon"><Building2 size={24} /></div>
              <h1 className="clogin-box-title">Company Login</h1>
              <p className="clogin-box-sub">Welcome back — access your company dashboard</p>
            </div>

            {/* Switch to user */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <ButtonLink text="User? Login as User" to="/signin/user" />
            </div>

            {error && <div className="clogin-error">{error}</div>}

            <form className="clogin-form" onSubmit={handleSubmit}>
              <div className="form-field-wrap">
                <label className="form-label-sm">Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon"><Mail size={16} /></span>
                  <input
                    type="email"
                    placeholder="company@example.com"
                    required
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field-wrap">
                <label className="form-label-sm">Password</label>
                <div className="input-wrap">
                  <span className="input-icon"><Lock size={16} /></span>
                  <input
                    type="password"
                    required
                    className="auth-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="forgot-row">
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn-clogin">
                Login <ArrowRight size={16} />
              </button>
            </form>

            <div className="social-divider">
              <div className="social-divider-line" />
              <span className="social-divider-text">Or continue with</span>
              <div className="social-divider-line" />
            </div>

            <div className="social-row">
              <button className="social-btn"><i className="ri-apple-fill" /></button>
              <button className="social-btn"><i className="ri-google-fill" /></button>
              <button className="social-btn"><i className="ri-meta-fill" /></button>
            </div>

            <div className="clogin-footer" style={{ marginTop: "1.25rem" }}>
              <p>Don't have an account? <Link to="/signup/company">Sign up</Link></p>
            </div>

            <p className="clogin-terms">
              By signing in, you agree to FarmHelp's{" "}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}