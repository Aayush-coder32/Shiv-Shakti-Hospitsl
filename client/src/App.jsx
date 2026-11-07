import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { ArrowRight, Bell, CalendarDays, FileText, HeartPulse, LayoutDashboard, LockKeyhole, LogOut, Mail, Menu, PhoneCall, Pill, Settings, ShieldCheck, UserRound, UsersRound, X } from 'lucide-react';
import axios from 'axios';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';
import { departments, hospitalProfile } from './config/hospital';

const hospitalLogoUrl = 'https://shivshaktihospital.in/image/logo.jpg';

const services = [
  ['24 Hour OPD', 'Day and night outpatient consultation support for patients.', 'https://shivshaktihospital.in/image/reception.jpg'],
  ['Digital X-Ray', 'Modern digital imaging support for faster clinical evaluation.', 'https://img.freepik.com/premium-photo/digital-xray-machine-radiology-white-background-medical-imaging-device_1234908-14879.jpg'],
  ['Ultrasound', 'Ultrasound services with a comfortable patient experience.', 'https://www.ultrasoundportables.com/images/models/Mindray/MX7/mindray_mx7_ultrasound_machine_in_exam_room_on_portable_wheeled_cart.jpg'],
  ['MRI', 'Advanced diagnostic imaging support, subject to availability.', 'https://riverwoodhealthcare.org/wp-content/uploads/2023/08/IMG_6254-2048x1536.jpg'],
];

