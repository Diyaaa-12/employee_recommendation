import { useState } from "react";

import Auth from "./components/Auth";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AIRecommendation from "./components/AIRecommendation";

function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  if (!token) {
    return <Auth setToken={setToken} />;
  }

  return (

    <div style={page}>

      <div style={navbar}>

        <h1 style={{ color: "white" }}>
          🤖 AI Employee Analytics
        </h1>

        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>

      </div>

      <div style={container}>

        <div style={left}>

          <div style={card}>
            <EmployeeForm
              onAdd={() => setRefresh(!refresh)}
            />
          </div>

          <div style={card}>
            <AIRecommendation />
          </div>

        </div>

        <div style={right}>

          <div style={card}>
            <EmployeeList refresh={refresh} />
          </div>

        </div>

      </div>

    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#f4f7fb",
  fontFamily: "Arial"
};

const navbar = {
  background: "#4f46e5",
  padding: "18px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const logoutBtn = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "6px",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

const container = {
  display: "flex",
  gap: "20px",
  padding: "30px",
  alignItems: "flex-start"
};

const left = {
  flex: 1
};

const right = {
  flex: 1.2
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0px 2px 10px rgba(0,0,0,0.08)"
};

export default App;