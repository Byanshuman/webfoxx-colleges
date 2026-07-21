import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors());

// Shared Seed Data
const SEED_COLLEGES = [
  {
    id: 'col-1',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    slug: 'iit-bombay',
    establishmentYear: 1958,
    ownership: 'Government',
    naacGrade: 'A++',
    location: { city: 'Mumbai', state: 'Maharashtra' },
    rating: 4.9,
    reviewCount: 342,
    overview: 'Indian Institute of Technology Bombay is a premier public technical research university located in Powai, Mumbai. Recognized as an Institute of Eminence, IIT Bombay is famous for world-class engineering programs, cutting-edge innovation labs, and strong global placements.',
    highlights: ['NIRF #1 Engineering Institute', 'Institute of Eminence (IoE)', '100% Core Placements'],
    facilities: ['Central Library', '10Gbps Wi-Fi', '18 Hostels', 'Supercomputing Lab'],
    highestPackage: '₹3.67 Cr',
    avgPackage: '₹23.5 LPA',
    requiredExam: { name: 'JEE Advanced 2026', link: 'https://academy.webfoxx.com/jee-advanced' }
  },
  {
    id: 'col-2',
    name: 'Indian Institute of Management Ahmedabad',
    shortName: 'IIM Ahmedabad',
    slug: 'iim-ahmedabad',
    establishmentYear: 1961,
    ownership: 'Government',
    naacGrade: 'A++',
    location: { city: 'Ahmedabad', state: 'Gujarat' },
    rating: 4.95,
    reviewCount: 289,
    overview: 'IIM Ahmedabad is India’s premier management institution, consistently ranked #1 in management education. Renowned for its rigorous case-study methodology, world-renowned faculty, and unmatched leadership pipeline.',
    highlights: ['NIRF #1 Management Institute', 'EQUIS Accredited', 'Top Global Recruiters'],
    facilities: ['Vikram Sarabhai Library', 'Louis Kahn Plaza', 'Executive Hostels'],
    highestPackage: '₹1.15 Cr',
    avgPackage: '₹34.3 LPA',
    requiredExam: { name: 'CAT 2026', link: 'https://academy.webfoxx.com/cat' }
  },
  {
    id: 'col-3',
    name: 'Birla Institute of Technology and Science',
    shortName: 'BITS Pilani',
    slug: 'bits-pilani',
    establishmentYear: 1964,
    ownership: 'Private',
    naacGrade: 'A',
    location: { city: 'Pilani', state: 'Rajasthan' },
    rating: 4.8,
    reviewCount: 215,
    overview: 'BITS Pilani is a top-ranked private deemed university known for its merit-based admission via BITSAT, zero-attendance policy option, and 6-month Practice School industry internship program.',
    highlights: ['Top Private Tech University', '6-Month Industry Practice School', 'Global Alumni Network'],
    facilities: ['Innovation Centre', 'Practice School Cell', 'Student Activity Centre'],
    highestPackage: '₹60.7 LPA',
    avgPackage: '₹20.9 LPA',
    requiredExam: { name: 'BITSAT 2026', link: 'https://academy.webfoxx.com/bitsat' }
  }
];