const ambulanceImageUrl = 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=85';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const hospitalImages = [
  ['Hospital lobby', 'https://shivshaktihospital.in/image/lobby2.jpg'],
  ['Reception', 'https://shivshaktihospital.in/image/reception.jpg'],
  ['Patient room', 'https://shivshaktihospital.in/image/room3.jpg'],
  ['Hospital lift', 'https://5.imimg.com/data5/SELLER/Default/2023/1/VL/PL/YG/2931975/hospital-lift-1000x1000.jpg'],
  ['Emergency exit', 'https://5.imimg.com/data5/SELLER/Default/2022/12/II/BF/EW/161137626/hospital-emeegency-fire-exit-door-250x250.jpg'],
  ['Digital X-ray machine', 'https://img.freepik.com/premium-photo/digital-xray-machine-radiology-white-background-medical-imaging-device_1234908-14879.jpg'],
  ['Care facility', 'https://riverwoodhealthcare.org/wp-content/uploads/2023/08/IMG_6254-2048x1536.jpg'],
  ['Ultrasound machine', 'https://www.ultrasoundportables.com/images/models/Mindray/MX7/mindray_mx7_ultrasound_machine_in_exam_room_on_portable_wheeled_cart.jpg'],
];

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
      <img src="https://tse1.mm.bing.net/th/id/OIP.gAAalHdkpu9iSRe4EVftnAHaE8?r=0&pid=Api&h=220&P=0" alt="" aria-hidden="true" className="hero-background-image" />
      <div className="container hero-content grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div><span className="eyebrow"><ShieldCheck size={16} /> Care designed around you</span><h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">Welcome to <span className="text-blue">Shiv Shakti Hospital, Lucknow</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Quality healthcare, compassionate support, and modern facilities for you and your family.</p><div className="mt-8 flex flex-wrap gap-4"><Link to="/appointments" className="button-primary">Book an appointment <ArrowRight size={18} /></Link><a href="#contact" className="button-secondary"><PhoneCall size={18} /> Contact hospital</a></div></div>
      </div>
    </section>
    <section className="container py-20"><div className="grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><span className="eyebrow">About the hospital</span><h2 className="section-title mt-3">Care with comfort, trust, and compassion.</h2></div><p className="text-lg leading-8 text-slate-600">Shiv Shakti Hospital, Lucknow is committed to providing accessible and patient-focused healthcare in a safe, welcoming environment. Our hospital combines attentive staff, essential diagnostic services, and comfortable facilities to support every patient’s care journey.</p></div></section>
    <section className="bg-soft"><div className="container py-20"><div className="mb-10"><span className="eyebrow">Our services</span><h2 className="section-title mt-3">Healthcare services under one roof.</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(([title, text, image]) => <article className="card overflow-hidden bg-white p-0" key={title}><img src={image} alt={title} loading="lazy" className="h-40 w-full object-cover" /><div className="p-6"><span className="mb-6 block h-1 w-10 rounded-full bg-teal" /><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div></article>)}</div><div className="mt-8 overflow-hidden rounded-2xl bg-navy text-white"><div className="grid md:grid-cols-[.8fr_1.2fr]"><img src={ambulanceImageUrl} alt="Ambulance service vehicle" loading="lazy" className="h-64 w-full object-cover md:h-full" /><div className="flex flex-col justify-center gap-6 p-7 md:p-10"><div><span className="eyebrow">Always ready to help</span><h3 className="mt-2 font-display text-2xl font-bold">Ambulance services</h3><p className="mt-2 text-sm leading-6 text-slate-300">For emergency ambulance assistance, call 108.</p></div><a href="tel:108" className="button-primary w-fit bg-teal text-navy hover:shadow-teal/20"><PhoneCall size={18} /> Call 108</a></div></div></div></div></section>
    <section className="container py-20"><div className="mb-10"><span className="eyebrow">Our facilities</span><h2 className="section-title mt-3">A welcoming hospital environment.</h2></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{hospitalImages.map(([alt, image]) => <figure className="group overflow-hidden rounded-2xl bg-soft" key={image}><img src={image} alt={alt} loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" /><figcaption className="p-3 text-sm font-bold text-navy">{alt}</figcaption></figure>)}</div></section>
    <section className="container py-20"><div className="mb-10 flex items-end justify-between gap-5"><div><span className="eyebrow">Our focus</span><h2 className="section-title mt-3">Care that feels personal.</h2></div><Link to="/departments" className="hidden text-sm font-bold text-blue md:flex md:items-center md:gap-2">View departments <ArrowRight size={16} /></Link></div><div className="grid gap-5 md:grid-cols-3">{[['01', 'Expert guidance', 'Clear information and coordinated support at every step.'], ['02', 'Modern comfort', 'A calm, thoughtful experience for patients and families.'], ['03', 'Connected care', 'A foundation for secure digital access to your care journey.']].map(([number, title, text]) => <article key={number} className="card"><span className="text-sm font-bold text-teal">{number}</span><h3 className="mt-8 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></article>)}</div></section>
    <section id="contact" className="bg-soft"><div className="container grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center"><div><span className="eyebrow">Need assistance?</span><h2 className="section-title mt-3">We are here to help.</h2><p className="mt-3 text-slate-600">Hospital contact details will be added by an authorized administrator.</p></div><Link to="/contact" className="button-primary">Send an enquiry <ArrowRight size={18} /></Link></div></section>
  </Layout>;
}

function SimplePage({ title, eyebrow, children }) {
  return <Layout><section className="bg-soft"><div className="container py-20"><span className="eyebrow">{eyebrow}</span><h1 className="section-title mt-4">{title}</h1>{children}</div></section></Layout>;
}

function AuthPage({ register = false, admin = false }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(admin ? 'admin' : 'patient');
  const [error, setError] = useState('');
  const isAdmin = selectedRole === 'admin';
  const demoEmail = isAdmin ? 'admin@demo.com' : 'patient@demo.com';
  const demoPassword = isAdmin ? 'Admin@123' : 'Demo@123';

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!register && (email !== demoEmail || password !== demoPassword)) {
      setError(isAdmin ? 'Admin login ke liye admin@demo.com aur Admin@123 use karein.' : 'Demo login ke liye patient@demo.com aur Demo@123 use karein.');
      return;
    }

    if (register) {
      navigate('/login');
      return;
    }

    localStorage.setItem(isAdmin ? 'demoAdminSession' : 'demoPatientSession', 'active');
    navigate(isAdmin ? '/admin/dashboard' : '/patient/dashboard');
  }

  return <Layout>
    <section className="auth-page">
      <div className="container grid items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:py-24">
        <div className="hidden lg:block">
          <span className="eyebrow"><ShieldCheck size={16} /> Secure patient portal</span>
          <h1 className="mt-5 max-w-lg font-display text-5xl font-bold leading-tight">{isAdmin ? 'Manage hospital care with confidence.' : 'Your care journey, all in one place.'}</h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">{isAdmin ? 'Sign in to manage patients, appointments, staff, and hospital operations.' : 'Sign in to manage appointments and access your personal healthcare services.'}</p>
        </div>
        <div className="auth-card">
          <div className="mb-8 text-center">
            <img src={hospitalLogoUrl} alt="Shiv Shakti Hospital logo" className="mx-auto mb-4 h-16 w-auto object-contain" />
            <h2 className="font-display text-2xl font-bold">{register ? 'Create your patient account' : 'Welcome back'}</h2>
            <p className="mt-2 text-sm text-slate-500">{register ? 'Register to access the patient portal.' : `Sign in to continue to your ${isAdmin ? 'admin' : 'patient'} portal.`}</p>
          </div>
          <div className="mb-5 grid grid-cols-2 rounded-xl bg-soft p-1 text-sm font-bold">
            <button type="button" onClick={() => { setSelectedRole('patient'); setError(''); }} className={`rounded-lg py-3 text-center ${!isAdmin ? 'bg-white text-blue shadow-sm' : 'text-slate-500'}`}>Patient</button>
            <button type="button" onClick={() => { setSelectedRole('admin'); setError(''); }} className={`rounded-lg py-3 text-center ${isAdmin ? 'bg-white text-blue shadow-sm' : 'text-slate-500'}`}>Administrator</button>
          </div>
          <div className="mb-7 grid grid-cols-2 rounded-xl bg-soft p-1 text-sm font-bold">
            <Link to="/login" className={`rounded-lg py-3 text-center ${!register ? 'bg-white text-blue shadow-sm' : 'text-slate-500'}`}>Sign in</Link>
            <Link to="/register" className={`rounded-lg py-3 text-center ${register ? 'bg-white text-blue shadow-sm' : 'text-slate-500'}`}>Sign up</Link>
          </div>
          {register && isAdmin && <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">Administrator accounts cannot be created publicly. Please use the controlled admin provisioning process.</p>}
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {register && <label className="field"><span>Full name</span><div className="input-wrap"><UserRound size={18} /><input name="name" required type="text" placeholder="Enter your full name" /></div></label>}
            <label className="field"><span>Email address</span><div className="input-wrap"><Mail size={18} /><input name="email" required type="email" placeholder="you@example.com" /></div></label>
            {register && <label className="field"><span>Phone number</span><div className="input-wrap"><PhoneCall size={18} /><input name="phone" required type="tel" placeholder="Enter your phone number" /></div></label>}
            <label className="field"><span>Password</span><div className="input-wrap"><LockKeyhole size={18} /><input name="password" required type="password" placeholder="Enter your password" /></div></label>
            {register && !isAdmin && <label className="flex items-start gap-2 text-xs leading-5 text-slate-500"><input required type="checkbox" className="mt-1 accent-blue" />I agree to the privacy policy and terms of service.</label>}
            {!register && <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2 text-slate-500"><input type="checkbox" className="accent-blue" />Remember me</label><button type="button" className="font-bold text-blue">Forgot password?</button></div>}
            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">{error}</p>}
            <button type="submit" disabled={register && isAdmin} className="button-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-50">{register ? 'Create account' : 'Sign in'} <ArrowRight size={17} /></button>
          </form>
          <div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />OR<span className="h-px flex-1 bg-slate-200" /></div>
          {!isAdmin && <button type="button" className="button-secondary w-full">Continue with Google</button>}
          <p className="mt-6 text-center text-xs leading-5 text-slate-400">Authentication services will be securely connected in the next implementation phase.</p>
        </div>
      </div>
    </section>
  </Layout>;
}

function PatientDashboard() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem('demoPatientSession');
    navigate('/login');
  }

  const menuItems = [
    [LayoutDashboard, 'Dashboard Overview'],
    [CalendarDays, 'Appointments'],
    [FileText, 'Medical Records'],
    [Pill, 'Prescriptions'],
    [Bell, 'Notifications'],
    [Settings, 'Settings'],
  ];

  return <Layout><section className="dashboard-shell"><div className="container dashboard-layout"><aside className="dashboard-sidebar"><div className="dashboard-brand"><span className="grid size-10 place-items-center rounded-xl bg-blue text-white"><HeartPulse size={21} /></span><span><strong>Patient Portal</strong><small>Shiv Shakti Hospital</small></span></div><nav className="dashboard-nav">{menuItems.map(([Icon, label], index) => <button type="button" className={`dashboard-nav-item ${index === 0 ? 'active' : ''}`} key={label}><Icon size={19} /><span>{label}</span></button>)}</nav><button type="button" className="dashboard-logout" onClick={logout}><LogOut size={19} /> Logout</button></aside><main className="dashboard-main"><div className="dashboard-header"><div><span className="eyebrow">Patient portal</span><h1 className="section-title mt-3">Welcome, Demo Patient</h1><p className="mt-3 text-slate-600">Here is your healthcare overview.</p></div><button type="button" className="button-secondary" onClick={logout}><LogOut size={17} /> Logout</button></div><div className="dashboard-stats">{[['Appointments', '0', 'No upcoming appointments'], ['Medical records', '0', 'Secure records'], ['Prescriptions', '0', 'Active prescriptions']].map(([title, count, text]) => <article className="dashboard-stat" key={title}><span className="dashboard-stat-icon"><CalendarDays size={20} /></span><div><p>{title}</p><strong>{count}</strong><small>{text}</small></div></article>)}</div><div className="dashboard-panels"><article className="dashboard-panel"><div className="dashboard-panel-heading"><h2>Upcoming appointments</h2><button type="button" className="text-sm font-bold text-blue">View all</button></div><div className="dashboard-empty"><CalendarDays size={30} /><p>No appointments scheduled</p><small>Your upcoming appointments will appear here.</small><button type="button" className="button-primary mt-4" onClick={() => navigate('/appointments')}>Book appointment <ArrowRight size={16} /></button></div></article><article className="dashboard-panel"><div className="dashboard-panel-heading"><h2>Quick access</h2></div><div className="quick-links"><button type="button"><CalendarDays size={20} /><span>Book appointment</span><ArrowRight size={16} /></button><button type="button"><FileText size={20} /><span>View medical records</span><ArrowRight size={16} /></button><button type="button"><Pill size={20} /><span>View prescriptions</span><ArrowRight size={16} /></button></div></article></div></main></div></section></Layout>;
}

function AdminPatientManagement() {
  const adminSession = localStorage.getItem('demoAdminSession');
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminSession) navigate('/admin/login');
  }, [adminSession, navigate]);
  const features = [
    ['Add New Patient', 'Create a new patient registration record.'],
    ['Edit Patient Details', 'Update verified patient information.'],
    ['Delete/Deactivate Patient Account', 'Manage patient account status securely.'],
    ['Patient Registration', 'Register patients and capture required details.'],
    ['Patient ID Generation', 'Generate a unique patient identification number.'],
    ['Patient Medical History', 'View authorized medical history records.'],
    ['Patient Contact Information', 'Manage phone, email, and address details.'],
    ['Emergency Contact', 'Store and manage emergency contact details.'],
    ['Patient Search and Filters', 'Search patients by ID, name, or status.'],
    ['Admission and Discharge Records', 'Track admission and discharge activity.'],
  ];

  return <Layout><section className="dashboard-shell"><div className="container dashboard-layout"><aside className="dashboard-sidebar"><div className="dashboard-brand"><span className="grid size-10 place-items-center rounded-xl bg-blue text-white"><HeartPulse size={21} /></span><span><strong>Admin Portal</strong><small>Shiv Shakti Hospital</small></span></div><nav className="dashboard-nav"><button type="button" className="dashboard-nav-item" onClick={() => navigate('/admin/dashboard')}><LayoutDashboard size={19} /><span>Dashboard Overview</span></button><button type="button" className="dashboard-nav-item active"><UsersRound size={19} /><span>Patient Management</span></button></nav><button type="button" className="dashboard-logout" onClick={() => navigate('/login')}><LogOut size={19} /> Logout</button></aside><main className="dashboard-main"><div className="dashboard-header"><div><span className="eyebrow">Admin portal</span><h1 className="section-title mt-3">Patient Management</h1><p className="mt-3 text-slate-600">Manage patient registration, records, account status, and hospital movement.</p></div><button type="button" className="button-primary" onClick={() => window.alert('Patient registration form will be connected to the backend next.')}>+ Add New Patient</button></div><div className="patient-tools"><input type="search" placeholder="Search by patient name or ID" aria-label="Search patients" /><select aria-label="Filter patient status" defaultValue="all"><option value="all">All patient statuses</option><option value="active">Active</option><option value="inactive">Inactive</option><option value="admitted">Admitted</option></select><button type="button" className="button-secondary">Apply filters</button></div><div className="patient-feature-grid">{features.map(([title, description]) => <article className="patient-feature-card" key={title}><span className="patient-feature-icon"><UsersRound size={19} /></span><div><h2>{title}</h2><p>{description}</p></div><ArrowRight size={17} className="patient-feature-arrow" /></article>)}</div><div className="patient-record-panels"><article className="dashboard-panel"><div className="dashboard-panel-heading"><h2>Admission records</h2><span className="record-count">0 records</span></div><p className="mt-6 text-sm text-slate-500">Admission records will appear here after patient registration and admission workflows are connected.</p></article><article className="dashboard-panel"><div className="dashboard-panel-heading"><h2>Discharge records</h2><span className="record-count">0 records</span></div><p className="mt-6 text-sm text-slate-500">Discharge summaries and dates will appear here for authorized staff.</p></article></div></main></div></section></Layout>;
}

