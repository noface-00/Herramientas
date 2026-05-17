import { useState, useEffect } from "react"
import { NeonCard, NeonButton, NeonHeader, NeonStatusTag, NeonInput } from "../components/NeonProtocol"

interface Cliente {
  id: number
  nombres: string
  apellidos: string
  identificacion: string
  email: string
  telefono: string
}

interface Producto {
  id: number
  nombre: string
  precio: number
  stock: number
}

interface DetalleVenta {
  id: number
  productoId: number
  cantidad: number
  precioUnitario: number
  subtotal: number
  producto?: Producto
}

interface Venta {
  id: number
  clienteId: number
  total: number
  fecha: string
  cliente?: Cliente
  detalles?: DetalleVenta[]
}

export function Ventas() {
  const [ventas, setVentas] = useState<Venta[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [productos, setProductos] = useState<Producto[]>([])
  
  const [nuevaVenta, setNuevaVenta] = useState({ clienteId: "", productoId: "", cantidad: "1" })
  const [mensaje, setMensaje] = useState("")

  useEffect(() => {
    fetchVentas()
    fetchClientes()
    fetchProductos()
  }, [])

  const fetchVentas = async () => {
    try {
      const response = await fetch("/api/ventas", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      if (!response.ok) throw new Error("Error al cargar ventas")
      const data = await response.json()
      if (Array.isArray(data)) setVentas(data)
    } catch (error) {
      setMensaje("Error al cargar ventas")
    }
  }

  const fetchClientes = async () => {
    try {
      const response = await fetch("/api/clientes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      if (!response.ok) throw new Error("Error al cargar clientes")
      const data = await response.json()
      if (Array.isArray(data)) setClientes(data)
    } catch (error) {
      setMensaje("Error al cargar clientes")
    }
  }

  const fetchProductos = async () => {
    try {
      const response = await fetch("/api/productos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      if (!response.ok) throw new Error("Error al cargar productos")
      const data = await response.json()
      if (Array.isArray(data)) setProductos(data)
    } catch (error) {
      setMensaje("Error al cargar productos")
    }
  }

  const handleAgregar = async () => {
    try {
      if (!nuevaVenta.clienteId || !nuevaVenta.productoId || !nuevaVenta.cantidad) {
        setMensaje("Error: Seleccione un cliente, un producto y la cantidad")
        return
      }

      const payload = {
        clienteId: parseInt(nuevaVenta.clienteId),
        detalles: [
          {
            productoId: parseInt(nuevaVenta.productoId),
            cantidad: parseInt(nuevaVenta.cantidad)
          }
        ]
      }

      const response = await fetch("/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Error al procesar solicitud")
      }

      const data = await response.json()
      setVentas([data, ...ventas]) // Poner la venta nueva al principio
      setNuevaVenta({ clienteId: nuevaVenta.clienteId, productoId: "", cantidad: "1" }) // Mantener cliente seleccionado
      setMensaje(`Venta registrada: ID ${data.id}, Total: ¤ ${data.total}`)
      
      // Actualizar el stock del producto localmente para no hacer un refetch completo
      fetchProductos()
    } catch (error) {
      setMensaje(error instanceof Error ? `Error: ${error.message}` : "Error al agregar venta")
    }
  }

  const handleEliminar = async (id: number) => {
    try {
      const response = await fetch(`/api/ventas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      if (!response.ok) throw new Error("Error al eliminar venta")
      setVentas(ventas.filter(v => v.id !== id))
      setMensaje("Venta eliminada y stock restaurado")
      fetchProductos()
    } catch (error) {
      setMensaje("Error al eliminar venta")
    }
  }

  const totalVentas = ventas.reduce((sum, v) => sum + Number(v.total), 0)

  return (
    <div className="bg-surface text-on-surface">
      <NeonHeader
        title="Sales_Ledger"
        subtitle="TRANSACTION_LOG_v2.0 // REVENUE_TRACKING_ACTIVE"
      />

      {mensaje && (
        <div className="ascii-border border-secondary-fixed-dim bg-surface-container-low p-3 mb-6">
          <p className="code-snippet text-[11px] text-secondary-fixed">
            ✓ {mensaje}
          </p>
        </div>
      )}

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

      <NeonCard title="0x04_NEW_TRANSACTION" variant="primary" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="label-sm text-outline uppercase block mb-2">Client</label>
            <select
              value={nuevaVenta.clienteId}
              onChange={e => setNuevaVenta({ ...nuevaVenta, clienteId: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-none px-4 py-2 text-code-snippet text-on-surface focus:ring-0 focus:border-primary-fixed-dim focus:outline-none transition-colors"
            >
              <option value="">SELECT_CLIENT...</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nombres} {c.apellidos}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="label-sm text-outline uppercase block mb-2">Product</label>
            <select
              value={nuevaVenta.productoId}
              onChange={e => setNuevaVenta({ ...nuevaVenta, productoId: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-none px-4 py-2 text-code-snippet text-on-surface focus:ring-0 focus:border-primary-fixed-dim focus:outline-none transition-colors"
            >
              <option value="">SELECT_PRODUCT...</option>
              {productos.map(p => (
                <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                  {p.nombre} (¤{p.precio}) - Stock: {p.stock}
                </option>
              ))}
            </select>
          </div>

          <NeonInput
            label="Quantity"
            type="number"
            min="1"
            value={nuevaVenta.cantidad}
            onChange={e => setNuevaVenta({ ...nuevaVenta, cantidad: e.target.value })}
          />
        </div>

        <NeonButton variant="primary" onClick={handleAgregar}>
          REGISTER_TRANSACTION
        </NeonButton>
      </NeonCard>

      <NeonCard title="0x05_SALES_LEDGER_DATABASE" variant="primary">
        <div className="overflow-x-auto">
          <table className="w-full text-left code-snippet text-[12px]">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-lowest">
                <th className="p-3 text-outline">TX_ID</th>
                <th className="p-3 text-outline">CLIENT</th>
                <th className="p-3 text-outline">PRODUCT (QTY)</th>
                <th className="p-3 text-outline text-right">TOTAL_AMOUNT</th>
                <th className="p-3 text-outline">TIMESTAMP</th>
                <th className="p-3 text-outline text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(venta => (
                <tr key={venta.id} className="border-b border-outline-variant hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#{venta.id}</td>
                  <td className="p-3 text-on-surface font-bold">
                    {venta.cliente ? `${venta.cliente.nombres} ${venta.cliente.apellidos}` : "DESCONOCIDO"}
                  </td>
                  <td className="p-3 text-on-surface-variant">
                    {venta.detalles && venta.detalles.map((d, i) => (
                      <div key={i}>
                        {d.producto?.nombre || `Prod #${d.productoId}`} (x{d.cantidad})
                      </div>
                    ))}
                  </td>
                  <td className="p-3 text-right text-secondary-fixed">¤ {Number(venta.total).toFixed(2)}</td>
                  <td className="p-3 text-on-surface-variant text-[11px]">
                    {venta.fecha ? new Date(venta.fecha).toLocaleString() : ""}
                  </td>
                  <td className="p-3 text-center">
                    <NeonButton variant="danger" size="sm" onClick={() => handleEliminar(venta.id)}>
                      DEL
                    </NeonButton>
                  </td>
                </tr>
              ))}
              {ventas.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-on-surface-variant italic">
                    NO_TRANSACTIONS_FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  )
}