// Lucide React SVG Outline Icon Helpers
const ICONS = {
  GraduationCap: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
  ShieldCheck: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  Smartphone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
  MapPin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  Building2: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 0 2 2h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
  Scale: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>`,
  ArrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  BookOpen: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
};

// Public Layout Renderer
function renderGuestLayout(title: string, content: string, currentPath: string = '/') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — WebFoxx Colleges</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-midnight-navy: #0F172A;
      --color-webfoxx-blue: #2563EB;
      --color-webfoxx-blue-hover: #1D4ED8;
      --color-webfoxx-blue-light: #EFF6FF;
      --color-background-gray: #F8FAFC;
      --color-card-bg: #FFFFFF;
      --color-text-main: #1E293B;
      --color-text-muted: #64748B;
      --color-border-gray: #E2E8F0;
      --color-success: #16A34A;
      --font-primary: 'Plus Jakarta Sans', sans-serif;
      --radius-md: 10px;
      --radius-lg: 16px;
      --radius-full: 9999px;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-primary); background-color: var(--color-background-gray); color: var(--color-text-main); line-height: 1.5; min-height: 100vh; display: flex; flex-direction: column; }
    a { text-decoration: none; color: inherit; }
    .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .flex-align { display: flex; align-items: center; gap: 0.4rem; }
    .lucide-icon { display: inline-block; vertical-align: middle; flex-shrink: 0; }
    .text-success { color: var(--color-success); }
    .site-header { background-color: #ffffff; border-bottom: 1px solid var(--color-border-gray); position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow-sm); }
    .header-inner { display: flex; align-items: center; justify-content: space-between; height: 72px; }
    .brand-logo { display: flex; align-items: center; gap: 0.75rem; }
    .brand-icon { width: 40px; height: 40px; border-radius: var(--radius-md); background-color: var(--color-webfoxx-blue-light); color: var(--color-webfoxx-blue); display: flex; align-items: center; justify-content: center; }
    .brand-title { font-weight: 800; font-size: 1.25rem; color: var(--color-midnight-navy); line-height: 1.1; }
    .brand-tagline { font-size: 0.75rem; color: var(--color-webfoxx-blue); font-weight: 700; display: block; }
    .desktop-nav { display: flex; gap: 1.25rem; }
    .nav-link { font-weight: 600; font-size: 0.875rem; color: var(--color-text-muted); transition: color 0.2s; }
    .nav-link:hover, .nav-link.active { color: var(--color-webfoxx-blue); }
    .header-actions { display: flex; align-items: center; gap: 0.75rem; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.65rem 1.3rem; border-radius: var(--radius-md); font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; border: none; }
    .btn-primary { background-color: var(--color-webfoxx-blue); color: #fff; }
    .btn-primary:hover { background-color: var(--color-webfoxx-blue-hover); }
    .btn-outline { border: 1px solid var(--color-border-gray); background-color: #fff; color: var(--color-midnight-navy); }
    .btn-outline:hover { border-color: var(--color-webfoxx-blue); color: var(--color-webfoxx-blue); background-color: var(--color-webfoxx-blue-light); }
    .btn-sm { padding: 0.45rem 0.9rem; font-size: 0.825rem; }
    .site-footer { background-color: var(--color-midnight-navy); color: #fff; padding-top: 4rem; margin-top: auto; }
    .footer-content { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .footer-desc { color: #94a3b8; font-size: 0.875rem; margin-top: 0.75rem; line-height: 1.6; }
    .footer-links h4 { font-size: 1rem; font-weight: 700; margin-bottom: 1.25rem; color: #fff; }
    .footer-links a { display: block; color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem; }
    .footer-links a:hover { color: #fff; }
    .footer-bottom { background-color: #090d16; padding: 1.25rem 0; font-size: 0.825rem; color: #64748b; }
    .bottom-inner { display: flex; justify-content: space-between; align-items: center; }
    .trust-badge { color: #4ade80; font-weight: 600; }
    .card { background-color: #fff; border-radius: var(--radius-lg); padding: 1.75rem; border: 1px solid var(--color-border-gray); box-shadow: var(--shadow-sm); }
    .badge { display: inline-block; padding: 0.25rem 0.65rem; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700; }
    .badge-grade { background-color: #22c55e; color: #fff; }
    .badge-ownership { background-color: var(--color-webfoxx-blue-light); color: var(--color-webfoxx-blue); }

    /* Cross-Ecosystem Banner */
    .ecosystem-banner { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: #fff; padding: 1.25rem; border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center; margin: 1.5rem 0; }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand-logo">
        <div class="brand-icon">${ICONS.GraduationCap}</div>
        <div>
          <span class="brand-title">WebFoxx Colleges</span>
          <span class="brand-tagline">College Discovery Engine</span>
        </div>
      </a>
      <nav class="desktop-nav">
        <a href="/colleges" class="nav-link ${currentPath === '/colleges' ? 'active' : ''}">Find Colleges</a>
        <a href="/courses" class="nav-link ${currentPath === '/courses' ? 'active' : ''}">Courses</a>
        <a href="/exams" class="nav-link ${currentPath === '/exams' ? 'active' : ''}">Exams</a>
        <a href="/rankings" class="nav-link ${currentPath === '/rankings' ? 'active' : ''}">Rankings</a>
        <a href="/compare" class="nav-link ${currentPath === '/compare' ? 'active' : ''}">Compare</a>
        <a href="/scholarships" class="nav-link ${currentPath === '/scholarships' ? 'active' : ''}">Scholarships</a>
      </nav>
      <div class="header-actions">
        <a href="/login" class="btn btn-outline btn-sm flex-align">${ICONS.Smartphone} <span>Sign In</span></a>
        <a href="/compare" class="btn btn-primary btn-sm flex-align">${ICONS.Scale} <span>Compare</span></a>
      </div>
    </div>
  </header>

  <main style="flex: 1;">
    ${content}
  </main>

  <footer class="site-footer">
    <div class="container footer-content">
      <div>
        <div class="brand-logo" style="margin-bottom: 0.5rem;">
          <div class="brand-icon">${ICONS.GraduationCap}</div>
          <span class="brand-title" style="color:#fff;">WebFoxx Colleges</span>
        </div>
        <p style="color:#60a5fa; font-weight:700; font-size:0.9rem;">"Find Colleges. Not Spam."</p>
        <p class="footer-desc">India's leading institution discovery engine. Unified with WebFoxx SSO across Academy, Colleges, and Jobs platforms.</p>
      </div>
      <div class="footer-links">
        <h4>WebFoxx Ecosystem</h4>
        <a href="/">Colleges Discovery</a>
        <a href="https://academy.webfoxx.com" target="_blank">WebFoxx Academy</a>
        <a href="https://jobs.webfoxx.com" target="_blank">WebFoxx Jobs</a>
      </div>
      <div class="footer-links">
        <h4>Role Workspaces</h4>
        <a href="/student/dashboard">Student Dashboard</a>
        <a href="/rep/dashboard">College Rep Dashboard</a>
        <a href="/content/dashboard">Content Manager</a>
        <a href="/admin/dashboard">Administrator</a>
        <a href="/superadmin/dashboard">Super Admin</a>
      </div>
      <div class="footer-links">
        <h4>Trust & Legal</h4>
        <a href="#">Privacy Guarantee</a>
        <a href="#">Single Sign-On (SSO)</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container bottom-inner">
        <p>© 2026 WebFoxx Ecosystem. All rights reserved.</p>
        <span class="trust-badge flex-align">${ICONS.ShieldCheck} <span>Shared Firebase Identity & Railway PostgreSQL Source of Truth</span></span>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// 1. Landing Page
app.get('/', c => c.html(renderGuestLayout('WebFoxx Colleges — Find Colleges. Not Spam.', `
  <section style="background-color: var(--color-midnight-navy); color: #fff; padding: 4.5rem 0 5.5rem;">
    <div class="container" style="text-align: center; max-width: 850px;">
      <span style="background-color: rgba(37,99,235,0.2); color: #60a5fa; padding: 0.35rem 1rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 1.25rem;">
        ${ICONS.ShieldCheck} ZERO SPAM TELECALLERS PROMISE
      </span>
      <h1 style="font-size: 3rem; font-weight: 800; line-height: 1.15; margin-bottom: 1rem;">
        Discover Top Colleges in India. <br><span style="color: #60a5fa;">Transparent Fees & Placements.</span>
      </h1>
      <p style="color: #94a3b8; font-size: 1.15rem; margin-bottom: 2.5rem;">
        Explore 5,000+ verified engineering, management, and medical institutions without handing your phone number to sales agents.
      </p>

      <form action="/colleges" method="GET" style="display: flex; background: #fff; padding: 0.5rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); gap: 0.5rem;">
        <input type="text" name="q" placeholder="Search IIT Bombay, MBA in Mumbai, Computer Science..." style="flex:1; border:none; padding: 0.75rem 1rem; font-size: 1rem; outline:none; font-family: inherit;">
        <button type="submit" class="btn btn-primary" style="padding: 0.75rem 1.75rem;">Explore Colleges</button>
      </form>
    </div>
  </section>

  <section class="container" style="padding: 4rem 1.5rem;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.75rem;">
      ${SEED_COLLEGES.map(col => `
        <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span class="badge badge-grade">NAAC ${col.naacGrade}</span>
              <span class="badge badge-ownership">${col.ownership}</span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.4rem; color: var(--color-midnight-navy);">${col.name}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1rem;" class="flex-align">
              ${ICONS.MapPin} <span>${col.location.city}, ${col.location.state} • Est. ${col.establishmentYear}</span>
            </p>

            <!-- Ecosystem Cross Recommendation -->
            <div style="background:#f1f5f9; padding:0.75rem; border-radius:8px; margin-top:0.75rem;">
              <span style="font-size:0.75rem; font-weight:700; color:#475569; display:block;">Required Entrance Exam</span>
              <a href="${col.requiredExam.link}" target="_blank" style="color:var(--color-webfoxx-blue); font-weight:700; font-size:0.85rem;" class="flex-align">
                ${ICONS.BookOpen} <span>Prepare for ${col.requiredExam.name} on Academy →</span>
              </a>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
            <a href="/colleges/${col.slug}" class="btn btn-primary btn-sm" style="flex:1;">View Profile</a>
            <a href="/compare?colleges=${col.id}" class="btn btn-outline btn-sm">Compare</a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
`, '/')));

