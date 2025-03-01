import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

export default function Compatibility() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch('https://windurango.github.io/Documentation/playable-games.html')
      .then((response) => response.json())
      .then((data) => setGames(data))
  }, [])

  return (
    <div className="container">
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox mb-4">Compatibility List</h1>
        <div className="space-y-4">
          {games.map((game, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <h2 className="text-2xl text-xboxGreen">{game.title}</h2>
              <p className="mt-2">{game.status}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
