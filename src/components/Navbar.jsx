import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/lectures', label: 'Lectures' },
  { to: '/notes', label: 'Notes' },
  { to: '/pyq', label: 'PYQ' },
  { to: '/placement', label: 'Placement' },
  { to: '/add-materials', label: 'Add Materials' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/tools', label: 'Imp Tools' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } catch (e) {
      return 'light'
    }
  })
const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 600);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  const navigate = useNavigate()

  // ✅ user fetch
  const user = localStorage.getItem("user")

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [theme])

  // ✅ logout function
  function handleLogout() {
    localStorage.clear()
    navigate("/login")
  }

  function goToAnnouncements() {
    try {
      if (window.location.pathname === '/announcements') {
        const el = document.getElementById('important-announcement')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        setTimeout(() => {
          const e = document.getElementById('important-announcement')
          if (e) e.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 120)
        return
      }
      const previous = window.location.pathname
      navigate('/announcements')
      setTimeout(() => {
        if (window.location.pathname === previous) {
          window.location.href = '/announcements'
        }
      }, 160)
    } catch (err) {
      window.location.href = '/announcements'
    }
  }

  return (
    <header className="navbar">
    <div className="nav-inner container" style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "2px",
  flexWrap: "nowrap",
  maxWidth: "1200px",   // 👈 IMPORTANT
  margin: "0 auto",     // 👈 CENTER
  padding: "0 20px"
}}>

        {/* Logo */}
       <div className="brand" style={{marginRight:"6px"}}>
          <span className="brand-icon">🎓</span>
         <span className="brand-text" style={{display:"flex", gap:"2px"}}>
            <span className="brand-name">OXFORD</span>
            <span className="brand-accent">~HUB</span>
          </span>
        </div>

        {/* Mobile toggle */}
        <button className="nav-toggle" onClick={() => setOpen(!open)}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Links */}
        <nav 
  className={"nav-links" + (open ? ' open' : '')}
  style={{flexShrink: 1,  gap:"12px"}} onClick={() => setOpen(false)}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side Controls */}
   <div style={{
  display:"flex",
  alignItems:"center",
  gap:"14px",
}}>

          {/* Announcement */}
          <button className="nav-notif icon-btn" onClick={goToAnnouncements}>
            🔔
          </button>

          {/* Theme */}
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? "🌙" : "☀️"}
          </button>

          {/* ✅ USER + LOGOUT */}
          {user && (
            <>
             <div style={{
  display:"flex",
  flexDirection:"column",
  lineHeight:"1.1"
}}>
  <span style={{
  fontSize:"11px",
  opacity:0.7,
  color: theme === "dark" ? "#ccc" : "#555"
}}>
  Hi
</span>
 <span style={{
  fontSize:"13px",
  fontWeight:"600",
  color: theme === "dark" ? "#fff" : "#555",
  maxWidth:"80px",
  whiteSpace:"nowrap",
  overflowX:"auto",
  scrollbarWidth:"none"
}}>
  {user?.split(" ")[0]}
</span>
</div>
<button
  onClick={handleLogout}
  style={{
    padding: isMobile ? "0" : "5px 8px",
    fontSize:"14px",
    borderRadius:"8px",
    border:"1px solid rgba(255,255,255,0.2)",
    background:"linear-gradient(135deg,#ff4d4d,#ff6b6b)",
    color:"#fff",
    cursor:"pointer",
    boxShadow:"0 4px 12px rgba(255,77,77,0.4)",
    transition:"0.3s",
    whiteSpace:"nowrap",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  }}
>
  {isMobile ? (
    <span className="material-symbols-outlined">
      logout
    </span>
  ) : "Logout"}
</button>
            </>
          )}

        </div>

      </div>
    </header>
  )
}
