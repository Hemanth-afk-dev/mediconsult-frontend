import { useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const roleRoutes = {
  patient: '/patient/dashboard',
  doctor: '/doctor/dashboard',
  admin: '/admin/dashboard',
  pharmacist: '/pharmacist/dashboard',
}

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === form.email && u.password === form.password)
    if (found) {
      login(found)
      toast.success(`Welcome back, ${found.name}!`)
      navigate(roleRoutes[found.role])
    } else {
      toast.error('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4" style={{fontFamily:'DM Sans,sans-serif'}}>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <Stethoscope className="text-cyan-400" size={28} />
          <span style={{fontFamily:'Syne,sans-serif'}} className="text-white text-2xl font-bold">
            Medi<span className="text-cyan-400">Consult</span>
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Email address</label>
              <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-cyan-500 transition">
                <Mail size={16} className="text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="bg-transparent text-white placeholder-slate-500 outline-none text-sm w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Password</label>
              <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-cyan-500 transition">
                <Lock size={16} className="text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="bg-transparent text-white placeholder-slate-500 outline-none text-sm w-full"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-white transition">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="accent-cyan-500" />
                Remember me
              </label>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition">Forgot password?</a>
            </div>

            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 rounded-xl transition text-sm">
              Sign In
            </button>
          </form>

          <p className="text-slate-400 text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 transition font-medium">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login