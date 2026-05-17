import { useState, useEffect } from "react"

export function Dashboard() {
  const [estadisticas, setEstadisticas] = useState({
    ventasTotales: 0,
    clientesTotales: 0,
    productos: 0,
    categorias: 0,
    productosBajoStock: [] as any[],
    ventasRecientes: [] as any[]
  })

  const fetchDashboard = async () => {
    try {
      const response = await fetch("/api/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      if (!response.ok) {
        console.log("Endpoint de dashboard no disponible o error de auth");
        return;
      }
      const data = await response.json()
      setEstadisticas(data)
    } catch (error) {
      console.log("Error cargando dashboard")
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className="bg-surface text-on-surface">
      {/* Header Section */}
      <div className="mb-8 border-l-4 border-primary-fixed-dim pl-4">
        <h1 className="font-headline-lg text-headline-lg text-primary uppercase">System_Dashboard_v2</h1>
        <p className="font-code-snippet text-on-surface-variant">Last Kernel Update: 2024.10.27 // 09:42:11 UTC<span className="terminal-cursor"></span></p>
      </div>
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Products */}
        <div className="ascii-border p-4 bg-surface-container-low glitch-hover">
          <div className="flex justify-between items-start mb-4">
            <span className="font-code-snippet text-[11px] text-outline">0x01_TOTAL_PROD</span>
            <span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">inventory_2</span>
          </div>
          <div className="font-headline-md text-primary-fixed-dim">{estadisticas.productos}</div>
          <div className="text-[10px] mt-2 text-on-secondary-fixed-variant">+12.5% vs PREV_CYCLE</div>
        </div>
        {/* Total Clients */}
        <div className="ascii-border border-secondary-fixed-dim p-4 bg-surface-container-low glitch-hover">
          <div className="flex justify-between items-start mb-4">
            <span className="font-code-snippet text-[11px] text-secondary-fixed">0x02_TOTAL_CLIENTS</span>
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">groups</span>
          </div>
          <div className="font-headline-md text-secondary-fixed">{estadisticas.clientesTotales}</div>
          <div className="text-[10px] mt-2 text-secondary-fixed-dim">ACTIVE_PROFILES</div>
        </div>
        {/* Total Categories */}
        <div className="ascii-border p-4 bg-surface-container-low glitch-hover">
          <div className="flex justify-between items-start mb-4">
            <span className="font-code-snippet text-[11px] text-outline">0x03_CATEGORIES</span>
            <span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">category</span>
          </div>
          <div className="font-headline-md text-primary-fixed-dim">{estadisticas.categorias}</div>
          <div className="text-[10px] mt-2 text-on-surface-variant">NODE_VOLUME: OPTIMAL</div>
        </div>
        {/* Total Revenue */}
        <div className="ascii-border p-4 bg-surface-container-low glitch-hover">
          <div className="flex justify-between items-start mb-4">
            <span className="font-code-snippet text-[11px] text-outline">0x04_NET_REV</span>
            <span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">payments</span>
          </div>
          <div className="font-headline-md text-primary-fixed-dim">¤ {Number(estadisticas.ventasTotales || 0).toFixed(2)}</div>
          <div className="text-[10px] mt-2 text-primary-fixed-dim tracking-widest">[████████░░░░] 65%</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales Table */}
        <div className="lg:col-span-2 ascii-border bg-surface-container-low">
          <div className="border-b border-outline-variant p-3 flex justify-between items-center bg-surface-container">
            <span className="font-code-snippet text-[12px] uppercase text-primary">Recent_Sales_Ledger</span>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-primary-fixed-dim/20"></span>
              <span className="w-3 h-3 bg-primary-fixed-dim/40"></span>
              <span className="w-3 h-3 bg-primary-fixed-dim"></span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-code-snippet text-[12px]">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-lowest">
                  <th className="p-3 text-outline">TX_ID</th>
                  <th className="p-3 text-outline">TIMESTAMP</th>
                  <th className="p-3 text-outline">CLIENT_HANDLE</th>
                  <th className="p-3 text-outline text-right">CREDITS</th>
                  <th className="p-3 text-outline text-center">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {estadisticas.ventasRecientes && estadisticas.ventasRecientes.map((venta, i) => (
                  <tr key={venta.id || i} className="border-b border-outline-variant hover:bg-primary/5">
                    <td className="p-3 text-primary-fixed-dim">#{venta.id}</td>
                    <td className="p-3">{new Date(venta.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="p-3">{venta.cliente ? `${venta.cliente.nombres} ${venta.cliente.apellidos}` : 'DESCONOCIDO'}</td>
                    <td className="p-3 text-right">¤ {Number(venta.total).toFixed(2)}</td>
                    <td className="p-3 text-center"><span className="px-2 py-0.5 border border-primary-fixed-dim text-[10px]">VERIFIED</span></td>
                  </tr>
                ))}
                {(!estadisticas.ventasRecientes || estadisticas.ventasRecientes.length === 0) && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-on-surface-variant italic text-[11px]">NO_RECENT_TRANSACTIONS</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Critical Stock Alerts */}
        <div className="ascii-border bg-surface-container-low">
          <div className="border-b border-outline-variant p-3 flex justify-between items-center bg-surface-container">
            <span className="font-code-snippet text-[12px] uppercase text-error">Critical_Stock_Alerts</span>
            <span className="material-symbols-outlined text-error text-[18px]">emergency_home</span>
          </div>
          <div className="p-4 space-y-4">
            {estadisticas.productosBajoStock && estadisticas.productosBajoStock.map((prod, i) => (
              <div key={prod.id || i} className={`border-l-2 ${prod.stock === 0 ? 'border-error' : 'border-secondary-fixed-dim'} pl-3`}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className={`${prod.stock === 0 ? 'text-error' : 'text-secondary-fixed'} font-bold`}>
                    {prod.stock === 0 ? 'CRITICAL' : 'WARNING'}
                  </span>
                  <span className="text-on-surface-variant">QTY: {prod.stock.toString().padStart(2, '0')}</span>
                </div>
                <div className="text-[13px] font-bold uppercase">{prod.nombre}</div>
                <div className="w-full bg-surface-container-highest h-1.5 mt-2 overflow-hidden">
                  <div className={`${prod.stock === 0 ? 'bg-error' : 'bg-secondary-fixed-dim'} h-full transition-all`} style={{ width: `${Math.min(Math.max(prod.stock * 10, 5), 100)}%` }}></div>
                </div>
              </div>
            ))}
            {(!estadisticas.productosBajoStock || estadisticas.productosBajoStock.length === 0) && (
              <div className="text-center text-on-surface-variant italic p-4 text-[11px]">ALL_SYSTEMS_OPTIMAL<br/>NO_STOCK_ALERTS</div>
            )}
            <button className="w-full mt-4 py-2 text-center text-[11px] border border-outline-variant hover:bg-outline-variant transition-colors text-on-surface-variant">
              GENERATE_REQUISITION_ORDER
            </button>
          </div>
        </div>
      </div>
      
      {/* System Logs Footer */}
      <div className="mt-8 ascii-border p-4 bg-surface-container-lowest font-code-snippet text-[10px] text-outline flex items-center gap-4">
        <span className="text-primary-fixed-dim animate-pulse">● SYS_READY</span>
        <span className="hidden md:inline">| NODE: ORBITAL_STATION_ALPHA</span>
        <span className="hidden md:inline">| LATENCY: 14MS</span>
        <span className="hidden md:inline">| LOAD: 12.4%</span>
        <span className="ml-auto">ENCRYPTION: AES-256-GCM [ACTIVE]</span>
      </div>
    </div>
  )
}
