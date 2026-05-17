import { useState, useEffect } from "react"
import { NeonCard, NeonButton, NeonHeader, NeonInput } from "../components/NeonProtocol"

interface Categoria {
  id: number
  nombre: string
  descripcion: string
}

export function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: "", descripcion: "" })
  const [editando, setEditando] = useState(false)
  const [categoriaParaEditar, setCategoriaParaEditar] = useState<Categoria | null>(null)
  const [mensaje, setMensaje] = useState("")

  const fetchCategorias = async () => {
    try {
      const response = await fetch("/api/categorias", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      const data = await response.json()
      setCategorias(data)
    } catch (error) {
      setMensaje("Error al cargar categorías")
    }
  }

  useEffect(() => {
    fetchCategorias()
  }, [])

  const handleAgregar = async () => {
    try {
      const response = await fetch("/api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ nombre: nuevaCategoria.nombre, descripcion: nuevaCategoria.descripcion })
      })
      const data = await response.json()
      setCategorias([...categorias, data])
      setNuevaCategoria({ nombre: "", descripcion: "" })
      setMensaje(`Categoría agregado: ${data.nombre}`)
    } catch (error) {
      setMensaje("Error al agregar categoría")
    }
  }

  const handleEditar = (categoria: Categoria) => {
    setCategoriaParaEditar(categoria)
    setEditando(true)
    setNuevaCategoria({ nombre: categoria.nombre, descripcion: categoria.descripcion })
  }

  const handleGuardar = async () => {
    if (!categoriaParaEditar) return
    try {
      const response = await fetch(`/api/categorias/${categoriaParaEditar.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ nombre: nuevaCategoria.nombre, descripcion: nuevaCategoria.descripcion })
      })
      const data = await response.json()
      setCategorias(categorias.map(c => c.id === categoriaParaEditar.id ? data : c))
      setEditando(false)
      setMensaje(`Categoría actualizado: ${data.nombre}`)
    } catch (error) {
      setMensaje("Error al actualizar categoría")
    }
  }

  const handleEliminar = async (id: number) => {
    try {
      await fetch(`/api/categorias/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      setCategorias(categorias.filter(c => c.id !== id))
      setMensaje("Categoría eliminada")
    } catch (error) {
      setMensaje("Error al eliminar categoría")
    }
  }

  return (
    <div className="bg-surface text-on-surface">
      {/* Header */}
      <NeonHeader
        title="Category_Management"
        subtitle="PRODUCT_TAXONOMY_v2.0 // CLASSIFICATION_SYSTEM"
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
      <NeonCard title={editando ? "0x01_EDIT_CATEGORY" : "0x01_NEW_CATEGORY"} variant="primary" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <NeonInput
            label="Category_Name"
            placeholder="ENTER_NAME..."
            value={nuevaCategoria.nombre}
            onChange={e => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
          />
          <NeonInput
            label="Description"
            placeholder="OPTIONAL_DESC..."
            value={nuevaCategoria.descripcion}
            onChange={e => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
          />
        </div>

        <div className="flex gap-3">
          <NeonButton variant="primary" onClick={editando ? handleGuardar : handleAgregar}>
            {editando ? "UPDATE_ENTRY" : "CREATE_CATEGORY"}
          </NeonButton>
          {editando && (
            <NeonButton variant="danger" onClick={() => setEditando(false)}>
              CANCEL_EDIT
            </NeonButton>
          )}
        </div>
      </NeonCard>

      {/* Categories Table */}
      <NeonCard title="0x02_CATEGORY_DATABASE" variant="primary">
        <div className="overflow-x-auto">
          <table className="w-full text-left code-snippet text-[12px]">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-lowest">
                <th className="p-3 text-outline">ID</th>
                <th className="p-3 text-outline">NAME</th>
                <th className="p-3 text-outline">DESCRIPTION</th>
                <th className="p-3 text-outline text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map(categoria => (
                <tr key={categoria.id} className="border-b border-outline-variant hover:bg-primary/5">
                  <td className="p-3 text-primary-fixed-dim">#{categoria.id}</td>
                  <td className="p-3 text-on-surface font-bold">{categoria.nombre}</td>
                  <td className="p-3 text-on-surface-variant text-[11px]">{categoria.descripcion || "N/A"}</td>
                  <td className="p-3 text-center flex gap-2 justify-center">
                    <NeonButton variant="primary" size="sm" onClick={() => handleEditar(categoria)}>
                      EDIT
                    </NeonButton>
                    <NeonButton variant="danger" size="sm" onClick={() => handleEliminar(categoria.id)}>
                      DEL
                    </NeonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 border-t border-outline-variant code-snippet text-[10px] text-outline">
          TOTAL_CATEGORIES: {categorias.length} | DATABASE_STATUS: SYNCHRONIZED
        </div>
      </NeonCard>
    </div>
  )
}