function AdminDoctorManagement() {
  const navigate = useNavigate();
  const features = [
    ['Add Doctor', 'Create a verified doctor profile.'],
    ['Edit Doctor Profile', 'Update qualifications and consultation details.'],
    ['Remove/Deactivate Doctor', 'Control active doctor visibility and access.'],
    ['Doctor ID', 'Assign a unique doctor identification number.'],
    ['Doctor Qualification', 'Record verified education and credentials.'],
    ['Specialization', 'Manage clinical specialization details.'],
    ['Experience', 'Record professional experience.'],
    ['Consultation Fees', 'Set consultation fees and billing details.'],
    ['Department Assignment', 'Assign doctors to hospital departments.'],
    ['Doctor Availability', 'Configure available consultation slots.'],
    ['Doctor Duty Schedule', 'Manage OPD, IPD, and duty timings.'],
  ];

  return <Layout><section className="dashboard-shell"><div className="container dashboard-layout"><AdminSidebar active="Doctor Management" navigate={navigate} /><main className="dashboard-main"><div className="dashboard-header"><div><span className="eyebrow">Admin portal</span><h1 className="section-title mt-3">Doctor Management</h1><p className="mt-3 text-slate-600">Manage verified doctors, schedules, departments, and consultation details.</p></div><button type="button" className="button-primary" onClick={() => window.alert('Doctor profile form will be connected to the backend next.')}>+ Add Doctor</button></div><div className="patient-tools"><input type="search" placeholder="Search by doctor name or ID" aria-label="Search doctors" /><select aria-label="Filter doctor department" defaultValue="all"><option value="all">All departments</option>{departments.map((department) => <option value={department.name} key={department.name}>{department.name}</option>)}</select><button type="button" className="button-secondary">Apply filters</button></div><div className="patient-feature-grid">{features.map(([title, description]) => <article className="patient-feature-card" key={title}><span className="patient-feature-icon"><UserRound size={19} /></span><div><h2>{title}</h2><p>{description}</p></div><ArrowRight size={17} className="patient-feature-arrow" /></article>)}</div></main></div></section></Layout>;
}

