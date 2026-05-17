import { useState, useEffect } from "react"
import { NeonCard, NeonButton, NeonHeader, NeonStatusTag } from "../components/NeonProtocol"

interface Cliente {
  id: number
  nombre: string
  email: string
  rol: string
}

interface Venta {
  id: number
  clienteId: number
  total: number
  fecha: string
}

export function Ventas() {
  const [ventas, setVentas] = useState<Venta[]>([])
  const [nuevaVenta, setNuevaVenta] = useState({ clienteId: "", total: "" })
  const [cliente, setCliente] = useState<Cliente[]>([])
  const [mensaje, setMensaje] = useState("")

  const fetchVentas = async () => {
    try {
      const response = await fetch("/api/ventas", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      const data = await response.json()
      setVentas(data)
    } catch (error) {
      setMensaje("Error al cargar ventas")
    }
  }

  const fetchClientes = async () => {
    try {
      const response = await fetch("/api/clientes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      const data = await response.json()
      setCliente(data)
    } catch (error) {
      setMensaje("Error al cargar clientes")
    }
  }

  useEffect(() => {
    fetchVentas()
    fetchClientes()
  }, [])

  const handleAgregar = async () => {
    try {
      const response = await fetch("/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ clienteId: parseInt(nuevaVenta.clienteId), total: parseFloat(nuevaVenta.total) })
      })
      const data = await response.json()
      setVentas([...ventas, data])
      setNuevaVenta({ clienteId: "", total: "" })
      setMensaje(`Venta agregado: ID ${data.id}, Total: ${data.total}`)
    } catch (error) {
      setMensaje("Error al agregar venta")
    }
  }

  const handleEliminar = async (id: number) => {
    try {
      await fetch(`/api/ventas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      setVentas(ventas.filter(v => v.id !== id))
      setMensaje("Venta eliminada")
    } catch (error) {
      setMensaje("Error al eliminar venta")
    }
  }

  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0)

  return (
    <div className="bg-surface text-on-surface">
      {/* Header */}
      <NeonHeader
        title="Sales_Ledger"
        subtitle="TRANSACTION_LOG_v2.0 // REVENUE_TRACKING_ACTIVE"
      />

      {/* Message Alert */}
      {mensaje && (
        <div className="ascii-border border-secondary-fixed-dim bg-surface-container-low p-3 mb-6">
          <p className="code-snippet text-[11px] text-secondary-fixed">
            ✓ {mensaje}
          </p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <NeonCard title="0x01_TOTAL_REVENUE" variant="primary">
          <div className="headline-md text-primary-fixed-dim">
            ¤ {totalVentas.toFixed(2)}
          </div>
          <div className="text-[10px] mt-2 text-on-surface-variant">CUMULATIVE_TOTAL</div>
        </NeonCard>

        <NeonCard title="0x02_TRANSACTION_COUNT" variant="success">
          <div className="headline-md text-secondary-fixed">
            {ventas.length}
          </div>
          <div className="text-[10px] mt-2 text-secondary-fixed-dim">TOTAL_TRANSACTIONS</div>
        </NeonCard>

        <NeonCard title="0x03_AVG_TRANSACTION" variant="primary">
          <div className="headline-md text-primary-fixed-dim">
            ¤ {ventas.length > 0 ? (totalVentas / ventas.length).toFixed(2) : "0.00"}
          </div>
          <div className="text-[10px] mt-2 text-on-surface-variant">AVERAGE_VALUE</div>
        </NeonCard>
      </div>

      {/* Form Card */}
      <NeonCard title="0x04_NEW_TRANSACTION" variant="primary" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label-sm text-outline uppercase block mb-2">Client_ID</label>
            <select
              value={nuevaVenta.clienteId}
              onChange={e => setNuevaVenta({ ...nuevaVenta, clienteId: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-none px-4 py-2 text-code-snippet text-on-surface focus:ring-0 focus:border-primary-fixed-dim focus:outline-none transition-colors"
            >
              <option value="">SELECT_CLIENT...</option>
              {cliente.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-sm text-outline uppercase block mb-2">Transaction_Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-fixed-dim">¤</span>
              <input
                type="number"
                placeholder="0.00"
                value={nuevaVenta.total}
                onChange={e => setNuevaVenta({ ...nuevaVenta, total: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-none pl-6 pr-4 py-2 text-code-snippet text-on-surface focus:ring-0 focus:border-primary-fixed-dim focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <NeonButton variant="primary" onClick={handleAgregar}>
          REGISTER_TRANSACTION
        </NeonButton>
      </NeonCard>

      {/* Sales Table */}
      <NeonCard title="0x05_SALES_LEDGER_DATABASE" variant="primary">
        <div className="overflow-x-auto">
          <table className="w-full text-left code-snippet text-[12px]">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-lowest">
                <th className="p-3 text-outline">TX_ID</th>
                <th className="p-3 text-outline">CLIENT_NAME</th>
                <th className="p-3 text-outline text-right">AMOUNT</th>
                <th className="p-3 text-outline">TIMESTAMP</th>
                <th className="p-3 text-outline text-center">STATUS</th>
                <th className="p-3 text-outline text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(venta => (
                <tr key={venta.id} className="border-b border-outline-variant hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#{venta.id}</td>
                  <td className="p-3 text-on-surface font-bold">
                    {cliente.find(c => c.id === venta.clienteId)?.nombre || "DESCONOCIDO"}
                  </td>
                  <td className="p-3 text-right text-secondary-fixed">¤ {venta.total.toFixed(2)}</td>
                  <td className="p-3 text-on-surface-variant text-[11px]">
                    {new Date(venta.fecha).toLocaleDateString()} {new Date(venta.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-3 text-center">
                    <NeonStatusTag status="verified">VERIFIED</NeonStatusTag>
                  </td>
                  <td className="p-3 text-center">
                    <NeonButton variant="danger" size="sm" onClick={() => handleEliminar(venta.id)}>
                      DEL
                    </NeonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 border-t border-outline-variant code-snippet text-[10px] text-outline">
          TOTAL_TRANSACTIONS: {ventas.length} | TOTAL_VOLUME: ¤ {totalVentas.toFixed(2)} | DATABASE_STATUS: SYNCHRONIZED
        </div>
      </NeonCard>
    </div>
  )
}
