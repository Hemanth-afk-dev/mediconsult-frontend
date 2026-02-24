import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Star, Clock, ChevronRight, Heart, Brain, Bone, Eye, Baby, Stethoscope, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } })
}

const specialties = [
  { icon: Heart, label: 'Cardiology', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { icon: Brain, label: 'Neurology', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Bone, label: 'Orthopedics', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Eye, label: 'Ophthalmology', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Baby, label: 'Pediatrics', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { icon: Stethoscope, label: 'General Medicine', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
]

const doctors = [
  { name: 'Dr. Priya Sharma', specialty: 'Cardiologist', rating: '4.9', reviews: 128, available: 'Today 3:00 PM', img: 'PS', color: 'from-cyan-400 to-emerald-400' },
  { name: 'Dr. Rajan Mehta', specialty: 'Neurologist', rating: '4.8', reviews: 94, available: 'Today 5:30 PM', img: 'RM', color: 'from-purple-400 to-blue-400' },
  { name: 'Dr. Anita Verma', specialty: 'Pediatrician', rating: '4.9', reviews: 213, available: 'Tomorrow 10:00 AM', img: 'AV', color: 'from-pink-400 to-rose-400' },
  { name: 'Dr. Suresh Kumar', specialty: 'Orthopedics', rating: '4.7', reviews: 87, available: 'Today 6:00 PM', img: 'SK', color: 'from-amber-400 to-orange-400' },
  { name: 'Dr. Meena Rao', specialty: 'Ophthalmology', rating: '4.8', reviews: 156, available: 'Tomorrow 9:00 AM', img: 'MR', color: 'from-blue-400 to-cyan-400' },
  { name: 'Dr. Arjun Das', specialty: 'General Medicine', rating: '4.6', reviews: 201, available: 'Today 4:00 PM', img: 'AD', color: 'from-emerald-400 to-teal-400' },
]

const steps = [
  { num: '01', title: 'Find a Doctor', desc: 'Search by specialty, symptoms, or doctor name. Filter by availability and ratings.', icon: Search },
  { num: '02', title: 'Virtual Consult', desc: 'Join a secure encrypted video consultation from the comfort of your home.', icon: Clock },
  { num: '03', title: 'Get Prescription', desc: 'Receive instant e-prescriptions and lab orders digitally.', icon: Star },
]

function Landing() {
  const [search, setSearch] = useState('')
  const [showResults, setShowResults] = useState(false)

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{fontFamily:'DM Sans,sans-serif'}}>
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            HIPAA Compliant and Secure
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{fontFamily:'Syne,sans-serif'}}
            className="text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Healthcare at Your<br />
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Fingertips</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Book virtual appointments, consult top doctors, receive e-prescriptions — all from the comfort of your home.
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="relative max-w-xl mx-auto mb-8">
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-3 bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-4 focus-within:border-cyan-500 transition">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search doctor, specialty..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setShowResults(e.target.value.length > 0) }}
                  onFocus={() => search.length > 0 && setShowResults(true)}
                  className="bg-transparent text-white placeholder-slate-500 outline-none text-sm w-full"
                />
                {search && (
                  <button onClick={() => { setSearch(''); setShowResults(false) }} className="text-slate-500 hover:text-white transition text-xs">✕</button>
                )}
              </div>
              <button
                onClick={() => setShowResults(search.length > 0)}
                className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-4 rounded-2xl transition text-sm whitespace-nowrap">
                Find Doctor
              </button>
            </div>

            {/* Dropdown Results */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden z-50 shadow-2xl">
                {filtered.length > 0 ? filtered.map((doc, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800 transition cursor-pointer border-b border-slate-800 last:border-0">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${doc.color} flex items-center justify-center text-slate-900 font-bold text-xs shrink-0`}>
                      {doc.img}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white text-sm font-semibold">{doc.name}</p>
                      <p className="text-slate-400 text-xs">{doc.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 text-xs">★</span>
                      <span className="text-white text-xs font-medium">{doc.rating}</span>
                    </div>
                    <Link to="/register" className="bg-cyan-500 hover:bg-cyan-400 text-white text-xs px-3 py-1.5 rounded-lg transition">
                      Book
                    </Link>
                  </div>
                )) : (
                  <div className="px-5 py-6 text-slate-400 text-sm text-center">
                    No doctors found for "<span className="text-white">{search}</span>"
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="flex items-center justify-center gap-8 text-sm text-slate-400">
            {['500+ Doctors', '24/7 Available', 'Instant Prescription'].map((s, i) => (
              <span key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>{s}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">Simple Process</p>
          <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-4xl font-extrabold mb-16">How It Works</h2>
          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-left relative overflow-hidden hover:border-cyan-500/30 transition">
                <span style={{fontFamily:'Syne,sans-serif'}} className="absolute top-4 right-6 text-7xl font-extrabold text-slate-800">{step.num}</span>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-5">
                  <step.icon size={22} className="text-cyan-400" />
                </div>
                <h3 style={{fontFamily:'Syne,sans-serif'}} className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section id="specialties" className="py-24 px-6 bg-slate-900/40">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">What We Cover</p>
          <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-4xl font-extrabold mb-16">Browse Specialties</h2>
          <div className="grid grid-cols-6 gap-5">
            {specialties.map((spec, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-cyan-500/40 hover:scale-105 transition-all">
                <div className={`w-12 h-12 ${spec.bg} rounded-xl flex items-center justify-center`}>
                  <spec.icon size={22} className={spec.color} />
                </div>
                <span className="text-sm font-medium text-slate-200 text-center">{spec.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">Top Rated</p>
            <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-4xl font-extrabold">Meet Our Doctors</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {doctors.map((doc, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${doc.color} flex items-center justify-center text-slate-900 font-extrabold text-lg`}>
                    {doc.img}
                  </div>
                  <div>
                    <p className="font-bold text-base">{doc.name}</p>
                    <p className="text-slate-400 text-sm">{doc.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{'★★★★★'.split('').map((s,i) => <span key={i} className="text-amber-400 text-sm">{s}</span>)}</div>
                  <span className="font-bold text-sm">{doc.rating}</span>
                  <span className="text-slate-500 text-xs">({doc.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-2 rounded-lg mb-5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  Next available: {doc.available}
                </div>
                <Link to="/register" className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 rounded-xl transition text-sm">
                  Book Appointment <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-3xl p-16">
            <h2 style={{fontFamily:'Syne,sans-serif'}} className="text-5xl font-extrabold mb-4">Ready to See a Doctor?</h2>
            <p className="text-slate-400 text-lg mb-10">Join thousands of patients getting quality healthcare from home.</p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg px-10 py-5 rounded-2xl transition">
              Book Your First Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center text-slate-500 text-sm">
        © 2025 MediConsult. All rights reserved. Built with ❤️ for better healthcare.
      </footer>
    </div>
  )
}

export default Landing