import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

function Cart({ cart, setCart }) {
  const navigate = useNavigate()

  
  const medications = [
    { id: 1, name: "Amoxicillin", dosage: "500mg", price: 12.99 },
    { id: 2, name: "Erythromycin", dosage: "250mg", price: 14.55 },
    { id: 3, name: "Prednisone", dosage: "20mg", price: 15.0 },
    { id: 4, name: "Albuterol Inhaler", dosage: "90mcg", price: 25.0 },
    { id: 5, name: "Z-Pac (Azithromycin)", dosage: "250mg", price: 18.0 },
    { id: 6, name: "Augmentin", dosage: "875mg", price: 22.0 }
  ]


  function addToCart(med) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === med.id)

      if (existing) {
        return prev.map((item) =>
          item.id === med.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...med, quantity: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }


  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center px-6 py-16">

        
        <h1 className="text-4xl font-bold mb-6">
          Select Medications
        </h1>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {medications.map((med) => (
            <div key={med.id} className="bg-white border p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{med.name}</h3>
                <p className="text-sm text-gray-500">{med.dosage}</p>
                <p className="text-sm">${med.price}</p>
              </div>

              <button
                onClick={() => addToCart(med)}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {/* CART SECTION */}
        <h2 className="text-3xl font-bold mb-4">
          Your Medications:
        </h2>

        <div className="w-full max-w-4xl bg-white rounded-xl border p-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">
              No medications selected
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p>${(item.price * item.quantity).toFixed(2)}</p>
                 <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
  </button>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        <div className="w-full max-w-4xl flex justify-end mt-6">
          <div className="bg-white border p-4 rounded-xl w-64">
            <p className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </p>

            <button
              onClick={() => navigate('/checkout')}
              className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Cart