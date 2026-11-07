import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { ArrowRight, HeartPulse, Menu, PhoneCall, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import { departments, hospitalProfile } from './config/hospital';

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/doctors', 'Doctors'],
  ['/departments', 'Departments'],
  ['/services', 'Services'],
  ['/contact', 'Contact'],
];

function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-navy">
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid size-11 place-items-center rounded-2xl bg-blue text-white shadow-lg shadow-blue/20">
              <HeartPulse size={24} />
            </span>
            <span>
              <span className="block font-display text-lg font-bold leading-tight">Shiv Shakti</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-teal">Hospital</span>
            </span>
          </Link>
          <button className="rounded-xl p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
          <nav className={`${open ? 'absolute left-0 right-0 top-20 flex border-b bg-white p-5' : 'hidden'} flex-col gap-5 md:static md:flex md:flex-row md:items-center md:border-0 md:p-0`}>
            {navItems.map(([path, label]) => (
              <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => `text-sm font-semibold transition hover:text-blue ${isActive ? 'text-blue' : 'text-slate-600'}`}>
                {label}
              </NavLink>
            ))}
            <Link to="/login" className="button-primary text-center" onClick={() => setOpen(false)}>Patient portal</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-24 bg-navy text-white">
        <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3"><HeartPulse className="text-teal" /><span className="font-display text-xl font-bold">Shiv Shakti Hospital</span></div>
            <p className="max-w-sm text-sm leading-7 text-slate-300">{hospitalProfile.description}</p>
          </div>
          <div><h2 className="mb-4 font-bold">Explore</h2><div className="grid gap-3 text-sm text-slate-300">{navItems.slice(1).map(([path, label]) => <Link key={path} to={path} className="hover:text-white">{label}</Link>)}</div></div>
          <div><h2 className="mb-4 font-bold">Contact</h2><div className="grid gap-3 text-sm text-slate-300"><span>{hospitalProfile.contact.address}</span><span>{hospitalProfile.contact.phone}</span><span>{hospitalProfile.contact.email}</span></div></div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">© {new Date().getFullYear()} Shiv Shakti Hospital · Configuration-ready demo</div>
      </footer>
    </div>
  );
}

function Home() {
  return <Layout>
    <section className="hero-grid">
      <div className="container grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div><span className="eyebrow"><ShieldCheck size={16} /> Care designed around you</span><h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">A healthier tomorrow starts with <span className="text-blue">trusted care.</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{hospitalProfile.description}</p><div className="mt-8 flex flex-wrap gap-4"><Link to="/appointments" className="button-primary">Book an appointment <ArrowRight size={18} /></Link><a href="#contact" className="button-secondary"><PhoneCall size={18} /> Contact hospital</a></div></div>
        <div className="relative"><div className="absolute -inset-4 rounded-[2rem] bg-teal/10 blur-2xl" /><div className="relative rounded-[2rem] bg-gradient-to-br from-blue to-[#0d4c81] p-8 text-white shadow-2xl shadow-blue/20"><div className="mb-16 flex items-start justify-between"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">Patient-first care</span><HeartPulse size={28} className="text-teal" /></div><p className="font-display text-3xl font-bold leading-tight">“Every visit should leave you feeling heard, informed, and cared for.”</p><div className="mt-12 h-1 w-16 rounded-full bg-teal" /></div></div>
      </div>
    </section>
    <section className="container py-20"><div className="mb-10 flex items-end justify-between gap-5"><div><span className="eyebrow">Our focus</span><h2 className="section-title mt-3">Care that feels personal.</h2></div><Link to="/departments" className="hidden text-sm font-bold text-blue md:flex md:items-center md:gap-2">View departments <ArrowRight size={16} /></Link></div><div className="grid gap-5 md:grid-cols-3">{[['01', 'Expert guidance', 'Clear information and coordinated support at every step.'], ['02', 'Modern comfort', 'A calm, thoughtful experience for patients and families.'], ['03', 'Connected care', 'A foundation for secure digital access to your care journey.']].map(([number, title, text]) => <article key={number} className="card"><span className="text-sm font-bold text-teal">{number}</span><h3 className="mt-8 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></article>)}</div></section>
    <section id="contact" className="bg-soft"><div className="container grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center"><div><span className="eyebrow">Need assistance?</span><h2 className="section-title mt-3">We are here to help.</h2><p className="mt-3 text-slate-600">Hospital contact details will be added by an authorized administrator.</p></div><Link to="/contact" className="button-primary">Send an enquiry <ArrowRight size={18} /></Link></div></section>
  </Layout>;
}

function SimplePage({ title, eyebrow, children }) {
  return <Layout><section className="bg-soft"><div className="container py-20"><span className="eyebrow">{eyebrow}</span><h1 className="section-title mt-4">{title}</h1>{children}</div></section></Layout>;
}

function App() {
  return <Routes><Route path="/" element={<Home />} /><Route path="/about" element={<SimplePage eyebrow="Our story" title="Healthcare with humanity"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Hospital profile, mission, vision, and facility information will be managed through the administrator portal.</p></SimplePage>} /><Route path="/doctors" element={<SimplePage eyebrow="Care team" title="Meet our doctors"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Verified doctor profiles will appear here once they are added by an administrator.</p></SimplePage>} /><Route path="/departments" element={<SimplePage eyebrow="Specialties" title="Our departments"><div className="mt-10 grid gap-5 md:grid-cols-2">{departments.map((department) => <article className="card bg-white" key={department.name}><h2 className="font-display text-xl font-bold">{department.name}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{department.description}</p></article>)}</div></SimplePage>} /><Route path="/services" element={<SimplePage eyebrow="What we offer" title="Services built around your needs"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Hospital services will be configured and published after verification.</p></SimplePage>} /><Route path="/appointments" element={<SimplePage eyebrow="Appointments" title="Book an appointment"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Secure appointment booking will be available after the patient account and availability services are connected.</p></SimplePage>} /><Route path="/contact" element={<SimplePage eyebrow="Contact" title="How can we help?"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{hospitalProfile.contact.email}</p></SimplePage>} /><Route path="/login" element={<SimplePage eyebrow="Patient portal" title="Sign in securely"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Patient and administrator authentication panels will be introduced in Phase 3.</p></SimplePage>} /></Routes>;
}

export default App;

