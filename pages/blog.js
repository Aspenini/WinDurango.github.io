import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Blog() {
  return (
    <div className="container">
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox mb-4">Blog</h1>
        <div className="space-y-4">
          {/* Blog posts will be dynamically loaded here */}
        </div>
      </main>
      <Footer />
    </div>
  )
}
