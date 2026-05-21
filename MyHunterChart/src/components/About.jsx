import Navbar from './Navbar'
import mariamaImg from "../assets/mariama.jpeg";
import dixonImg from "../assets/dixon.jpeg";
import andrewImg from "../assets/andrew.jpeg";
function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center px-6 py-16">

        {/* INSPO */}
        <div className="w-full max-w-4xl text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Creating Hunter HealthChart, a Unique Health App
          </h1>

          <p className="text-gray-600 text-lg">
            A modern healthcare platform designed to simplify patient care,
            medication management, and prescription tracking through a special digital experience.
          </p>
        </div>

        {/* FRONT END */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-2xl font-bold text-teal-600 mb-6 border-b pb-2">
            Front End Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-xl p-6 shadow-sm">
                <img
                    src={mariamaImg}
                    alt="Mariama"
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-teal-500"
                />
                <h3 className="text-xl font-semibold text-gray-900">Mariama</h3>
              <p className="text-gray-500 mt-2">
                Responsible for UI design, user experience flow, and frontend component structure. Implemented Cart, Checkout and About us Pages
              </p>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm">
                <img
                src={dixonImg}
                alt="Dixon"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-teal-500"
                />
              <h3 className="text-xl font-semibold text-gray-900">Dixon</h3>
              <p className="text-gray-500 mt-2">
                Part of the frontend team, worked on home page, registration, login, patient info, medical history and NavBar. Loves Karaoke.
              </p>
            </div>
          </div>
        </div>

        {/* BACK END */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-teal-600 mb-6 border-b pb-2">
            Back End Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Brayhan</h3>
              <p className="text-gray-500 mt-2">
               Created mockups for user interfaces
              </p>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm">
                <img
                src={andrewImg}
                alt="Andrew"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-teal-500"
                />
              <h3 className="text-xl font-semibold text-gray-900">Andrew</h3>
              <p className="text-gray-500 mt-2">
                Created backend folder, connected application to MongoDB, allowed for users to create accounts and assured users necessary information gets saved
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default About