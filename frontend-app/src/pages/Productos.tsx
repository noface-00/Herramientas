import { useState, useEffect } from 'react'
import { NeonCard, NeonButton, NeonHeader, NeonInput, NeonStatusTag } from '../components/NeonProtocol'

// Definición de tipos
interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoriaId: number
}

interface Categoria {
  id: number
  nombre: string
}

export function Productos() {
  const accessToken = localStorage.getItem('accessToken');

  // Estado con definiciones explícitas
  const [productos, setProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: ''
  })
  const [editando, setEditando] = useState(false)
  const [productoParaEditar, setProductoParaEditar] = useState<Producto | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  // Cargar datos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/api/productos', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        if (!response.ok) throw new Error("Error fetching productos");
        const data = await response.json()
        if (Array.isArray(data)) setProductos(data)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      }
    }

    const fetchCategorias = async () => {
      try {
        const response = await fetch('/api/categorias', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        if (!response.ok) throw new Error("Error fetching categorias");
        const data = await response.json()
        if (Array.isArray(data)) setCategorias(data)
      } catch (error) {
        console.error('Error al cargar categorías:', error)
      }
    }

    fetchProductos()
    fetchCategorias()
  }, [accessToken])

  // Manipulación de formulario
  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)

    try {
      const url = editando
        ? `/api/productos/${productoParaEditar?.id}`
        : '/api/productos'

      const method = editando ? 'PUT' : 'POST'

      const payload = {
        nombre: formulario.nombre,
        descripcion: formulario.descripcion,
        precio: parseFloat(formulario.precio),
        stock: parseInt(formulario.stock) || 0,
        categoriaId: formulario.categoriaId ? parseInt(formulario.categoriaId) : null
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error('Error al guardar')

      const saved = await response.json()

      if (editando) {
        setProductos([...productos, saved])
      } else {
        setProductos(prev => [...prev, saved])
      }

      setFormulario({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoriaId: ''
      })
      setFormulario(formulario)
      setEditando(false)
      setMensaje(editando ? 'Producto actualizado' : 'Producto creado')

      // Reset form (correcto y seguro)
      setProductoParaEditar(null)
    } catch (error) {
      console.error('Error al guardar producto:', error)
    } finally {
      setCargando(false)
    }
  }

  // Manejar eliminación
  const handleEliminar = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return

    try {
      await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      setProductos(prev =>
        prev.filter(producto => producto.id !== id)
      )
      setMensaje('Producto eliminado')
    } catch (error) {
      console.error('Error al eliminar producto:', error)
    }
  }

  // Manejar editar
  const handleEditar = (producto: Producto) => {
    setProductoParaEditar(producto)
    setEditando(true)
    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      stock: producto.stock.toString(),
      categoriaId: producto.categoriaId.toString()
    })
  }

  // Resetear formulario
  const handleReset = () => {
    setFormulario({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoriaId: ''
    })
    setEditando(false)
    setProductoParaEditar(null)
    setMensaje('')
  }

  // Guardar cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleGuardar(e)
  }

  return (
    <NeonCard>
      <NeonHeader
        title="Gestión de Productos"
        actions={
          <>
            <NeonButton
              key="btn-nuevo"
              variant="primary"
              onClick={() => handleReset()}
              disabled={cargando}
            >
              {editando ? 'Actualizar' : 'Nuevo'}
            </NeonButton>
            <NeonButton
              key="btn-reiniciar"
              variant="secondary"
              onClick={() => handleReset()}
              disabled={cargando}
            >
              Reiniciar
            </NeonButton>
          </>
        }
      />

      <form onSubmit={handleSubmit} className="p-8 bg-card-surface rounded-lg border border-outline-variant code-snippet">
        <NeonInput
          label="Nombre"
          value={formulario.nombre}
          onChange={(e) => {
            setFormulario({ ...formulario, nombre: e.target.value })
          }}
          required
          disabled={editando}
        />

        <NeonInput
          label="Descripción"
          value={formulario.descripcion}
          onChange={(e) => {
            setFormulario({ ...formulario, descripcion: e.target.value })
          }}
          disabled={editando}
        />

        <div className="p-2.5 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <NeonInput
            label="Precio"
            value={formulario.precio}
            onChange={(e) => {
              setFormulario({ ...formulario, precio: e.target.value })
            }}
            type="number"
            step="0.01"
            disabled={editando}
          />

          <NeonInput
            label="Stock"
            value={formulario.stock}
            onChange={(e) => {
              setFormulario({ ...formulario, stock: e.target.value })
            }}
            type="number"
            min="0"
            disabled={editando}
          />

          <div>
            <label className="label-sm text-outline uppercase block mb-2">Categoría</label>
            <select
              value={formulario.categoriaId}
              onChange={(e) => {
                setFormulario({ ...formulario, categoriaId: e.target.value })
              }}
              disabled={editando}
              className="w-full bg-surface-container-low border border-outline-variant rounded-none px-4 py-2 text-code-snippet text-on-surface focus:ring-0 focus:border-primary-fixed-dim focus:outline-none transition-colors disabled:opacity-50"
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <NeonButton
          type="submit"
          variant="primary"
          size="lg"
          onClick={(e) => (e as React.MouseEvent<HTMLButtonElement>).preventDefault()}
          disabled={editando || cargando}
        >
          Guardar
        </NeonButton>
      </form>

      {/* Tabla de Productos */}
      <div className="overflow-x-auto border border-outline-variant code-snippet mt-6">
        <table className="w-full">
          <thead className="bg-primary-fixed text-on-primary font-semibold">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Producto</th>
              <th className="p-3">Descripción</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productos) && productos.map((producto, index) => (
              <tr key={producto.id} className="border-b border-outline-variant">
                <td className="p-3 text-on-secondary">{index + 1}</td>
                <td className="p-3">
                  <span className="code-snippet font-medium text-inherit">
                    {producto.nombre}
                  </span>
                </td>
                <td className="p-3">
                  <div className="break-words whitespace-pre-wrap">
                    <span className="code-snippet text-on-secondary block">
                      {producto.descripcion}
                    </span>
                  </div>
                </td>
                <td className="p-3 code-snippet text-on-secondary">
                  ${producto.precio || 0}
                </td>
                <td className="p-3 code-snippet text-on-secondary">
                  {producto.stock}
                </td>
                <td className="p-3">
                  {productos.some((p) => p.id === producto.id && p.categoriaId === producto.categoriaId) && (
                    <div className="code-snippet">
                      <span className="code-snippet text-on-secondary inline-block mr-2">
                        {categorias.find((c) => c.id === producto.categoriaId)?.nombre || 'N/A'}
                      </span>
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <NeonStatusTag
                    status={producto.stock > 10 ? 'verified' : 'warning'}
                  >
                    {producto.stock > 10 ? 'AVAILABLE' : 'LOW_STOCK'}
                  </NeonStatusTag>
                </td>
                <td className="p-3 flex gap-2">
                  <NeonButton
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEditar(producto)}
                  >
                    Editar
                  </NeonButton>
                  <NeonButton
                    variant="danger"
                    size="sm"
                    onClick={() => handleEliminar(producto.id)}
                  >
                    Eliminar
                  </NeonButton>
                </td>
              </tr>
            ))}
            {Array.isArray(productos) && productos.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center code-snippet text-on-secondary code-snippet italic">
                  No hay productos registrados. Crea uno nuevo o actualiza.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mensaje */}
      {mensaje && (
        <div className="p-4 bg-success-fixed text-white rounded-lg border border-success-variant code-snippet">
          <span className="text-white">{mensaje}</span>
        </div>
      )}

      <div className="p-6 text-center code-snippet">
        <span className="text-on-secondary">Total de productos registrados: {Array.isArray(productos) ? productos.length : 0}</span>
      </div>
    </NeonCard>
  )
}