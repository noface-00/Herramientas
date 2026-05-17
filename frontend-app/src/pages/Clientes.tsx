import { useState, useEffect } from "react"
import { NeonCard, NeonButton, NeonHeader, NeonInput, NeonStatusTag } from "../components/NeonProtocol"

interface Cliente {
  id: number
  nombre: string
  email: string
  rol: string
}

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "", email: "", rol: "cliente" })
  const [editando, setEditando] = useState(false)
  const [clienteParaEditar, setClienteParaEditar] = useState<Cliente | null>(null)
  const [mensaje, setMensaje] = useState("")

  const fetchClientes = async () => {
    try {
      const response = await fetch("/api/clientes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      const data = await response.json()
      setClientes(data)
    } catch (error) {
      setMensaje("Error al cargar clientes")
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  const handleAgregar = async () => {
    try {
      const response = await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ nombre: nuevoCliente.nombre, email: nuevoCliente.email, rol: nuevoCliente.rol })
      })
      const data = await response.json()
      setClientes([...clientes, data])
      setNuevoCliente({ nombre: "", email: "", rol: "cliente" })
      setMensaje(`Cliente agregado: ${data.nombre}`)
    } catch (error) {
      setMensaje("Error al agregar cliente")
    }
  }

  const handleEditar = (cliente: Cliente) => {
    setClienteParaEditar(cliente)
    setEditando(true)
    setNuevoCliente({ nombre: cliente.nombre, email: cliente.email, rol: cliente.rol })
  }

  const handleGuardar = async () => {
    if (!clienteParaEditar) return
    try {
      const response = await fetch(`/api/clientes/${clienteParaEditar.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ nombre: nuevoCliente.nombre, email: nuevoCliente.email, rol: nuevoCliente.rol })
      })
      const data = await response.json()
      setClientes(clientes.map(c => c.id === clienteParaEditar.id ? data : c))
      setEditando(false)
      setMensaje(`Cliente actualizado: ${data.nombre}`)
    } catch (error) {
      setMensaje("Error al actualizar cliente")
    }
  }

  const handleEliminar = async (id: number) => {
    try {
      await fetch(`/api/clientes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      setClientes(clientes.filter(c => c.id !== id))
      setMensaje("Cliente eliminado")
    } catch (error) {
      setMensaje("Error al eliminar cliente")
    }
  }

  return (
    <div className="bg-surface text-on-surface">
      {/* Header */}
      <NeonHeader
        title="Client_Database"
        subtitle="CUSTOMER_REGISTRY_v2.0 // ACTIVE_NODES: MONITORED"
      />

      {/* Message Alert */}
      {mensaje && (
        <div className="ascii-border border-secondary-fixed-dim bg-surface-container-low p-3 mb-6">
          <p className="code-snippet text-[11px] text-secondary-fixed">
            ✓ {mensaje}
          </p>
        </div>
      )}

      {/* Form Card */}
      <NeonCard title={editando ? "0x01_EDIT_CLIENT" : "0x01_NEW_CLIENT"} variant="primary" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <NeonInput
            label="Full_Name"
            placeholder="ENTER_NAME..."
            value={nuevoCliente.nombre}
            onChange={e => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
          />
          <NeonInput
            label="Email_Address"
            type="email"
            placeholder="USER@DOMAIN..."
            value={nuevoCliente.email}
            onChange={e => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
          />
          <div>
            <label className="label-sm text-outline uppercase block mb-2">Access_Level</label>
            <select
              value={nuevoCliente.rol}
              onChange={e => setNuevoCliente({ ...nuevoCliente, rol: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-none px-4 py-2 text-code-snippet text-on-surface focus:ring-0 focus:border-primary-fixed-dim focus:outline-none transition-colors"
            >
              <option value="cliente">CLIENTE</option>
              <option value="admin">ADMIN</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <NeonButton variant="primary" onClick={editando ? handleGuardar : handleAgregar}>
            {editando ? "UPDATE_ENTRY" : "CREATE_CLIENT"}
          </NeonButton>
          {editando && (
            <NeonButton variant="danger" onClick={() => setEditando(false)}>
              CANCEL_EDIT
            </NeonButton>
          )}
        </div>
      </NeonCard>

      {/* Clients Table */}
      <NeonCard title="0x02_CLIENT_DATABASE" variant="success">
        <div className="overflow-x-auto">
          <table className="w-full text-left code-snippet text-[12px]">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-lowest">
                <th className="p-3 text-outline">ID</th>
                <th className="p-3 text-outline">NAME</th>
                <th className="p-3 text-outline">EMAIL</th>
                <th className="p-3 text-outline text-center">ACCESS_LEVEL</th>
                <th className="p-3 text-outline text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id} className="border-b border-outline-variant hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#{cliente.id}</td>
                  <td className="p-3 text-on-surface font-bold">{cliente.nombre}</td>
                  <td className="p-3 text-on-surface-variant">{cliente.email}</td>
                  <td className="p-3 text-center">
                    <NeonStatusTag status={cliente.rol === "admin" ? "critical" : "verified"}>
                      {cliente.rol.toUpperCase()}
                    </NeonStatusTag>
                  </td>
                  <td className="p-3 text-center flex gap-2 justify-center">
                    <NeonButton variant="primary" size="sm" onClick={() => handleEditar(cliente)}>
                      EDIT
                    </NeonButton>
                    <NeonButton variant="danger" size="sm" onClick={() => handleEliminar(cliente.id)}>
                      DEL
                    </NeonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 border-t border-outline-variant code-snippet text-[10px] text-outline">
          TOTAL_CLIENTS: {clientes.length} | DATABASE_STATUS: SYNCHRONIZED
        </div>
      </NeonCard>
    </div>
  )
}