// 2. College Profile View with Cross-Ecosystem Recommendation Banner
app.get('/colleges/:slug', c => {
  const col = SEED_COLLEGES.find(item => item.slug === c.req.param('slug')) || SEED_COLLEGES[0];
  return c.html(renderGuestLayout(`${col.name} Profile`, `
    <section class="container" style="padding: 4rem 1.5rem;">
      <div class="card">
        <span class="badge badge-grade" style="margin-bottom: 0.75rem;">NAAC ${col.naacGrade}</span>
        <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">${col.name}</h1>
        <p style="color: var(--color-text-muted); font-size: 1rem; margin-bottom: 1.5rem;">${col.overview}</p>

        <!-- Colleges -> Academy Recommendation Banner -->
        <div class="ecosystem-banner">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: #a5b4fc; letter-spacing: 0.05em;">Intelligent Ecosystem Recommendation</span>
            <h4 style="font-size: 1.15rem; font-weight: 800; margin-top: 0.2rem;">Targeting admission at ${col.shortName}?</h4>
            <p style="font-size: 0.875rem; color: #c7d2fe;">Prepare for ${col.requiredExam.name} with AI-driven mock tests & PYQs on WebFoxx Academy.</p>
          </div>
          <a href="${col.requiredExam.link}" target="_blank" class="btn btn-primary" style="background:#4f46e5; white-space:nowrap;" class="flex-align">
            <span>Start ${col.requiredExam.name} Prep</span> ${ICONS.ArrowRight}
          </a>
        </div>

        <a href="/compare?colleges=${col.id}" class="btn btn-outline" style="margin-top:1rem;">Compare Institution</a>
      </div>
    </section>
  `, '/colleges'));
});

