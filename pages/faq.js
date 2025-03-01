import Header from '../components/Header'
import Footer from '../components/Footer'

export default function FAQ() {
  return (
    <div className="container">
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox mb-4">FAQ</h1>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-2xl text-xboxGreen">What is WinDurango?</h2>
            <p className="mt-2">WinDurango is an Xbox One compatibility layer for Windows.</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-2xl text-xboxGreen">How do I install WinDurango?</h2>
            <p className="mt-2">
              Follow the setup instructions on the{' '}
              <a
                href="https://github.com/WinDurango/WinDurango/wiki/Setup"
                className="text-xboxGreen hover:underline"
              >
                GitHub Wiki
              </a>.
            </p>
          </div>
          {/* Add more FAQ items as needed */}
        </div>
      </main>
      <Footer />
    </div>
  )
}
