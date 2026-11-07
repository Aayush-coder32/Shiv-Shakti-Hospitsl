import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { ArrowRight, HeartPulse, LockKeyhole, Mail, Menu, PhoneCall, ShieldCheck, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { departments, hospitalProfile } from './config/hospital';

const hospitalLogoUrl = 'https://shivshaktihospital.in/image/logo.jpg';

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
            <img src={hospitalLogoUrl} alt="Shiv Shakti Hospital logo" className="h-14 w-auto object-contain" />
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

function AuthPage({ register = false }) {
  return <Layout>
    <section className="auth-page">
      <div className="container grid items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
        <div className="hidden lg:block">
          <span className="eyebrow"><ShieldCheck size={16} /> Secure patient portal</span>
          <h1 className="mt-5 max-w-lg font-display text-5xl font-bold leading-tight">Your care journey, all in one place.</h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">Sign in to manage appointments and access your personal healthcare services.</p>
        </div>
        <div className="auth-card">
          <div className="mb-8 text-center">
            <img src={hospitalLogoUrl} alt="Shiv Shakti Hospital logo" className="mx-auto mb-4 h-16 w-auto object-contain" />
            <h2 className="font-display text-2xl font-bold">{register ? 'Create your patient account' : 'Welcome back'}</h2>
            <p className="mt-2 text-sm text-slate-500">{register ? 'Register to access the patient portal.' : 'Sign in to continue to your patient portal.'}</p>
          </div>
          <div className="mb-7 grid grid-cols-2 rounded-xl bg-soft p-1 text-sm font-bold">
            <Link to="/login" className={`rounded-lg py-3 text-center ${!register ? 'bg-white text-blue shadow-sm' : 'text-slate-500'}`}>Sign in</Link>
            <Link to="/register" className={`rounded-lg py-3 text-center ${register ? 'bg-white text-blue shadow-sm' : 'text-slate-500'}`}>Sign up</Link>
          </div>
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            {register && <label className="field"><span>Full name</span><div className="input-wrap"><UserRound size={18} /><input required type="text" placeholder="Enter your full name" /></div></label>}
            <label className="field"><span>Email address</span><div className="input-wrap"><Mail size={18} /><input required type="email" placeholder="you@example.com" /></div></label>
            {register && <label className="field"><span>Phone number</span><div className="input-wrap"><PhoneCall size={18} /><input required type="tel" placeholder="Enter your phone number" /></div></label>}
            <label className="field"><span>Password</span><div className="input-wrap"><LockKeyhole size={18} /><input required type="password" placeholder="Enter your password" /></div></label>
            {register && <label className="flex items-start gap-2 text-xs leading-5 text-slate-500"><input required type="checkbox" className="mt-1 accent-blue" />I agree to the privacy policy and terms of service.</label>}
            {!register && <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-slate-500"><input type="checkbox" className="accent-blue" />Remember me</label><button type="button" className="font-bold text-blue">Forgot password?</button></div>}
            <button type="submit" className="button-primary mt-2 w-full">{register ? 'Create account' : 'Sign in'} <ArrowRight size={17} /></button>
          </form>
          <div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />OR<span className="h-px flex-1 bg-slate-200" /></div>
          <button type="button" className="button-secondary w-full">Continue with Google</button>
          <p className="mt-6 text-center text-xs leading-5 text-slate-400">Authentication services will be securely connected in the next implementation phase.</p>
        </div>
      </div>
    </section>
  </Layout>;
}

function App() {
  return <Routes><Route path="/" element={<Home />} /><Route path="/about" element={<SimplePage eyebrow="Our story" title="Healthcare with humanity"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Hospital profile, mission, vision, and facility information will be managed through the administrator portal.</p></SimplePage>} /><Route path="/doctors" element={<SimplePage eyebrow="Care team" title="Meet our doctors"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Verified doctor profiles will appear here once they are added by an administrator.</p></SimplePage>} /><Route path="/departments" element={<SimplePage eyebrow="Specialties" title="Our departments"><div className="mt-10 grid gap-5 md:grid-cols-2">{departments.map((department) => <article className="card bg-white" key={department.name}><h2 className="font-display text-xl font-bold">{department.name}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{department.description}</p></article>)}</div></SimplePage>} /><Route path="/services" element={<SimplePage eyebrow="What we offer" title="Services built around your needs"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Hospital services will be configured and published after verification.</p></SimplePage>} /><Route path="/appointments" element={<SimplePage eyebrow="Appointments" title="Book an appointment"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Secure appointment booking will be available after the patient account and availability services are connected.</p></SimplePage>} /><Route path="/contact" element={<SimplePage eyebrow="Contact" title="How can we help?"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{hospitalProfile.contact.email}</p></SimplePage>} /><Route path="/login" element={<AuthPage />} /><Route path="/register" element={<AuthPage register />} /></Routes>;
}

export default App;