function AdminAppointmentManagement() {
  const navigate = useNavigate();
  const features = [
    ['Book Appointment', 'Create and schedule a patient appointment.'],
    ['View All Appointments', 'Review appointments across departments.'],
    ['Approve / Reject', 'Manage appointment requests and decisions.'],
    ['Reschedule Appointment', 'Move appointments to a new available slot.'],
    ['Cancel Appointment', 'Cancel appointments according to policy.'],
    ['Assign Doctor', 'Assign an available doctor to each appointment.'],
    ['Appointment Calendar', 'View schedules in a calendar-based layout.'],
    ['Patient Appointment History', 'Review authorized patient appointment history.'],
    ['Appointment Status Tracking', 'Track pending, approved, completed, and cancelled status.'],
  ];

  return <Layout><section className="dashboard-shell"><div className="container dashboard-layout"><AdminSidebar active="Appointments" navigate={navigate} /><main className="dashboard-main"><div className="dashboard-header"><div><span className="eyebrow">Admin portal</span><h1 className="section-title mt-3">Appointment Management</h1><p className="mt-3 text-slate-600">Coordinate bookings, doctor assignments, schedules, and appointment status.</p></div><button type="button" className="button-primary" onClick={() => window.alert('Appointment booking form will be connected to the backend next.')}>+ Book Appointment</button></div><div className="patient-tools"><input type="search" placeholder="Search by patient or appointment ID" aria-label="Search appointments" /><select aria-label="Filter appointment status" defaultValue="all"><option value="all">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select><input type="date" aria-label="Filter appointment date" /><button type="button" className="button-secondary">Apply filters</button></div><div className="patient-feature-grid">{features.map(([title, description]) => <article className="patient-feature-card" key={title}><span className="patient-feature-icon"><CalendarDays size={19} /></span><div><h2>{title}</h2><p>{description}</p></div><ArrowRight size={17} className="patient-feature-arrow" /></article>)}</div></main></div></section></Layout>;
}

