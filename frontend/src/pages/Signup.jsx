import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupRequest, loginRequest } from "../api";
import { useAuth } from "../context/AuthContext";

import '../styles/Signup.css';


export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", role: "patient" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("All fields required");
      return;
    }
    setLoading(true);
    try {
      await signupRequest(form);
      const { data } = await loginRequest({ username: form.username, password: form.password });
      login(data.token, data.role);
    } catch (err) {
      setError("Signup failed");
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={submit} className="signup-form">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="signup-input"
        />
        <select
          name="role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="signup-input"
        >
          <option value="patient">Patient</option>
          <option value="caretaker">Caretaker</option>
        </select>
        {error && <p className="signup-error">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="signup-button"
        >
          {loading ? "Signing up…" : "Sign Up"}
        </button>
      </form>
      <p className="signup-footer">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="login-link"
        >
          Log in here
        </button>
      </p>
    </div>
  );
}
