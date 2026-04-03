import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (
      storedUser &&
      form.email === storedUser.email &&
      form.password === storedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", storedUser.name);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    localStorage.setItem("userData", JSON.stringify(form));
    alert("Registered Successfully");
    setIsLogin(true);
  };

  return (
    <div style={styles.container}>

      {/* LEFT IMAGE */}
      <div style={styles.left}>
        <h2>Welcome Back</h2>
        <p>Login or Signup to continue your journey</p>
      </div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        
        {/* Tabs */}
        <div style={styles.tabs}>
          <div
            style={isLogin ? styles.activeTab : styles.tab}
            onClick={() => setIsLogin(true)}
          >
            Login
          </div>
          <div
            style={!isLogin ? styles.activeTab : styles.tab}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </div>
        </div>

        {/* LOGIN */}
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              onChange={(e)=>setForm({...form,email:e.target.value})}
              required
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              onChange={(e)=>setForm({...form,password:e.target.value})}
              required
            />

            <button style={styles.button}>Login</button>
          </form>
        ) : (
          /* SIGNUP */
          <form onSubmit={handleSignup}>
            <input
              style={styles.input}
              placeholder="Full Name"
              onChange={(e)=>setForm({...form,name:e.target.value})}
              required
            />

            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              onChange={(e)=>setForm({...form,email:e.target.value})}
              required
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              onChange={(e)=>setForm({...form,password:e.target.value})}
              required
            />

            <button style={styles.button}>Signup</button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex"
  },

  left: {
    width: "50%",
    background: "linear-gradient(135deg,#1e3a8a,#06b6d4)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  right: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px"
  },

  tabs: {
    display: "flex",
    marginBottom: "20px",
    background: "#eee",
    borderRadius: "10px"
  },

  tab: {
    flex: 1,
    padding: "10px",
    textAlign: "center",
    cursor: "pointer"
  },

  activeTab: {
    flex: 1,
    padding: "10px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "10px",
    fontWeight: "bold"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#06b6d4",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};