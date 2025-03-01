import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="header">
      <nav className="bg-xboxBlack p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          {['Blog', 'Compatibility List', 'Downloads', 'FAQ'].map((link, index) => (
            <motion.a
              key={index}
              href={`/${link.toLowerCase().replace(' ', '')}`}
              className="px-4 py-2 bg-xboxGreen text-black rounded-full hover:bg-green-700 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {link}
            </motion.a>
          ))}
          <motion.a
            href="https://github.com/WinDurango"
            className="px-4 py-2 bg-xboxGreen text-black rounded-full hover:bg-green-700 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            GitHub
          </motion.a>
        </div>
      </nav>
      <div className="text-center mt-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox">WinDurango</h1>
        <p className="text-lg md:text-xl lg:text-2xl mt-2">Xbox One compatibility layer for Windows</p>
      </div>
    </header>
  )
}
