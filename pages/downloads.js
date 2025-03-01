import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Downloads() {
  return (
    <div className="container">
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox mb-4">Downloads</h1>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-2xl text-xboxGreen">Latest Release</h2>
            <a
              href="https://github.com/WinDurango/WinDurango/releases/latest"
              className="text-lg text-xboxGreen hover:underline"
            >
              Download
            </a>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-2xl text-xboxGreen">Setup Instructions</h2>
            <p className="mt-2">
              Follow the instructions on the{' '}
              <a
                href="https://github.com/WinDurango/WinDurango/wiki/Setup"
                className="text-xboxGreen hover:underline"
              >
                GitHub Wiki
              </a>{' '}
              to set up WinDurango.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
