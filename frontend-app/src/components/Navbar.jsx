import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  
  const cartCount = JSON.parse(localStorage.getItem('cart') || '{}').length;
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            VentasMock
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/productos" className="text-gray-700 hover:text-blue-600">
              Productos
            </Link>
            
            <Link to="/carrito" className="text-gray-700 hover:text-blue-600 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link to="/cuenta" className="text-gray-700 hover:text-blue-600">
              Cuenta
            </Link>
            
            <button
              onClick={() => navigate('/carrito')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Ver Carrito
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
