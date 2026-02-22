import { useState } from 'react'
import { Menu, X, Stethoscope } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <Stethoscope className="text-cyan-400" size={28} />
          <span style={{fontFamily:'Syne,sans-serif'}} className="text-white text-2xl font-bold">
            Medi<span className="text-cyan-400">Consult</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how" className="text-slate-400 hover:text-white transition text-sm font-medium">How It Works</a>
          <a href="#specialties" className="text-slate-400 hover:text-white transition text-sm font-medium">Specialties</a>
          <a href="#doctors" className="text-slate-400 hover:text-white transition text-sm font-medium">Doctors</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => navigate('/login')} className="text-slate-300 hover:text-white text-sm font-medium px-4 py-2 transition">
            Login
          </button>
          <button onClick={() => navigate('/register')} className="bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold px-5 py-2 rounded-full transition">
            Get Started
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900 px-6 pb-6 flex flex-col gap-4">
          <a href="#how" className="text-slate-400 hover:text-white text-sm">How It Works</a>
          <a href="#specialties" className="text-slate-400 hover:text-white text-sm">Specialties</a>
          <a href="#doctors" className="text-slate-400 hover:text-white text-sm">Doctors</a>
          <button onClick={() => navigate('/login')} className="bg-cyan-500 text-white text-sm font-semibold px-5 py-2 rounded-full w-fit">
            Get Started
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar