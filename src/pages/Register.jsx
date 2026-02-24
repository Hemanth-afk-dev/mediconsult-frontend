import { useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, Mail, Lock, User, ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const roleRoutes = {
  patient: '/patient/dashboard',
  doctor: '/doctor/dashboard',
  admin: '/admin/dashboard',
  pharmacist: '/pharmacist/dashboard',
}

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const exists = users.find(u => u.email === form.email)

    if (exists) {
      toast.error('Email already registered. Please login.')
      return
    }

    const newUser = { ...form }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    login(newUser)
    toast.success(`Account created! Welcome, ${form.name}!`)
    navigate(roleRoutes[form.role])
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12" style={{fontFamily:'DM Sans,sans-serif'}}>
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
          <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-2xl font-bold text-white mb-2">Create account</h2>
          <p className="text-slate-400 text-sm mb-8">Join MediConsult to get started</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Full name</label>
              <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-cyan-500 transition">
                <User size={16} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="bg-transparent text-white placeholder-slate-500 outline-none text-sm w-full"
                  required
                />
              </div>
            </div>

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
              <label className="text-slate-400 text-sm mb-2 block">I am a</label>
              <div className="relative">
                <select
                  value={form.role}
                  onChange={e => setForm({...form, role: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none text-sm appearance-none focus:border-cyan-500 transition cursor-pointer"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="admin">Admin</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Password</label>
              <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-cyan-500 transition">
                <Lock size={16} className="text-slate-400" />
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  className="bg-transparent text-white placeholder-slate-500 outline-none text-sm w-full"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 rounded-xl transition text-sm">
              Create Account
            </button>
          </form>

          <p className="text-slate-400 text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Register