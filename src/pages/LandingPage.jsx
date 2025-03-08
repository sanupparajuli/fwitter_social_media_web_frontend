import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { loginUser, registerUser } from "../api/api"; // Import API functions
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate function
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser({ email: formData.email, password: formData.password });
      alert("Login successful!");
      console.log(res);

      // Save token to localStorage (Optional)
      localStorage.setItem("token", res.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }

    setLoading(false);
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await registerUser(formData);
      alert("Registration successful!");
      console.log(res);
      setActiveTab("login"); //  Switch to login after registration
    } catch (err) {
      setError(err.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {/* Left Section (Queet Logo) */}
      <div className="left-section">
        <img src="/logo.png" alt="Queet Logo" className="queet-logo" />
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h1>Happening now</h1>

        {/* Tabs for Login & Register */}
        <div className="tabs">
          <div className={`tab ${activeTab === "login" ? "active" : ""}`} onClick={() => setActiveTab("login")}>
            Log in
          </div>
          <div className={`tab ${activeTab === "register" ? "active" : ""}`} onClick={() => setActiveTab("register")}>
            Sign up
          </div>
        </div>

        {/* Show errors */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="active">
            <div className="form-group">
              <label>Email or username</label>
              <input type="text" name="email" placeholder="Email or username" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Log in"}</button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="active">
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign up"}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