function AdminDepartmentManagement() {
  const navigate = useNavigate();
  const departmentList = ['Cardiology', 'Orthopedics', 'Pediatrics', 'Gynecology', 'Neurology', 'Dermatology', 'General Medicine', 'Emergency Department'];

  return <Layout><section className="dashboard-shell"><div className="container dashboard-layout"><AdminSidebar active="Departments" navigate={navigate} /><main className="dashboard-main"><div className="dashboard-header"><div><span className="eyebrow">Admin portal</span><h1 className="section-title mt-3">Department Management</h1><p className="mt-3 text-slate-600">Manage hospital departments, descriptions, services, and active status.</p></div><button type="button" className="button-primary" onClick={() => window.alert('Department form will be connected to the backend next.')}>+ Add Department</button></div><div className="patient-tools"><input type="search" placeholder="Search departments" aria-label="Search departments" /><select aria-label="Filter department status" defaultValue="all"><option value="all">All departments</option><option value="active">Active</option><option value="inactive">Inactive</option></select><button type="button" className="button-secondary">Apply filters</button></div><div className="department-grid">{departmentList.map((name, index) => <article className="department-card" key={name}><div className="department-card-heading"><span className="patient-feature-icon"><LayoutDashboard size={19} /></span><span className="department-status">Active</span></div><h2>{name}</h2><p>Department services, doctors, and availability can be managed by an authorized administrator.</p><div className="department-actions"><button type="button">Edit</button><button type="button">Deactivate</button></div><small>Department ID: DEPT-{String(index + 1).padStart(3, '0')}</small></article>)}</div></main></div></section></Layout>;
}

