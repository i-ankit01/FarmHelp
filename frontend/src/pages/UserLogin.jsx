import React, { useState } from "react";
import Header from "../components/Header";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import logo from "../assets//1749736593810.png";
import '../animations/signin.css';
import {
  Leaf,
  Mail,
  Lock,
  ArrowRight,
  Tractor,
  TreesIcon as Plant,
  Sun,
  Cloud,
  ChevronRight,
} from "lucide-react";

export function UserLogin({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/farmer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      navigate("/dashboard/user");
    } catch (err) {
      setError(err.message);
    }
  };

  const redirectToCompanyLogin = () => {
    window.location.href = "/company-login";
  };

  return (
    <>
      <Header />

      <div className="login-page">
        {/* ── LEFT PANEL ── */}
        <div className="login-left">
          <div className="login-left-glow" />

          <div className="login-left-content">
            <div className="login-brand">
              <img src={logo} alt="Farm Help" />
              <span className="login-brand-name">Farm <span>Help</span></span>
            </div>

            <div className="login-left-label">For Farmers</div>

            <h2 className="login-left-title">
              Connecting Farmers<br />
              <em>Directly to</em><br />
              Companies.
            </h2>

            <p className="login-left-desc">
              Eliminate middlemen and maximize your profits. Connect directly with businesses looking for your crops.
            </p>

            <ul className="login-features">
              {[
                "Direct access to companies",
                "Better prices for your crops",
                "Transparent transactions",
                "Secure payment system",
              ].map((item) => (
                <li key={item} className="login-feature-item">
                  <span className="login-feature-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="login-left-deco-text">FARM</div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="login-right">
          <div className="login-box">
            <div className="login-box-header">
              <h1 className="login-box-title">Farmer Login</h1>
              <p className="login-box-sub">Welcome back — sign in to your account</p>
            </div>

            <div className="demo-box">
              <strong>Demo Credentials</strong>
              Email: ankitdemo@gmail.com<br />
              Password: ankitdemo@123
            </div>

            {error && <div className="login-error">{error}</div>}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-field-wrap">
                <label className="form-label-sm">Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon"><Mail size={16} /></span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-field-wrap">
                <label className="form-label-sm">Password</label>
                <div className="input-wrap">
                  <span className="input-icon"><Lock size={16} /></span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="form-row-between">
                <label className="remember-wrap">
                  <input type="checkbox" id="remember-me" />
                  Remember me
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn-login" disabled={isLoading}>
                {isLoading ? "Signing In…" : "Sign In"}
                {!isLoading && <ArrowRight size={16} />}
              </button>
            </form>

            <div className="login-divider">
              <div className="login-divider-line" />
              <span className="login-divider-text">or</span>
              <div className="login-divider-line" />
            </div>

            <div className="login-footer-links">
              <p>Don't have an account? <a href="#">Register now</a></p>
              <button className="btn-company-link" onClick={redirectToCompanyLogin}>
                Go to Company Login <ChevronRight size={14} />
              </button>
            </div>

            <p className="login-terms">
              By signing in, you agree to FarmHelp's{" "}
              <a href="#" style={{ color: "var(--amber)", textDecoration: "underline" }}>Terms of Service</a>{" "}
              and{" "}
              <a href="#" style={{ color: "var(--amber)", textDecoration: "underline" }}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}