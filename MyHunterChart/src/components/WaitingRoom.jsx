import Navbar from './Navbar'

function WaitingRoom() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6">
        <div className="bg-white shadow-2xl rounded-3xl p-12 border border-teal-100 text-center max-w-xl">

         

          <h1 className="text-4xl font-bold text-teal-700 mb-4">
            Waiting Room
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Your symptoms have been sent to the team!
          </p>

          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
            <p className="text-2xl font-semibold text-teal-800">
              Wait for your name to be called...
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WaitingRoom