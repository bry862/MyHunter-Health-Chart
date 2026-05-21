import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useState } from 'react'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import PatientInfo from './components/PatientInfo.jsx'
import MedicalHistory from './components/MedicalHistory.jsx'
import Settings from './components/Settings.jsx'
import Symptoms from './components/Symptoms.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import About from './components/About.jsx'
import Confirmation from "./components/Confirmation";
export default function App() {
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/patient-info" element={<PatientInfo />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout"element={<Checkout cart={cart} />}/>
        <Route path="/about" element={<About />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

