import React, { useState } from "react";
import Header from "../components/Header";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import { ButtonLink } from "../components/ButtonLink";
import { User, Mail, Lock, Phone, Building2, FileText, ArrowRight } from "lucide-react";
import logo from "../assets//1749736593810.png";
import '../animations/companysingup.css';

export function CompanySignup({ className, ...props }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    companyName: "",
    gstNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>

      <Header />

      <div className="csignup-page">
        {/* Top strip */}
        <div className="csignup-top-strip">
          <a href="/" className="csignup-brand">
            <img src={logo} alt="Farm Help" />
            <span className="csignup-brand-name">Farm <span>Help</span></span>
          </a>
          <ButtonLink text="User? Sign Up as User" to="/signup/user" />
        </div>

        {/* Card */}
        <div className="csignup-card">
          {/* Header */}
          <div className="csignup-card-header">
            <div className="csignup-label">Company Account</div>
            <h1 className="csignup-card-title">Register Your Company</h1>
            <p className="csignup-card-sub">Connect directly with thousands of verified farmers across India</p>
          </div>

          {/* Form */}
          <form>
            <div className="csignup-form-body">

              {/* Contact Person */}
              <div className="form-section">
                <div className="form-section-title">Contact Person</div>
                <div className="grid-2">
                  <div className="field">
                    <label className="field-label">First Name</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><User size={15} /></span>
                      <input id="firstName" type="text" required className="auth-input" placeholder="John" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Last Name</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><User size={15} /></span>
                      <input id="lastName" type="text" required className="auth-input" placeholder="Smith" onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="form-section">
                <div className="form-section-title">Contact Details</div>
                <div className="grid-2">
                  <div className="field">
                    <label className="field-label">Email Address</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><Mail size={15} /></span>
                      <input id="email" type="email" required className="auth-input" placeholder="company@email.com" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Contact Number</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><Phone size={15} /></span>
                      <input id="contact" type="text" required className="auth-input" placeholder="+91 00000 00000" onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="form-section">
                <div className="form-section-title">Company Information</div>
                <div className="grid-2">
                  <div className="field">
                    <label className="field-label">Company Name</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><Building2 size={15} /></span>
                      <input id="companyName" type="text" required className="auth-input" placeholder="Acme Foods Pvt. Ltd." onChange={handleChange} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">GST Number</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><FileText size={15} /></span>
                      <input id="gstNumber" type="text" required className="auth-input" placeholder="22AAAAA0000A1Z5" onChange={handleChange} />
                    </div>
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
                      <input id="password" type="password" required className="auth-input" placeholder="••••••••" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Confirm Password</label>
                    <div className="input-wrap">
                      <span className="input-icon-left"><Lock size={15} /></span>
                      <input id="confirmPassword" type="password" required className="auth-input" placeholder="••••••••" onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-csignup">
                Register Company <ArrowRight size={17} />
              </button>
            </div>

            {/* Footer */}
            <div className="csignup-card-footer">
              <p>Already have an account? <Link to="/signin/company">Login</Link></p>
              <p className="csignup-terms">
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