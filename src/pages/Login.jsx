import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
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

        <p style={{marginTop:"10px"}}>
          Don't have account?{" "}
          <span style={{color:"#00f2fe", cursor:"pointer"}} onClick={()=>navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}