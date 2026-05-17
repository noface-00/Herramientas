import { useState, useEffect } from "react"
import { NeonCard, NeonButton, NeonHeader, NeonInput, NeonStatusTag } from "../components/NeonProtocol"

interface Cliente {
  id: number
  identificacion: string
  nombres: string
  apellidos: string
  email: string
  telefono: string
  direccion: string
}

const estadoInicial = { identificacion: "", nombres: "", apellidos: "", email: "", telefono: "", direccion: "" }

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [nuevoCliente, setNuevoCliente] = useState(estadoInicial)
  const [editando, setEditando] = useState(false)
  const [clienteParaEditar, setClienteParaEditar] = useState<Cliente | null>(null)
  const [mensaje, setMensaje] = useState("")

  const fetchClientes = async () => {
    try {
      const response = await fetch("/api/clientes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      if (!response.ok) throw new Error("Error en petición");
      const data = await response.json()
      if (Array.isArray(data)) {
        setClientes(data)
      }
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
        body: JSON.stringify(nuevoCliente)
      })
      if (!response.ok) throw new Error("Error al procesar solicitud");
      const data = await response.json()
      setClientes([...clientes, data])
      setNuevoCliente(estadoInicial)
      setMensaje(`Cliente agregado: ${data.nombres}`)
    } catch (error) {
      setMensaje("Error al agregar cliente. Revisa los datos.")
    }
  }

  const handleEditar = (cliente: Cliente) => {
    setClienteParaEditar(cliente)
    setEditando(true)
    setNuevoCliente({ 
      identificacion: cliente.identificacion || "", 
      nombres: cliente.nombres || "", 
      apellidos: cliente.apellidos || "", 
      email: cliente.email || "", 
      telefono: cliente.telefono || "", 
      direccion: cliente.direccion || "" 
    })
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
        body: JSON.stringify(nuevoCliente)
      })
      if (!response.ok) throw new Error("Error al procesar solicitud");
      const data = await response.json()
      setClientes(clientes.map(c => c.id === clienteParaEditar.id ? data : c))
      setEditando(false)
      setMensaje(`Cliente actualizado: ${data.nombres}`)
    } catch (error) {
      setMensaje("Error al actualizar cliente. Revisa los datos.")
    }
  }

  const handleEliminar = async (id: number) => {
    try {
      const response = await fetch(`/api/clientes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      if (!response.ok) throw new Error("Error al procesar solicitud");
      setClientes(clientes.filter(c => c.id !== id))
      setMensaje("Cliente eliminado")
    } catch (error) {
      setMensaje("Error al eliminar cliente")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNuevoCliente({ ...nuevoCliente, [name]: value })
  }

  return (
    <div className="bg-surface text-on-surface">
      <NeonHeader
        title="Client_Database"
        subtitle="CUSTOMER_REGISTRY_v2.0 // ACTIVE_NODES: MONITORED"
      />

      {mensaje && (
        <div className="ascii-border border-secondary-fixed-dim bg-surface-container-low p-3 mb-6">
          <p className="code-snippet text-[11px] text-secondary-fixed">
            ✓ {mensaje}
          </p>
        </div>
      )}

      <NeonCard title={editando ? "0x01_EDIT_CLIENT" : "0x01_NEW_CLIENT"} variant="primary" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <NeonInput
            label="Identificación"
            name="identificacion"
            placeholder="DNI/RUC..."
            value={nuevoCliente.identificacion}
            onChange={handleChange}
          />
          <NeonInput
            label="Nombres"
            name="nombres"
            placeholder="Nombres..."
            value={nuevoCliente.nombres}
            onChange={handleChange}
          />
          <NeonInput
            label="Apellidos"
            name="apellidos"
            placeholder="Apellidos..."
            value={nuevoCliente.apellidos}
            onChange={handleChange}
          />
          <NeonInput
            label="Email"
            name="email"
            type="email"
            placeholder="USER@DOMAIN..."
            value={nuevoCliente.email}
            onChange={handleChange}
          />
          <NeonInput
            label="Teléfono"
            name="telefono"
            placeholder="Teléfono..."
            value={nuevoCliente.telefono}
            onChange={handleChange}
          />
          <NeonInput
            label="Dirección"
            name="direccion"
            placeholder="Dirección..."
            value={nuevoCliente.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3 mt-4">
          <NeonButton variant="primary" onClick={editando ? handleGuardar : handleAgregar}>
            {editando ? "UPDATE_ENTRY" : "CREATE_CLIENT"}
          </NeonButton>
          {editando && (
            <NeonButton variant="danger" onClick={() => {
              setEditando(false)
              setNuevoCliente(estadoInicial)
            }}>
              CANCEL_EDIT
            </NeonButton>
          )}
        </div>
      </NeonCard>

      <NeonCard title="0x02_CLIENT_DATABASE" variant="success">
        <div className="overflow-x-auto">
          <table className="w-full text-left code-snippet text-[12px]">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-lowest">
                <th className="p-3 text-outline">ID</th>
                <th className="p-3 text-outline">IDENTIFICACIÓN</th>
                <th className="p-3 text-outline">NOMBRES</th>
                <th className="p-3 text-outline">EMAIL</th>
                <th className="p-3 text-outline">TELÉFONO</th>
                <th className="p-3 text-outline text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id} className="border-b border-outline-variant hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#{cliente.id}</td>
                  <td className="p-3 text-on-surface-variant font-bold">{cliente.identificacion}</td>
                  <td className="p-3 text-on-surface font-bold">{cliente.nombres} {cliente.apellidos}</td>
                  <td className="p-3 text-on-surface-variant">{cliente.email}</td>
                  <td className="p-3 text-on-surface-variant">{cliente.telefono}</td>
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
