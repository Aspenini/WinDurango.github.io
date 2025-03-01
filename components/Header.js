export default function Header() {
  return (
    <header className="header">
      <nav className="bg-xboxBlack p-4 flex justify-between items-center">
        <img src="/images/WinDurango.png" alt="WinDurango Logo" className="w-16" />
        <div className="flex space-x-4">
          <a href="/blog" className="text-xboxGreen hover:underline">Blog</a>
          <a href="/compatibility" className="text-xboxGreen hover:underline">Compatibility List</a>
          <a href="/downloads" className="text-xboxGreen hover:underline">Downloads</a>
          <a href="/faq" className="text-xboxGreen hover:underline">FAQ</a>
          <a href="https://github.com/WinDurango" className="text-xboxGreen hover:underline">GitHub</a>
        </div>
      </nav>
      <div className="text-center mt-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox">WinDurango</h1>
        <p className="text-lg md:text-xl lg:text-2xl mt-2">Xbox One compatibility layer for Windows</p>
      </div>
    </header>
  )
}
