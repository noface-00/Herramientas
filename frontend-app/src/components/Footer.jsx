function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VentasMock</h3>
            <p className="text-gray-400">
              Sistema de ventas mock para demostración y pruebas.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/productos" className="hover:text-white transition">
                  Productos
                </a>
              </li>
              <li>
                <a href="/carrito" className="hover:text-white transition">
                  Carrito
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contacto@ventasmock.com</li>
              <li>Tel: +52 555 123 4567</li>
              <li>WhatsApp: +52 555 789 0123</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} VentasMock. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
