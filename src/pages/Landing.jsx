import { motion } from 'framer-motion'
import { Search, Video, FileText, Shield, Star, ChevronRight, Heart, Brain, Bone, Eye, Baby, Pill } from 'lucide-react'
import Navbar from '../components/Navbar'

const specialties = [
  { icon: Heart, label: 'Cardiology', color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { icon: Brain, label: 'Neurology', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: Bone, label: 'Orthopedics', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { icon: Eye, label: 'Ophthalmology', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { icon: Baby, label: 'Pediatrics', color: 'text-pink-400', bg: 'bg-pink-400/10' },
  { icon: Pill, label: 'General Medicine', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
]

const steps = [
  { step: '01', icon: Search, title: 'Find a Doctor', desc: 'Search by specialty, symptoms, or doctor name.' },
  { step: '02', icon: Video, title: 'Virtual Consult', desc: 'Join a secure video consultation from home.' },
  { step: '03', icon: FileText, title: 'Get Prescription', desc: 'Receive e-prescriptions and lab orders instantly.' },
]

const doctors = [
  { name: 'Dr. Priya Sharma', specialty: 'Cardiologist', rating: 4.9, reviews: 128, available: 'Today 3:00 PM', img: 'PS' },
  { name: 'Dr. Rajan Mehta', specialty: 'Neurologist', rating: 4.8, reviews: 94, available: 'Today 5:30 PM', img: 'RM' },
  { name: 'Dr. Anita Verma', specialty: 'Pediatrician', rating: 4.9, reviews: 213, available: 'Tomorrow 10:00 AM', img: 'AV' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' } })
}

function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{fontFamily:'DM Sans,sans-serif'}}>
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Shield size={14} /> HIPAA Compliant and Secure
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} style={{fontFamily:'Syne,sans-serif'}} className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Healthcare at Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Fingertips</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Book virtual appointments, consult top doctors, receive e-prescriptions all from home.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
            <div className="flex-1 flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-full px-5 py-3">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search doctor, specialty..." className="bg-transparent text-white placeholder-slate-400 outline-none text-sm w-full" />
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-full transition">Find Doctor</button>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="flex items-center justify-center gap-6 text-sm text-slate-400">
            <span>500+ Doctors</span>
            <span>24/7 Available</span>
            <span>Instant Prescription</span>
          </motion.div>
        </div>
      </section>

      <section id="how" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Simple Process</p>
            <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-4xl font-bold">How It Works</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={i} className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/40 transition">
                <span style={{fontFamily:'Syne,sans-serif'}} className="text-6xl font-bold text-slate-800 absolute top-6 right-6">{s.step}</span>
                <div className="bg-cyan-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                  <s.icon size={22} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="specialties" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">What We Cover</p>
            <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-4xl font-bold">Browse Specialties</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={i * 0.5} whileHover={{scale:1.05}} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-slate-600 transition">
                <div className={`${s.bg} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <s.icon size={22} className={s.color} />
                </div>
                <span className="text-sm font-medium text-center">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="doctors" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Top Rated</p>
            <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-4xl font-bold">Meet Our Doctors</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {doctors.map((d, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-900 font-bold text-lg">{d.img}</div>
                  <div>
                    <h3 className="font-semibold">{d.name}</h3>
                    <p className="text-slate-400 text-sm">{d.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold">{d.rating}</span>
                  <span className="text-slate-500 text-sm">({d.reviews} reviews)</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-2 rounded-lg mb-5">
                  Next available: {d.available}
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 rounded-xl transition text-sm">
                  Book Appointment <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/20 rounded-3xl p-12 text-center">
          <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-4xl font-bold mb-4">Ready to See a Doctor?</h2>
          <p className="text-slate-400 mb-8">Join thousands of patients getting quality healthcare from home.</p>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-10 py-4 rounded-full text-lg transition">Book Your First Consultation</button>
        </motion.div>
      </section>

      <footer className="border-t border-slate-800 py-8 px-6 text-center text-slate-500 text-sm">
        2025 MediConsult. All rights reserved.
      </footer>
    </div>
  )
}

export default Landing