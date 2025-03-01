import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Downloads() {
  return (
    <div className="container">
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox mb-4">Downloads</h1>
        <div className="space-y-4">
          {/* Download links and setup instructions will be provided here */}
        </div>
      </main>
      <Footer />
    </div>
  )
}
