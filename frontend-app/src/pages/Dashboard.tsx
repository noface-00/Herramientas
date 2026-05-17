import { useState, useEffect } from "react"

export function Dashboard() {
  const [estadisticas, setEstadisticas] = useState({
    ventasTotales: 0,
    clientesTotales: 0,
    productos: 0,
    categorias: 0
  })

  const fetchDashboard = async () => {
    try {
      const response = await fetch("/api/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
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
          <div className="font-headline-md text-primary-fixed-dim">14,209</div>
          <div className="text-[10px] mt-2 text-on-secondary-fixed-variant">+12.5% vs PREV_CYCLE</div>
        </div>
        {/* Low Stock (Amber Accent) */}
        <div className="ascii-border border-secondary-fixed-dim p-4 bg-surface-container-low glitch-hover">
          <div className="flex justify-between items-start mb-4">
            <span className="font-code-snippet text-[11px] text-secondary-fixed">0x02_LOW_STOCK</span>
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">warning</span>
          </div>
          <div className="font-headline-md text-secondary-fixed">{estadisticas.clientesTotales}</div>
          <div className="text-[10px] mt-2 text-secondary-fixed-dim">REQUIRES_REPLENISHMENT</div>
        </div>
        {/* Daily Sales */}
        <div className="ascii-border p-4 bg-surface-container-low glitch-hover">
          <div className="flex justify-between items-start mb-4">
            <span className="font-code-snippet text-[11px] text-outline">0x03_DAILY_TX</span>
            <span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">trending_up</span>
          </div>
          <div className="font-headline-md text-primary-fixed-dim">{estadisticas.productos}</div>
          <div className="text-[10px] mt-2 text-on-surface-variant">NODE_VOLUME: OPTIMAL</div>
        </div>
        {/* Total Revenue */}
        <div className="ascii-border p-4 bg-surface-container-low glitch-hover">
          <div className="flex justify-between items-start mb-4">
            <span className="font-code-snippet text-[11px] text-outline">0x04_NET_REV</span>
            <span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">payments</span>
          </div>
          <div className="font-headline-md text-primary-fixed-dim">¤ {estadisticas.ventasTotales.toFixed(2)}</div>
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
                <tr className="border-b border-outline-variant hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#FF-0192</td>
                  <td className="p-3">09:41:22</td>
                  <td className="p-3">CYBERDYNE_SYS</td>
                  <td className="p-3 text-right">¤ 4,200.00</td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 border border-primary-fixed-dim text-[10px]">VERIFIED</span></td>
                </tr>
                <tr className="border-b border-outline-variant hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#FF-0191</td>
                  <td className="p-3">09:38:10</td>
                  <td className="p-3">TYRELL_CORP</td>
                  <td className="p-3 text-right">¤ 12,850.50</td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 border border-primary-fixed-dim text-[10px]">VERIFIED</span></td>
                </tr>
                <tr className="border-b border-outline-variant hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#FF-0190</td>
                  <td className="p-3">09:12:45</td>
                  <td className="p-3">RE_WEYLAND</td>
                  <td className="p-3 text-right">¤ 820.00</td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 border border-primary-fixed-dim text-[10px]">VERIFIED</span></td>
                </tr>
                <tr className="border-b border-outline-variant hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#FF-0189</td>
                  <td className="p-3">08:55:01</td>
                  <td className="p-3">ZION_NODE_4</td>
                  <td className="p-3 text-right">¤ 2,150.00</td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 border border-secondary-fixed-dim text-secondary-fixed text-[10px]">PENDING</span></td>
                </tr>
                <tr className="hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#FF-0188</td>
                  <td className="p-3">08:32:19</td>
                  <td className="p-3">WALLACE_INT</td>
                  <td className="p-3 text-right">¤ 5,500.00</td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 border border-primary-fixed-dim text-[10px]">VERIFIED</span></td>
                </tr>
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
            <div className="border-l-2 border-error pl-3">
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-error font-bold">CRITICAL_01</span>
                <span className="text-on-surface-variant">QTY: 02</span>
              </div>
              <div className="text-[13px] font-bold">NEURAL_LINK_MODULE_V4</div>
              <div className="w-full bg-surface-container-highest h-1.5 mt-2 overflow-hidden">
                <div className="bg-error h-full w-[10%]"></div>
              </div>
            </div>
            <div className="border-l-2 border-error pl-3">
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-error font-bold">CRITICAL_02</span>
                <span className="text-on-surface-variant">QTY: 05</span>
              </div>
              <div className="text-[13px] font-bold">HAPTIC_RIG_ACTUATOR</div>
              <div className="w-full bg-surface-container-highest h-1.5 mt-2 overflow-hidden">
                <div className="bg-error h-full w-[25%]"></div>
              </div>
            </div>
            <div className="border-l-2 border-secondary-fixed-dim pl-3">
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-secondary-fixed font-bold">WARNING_03</span>
                <span className="text-on-surface-variant">QTY: 12</span>
              </div>
              <div className="text-[13px] font-bold">CRYPTO_KEY_INJECTOR</div>
              <div className="w-full bg-surface-container-highest h-1.5 mt-2 overflow-hidden">
                <div className="bg-secondary-fixed-dim h-full w-[45%]"></div>
              </div>
            </div>
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
