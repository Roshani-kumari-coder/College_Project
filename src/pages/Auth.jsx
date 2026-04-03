import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
const [isForgot, setIsForgot] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

    if (form.password !== form.confirmPassword) {
      alert("Password not match");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(form));
    alert("Registered Successfully");
    setIsLogin(true);
  };
return (

  <div style={styles.container}>
 
<div style={styles.card}>

  {/* 🔥 Dynamic Title */}
  <h1 style={styles.title}>
    {isForgot ? "Reset Password" : isLogin ? "Welcome Back" : "Create Account"}
  </h1>

  <p style={styles.subtitle}>
    {isForgot
      ? "Enter email and new password"
      : isLogin
      ? "Login to continue"
      : "Start your journey with Oxford Hub"}
  </p>


  {/* Tabs (hide in forgot) */}
  {!isForgot && (
    <div style={styles.tabs}>
      <button
        style={isLogin ? styles.activeTab : styles.tab}
        onClick={() => setIsLogin(true)}
      >
        Login
      </button>

      <button
        style={!isLogin ? styles.activeTab : styles.tab}
        onClick={() => setIsLogin(false)}
      >
        Signup
      </button>
    </div>
  )}

  {/* 🔐 FORGOT PASSWORD */}
  {isForgot ? (

    <form onSubmit={(e)=>{
      e.preventDefault();

      const storedUser = JSON.parse(localStorage.getItem("userData"));

      if(storedUser && storedUser.email === form.email){
        const updatedUser = {
          ...storedUser,
          password: form.password
        };

        localStorage.setItem("userData", JSON.stringify(updatedUser));
        alert("Password updated successfully");

        setIsForgot(false);
        setIsLogin(true);
      } else {
        alert("Email not found");
      }
    }}>

      <input
        style={styles.input}
        type="email"
        placeholder="Enter your email"
        onChange={(e)=>setForm({...form,email:e.target.value})}
        required
      />

      <div style={styles.passwordWrapper}>
        <input
          style={styles.input}
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
          required
        />

        <span
          style={styles.eye}
          onClick={()=>setShowPassword(!showPassword)}
        >
          {showPassword ? "visibility_off" : "visibility"}
        </span>
      </div>

      <button
        style={styles.button}
       onMouseOver={(e)=>e.target.style.opacity=0.85}
onMouseOut={(e)=>e.target.style.opacity=1}
      >
        Update Password
      </button>

      <p style={styles.forgot} onClick={()=>setIsForgot(false)}>
        Back to Login
      </p>

    </form>

  ) : isLogin ? (

    /* 🔐 LOGIN */
    <>
      <form onSubmit={handleLogin}>

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
       onFocus={(e)=>e.target.style.border="1px solid #3b82f6"}
onBlur={(e)=>e.target.style.border="1px solid #1e293b"}
          onChange={(e)=>setForm({...form,email:e.target.value})}
          required
        />

        <div style={styles.passwordWrapper}>
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onFocus={(e)=>e.target.style.border="1px solid #2563eb"}
            onBlur={(e)=>e.target.style.border="1px solid #e5e7eb"}
            onChange={(e)=>setForm({...form,password:e.target.value})}
            required
          />

          <span
            style={styles.eye}
            onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </div>

        <button
          style={styles.button}
         onMouseOver={(e)=>e.target.style.textDecoration="underline"}
onMouseOut={(e)=>e.target.style.textDecoration="none"}
        >
          Login
        </button>
      </form>

      <p style={styles.forgot} onClick={()=>setIsForgot(true)}>
        Forgot Password?
      </p>
    </>

  ) : (

    /* 📝 SIGNUP */
    <form onSubmit={handleSignup}>

      <div style={styles.row}>
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
      </div>

      <div style={styles.passwordWrapper}>
        <input
          style={styles.input}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
          required
        />

        <span style={styles.eye} onClick={()=>setShowPassword(!showPassword)}>
          {showPassword ? "visibility_off" : "visibility"}
        </span>
      </div>

      <div style={styles.passwordWrapper}>
        <input
          style={styles.input}
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
          required
        />

        <span style={styles.eye} onClick={()=>setShowConfirm(!showConfirm)}>
          {showConfirm ? "visibility_off" : "visibility"}
        </span>
      </div>

      <button
        style={styles.button}
        onMouseOver={(e)=>e.target.style.opacity=0.85}
        onMouseOut={(e)=>e.target.style.opacity=1}
      >
        Create Account
      </button>

    </form>
  )}

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
    background: "#020617"
  },

  card: {
    width: "480px",
    padding: "35px",
    borderRadius: "20px",
    background: "rgba(15, 23, 42, 0.7)",
    backdropFilter: "blur(25px)",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
    color: "#fff"
  },

  title: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "5px"
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#94a3b8",
    fontSize: "14px"
  },

  tabs: {
    display: "flex",
    marginBottom: "20px",
    background: "#020617",
    borderRadius: "10px",
    padding: "5px",
    border: "1px solid #1e293b"
  },

  tab: {
    flex: 1,
    padding: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#94a3b8",
    borderRadius: "8px",
    transition: "0.2s"
  },

  activeTab: {
    flex: 1,
    padding: "10px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    boxShadow: "0 0 10px rgba(37,99,235,0.5)"
  },

  row: {
    display: "flex",
    gap: "10px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #1e293b",
    background: "#020617",
    color: "#fff",
    outline: "none",
    transition: "0.2s"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
    marginTop: "5px"
  },

  passwordWrapper: {
    position: "relative"
  },

  eye: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontFamily: "Material Symbols Outlined",
    fontSize: "22px",
    color: "#94a3b8"
  },

  forgot: {
    textAlign: "center",
    marginTop: "12px",
    color: "#38bdf8",
    cursor: "pointer",
    fontSize: "14px"
  }
};