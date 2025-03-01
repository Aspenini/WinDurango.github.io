import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <motion.img
          src="/images/WinDurango.png"
          alt="WinDurango Logo"
          className="w-1/4 md:w-1/6 lg:w-1/8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox mt-4">WinDurango</h1>
        <p className="text-lg md:text-xl lg:text-2xl mt-2 text-center">Xbox One compatibility layer for Windows</p>
      </main>
      <Footer />
    </div>
  )
}
