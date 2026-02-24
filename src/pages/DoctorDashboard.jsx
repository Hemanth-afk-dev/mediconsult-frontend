import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, FileText, Pill, Video, Bell, LogOut, User, Clock, ChevronRight, Stethoscope, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } })
}

const navItems = [
  { icon: Calendar, label: 'Dashboard' },
  { icon: Video, label: 'Consultations' },
  { icon: FileText, label: 'Records' },
  { icon: Pill, label: 'Prescriptions' },
  { icon: User, label: 'Profile' },
]

const appointments = [
  { patient: 'Hemanth Chowdary', issue: 'Chest Pain', time: '3:00 PM', status: 'completed', img: 'HC' },
  { patient: 'Sneha Reddy', issue: 'Migraine', time: '4:00 PM', status: 'ongoing', img: 'SR' },
  { patient: 'Arjun Patel', issue: 'Back Pain', time: '5:00 PM', status: 'waiting', img: 'AP' },
  { patient: 'Meera Singh', issue: 'Fever', time: '6:00 PM', status: 'waiting', img: 'MS' },
]

const statusStyle = {
  completed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  ongoing: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  waiting: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
}

function DoctorDashboard() {
  const [active, setActive] = useState('Dashboard')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'D'

  return (
    <div className="min-h-screen bg-slate-950 text-white flex" style={{fontFamily:'DM Sans,sans-serif'}}>

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-slate-800">
          <Stethoscope className="text-cyan-400" size={24} />
          <span style={{fontFamily:'Syne,sans-serif'}} className="text-white text-xl font-bold">Medi<span className="text-cyan-400">Consult</span></span>
        </div>

        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-900 font-bold text-sm">
              {getInitials(user?.name)}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{user?.name || 'Doctor'}</p>
              <p className="text-cyan-400 text-xs capitalize">{user?.role || 'Doctor'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-xs font-medium">Available</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => setActive(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                active === item.label ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition">
            <LogOut size={18} />Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{fontFamily:'Syne,sans-serif'}} className="text-2xl font-bold">Welcome, {user?.name} 👨‍⚕️</h1>
            <p className="text-slate-400 text-sm mt-1">Here's your consultation schedule for today</p>
          </div>
          <button className="relative p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full"></span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { label: "Today's Patients", value: '4', icon: User, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
            { label: 'Completed', value: '1', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Prescriptions', value: '3', icon: Pill, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Total Patients', value: '128', icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" animate="visible" custom={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className={`${stat.bg} w-11 h-11 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold">Today's Appointments</h2>
              <button className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1">View all <ChevronRight size={14} /></button>
            </div>
            <div className="space-y-4">
              {appointments.map((apt, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-900 font-bold text-xs">{apt.img}</div>
                    <div>
                      <p className="text-sm font-semibold">{apt.patient}</p>
                      <p className="text-slate-400 text-xs">{apt.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-xs flex items-center gap-1"><Clock size={10} />{apt.time}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle[apt.status]}`}>{apt.status}</span>
                    {apt.status !== 'completed' && (
                      <button className="bg-cyan-500 hover:bg-cyan-400 text-white text-xs px-3 py-2 rounded-lg transition">Start</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 px-4 rounded-xl transition text-sm">
                  <Pill size={16} /> Write Prescription
                </button>
                <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition text-sm">
                  <FileText size={16} /> Patient Records
                </button>
                <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition text-sm">
                  <Calendar size={16} /> My Schedule
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DoctorDashboard