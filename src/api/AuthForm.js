import React, { useState } from "react";
import "../styles/Login.css";

function AuthForm({ mode, onBack }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      // Placeholder login logic
      const { email, password } = formData;
      if (email === "test@example.com" && password === "password123") {
        setMessage("Login successful!");
      } else {
        setMessage("Invalid email or password.");
      }
    } else if (mode === "create") {
      // Placeholder account creation logic
      const { name, email, password } = formData;
      if (name && email && password) {
        setMessage(`Account created for ${name}!`);
      } else {
        setMessage("Please fill out all fields.");
      }
    }
  };

  return (
    <div>
      <h1>{mode === "login" ? "Login" : "Create a Delicious Account"}</h1>
      <form onSubmit={handleSubmit}>
        {mode === "create" && (
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
        <button className="back-button" onClick={onBack} type="button">
          Back
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AuthForm;
