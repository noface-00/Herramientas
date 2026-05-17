const { Producto, Categoria, Cliente, Venta } = require("../models")

exports.getEstadisticas = async (req, res, next) => {
  try {
    const productos = await Producto.count()
    const categorias = await Categoria.count()
    const clientesTotales = await Cliente.count()
    const ventasTotales = await Venta.sum("total") || 0

    res.json({
      productos,
      categorias,
      clientesTotales,
      ventasTotales
    })
  } catch (error) {
    next(error)
  }
}
