import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-teal-100">

          <div className="text-center">
            <div className="text-6xl mb-4">Success!</div>

            <h1 className="text-3xl font-bold text-teal-700 mb-2">
              Prescription Sent
            </h1>

            <p className="text-gray-600 mb-8">
              The prescription has successfully been sent to the pharmacy.
            </p>
          </div>

          {/* Patient Info */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Patient Information
            </h2>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p>
                <span className="font-medium">Patient:</span>{" "}
                {data?.patientName}
              </p>

              <p>
                <span className="font-medium">Pharmacy:</span>{" "}
                {data?.pharmacy}
              </p>
            </div>
          </div>

          {/* Medications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Medications Sent
            </h2>

            <div className="bg-teal-50 rounded-xl p-4">
              <ul className="space-y-2">
                {data?.medications?.map((med, index) => (
                    <li key={index} className="text-gray-700">
                    • {med.name} ({med.dosage}) x {med.quantity}
                    </li>
                ))}
                </ul>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;