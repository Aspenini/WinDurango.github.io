import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackgroundVideo from '../components/BackgroundVideo'

export default function Home() {
  return (
    <div className="container">
      <BackgroundVideo />
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox mt-4">WinDurango</h1>
        <p className="text-lg md:text-xl lg:text-2xl mt-2 text-center">Xbox One compatibility layer for Windows</p>
        <div className="mt-8 flex space-x-4">
          <motion.a
            href="/learn-more"
            className="px-4 py-2 bg-xboxGreen text-black rounded-full hover:bg-green-700 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Learn More
          </motion.a>
          <motion.a
            href="/get-started"
            className="px-4 py-2 bg-xboxGreen text-black rounded-full hover:bg-green-700 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started
          </motion.a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
