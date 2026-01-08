'use client'

export default function Header() {
  return (
    <header className="bg-black/40 backdrop-blur-sm border-b border-yellow-500/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center py-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-yellow-400 drop-shadow-lg">Caixinha</span>
            <span className="text-white/70 text-2xl mx-3">do</span>
            <span className="text-green-400 drop-shadow-lg">Sítio</span>
          </h1>
          <p className="text-white/50 text-lg">Férias em Família 2026</p>
        </div>
      </div>
    </header>
  )
}
