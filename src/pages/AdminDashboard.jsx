import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, UserCheck, Calendar, Shield, Bell, LogOut, Settings, BarChart3, Stethoscope, ChevronRight, XCircle, Clock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } })
}

const navItems = [
  { icon: BarChart3, label: 'Dashboard' },
  { icon: Users, label: 'Users' },
  { icon: UserCheck, label: 'Doctors' },
  { icon: Calendar, label: 'Appointments' },
  { icon: Settings, label: 'Settings' },
]

const recentUsers = [
  { name: 'Hemanth Chowdary', role: 'Patient', date: 'Today', status: 'active', img: 'HC' },
  { name: 'Dr. Priya Sharma', role: 'Doctor', date: 'Today', status: 'active', img: 'PS' },
  { name: 'Sneha Reddy', role: 'Patient', date: 'Yesterday', status: 'active', img: 'SR' },
  { name: 'Dr. Rajan Mehta', role: 'Doctor', date: 'Feb 20', status: 'inactive', img: 'RM' },
  { name: 'Kiran Pharma', role: 'Pharmacist', date: 'Feb 19', status: 'active', img: 'KP' },
]

const recentAppointments = [
  { patient: 'Hemanth Chowdary', doctor: 'Dr. Priya Sharma', date: 'Today 3:00 PM', status: 'confirmed' },
  { patient: 'Sneha Reddy', doctor: 'Dr. Rajan Mehta', date: 'Today 5:30 PM', status: 'pending' },
  { patient: 'Arjun Patel', doctor: 'Dr. Anita Verma', date: 'Feb 25', status: 'confirmed' },
]

const statusStyle = {
  active: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  inactive: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  confirmed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
}

const roleColor = { Patient: 'text-cyan-400', Doctor: 'text-purple-400', Pharmacist: 'text-amber-400' }

function AdminDashboard() {
  const [active, setActive] = useState('Dashboard')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A'

  return (
    <div className="min-h-screen bg-slate-950 text-white flex" style={{fontFamily:'DM Sans,sans-serif'}}>

      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-slate-800">
          <Stethoscope className="text-cyan-400" size={24} />
          <span style={{fontFamily:'Syne,sans-serif'}} className="text-white text-xl font-bold">Medi<span className="text-cyan-400">Consult</span></span>
        </div>

        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-slate-900 font-bold text-sm">
              {getInitials(user?.name)}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{user?.name || 'Admin'}</p>
              <p className="text-rose-400 text-xs capitalize">{user?.role || 'Administrator'}</p>
            </div>
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

      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{fontFamily:'Syne,sans-serif'}} className="text-2xl font-bold">Admin Dashboard 🛡️</h1>
            <p className="text-slate-400 text-sm mt-1">Welcome, {user?.name}. Platform overview and management.</p>
          </div>
          <button className="relative p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-400 rounded-full"></span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Total Users', value: '1,284', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10', change: '+12 today' },
            { label: 'Active Doctors', value: '48', icon: UserCheck, color: 'text-purple-400', bg: 'bg-purple-500/10', change: '+2 this week' },
            { label: 'Appointments Today', value: '93', icon: Calendar, color: 'text-emerald-400', bg: 'bg-emerald-500/10', change: '+8 vs yesterday' },
            { label: 'Platform Security', value: '100%', icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500/10', change: 'All systems normal' },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" animate="visible" custom={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className={`${stat.bg} w-11 h-11 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
              <p className="text-xs text-emerald-400">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold">Recent Users</h2>
              <button className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1">Manage all <ChevronRight size={14} /></button>
            </div>
            <div className="grid grid-cols-4 text-xs text-slate-500 uppercase tracking-wider mb-3 px-2">
              <span>User</span><span>Role</span><span>Joined</span><span>Status</span>
            </div>
            <div className="space-y-2">
              {recentUsers.map((user, i) => (
                <div key={i} className="grid grid-cols-4 items-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-900 font-bold text-xs">{user.img}</div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <span className={`text-xs font-medium ${roleColor[user.role]}`}>{user.role}</span>
                  <span className="text-slate-400 text-xs">{user.date}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle[user.status]}`}>{user.status}</span>
                    <button className="text-slate-500 hover:text-rose-400 transition"><XCircle size={14} /></button>
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
                  <Users size={16} /> Add New User
                </button>
                <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition text-sm">
                  <UserCheck size={16} /> Verify Doctor
                </button>
                <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition text-sm">
                  <Settings size={16} /> Platform Settings
                </button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold mb-4">Recent Appointments</h2>
              <div className="space-y-3">
                {recentAppointments.map((apt, i) => (
                  <div key={i} className="p-3 bg-slate-800/50 rounded-xl">
                    <p className="text-sm font-semibold">{apt.patient}</p>
                    <p className="text-slate-400 text-xs mt-1">{apt.doctor}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-slate-500 text-xs flex items-center gap-1"><Clock size={10} />{apt.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle[apt.status]}`}>{apt.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard