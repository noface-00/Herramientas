import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';

function Cart() {
  const { cartItems, removeFromCart, isUpdating } = useCart();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = subtotal * 0.16;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Tu carrito está vacío</h1>
        <Link
          to="/productos"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500">Precio: {formatCurrency(item.price)}</p>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-500">
                    x {item.quantity}
                  </p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition flex items-center space-x-1"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Eliminar</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Envío</span>
            <span className="font-semibold text-green-600">{formatCurrency(shipping)}</span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">IVA (16%)</span>
            <span className="font-semibold">{formatCurrency(tax)}</span>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Total</span>
              <span className="text-xl font-bold text-green-600">{formatCurrency(total)}</span>
            </div>
            
            <div className="flex justify-between space-x-4">
              <Link
                to="/productos"
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Seguir Comprando
              </Link>
              
              <button
                disabled={isUpdating}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition flex items-center space-x-2"
              >
                {isUpdating ? (
                  <>Processing...</>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Pagar Ahora</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
