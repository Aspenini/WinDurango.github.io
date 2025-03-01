import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="header">
      <nav className="bg-xboxBlack p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          {['Blog', 'Compatibility List', 'Downloads', 'FAQ', 'GitHub'].map((link, index) => (
            <motion.a
              key={index}
              href={`/${link.toLowerCase().replace(' ', '')}`}
              className="text-xboxGreen hover:text-white transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
      </nav>
      <div className="text-center mt-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox">WinDurango</h1>
        <p className="text-lg md:text-xl lg:text-2xl mt-2">Xbox One compatibility layer for Windows</p>
      </div>
    </header>
  )
}
