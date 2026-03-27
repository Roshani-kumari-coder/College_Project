import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
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

  // ✅ login save
  localStorage.setItem("isLoggedIn", "true");

  navigate("/");
};

  return (
    <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"linear-gradient(to right,#4facfe,#00f2fe)"}}>
      
      <form onSubmit={handleSubmit} style={{background:"#fff",padding:"30px",borderRadius:"10px",width:"320px"}}>
        
        <h2>Login</h2>

        <input placeholder="Name" required onChange={(e)=>setForm({...form,name:e.target.value})} /><br/><br/>
        <input type="email" placeholder="Email" required onChange={(e)=>setForm({...form,email:e.target.value})} /><br/><br/>
        <input type="password" placeholder="Password" required onChange={(e)=>setForm({...form,password:e.target.value})} /><br/><br/>
        <input type="password" placeholder="Confirm Password" required onChange={(e)=>setForm({...form,confirmPassword:e.target.value})} /><br/><br/>

        <button style={{width:"100%",padding:"10px",background:"#4facfe",color:"#fff",border:"none"}}>Login</button>
      </form>
    </div>
  );
}