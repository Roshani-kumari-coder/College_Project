import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password not match");
      return;
    }

    // ✅ Save user data
    localStorage.setItem("userData", JSON.stringify(form));

    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
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

          <input
            style={styles.input}
            type="password"
            placeholder="Confirm Password"
            onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
            required
          />

          <button style={styles.button}>Register</button>
        </form>

        <p style={{marginTop:"10px"}}>
          Already have account?{" "}
          <span style={{color:"#00f2fe", cursor:"pointer"}} onClick={()=>navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a, #06b6d4)"
  },
  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    color: "#fff",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "none"
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontWeight: "bold"
  }
};