function AdminOpdIpdManagement() {
  const navigate = useNavigate();
  const opdFeatures = [
    ['Patient registration', 'Register patients for outpatient consultation.'],
    ['Consultation queue', 'Track waiting and active consultation queues.'],
    ['Doctor assignment', 'Assign available doctors to OPD visits.'],
    ['Visit records', 'Maintain authorized OPD visit documentation.'],
  ];
  const ipdFeatures = [
    ['Patient admission', 'Record inpatient admission details.'],
    ['Bed allocation', 'Allocate an available bed to an admitted patient.'],
    ['Ward management', 'Manage ward capacity and patient movement.'],
    ['Discharge summary', 'Prepare and track discharge documentation.'],
  ];
  const bedFeatures = [
    ['Total Beds', '120', 'All registered hospital beds'],
    ['Available Beds', '34', 'Ready for allocation'],
    ['Occupied Beds', '86', 'Currently assigned to patients'],
    ['ICU Beds', '12', 'Critical care capacity'],
    ['General Ward', '72', 'General ward capacity'],
    ['Private Rooms', '18', 'Private room capacity'],
  ];

  return <Layout><section className="dashboard-shell"><div className="container dashboard-layout"><AdminSidebar active="OPD / IPD" navigate={navigate} /><main className="dashboard-main"><div className="dashboard-header"><div><span className="eyebrow">Admin portal</span><h1 className="section-title mt-3">OPD / IPD Management</h1><p className="mt-3 text-slate-600">Manage outpatient visits, inpatient admissions, beds, wards, and discharge workflows.</p></div><button type="button" className="button-primary" onClick={() => window.alert('OPD/IPD form will be connected to the backend next.')}>+ New record</button></div><section className="management-section"><div className="management-section-heading"><div><span className="eyebrow">Outpatient department</span><h2>OPD Management</h2></div></div><div className="patient-feature-grid">{opdFeatures.map(([title, description]) => <article className="patient-feature-card" key={title}><span className="patient-feature-icon"><UsersRound size={19} /></span><div><h2>{title}</h2><p>{description}</p></div><ArrowRight size={17} className="patient-feature-arrow" /></article>)}</div></section><section className="management-section"><div className="management-section-heading"><div><span className="eyebrow">Inpatient department</span><h2>IPD Management</h2></div></div><div className="patient-feature-grid">{ipdFeatures.map(([title, description]) => <article className="patient-feature-card" key={title}><span className="patient-feature-icon"><LayoutDashboard size={19} /></span><div><h2>{title}</h2><p>{description}</p></div><ArrowRight size={17} className="patient-feature-arrow" /></article>)}</div></section><section className="management-section"><div className="management-section-heading"><div><span className="eyebrow">Capacity overview</span><h2>Bed & Ward Management</h2></div><button type="button" className="button-secondary">Bed availability status</button></div><div className="bed-summary-grid">{bedFeatures.map(([title, count, description]) => <article className="admin-metric-card" key={title}><div className="admin-metric-heading"><span>{title}</span><LayoutDashboard size={20} /></div><strong>{count}</strong><small>{description}</small></article>)}</div><div className="patient-feature-grid bed-actions"><article className="patient-feature-card"><span className="patient-feature-icon"><LayoutDashboard size={19} /></span><div><h2>Bed Allocation</h2><p>Assign, release, and track beds for admitted patients.</p></div><ArrowRight size={17} className="patient-feature-arrow" /></article><article className="patient-feature-card"><span className="patient-feature-icon"><UsersRound size={19} /></span><div><h2>Patient Transfer</h2><p>Transfer patients between wards, rooms, and care levels.</p></div><ArrowRight size={17} className="patient-feature-arrow" /></article></div></section></main></div></section></Layout>;
}

function AdminBillingManagement() {
  const navigate = useNavigate();
  const charges = [
    ['Consultation Charges', 'Doctor consultation fees and service charges.'],
    ['Medicine Charges', 'Pharmacy and prescribed medicine charges.'],
    ['Laboratory Charges', 'Diagnostic and laboratory investigation charges.'],
    ['Room Charges', 'Room, ward, and bed usage charges.'],
  ];
  const records = [
    ['Payment History', 'Review completed payments and transaction details.'],
    ['Pending Payments', 'Track outstanding patient balances.'],
    ['Paid / Unpaid Status', 'Monitor invoice payment status at a glance.'],
    ['Invoice Generation', 'Generate itemized patient invoices.'],
    ['PDF Receipt', 'Download or print payment receipts as PDF.'],
    ['Refund Records', 'Maintain authorized refund and reversal records.'],
  ];

  return <Layout><section className="dashboard-shell"><div className="container dashboard-layout"><AdminSidebar active="Billing & Payments" navigate={navigate} /><main className="dashboard-main"><div className="dashboard-header"><div><span className="eyebrow">Admin portal</span><h1 className="section-title mt-3">Billing & Payment Management</h1><p className="mt-3 text-slate-600">Manage patient bills, charges, invoices, receipts, payments, and refunds.</p></div><button type="button" className="button-primary" onClick={() => window.alert('Patient billing form will be connected to the backend next.')}>+ Generate Patient Bill</button></div><section className="management-section"><div className="management-section-heading"><div><span className="eyebrow">Billing</span><h2>Generate Patient Bills</h2></div><div className="billing-status-summary"><span>Paid ₹0</span><span>Pending ₹0</span></div></div><div className="patient-tools"><input type="search" placeholder="Search patient or invoice ID" aria-label="Search billing records" /><select aria-label="Filter payment status" defaultValue="all"><option value="all">All payment statuses</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option><option value="pending">Pending</option></select><button type="button" className="button-secondary">Apply filters</button></div><div className="billing-charge-grid">{charges.map(([title, description]) => <article className="patient-feature-card" key={title}><span className="patient-feature-icon"><FileText size={19} /></span><div><h2>{title}</h2><p>{description}</p></div><ArrowRight size={17} className="patient-feature-arrow" /></article>)}</div></section><section className="management-section"><div className="management-section-heading"><div><span className="eyebrow">Transactions</span><h2>Payment & Invoice Records</h2></div></div><div className="billing-record-grid">{records.map(([title, description]) => <article className="department-card" key={title}><div className="department-card-heading"><span className="patient-feature-icon"><FileText size={19} /></span><span className={`billing-record-badge ${title === 'Pending Payments' ? 'pending' : ''}`}>{title === 'Pending Payments' ? 'Pending' : 'Available'}</span></div><h2>{title}</h2><p>{description}</p><div className="department-actions"><button type="button">{title === 'PDF Receipt' ? 'Download PDF' : 'Open records'}</button></div></article>)}</div></section></main></div></section></Layout>;
}

