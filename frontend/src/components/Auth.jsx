import { useState } from "react";
import axios from "axios";
import API from "../config";

function Auth({ setToken }) {

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async () => {

    try {

      const url = isLogin
        ? `${API}/auth/login`
        : `${API}/auth/register`;

      const res = await axios.post(url, form);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      } else {
        alert("Registration successful. Please login.");
        setIsLogin(true);
      }

    } catch (err) {
      setError(err.response?.data?.msg || "Server Error");
    }
  };

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={{
  fontSize: '60px',
  fontWeight: 'bold',
  color: '#111',
  textAlign: 'center',
  lineHeight: '1.1',
  marginBottom: '10px'
}}>
  🤖 AI Employee Analytics
</h1>

        <p style={{
  textAlign: 'center',
  color: '#666',
  marginBottom: '30px',
  fontSize: '20px'
}}>
  Smart Employee Management System
</p>

        <div style={tabContainer}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              ...tabBtn,
              background: isLogin ? "#4f46e5" : "#e5e7eb",
              color: isLogin ? "white" : "black"
            }}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            style={{
              ...tabBtn,
              background: !isLogin ? "#4f46e5" : "#e5e7eb",
              color: !isLogin ? "white" : "black"
            }}
          >
            Register
          </button>
        </div>

        {error && (
          <div style={errorStyle}>
            ⚠️ {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={input}
        />

        <button
          onClick={handleSubmit}
          style={mainBtn}
        >
          {isLogin ? "🔐 Login" : "📝 Register"}
        </button>

      </div>

    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(to right, #667eea, #764ba2)"
};

const card = {
  width: "350px",
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box"
};

const mainBtn = {
  width: "100%",
  padding: "12px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
};

const tabContainer = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px"
};

const tabBtn = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};

const errorStyle = {
  background: "#fee2e2",
  color: "#dc2626",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px"
};

export default Auth;