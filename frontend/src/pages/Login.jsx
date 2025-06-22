import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api";
import { useAuth } from "../context/AuthContext";

import '../styles/Login.css';


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Both fields required");
      return;
    }
    setLoading(true);
    try {
      const { data } = await loginRequest(form);
      login(data.token, data.role);
    } catch (err) {
      setError("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={submit} className="login-form">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="login-input"
        />
        {error && <p className="login-error">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="login-button"
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>

      <p className="login-footer">
        Not registered?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="signup-link"
        >
          Sign up here
        </button>
      </p>
    </div>
  );
}
