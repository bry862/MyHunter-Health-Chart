import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Checkout({cart}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    dob: "",
    insurance: "",
    pharmacy: "",
    notes: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    navigate("/confirmation", {
      state: {
        patientName: formData.patientName,
        pharmacy: formData.pharmacy,
        medications: cart
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">
          Confirm Patient Information
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
        >
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

          <select
            name="insurance"
            value={formData.insurance}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          >
            <option value="">Select Insurance</option>
            <option value="Orange Apple Insurance"> Orange Apple Insurance </option>
            <option value="Blue Grass One"> Blue Grass One </option>
            <option value="PinkTree Health"> PinkTree Health </option>
            <option value="Yellow Pond Health Insurance"> Yellow Pond Health Insurance </option>
          </select>

          <select
            name="pharmacy"
            value={formData.pharmacy}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          >
            <option value="">Select Pharmacy</option>
            <option value="Red Sun Pharmacy">  Red Sun Pharmacy </option>
            <option value="Water Street Health"> Water Street Health </option>
            <option value="Naruto Inc."> Naruto Inc. </option>
            <option value="Purple Duck Pharmaceuticals"> Purple Duck Pharmaceuticals </option>
          </select>

          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition"
          >
            Confirm Checkout
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;