function AdminSidebar({ active, navigate }) {
  const items = ['Dashboard Overview', 'Patient Management', 'Doctor Management', 'Appointments', 'Departments', 'OPD / IPD', 'Beds & Wards', 'Billing & Payments'];
  const paths = { 'Dashboard Overview': '/admin/dashboard', 'Patient Management': '/admin/patients', 'Doctor Management': '/admin/doctors', Appointments: '/admin/appointments', Departments: '/admin/departments', 'OPD / IPD': '/admin/opd-ipd', 'Beds & Wards': '/admin/opd-ipd', 'Billing & Payments': '/admin/billing' };
  return <aside className="dashboard-sidebar"><div className="dashboard-brand"><span className="grid size-10 place-items-center rounded-xl bg-blue text-white"><HeartPulse size={21} /></span><span><strong>Admin Portal</strong><small>Shiv Shakti Hospital</small></span></div><nav className="dashboard-nav">{items.map((label) => <button type="button" onClick={() => navigate(paths[label])} className={`dashboard-nav-item ${active === label ? 'active' : ''}`} key={label}><LayoutDashboard size={19} /><span>{label}</span></button>)}</nav><button type="button" className="dashboard-logout" onClick={() => { localStorage.removeItem('demoAdminSession'); navigate('/admin/login'); }}><LogOut size={19} /> Logout</button></aside>;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const adminSession = localStorage.getItem('demoAdminSession');
  const [metrics, setMetrics] = useState(null);
  const [charts, setCharts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!adminSession) navigate('/admin/login');
  }, [adminSession, navigate]);

  useEffect(() => {
    axios.get(`${apiUrl}/dashboard/overview`)
      .then(({ data }) => { setMetrics(data.metrics); setCharts(data.charts); })
      .catch(() => setError('Dashboard data load nahi ho saka. Backend server check karein.'));
  }, []);

  const metricCards = [
    ['Total Patients', 'totalPatients', UsersRound],
    ['Total Doctors', 'totalDoctors', UserRound],
    ['Total Staff', 'totalStaff', UsersRound],
    ['Total Appointments', 'totalAppointments', CalendarDays],
    ["Today's Appointments", 'todaysAppointments', CalendarDays],
    ['Pending Appointments', 'pendingAppointments', Bell],
    ['Completed Appointments', 'completedAppointments', FileText],
    ['Cancelled Appointments', 'cancelledAppointments', FileText],
    ['Total Revenue', 'totalRevenue', null, true],
    ['Monthly Revenue', 'monthlyRevenue', null, true],
    ['Available Beds', 'availableBeds', LayoutDashboard],
    ['Occupied Beds', 'occupiedBeds', LayoutDashboard],
  ];

  const chartColors = ['#1769aa', '#18b6b0', '#f59e0b', '#ef6a6a', '#8b7bd8'];
  const chartCard = (title, content) => <article className="chart-card"><h2>{title}</h2><div className="chart-area">{content}</div></article>;

  return <Layout><section className="dashboard-shell"><div className="container dashboard-layout"><aside className="dashboard-sidebar"><div className="dashboard-brand"><span className="grid size-10 place-items-center rounded-xl bg-blue text-white"><HeartPulse size={21} /></span><span><strong>Admin Portal</strong><small>Shiv Shakti Hospital</small></span></div><nav className="dashboard-nav">{['Dashboard Overview', 'Patient Management', 'Doctor Management', 'Appointments', 'Departments', 'OPD / IPD', 'Beds & Wards', 'Billing & Payments', 'Pharmacy', 'Laboratory', 'Staff Management', 'Medical Records', 'Reports & Analytics', 'Notifications', 'Settings'].map((label, index) =>   <button type="button" onClick={() => label === 'Patient Management' ? navigate('/admin/patients') : label === 'Doctor Management' ? navigate('/admin/doctors') : label === 'Appointments' ? navigate('/admin/appointments') : null} className={`dashboard-nav-item ${index === 0 ? 'active' : ''}`} key={label}><LayoutDashboard size={19} /><span>{label}</span></button>)}</nav></aside><main className="dashboard-main"><div className="dashboard-header"><div><span className="eyebrow">Admin portal</span><h1 className="section-title mt-3">Dashboard Overview</h1><p className="mt-3 text-slate-600">Hospital operations summary and key performance indicators.</p></div><button type="button" className="button-secondary" onClick={() => window.location.reload()}>Refresh data</button></div>{error && <p className="dashboard-error">{error}</p>}{!metrics && !error && <p className="dashboard-loading">Loading dashboard data...</p>}{metrics && charts && <><div className="admin-metrics-grid">{metricCards.map(([label, key, Icon, currency]) => <article className="admin-metric-card" key={key}><div className="admin-metric-heading"><span>{label}</span>{Icon && <Icon size={20} />}</div><strong>{currency ? `₹${metrics[key].toLocaleString('en-IN')}` : metrics[key].toLocaleString('en-IN')}</strong><small>Live backend metric</small></article>)}</div><div className="charts-grid">{chartCard('Monthly Patient Statistics', <ResponsiveContainer><LineChart data={charts.monthlyPatients}><CartesianGrid strokeDasharray="3 3" stroke="#edf2f6" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="patients" stroke="#1769aa" strokeWidth={3} /></LineChart></ResponsiveContainer>)}{chartCard('Appointment Trends', <ResponsiveContainer><AreaChart data={charts.appointmentTrends}><CartesianGrid strokeDasharray="3 3" stroke="#edf2f6" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Area type="monotone" dataKey="appointments" stroke="#18b6b0" fill="#18b6b0" fillOpacity={.15} strokeWidth={3} /></AreaChart></ResponsiveContainer>)}{chartCard('Revenue Analytics', <ResponsiveContainer><BarChart data={charts.revenueAnalytics}><CartesianGrid strokeDasharray="3 3" stroke="#edf2f6" /><XAxis dataKey="month" /><YAxis tickFormatter={(value) => `₹${value / 1000}k`} /><Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} /><Bar dataKey="revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>)}{chartCard('Department-wise Patients', <ResponsiveContainer><PieChart><Pie data={charts.departmentPatients} dataKey="patients" nameKey="department" cx="50%" cy="50%" outerRadius={90} label>{charts.departmentPatients.map((entry, index) => <Cell key={entry.department} fill={chartColors[index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>)}{chartCard('Patient Admission and Discharge Statistics', <ResponsiveContainer><LineChart data={charts.admissionDischarge}><CartesianGrid strokeDasharray="3 3" stroke="#edf2f6" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="admissions" name="Admissions" stroke="#1769aa" strokeWidth={3} /><Line type="monotone" dataKey="discharges" name="Discharges" stroke="#ef6a6a" strokeWidth={3} /></LineChart></ResponsiveContainer>)}</div></>}</main></div></section></Layout>;
}

function App() {
  return <Routes><Route path="/" element={<Home />} /><Route path="/about" element={<SimplePage eyebrow="About the hospital" title="Shiv Shakti Hospital, Lucknow"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Shiv Shakti Hospital is designed around compassionate, accessible, and patient-focused healthcare. We aim to provide a comfortable environment supported by attentive care and modern hospital facilities.</p><p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Our hospital profile, mission, vision, and verified facility information will continue to be managed through the administrator portal.</p></SimplePage>} /><Route path="/doctors" element={<SimplePage eyebrow="Care team" title="Meet our doctors"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Verified doctor profiles will appear here once they are added by an administrator.</p></SimplePage>} /><Route path="/departments" element={<SimplePage eyebrow="Specialties" title="Our departments"><div className="mt-10 grid gap-5 md:grid-cols-2">{departments.map((department) => <article className="card bg-white" key={department.name}><h2 className="font-display text-xl font-bold">{department.name}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{department.description}</p></article>)}</div></SimplePage>} /><Route path="/services" element={<SimplePage eyebrow="What we offer" title="Hospital services"><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(([title, text, image]) => <article className="card overflow-hidden bg-white p-0" key={title}><img src={image} alt={title} loading="lazy" className="h-40 w-full object-cover" /><div className="p-6"><span className="mb-6 block h-1 w-10 rounded-full bg-teal" /><h2 className="font-display text-xl font-bold">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div></article>)}</div><div className="mt-8 overflow-hidden rounded-2xl bg-navy text-white"><div className="grid md:grid-cols-[.8fr_1.2fr]"><img src={ambulanceImageUrl} alt="Ambulance service vehicle" loading="lazy" className="h-64 w-full object-cover md:h-full" /><div className="flex flex-col justify-center gap-6 p-7 md:p-10"><div><span className="eyebrow">Always ready to help</span><h2 className="mt-2 font-display text-2xl font-bold">Ambulance services</h2><p className="mt-2 text-slate-300">For emergency ambulance assistance, call 108.</p></div><a href="tel:108" className="button-primary w-fit bg-teal text-navy"><PhoneCall size={18} /> Call 108</a></div></div></div></SimplePage>} /><Route path="/appointments" element={<SimplePage eyebrow="Appointments" title="Book an appointment"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Secure appointment booking will be available after the patient account and availability services are connected.</p></SimplePage>} /><Route path="/contact" element={<SimplePage eyebrow="Contact" title="How can we help?"><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{hospitalProfile.contact.email}</p></SimplePage>} /><Route path="/login" element={<AuthPage />} /><Route path="/register" element={<AuthPage register />} /><Route path="/admin/login" element={<AuthPage admin />} /><Route path="/patient/dashboard" element={<PatientDashboard />} /><Route path="/admin/dashboard" element={<AdminDashboard />} /><Route path="/admin/patients" element={<AdminPatientManagement />} /><Route path="/admin/doctors" element={<AdminDoctorManagement />} /><Route path="/admin/appointments" element={<AdminAppointmentManagement />} /><Route path="/admin/departments" element={<AdminDepartmentManagement />} /><Route path="/admin/opd-ipd" element={<AdminOpdIpdManagement />} /><Route path="/admin/billing" element={<AdminBillingManagement />} /></Routes>;
}

export default App;
