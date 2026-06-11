import { useState, useEffect } from "react"
import { Outlet, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function Layout() {
  const { logout } = useAuth()
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark")

  useEffect(() => {
    document.documentElement.classList.remove("theme-dark", "theme-light")
    document.documentElement.classList.add(theme === "dark" ? "theme-dark" : "theme-light")
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark")
  }

  return (
    <div className="font-body-md overflow-x-hidden text-on-surface">
      {/* TopNavBar */}
      <header className="h-[64px] w-full sticky top-0 z-50 bg-surface flex justify-between items-center px-6 border-b border-outline-variant shadow-[0_0_10px_rgba(0,219,231,0.2)]">
        <div className="flex items-center gap-4">
          <span className="font-headline-md text-headline-md text-primary-container tracking-tighter">NEON_PROTOCOL_V2.0</span>
          <div className="hidden md:flex gap-4">
            <span className="text-primary-container font-bold px-3 py-1 cursor-default">SYSTEM_STATUS: ACTIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-fixed-dim">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
            </span>
            <input className="bg-surface-container-low border border-outline-variant rounded-none pl-10 pr-4 py-1 text-code-snippet focus:ring-0 focus:border-primary-fixed-dim w-64" placeholder="EXECUTE_QUERY..." type="text" />
          </div>
          <div className="flex gap-4 items-center">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="text-on-surface-variant hover:bg-primary/10 hover:text-primary-fixed-dim p-2 transition-all duration-100 active:opacity-50"
              title={theme === "dark" ? "Switch to Light Protocol" : "Switch to Dark Protocol"}
            >
              <span className="material-symbols-outlined">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button className="text-on-surface-variant hover:bg-primary/10 hover:text-primary-fixed-dim p-2 transition-all duration-100 active:opacity-50">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:bg-primary/10 hover:text-primary-fixed-dim p-2 transition-all duration-100 active:opacity-50">
              <span className="material-symbols-outlined">terminal</span>
            </button>
            <button onClick={logout} className="text-on-surface-variant hover:bg-primary/10 hover:text-primary-fixed-dim p-2 transition-all duration-100 active:opacity-50">
              <span className="material-symbols-outlined">power_settings_new</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* SideNavBar */}
        <aside className="fixed left-0 top-0 h-full w-[260px] z-40 bg-surface-container-lowest border-r border-outline-variant flex flex-col pt-[64px]">
          <div className="p-6 border-b border-outline-variant mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-secondary-fixed-dim p-0.5">
                <img alt="Admin" className="w-full h-full grayscale brightness-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_2qmbQPiRsbqfUICiciFnDf0x5xkITPD-UrrfaezJIcuoM6DqXqyZwg3Jb3-xcLqCOEOtQXlegHYt38MAFOfjVGxNJzfJAk8xTdfI-K3NUgWCdYjh7H46d3I83wQsMSlc3WoFCuCCaKU-2ifMk3obdtF5D_aGIh-VljcO2wQvGDfPyE5sz6NGoF8nbW856ngtqIFtYPR1z8J010OnBUaE86adW-CZxELva1TRNmMSKN-WUpQDVNes5AlDpg8iB4h_fCP0nsR8yTc" />
              </div>
              <div>
                <div className="font-headline-sm text-[16px] text-secondary-fixed leading-none">ROOT_USER</div>
                <div className="font-code-snippet text-[10px] text-on-surface-variant mt-1">Level 7 Clearance</div>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-2 font-code-snippet text-code-snippet">
            <Link to="/" className="bg-secondary-container text-on-secondary-container border-l-4 border-secondary-fixed-dim px-4 py-2 flex items-center gap-3 hover:translate-x-1 transition-transform duration-150">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
              Dashboard
            </Link>
            <Link to="/productos" className="text-on-surface-variant px-4 py-2 flex items-center gap-3 hover:bg-secondary/20 hover:text-secondary-fixed transition-all duration-100 hover:translate-x-1 transition-transform duration-150">
              <span className="material-symbols-outlined">inventory_2</span>
              Products
            </Link>
            <Link to="/categorias" className="text-on-surface-variant px-4 py-2 flex items-center gap-3 hover:bg-secondary/20 hover:text-secondary-fixed transition-all duration-100 hover:translate-x-1 transition-transform duration-150">
              <span className="material-symbols-outlined">category</span>
              Categories
            </Link>
            <Link to="/clientes" className="text-on-surface-variant px-4 py-2 flex items-center gap-3 hover:bg-secondary/20 hover:text-secondary-fixed transition-all duration-100 hover:translate-x-1 transition-transform duration-150">
              <span className="material-symbols-outlined">groups</span>
              Clients
            </Link>
            <Link to="/ventas" className="text-on-surface-variant px-4 py-2 flex items-center gap-3 hover:bg-secondary/20 hover:text-secondary-fixed transition-all duration-100 hover:translate-x-1 transition-transform duration-150">
              <span className="material-symbols-outlined">payments</span>
              Sales
            </Link>
            <Link to="/reportes" className="text-on-surface-variant px-4 py-2 flex items-center gap-3 hover:bg-secondary/20 hover:text-secondary-fixed transition-all duration-100 hover:translate-x-1 transition-transform duration-150">
              <span className="material-symbols-outlined">analytics</span>
              Reports
            </Link>
            <Link to="/configuracion" className="text-on-surface-variant px-4 py-2 flex items-center gap-3 hover:bg-secondary/20 hover:text-secondary-fixed transition-all duration-100 hover:translate-x-1 transition-transform duration-150">
              <span className="material-symbols-outlined">settings</span>
              Configuration
            </Link>
          </nav>
          <div className="p-4 border-t border-outline-variant">
            <button className="w-full border border-secondary-fixed-dim text-secondary-fixed py-2 font-code-snippet text-[12px] flex items-center justify-center gap-2 hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors">
              <span className="material-symbols-outlined text-[16px]">add</span>
              NEW_ENTRY
            </button>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="ml-[260px] flex-1 p-6 min-h-screen bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  )
}