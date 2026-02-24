import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pill, Package, CheckCircle, Clock, Bell, LogOut, User, ChevronRight, Stethoscope, AlertCircle, TruckIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } })
}

const navItems = [
  { icon: Package, label: 'Dashboard' },
  { icon: Pill, label: 'Prescriptions' },
  { icon: TruckIcon, label: 'Orders' },
  { icon: AlertCircle, label: 'Inventory' },
  { icon: User, label: 'Profile' },
]

const orders = [
  { id: '#RX001', patient: 'Hemanth Chowdary', medicine: 'Amoxicillin 500mg', doctor: 'Dr. Priya Sharma', date: 'Today 10:00 AM', status: 'pending' },
  { id: '#RX002', patient: 'Sneha Reddy', medicine: 'Paracetamol 650mg', doctor: 'Dr. Rajan Mehta', date: 'Today 11:30 AM', status: 'processing' },
  { id: '#RX003', patient: 'Arjun Patel', medicine: 'Atorvastatin 10mg', doctor: 'Dr. Anita Verma', date: 'Today 2:00 PM', status: 'dispensed' },
  { id: '#RX004', patient: 'Meera Singh', medicine: 'Metformin 500mg', doctor: 'Dr. Priya Sharma', date: 'Yesterday', status: 'dispensed' },
]

const inventory = [
  { medicine: 'Amoxicillin 500mg', stock: 240, status: 'ok' },
  { medicine: 'Paracetamol 650mg', stock: 30, status: 'low' },
  { medicine: 'Atorvastatin 10mg', stock: 180, status: 'ok' },
  { medicine: 'Metformin 500mg', stock: 12, status: 'critical' },
]

const statusStyle = {
  pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  processing: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  dispensed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
}

const inventoryStyle = { ok: 'text-emerald-400', low: 'text-amber-400', critical: 'text-rose-400' }

function PharmacistDashboard() {
  const [active, setActive] = useState('Dashboard')
  const [orderList, setOrderList] = useState(orders)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'P'
  const updateStatus = (id, newStatus) => setOrderList(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o))

  return (
    <div className="min-h-screen bg-slate-950 text-white flex" style={{fontFamily:'DM Sans,sans-serif'}}>

      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-slate-800">
          <Stethoscope className="text-cyan-400" size={24} />
          <span style={{fontFamily:'Syne,sans-serif'}} className="text-white text-xl font-bold">Medi<span className="text-cyan-400">Consult</span></span>
        </div>

        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center text-slate-900 font-bold text-sm">
              {getInitials(user?.name)}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{user?.name || 'Pharmacist'}</p>
              <p className="text-amber-400 text-xs capitalize">{user?.role || 'Pharmacist'}</p>
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
            <h1 style={{fontFamily:'Syne,sans-serif'}} className="text-2xl font-bold">Pharmacy Dashboard 💊</h1>
            <p className="text-slate-400 text-sm mt-1">Welcome, {user?.name}. Manage prescriptions and orders.</p>
          </div>
          <button className="relative p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full"></span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Pending Orders', value: '1', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { label: 'Processing', value: '1', icon: Package, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
            { label: 'Dispensed Today', value: '2', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Low Stock Items', value: '2', icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
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
              <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold">Prescription Orders</h2>
              <button className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1">View all <ChevronRight size={14} /></button>
            </div>
            <div className="space-y-4">
              {orderList.map((order, i) => (
                <div key={i} className="p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 text-xs font-bold">{order.id}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle[order.status]}`}>{order.status}</span>
                    </div>
                    <span className="text-slate-500 text-xs flex items-center gap-1"><Clock size={10} />{order.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{order.patient}</p>
                      <p className="text-slate-400 text-xs">{order.medicine}</p>
                      <p className="text-slate-500 text-xs">{order.doctor}</p>
                    </div>
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <button onClick={() => updateStatus(order.id, 'processing')} className="bg-cyan-500 hover:bg-cyan-400 text-white text-xs px-3 py-2 rounded-lg transition">Process</button>
                      )}
                      {order.status === 'processing' && (
                        <button onClick={() => updateStatus(order.id, 'dispensed')} className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs px-3 py-2 rounded-lg transition">Dispense</button>
                      )}
                      {order.status === 'dispensed' && (
                        <span className="text-emerald-400 text-xs flex items-center gap-1"><CheckCircle size={12} />Done</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold">Inventory</h2>
              <button className="text-cyan-400 text-sm hover:text-cyan-300">Manage</button>
            </div>
            <div className="space-y-4">
              {inventory.map((item, i) => (
                <div key={i} className="p-3 bg-slate-800/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold">{item.medicine}</p>
                    <span className={`text-xs font-bold ${inventoryStyle[item.status]}`}>
                      {item.status === 'ok' ? '✓ OK' : item.status === 'low' ? '⚠ Low' : '🔴 Critical'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 mb-1">
                    <div className={`h-1.5 rounded-full ${item.status === 'ok' ? 'bg-emerald-400' : item.status === 'low' ? 'bg-amber-400' : 'bg-rose-400'}`}
                      style={{width:`${Math.min((item.stock/300)*100,100)}%`}} />
                  </div>
                  <p className="text-slate-500 text-xs">{item.stock} units remaining</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 border border-dashed border-slate-700 rounded-xl text-slate-400 text-sm hover:border-cyan-500 hover:text-cyan-400 transition">
              + Restock Items
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default PharmacistDashboard