// Other Public Routes
app.get('/colleges', c => c.html(renderGuestLayout('Find Colleges', `<section class="container" style="padding:4rem 1.5rem;"><h1>College Search Directory</h1></section>`, '/colleges')));
app.get('/courses', c => c.html(renderGuestLayout('Courses Directory', `<section class="container" style="padding:4rem 1.5rem;"><h1>Academic Courses</h1></section>`, '/courses')));
app.get('/exams', c => c.html(renderGuestLayout('Entrance Exams', `<section class="container" style="padding:4rem 1.5rem;"><h1>Entrance Exams Directory</h1></section>`, '/exams')));
app.get('/rankings', c => c.html(renderGuestLayout('College Rankings', `<section class="container" style="padding:4rem 1.5rem;"><h1>NIRF College Rankings</h1></section>`, '/rankings')));
app.get('/compare', c => c.html(renderGuestLayout('Compare Matrix', `<section class="container" style="padding:4rem 1.5rem;"><h1>College Comparison Matrix</h1></section>`, '/compare')));
app.get('/scholarships', c => c.html(renderGuestLayout('Scholarships', `<section class="container" style="padding:4rem 1.5rem;"><h1>Scholarships & Aid</h1></section>`, '/scholarships')));
app.get('/login', c => c.html(renderGuestLayout('Sign In', `<section class="container" style="padding:5rem 1.5rem; text-align:center;"><h1>User Sign In</h1></section>`, '/login')));

// Health Check API
app.get('/health', c => c.json({
  status: 'OK',
  worker: 'webfoxx-colleges-worker',
  domain: 'college.webfoxx.com',
  ecosystem: 'WebFoxx (Firebase Auth + Railway Express API + Railway PostgreSQL)',
  timestamp: new Date().toISOString()
}));

export default app;
