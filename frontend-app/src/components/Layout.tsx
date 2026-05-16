import { Outlet, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function Layout() {
  const { user, logout } = useAuth()

  return (
    <div>
      <header style={{ padding: 15, background: "#f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <nav style={{ display: "flex", gap: 20 }}>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/clientes">Clientes</Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <span>Hola, <strong>{user?.email}</strong> ({user?.rol})</span>
          <button onClick={logout} style={{ padding: "5px 10px" }}>
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  )
}