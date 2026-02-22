import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, FileText, Pill, Video, Bell, LogOut, User, Clock, ChevronRight, Stethoscope, Users, CheckCircle, XCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } })
}

const navItems = [
  { icon: Calendar, label: 'Dashboard' },
  { icon: Users, label: 'Patients' },
  { icon: Video, label: 'Consultations' },
  { icon: Pill, label: 'Prescriptions' },
  { icon: FileText, label: 'Records' },
  { icon: User, label: 'Profile' },
]

const todayAppointments = [
  { name: 'Hemanth Chowdary', age: 24, issue: 'Chest pain', time: '10:00 AM', status: 'completed', img: 'HC' },
  { name: 'Sneha Reddy', age: 31, issue: 'Headache & dizziness', time: '11:30 AM', status: 'ongoing', img: 'SR' },
  { name: 'Arjun Patel', age: 45, issue: 'Follow-up checkup', time: '2:00 PM', status: 'waiting', img: 'AP' },
  { name: 'Meera Singh', age: 28, issue: 'Anxiety symptoms', time: '3:30 PM', status: 'waiting', img: 'MS' },
]

const recentPrescriptions = [
  { patient: 'Hemanth Chowdary', medicine: 'Amoxicillin 500mg', date: 'Today' },
  { patient: 'Sneha Reddy', medicine: 'Paracetamol 650mg', date: 'Yesterday' },
  { patient: 'Arjun Patel', medicine: 'Atorvastatin 10mg', date: 'Feb 20' },
]

const statusStyle = {
  completed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  ongoing: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  waiting: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
}

function DoctorDashboard() {
  const [active, setActive] = useState('Dashboard')

  return (
    <div className="min-h-screen bg-slate-950 text-white flex" style={{fontFamily:'DM Sans,sans-serif'}}>

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-slate-800">
          <Stethoscope className="text-cyan-400" size={24} />
          <span style={{fontFamily:'Syne,sans-serif'}} className="text-white text-xl font-bold">
            Medi<span className="text-cyan-400">Consult</span>
          </span>
        </div>

        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-sm">PS</div>
            <div>
              <p className="text-white text-sm font-semibold">Dr. Priya Sharma</p>
              <p className="text-cyan-400 text-xs">Cardiologist</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                active === item.label
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{fontFamily:'Syne,sans-serif'}} className="text-2xl font-bold">Good morning, Dr. Priya 👋</h1>
            <p className="text-slate-400 text-sm mt-1">You have 4 appointments today</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Available
            </div>
            <button className="relative p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { label: "Today's Patients", value: '4', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
            { label: 'Completed', value: '1', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Prescriptions', value: '3', icon: Pill, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Total Patients', value: '128', icon: User, color: 'text-amber-400', bg: 'bg-amber-500/10' },
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

          {/* Today's Appointments */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold">Today's Appointments</h2>
              <button className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1">View all <ChevronRight size={14} /></button>
            </div>
            <div className="space-y-4">
              {todayAppointments.map((apt, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-900 font-bold text-xs">{apt.img}</div>
                    <div>
                      <p className="text-sm font-semibold">{apt.name}</p>
                      <p className="text-slate-400 text-xs">{apt.issue} • Age {apt.age}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-slate-400 text-xs flex items-center gap-1"><Clock size={10} /> {apt.time}</p>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle[apt.status]}`}>{apt.status}</span>
                    <button className="bg-cyan-500 hover:bg-cyan-400 text-white text-xs px-3 py-2 rounded-lg transition flex items-center gap-1">
                      <Video size={12} /> Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Panel */}
          <div className="space-y-5">

            {/* Quick Actions */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 px-4 rounded-xl transition text-sm">
                  <Pill size={16} /> Write Prescription
                </button>
                <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition text-sm">
                  <FileText size={16} /> View Patient Records
                </button>
                <button className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition text-sm">
                  <XCircle size={16} /> Cancel Appointment
                </button>
              </div>
            </motion.div>

            {/* Recent Prescriptions */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-lg font-bold mb-4">Recent Prescriptions</h2>
              <div className="space-y-3">
                {recentPrescriptions.map((p, i) => (
                  <div key={i} className="p-3 bg-slate-800/50 rounded-xl">
                    <p className="text-sm font-semibold">{p.patient}</p>
                    <p className="text-slate-400 text-xs mt-1">{p.medicine}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-slate-500 text-xs">{p.date}</span>
                      <button className="text-cyan-400 text-xs hover:text-cyan-300">View</button>
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

export default DoctorDashboard