import React, { useState } from "react";
import AuthForm from "../api/AuthForm";

import "../styles/Login.css";

function Login() {
  const [currentView, setCurrentView] = useState("default"); // "default", "login", "create"

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="login-page">
      {currentView === "default" && (
        <div>
          <h1>Welcome to AironChef</h1>
          <button className="toggle-button" onClick={() => handleViewChange("login")}>
            Login
          </button>
          <button className="toggle-button" onClick={() => handleViewChange("create")}>
            Create a Delicious Account
          </button>
        </div>
      )}

      {currentView === "login" && (
        <AuthForm mode="login" onBack={() => handleViewChange("default")} />
      )}

      {currentView === "create" && (
        <AuthForm mode="create" onBack={() => handleViewChange("default")} />
      )}
    </div>
  );
}

export default Login;