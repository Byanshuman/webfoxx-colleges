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
    avgPackage: '₹23.5 LPA'
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
    avgPackage: '₹34.3 LPA'
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
    avgPackage: '₹20.9 LPA'
  }
];

const SEED_COURSES = [
  { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', level: 'UG', avgFees: '₹2.2L / yr' },
  { name: 'MBA Business Analytics', duration: '2 Years', level: 'PG', avgFees: '₹12.5L / yr' },
  { name: 'B.Des Industrial Design', duration: '4 Years', level: 'UG', avgFees: '₹1.8L / yr' },
  { name: 'M.Tech Artificial Intelligence', duration: '2 Years', level: 'PG', avgFees: '₹1.5L / yr' }
];

const SEED_EXAMS = [
  { name: 'JEE Advanced 2026', category: 'Engineering', date: 'May 2026', mode: 'CBT Online' },
  { name: 'CAT 2026', category: 'Management', date: 'Nov 2026', mode: 'CBT Online' },
  { name: 'BITSAT 2026', category: 'Engineering', date: 'June 2026', mode: 'CBT Online' }
];

// Lucide React SVG Outline Icon Helpers (Chapter 19 Compliant)
const ICONS = {
  GraduationCap: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
  ShieldCheck: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  Smartphone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
  MapPin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  Star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  CheckCircle2: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon text-success"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  Building2: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 0 2 2h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
  Scale: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>`,
  BookOpen: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  Search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  Award: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  User: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
};

// Layout wrapper helper (WebFoxx Colleges - College Discovery Engine Layout)
function renderLayout(title: string, content: string, currentPath: string = '/') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — WebFoxx Colleges</title>
  <meta name="description" content="India's premier college and institution discovery platform. Explore fees, NIRF rankings, courses, and compare colleges without spam calls.">
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
      --font-data: 'Lato', sans-serif;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
      --radius-full: 9999px;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-primary);
      background-color: var(--color-background-gray);
      color: var(--color-text-main);
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    a { text-decoration: none; color: inherit; }
    .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .flex-align { display: flex; align-items: center; gap: 0.4rem; }
    .lucide-icon { display: inline-block; vertical-align: middle; flex-shrink: 0; }
    .text-success { color: var(--color-success); }

    /* Header Navigation */
    .site-header {
      background-color: #ffffff;
      border-bottom: 1px solid var(--color-border-gray);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-sm);
    }
    .header-inner { display: flex; align-items: center; justify-content: space-between; height: 72px; }
    .brand-logo { display: flex; align-items: center; gap: 0.75rem; }
    .brand-icon {
      width: 40px; height: 40px; border-radius: var(--radius-md);
      background-color: var(--color-webfoxx-blue-light); color: var(--color-webfoxx-blue);
      display: flex; align-items: center; justify-content: center;
    }
    .brand-title { font-weight: 800; font-size: 1.25rem; color: var(--color-midnight-navy); line-height: 1.1; }
    .brand-tagline { font-size: 0.75rem; color: var(--color-webfoxx-blue); font-weight: 700; display: block; }

    .desktop-nav { display: flex; gap: 1.5rem; }
    .nav-link { font-weight: 600; font-size: 0.9rem; color: var(--color-text-muted); transition: color 0.2s; }
    .nav-link:hover, .nav-link.active { color: var(--color-webfoxx-blue); }

    .header-actions { display: flex; align-items: center; gap: 0.75rem; }
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
      padding: 0.6rem 1.2rem; border-radius: var(--radius-md); font-weight: 700; font-size: 0.9rem;
      cursor: pointer; transition: all 0.2s; border: none;
    }
    .btn-primary { background-color: var(--color-webfoxx-blue); color: #fff; }
    .btn-primary:hover { background-color: var(--color-webfoxx-blue-hover); }
    .btn-outline { border: 1px solid var(--color-border-gray); background-color: #fff; color: var(--color-midnight-navy); }
    .btn-outline:hover { border-color: var(--color-webfoxx-blue); color: var(--color-webfoxx-blue); }
    .btn-sm { padding: 0.45rem 0.9rem; font-size: 0.825rem; }

    /* Footer */
    .site-footer { background-color: var(--color-midnight-navy); color: #fff; padding-top: 4rem; margin-top: auto; }
    .footer-content { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .footer-desc { color: #94a3b8; font-size: 0.875rem; margin-top: 0.75rem; line-height: 1.6; }
    .footer-links h4 { font-size: 1rem; font-weight: 700; margin-bottom: 1.25rem; color: #fff; }
    .footer-links a { display: block; color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.75rem; }
    .footer-links a:hover { color: #fff; }
    .footer-bottom { background-color: #090d16; padding: 1.25rem 0; font-size: 0.825rem; color: #64748b; }
    .bottom-inner { display: flex; justify-content: space-between; align-items: center; }
    .trust-badge { color: #4ade80; font-weight: 600; }

    /* Component Styles */
    .card { background-color: #fff; border-radius: var(--radius-lg); padding: 1.75rem; border: 1px solid var(--color-border-gray); box-shadow: var(--shadow-sm); }
    .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700; }
    .badge-grade { background-color: #22c55e; color: #fff; }
    .badge-ownership { background-color: var(--color-webfoxx-blue-light); color: var(--color-webfoxx-blue); }
    .data-text { font-family: var(--font-data); }

    @media (max-width: 768px) {
      .desktop-nav { display: none; }
      .footer-content { grid-template-columns: 1fr; gap: 2rem; }
    }
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
        <a href="/compare" class="nav-link ${currentPath === '/compare' ? 'active' : ''}">Compare Matrix</a>
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
        <p class="footer-desc">India's leading institution discovery engine. Explore verified fees, NIRF rankings, courses, and cutoffs without marketing spam.</p>
      </div>
      <div class="footer-links">
        <h4>Discovery</h4>
        <a href="/colleges">Explore Colleges</a>
        <a href="/courses">Browse Courses</a>
        <a href="/exams">Entrance Exams</a>
        <a href="/rankings">NIRF Rankings</a>
      </div>
      <div class="footer-links">
        <h4>Portals</h4>
        <a href="/student/dashboard">Student Portal</a>
        <a href="/rep/dashboard">College Representative</a>
        <a href="/content/dashboard">Content Manager</a>
        <a href="/login">User Authentication</a>
      </div>
      <div class="footer-links">
        <h4>Trust & Legal</h4>
        <a href="/about">About WebFoxx</a>
        <a href="/contact">Contact Support</a>
        <a href="#">Privacy Guarantee</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container bottom-inner">
        <p>© 2026 WebFoxx Colleges. All rights reserved.</p>
        <span class="trust-badge flex-align">${ICONS.ShieldCheck} <span>100% Verified Data & Privacy Guaranteed</span></span>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// 1. Landing Page (Guest)
app.get('/', (c) => {
  const content = `
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

      <form action="/colleges" method="GET" style="display: flex; background: #fff; padding: 0.5rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); gap: 0.5rem;">
        <input type="text" name="q" placeholder="Search IIT Bombay, MBA in Mumbai, Computer Science..." style="flex:1; border:none; padding: 0.75rem 1rem; font-size: 1rem; outline:none; font-family: inherit;">
        <button type="submit" class="btn btn-primary" style="padding: 0.75rem 1.75rem;">Explore Colleges</button>
      </form>
    </div>
  </section>

  <section class="container" style="padding: 4rem 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
      <div>
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--color-midnight-navy);">Featured Top Tier Institutions</h2>
        <p style="color: var(--color-text-muted); font-size: 0.95rem;">Verified placement records, fee structures, and NIRF rankings.</p>
      </div>
      <a href="/colleges" class="btn btn-outline btn-sm">Explore All Colleges →</a>
    </div>

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
            
            <div style="background-color: var(--color-background-gray); padding: 1rem; border-radius: var(--radius-md); display: flex; justify-content: space-between; margin-bottom: 1.25rem;" class="data-text">
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted); display: block;">Highest Package</span>
                <strong style="color: var(--color-webfoxx-blue); font-size: 1.1rem;">${col.highestPackage}</strong>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 0.75rem; color: var(--color-text-muted); display: block;">Avg Package</span>
                <strong style="color: var(--color-midnight-navy); font-size: 1.1rem;">${col.avgPackage}</strong>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <a href="/colleges/${col.slug}" class="btn btn-primary btn-sm" style="flex:1;">View Profile</a>
            <a href="/compare?colleges=${col.id}" class="btn btn-outline btn-sm">Compare</a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
  `;

  return c.html(renderLayout('WebFoxx Colleges — College Discovery Engine', content, '/'));
});

// 2. Search & Browse Colleges (Guest)
app.get('/colleges', (c) => {
  const query = c.req.query('q')?.toLowerCase() || '';
  const filtered = query
    ? SEED_COLLEGES.filter(item => item.name.toLowerCase().includes(query) || item.location.city.toLowerCase().includes(query))
    : SEED_COLLEGES;

  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">Explore & Search Colleges</h1>
    <p style="color: var(--color-text-muted); margin-bottom: 2rem;">Showing ${filtered.length} verified institution profiles.</p>

    <form action="/colleges" method="GET" style="display: flex; gap: 0.75rem; margin-bottom: 2.5rem;">
      <input type="text" name="q" value="${query}" placeholder="Filter by college name, city, stream..." style="flex:1; padding: 0.75rem 1rem; border: 1px solid var(--color-border-gray); border-radius: var(--radius-md); font-family: inherit; font-size: 1rem;">
      <button type="submit" class="btn btn-primary">Search</button>
    </form>

    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      ${filtered.map(col => `
        <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.4rem;">
              <span class="badge badge-grade">NAAC ${col.naacGrade}</span>
              <span class="badge badge-ownership">${col.ownership}</span>
            </div>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-midnight-navy);">${col.name}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;" class="flex-align">
              ${ICONS.MapPin} <span>${col.location.city}, ${col.location.state} • Est. ${col.establishmentYear}</span>
            </p>
          </div>
          <div style="text-align: right; display: flex; flex-direction: column; gap: 0.75rem;" class="data-text">
            <div>
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">Avg Package</span>
              <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-webfoxx-blue);">${col.avgPackage}</div>
            </div>
            <a href="/colleges/${col.slug}" class="btn btn-primary btn-sm">View Profile</a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
  `;

  return c.html(renderLayout('Find Colleges — WebFoxx Colleges', content, '/colleges'));
});

// 3. College Detail Profile (Guest)
app.get('/colleges/:slug', (c) => {
  const slug = c.req.param('slug');
  const col = SEED_COLLEGES.find(item => item.slug === slug);

  if (!col) {
    return c.html(renderLayout('College Profile Not Found', `
      <div class="container" style="padding: 5rem 1.5rem; text-align: center;">
        <h1 style="font-size: 2.5rem; color: var(--color-midnight-navy);">College Profile Not Found</h1>
        <p style="color: var(--color-text-muted); margin: 1rem 0 2rem;">The requested college profile slug does not exist.</p>
        <a href="/colleges" class="btn btn-primary">Back to Directory</a>
      </div>
    `), '/colleges');
  }

  const content = `
  <section style="background-color: var(--color-midnight-navy); color: #fff; padding: 3rem 0;">
    <div class="container">
      <div style="display: flex; align-items: flex-start; gap: 2rem;">
        <div style="width: 72px; height: 72px; background: #fff; color: var(--color-webfoxx-blue); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; flex-shrink:0;">
          ${ICONS.Building2}
        </div>
        <div style="flex:1;">
          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span class="badge badge-grade">NAAC Grade ${col.naacGrade}</span>
            <span class="badge badge-ownership">${col.ownership} Institution</span>
          </div>
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.4rem;">${col.name}</h1>
          <p style="color: #94a3b8; font-size: 0.95rem;" class="flex-align">
            ${ICONS.MapPin} <span>${col.location.city}, ${col.location.state} • Est. ${col.establishmentYear}</span>
            <span style="display: inline-flex; align-items: center; gap: 0.2rem; color: #f59e0b; font-weight: 700; margin-left: 0.5rem;">${ICONS.Star} ${col.rating}/5.0</span>
          </p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a href="/compare?colleges=${col.id}" class="btn btn-primary flex-align">${ICONS.Scale} <span>Compare College</span></a>
          <button onclick="alert('Instant PDF brochure download initiated!')" class="btn btn-outline" style="background:#fff;">Download Brochure</button>
        </div>
      </div>
    </div>
  </section>

  <section class="container" style="padding: 3rem 1.5rem;">
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
      <div>
        <div class="card" style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem; color: var(--color-midnight-navy);">About ${col.name}</h2>
          <p style="line-height: 1.7; color: var(--color-text-main); font-size: 1rem;">${col.overview}</p>
        </div>

        <div class="card" style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem; color: var(--color-midnight-navy);">Key Highlights</h2>
          <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            ${col.highlights.map(h => `<li style="font-weight: 600; color: var(--color-midnight-navy);" class="flex-align">${ICONS.CheckCircle2} <span>${h}</span></li>`).join('')}
          </ul>
        </div>

        <div class="card">
          <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem; color: var(--color-midnight-navy);">Campus Facilities</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            ${col.facilities.map(f => `<div style="background: var(--color-background-gray); padding: 0.85rem 1rem; border-radius: var(--radius-md); font-weight: 600;" class="flex-align">${ICONS.Building2} <span>${f}</span></div>`).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="card" style="position: sticky; top: 90px;">
          <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 1.25rem; color: var(--color-midnight-navy);">Placement Highlights</h3>
          <div style="margin-bottom: 1.5rem;" class="data-text">
            <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block;">Highest CTC Offered</span>
            <strong style="font-size: 1.75rem; color: var(--color-webfoxx-blue); font-weight: 800;">${col.highestPackage}</strong>
          </div>
          <div style="margin-bottom: 1.5rem;" class="data-text">
            <span style="font-size: 0.85rem; color: var(--color-text-muted); display: block;">Average Package</span>
            <strong style="font-size: 1.5rem; color: var(--color-midnight-navy); font-weight: 800;">${col.avgPackage}</strong>
          </div>
          <a href="/compare?colleges=${col.id}" class="btn btn-primary" style="width: 100%;">Compare Matrix</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return c.html(renderLayout(`${col.name} — Profile & Placements`, content, '/colleges'));
});

// 4. Explore Courses (Guest)
app.get('/courses', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">Explore Academic Courses</h1>
    <p style="color: var(--color-text-muted); margin-bottom: 2.5rem;">Browse undergraduate and postgraduate degree specializations.</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
      ${SEED_COURSES.map(course => `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span class="badge badge-ownership">${course.level} Degree</span>
            <span style="font-size: 0.85rem; color: var(--color-text-muted); font-weight: 700;">${course.duration}</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">${course.name}</h3>
          <p style="font-size: 0.9rem; color: var(--color-webfoxx-blue); font-weight: 700;">Avg Fee: ${course.avgFees}</p>
        </div>
      `).join('')}
    </div>
  </section>
  `;

  return c.html(renderLayout('Explore Courses — WebFoxx Colleges', content, '/courses'));
});

// 5. Entrance Exams (Guest)
app.get('/exams', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">Entrance Exams Directory</h1>
    <p style="color: var(--color-text-muted); margin-bottom: 2.5rem;">Exam dates, eligibility, cutoffs, and participating institutions.</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      ${SEED_EXAMS.map(exam => `
        <div class="card">
          <span class="badge badge-grade" style="margin-bottom: 0.75rem;">${exam.category}</span>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">${exam.name}</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted);">Mode: ${exam.mode} • Date: ${exam.date}</p>
        </div>
      `).join('')}
    </div>
  </section>
  `;

  return c.html(renderLayout('Entrance Exams — WebFoxx Colleges', content, '/exams'));
});

// 6. College Rankings (Guest)
app.get('/rankings', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">NIRF & Verified College Rankings</h1>
    <p style="color: var(--color-text-muted); margin-bottom: 2.5rem;">Official Ministry of Education institutional rankings.</p>

    <div class="card">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background-color: var(--color-background-gray);">
            <th style="padding: 1rem; font-weight: 700;">NIRF Rank</th>
            <th style="padding: 1rem; font-weight: 700;">Institution Name</th>
            <th style="padding: 1rem; font-weight: 700;">City</th>
            <th style="padding: 1rem; font-weight: 700;">Score</th>
          </tr>
        </thead>
        <tbody class="data-text">
          <tr>
            <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 800; color: var(--color-webfoxx-blue);">#1</td>
            <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 700;">IIT Bombay</td>
            <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray);">Mumbai</td>
            <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray);">89.42 / 100</td>
          </tr>
          <tr>
            <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 800; color: var(--color-webfoxx-blue);">#1 (Management)</td>
            <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 700;">IIM Ahmedabad</td>
            <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray);">Ahmedabad</td>
            <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray);">83.20 / 100</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  `;

  return c.html(renderLayout('College Rankings — WebFoxx Colleges', content, '/rankings'));
});

// 7. Compare Matrix (Guest)
app.get('/compare', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">College Comparison Matrix</h1>
    <p style="color: var(--color-text-muted); margin-bottom: 2.5rem;">Side-by-side objective evaluation of rankings, fees, and placement packages.</p>

    <div style="overflow-x: auto; background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--color-border-gray); box-shadow: var(--shadow-sm);">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background-color: var(--color-background-gray);">
            <th style="padding: 1.25rem; font-weight: 800; border-bottom: 2px solid var(--color-border-gray); width: 220px;">Attribute</th>
            ${SEED_COLLEGES.map(col => `
              <th style="padding: 1.25rem; font-weight: 800; border-bottom: 2px solid var(--color-border-gray);">
                <div style="font-size: 1.1rem; color: var(--color-midnight-navy);">${col.shortName}</div>
                <div style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: 500;">${col.location.city}</div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody class="data-text">
          <tr>
            <td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 700;">Establishment Year</td>
            ${SEED_COLLEGES.map(col => `<td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray);">${col.establishmentYear}</td>`).join('')}
          </tr>
          <tr>
            <td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 700;">NAAC Accreditation</td>
            ${SEED_COLLEGES.map(col => `<td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray);"><span class="badge badge-grade">Grade ${col.naacGrade}</span></td>`).join('')}
          </tr>
          <tr>
            <td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 700;">Highest Package</td>
            ${SEED_COLLEGES.map(col => `<td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 800; color: var(--color-webfoxx-blue);">${col.highestPackage}</td>`).join('')}
          </tr>
          <tr>
            <td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 700;">Average Package</td>
            ${SEED_COLLEGES.map(col => `<td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 800;">${col.avgPackage}</td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  `;

  return c.html(renderLayout('Comparison Matrix — WebFoxx Colleges', content, '/compare'));
});

// 8. Scholarships Directory (Guest)
app.get('/scholarships', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">Scholarships & Financial Aid</h1>
    <p style="color: var(--color-text-muted); margin-bottom: 2.5rem;">Merit-based, government, and institutional scholarship schemes.</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <div class="card">
        <span class="badge badge-ownership" style="margin-bottom: 0.5rem;">Merit Scholarship</span>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--color-midnight-navy);">Pragati Scholarship for Women</h3>
        <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-top: 0.4rem;">Up to ₹50,000 / year for technical education degrees.</p>
      </div>
      <div class="card">
        <span class="badge badge-ownership" style="margin-bottom: 0.5rem;">Government Aid</span>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--color-midnight-navy);">Central Sector Scholarship Scheme</h3>
        <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-top: 0.4rem;">Financial assistance for top 20th percentile college students.</p>
      </div>
    </div>
  </section>
  `;

  return c.html(renderLayout('Scholarships — WebFoxx Colleges', content, '/scholarships'));
});

// 9. Role Dashboard: Student (Registered User)
app.get('/student/dashboard', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <div>
        <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy);">Student Dashboard</h1>
        <p style="color: var(--color-text-muted);">Manage saved colleges, application trackers, and personalized notifications.</p>
      </div>
      <span class="badge badge-ownership" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Role: Student</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
      <div class="card">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Saved Colleges</span>
        <h3 style="font-size: 2rem; font-weight: 800; color: var(--color-webfoxx-blue);">3 Institutions</h3>
      </div>
      <div class="card">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Compare List</span>
        <h3 style="font-size: 2rem; font-weight: 800; color: var(--color-midnight-navy);">1 Saved Matrix</h3>
      </div>
      <div class="card">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Application Alerts</span>
        <h3 style="font-size: 2rem; font-weight: 800; color: #16a34a;">2 Active</h3>
      </div>
    </div>
  </section>
  `;

  return c.html(renderLayout('Student Dashboard — WebFoxx Colleges', content, '/student/dashboard'));
});

// 10. Role Dashboard: College Representative
app.get('/rep/dashboard', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <div>
        <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy);">College Representative Portal</h1>
        <p style="color: var(--color-text-muted);">Manage your institution's profile, fee structures, and verified announcements.</p>
      </div>
      <span class="badge badge-grade" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Role: College Representative</span>
    </div>

    <div class="card" style="margin-bottom: 2rem;">
      <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 1rem;">Managed Institution: IIT Bombay</h3>
      <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Update official fee structures, upload placement reports, and answer student questions.</p>
      <div style="display: flex; gap: 1rem;">
        <button onclick="alert('Opening profile editor...')" class="btn btn-primary btn-sm">Edit Institution Profile</button>
        <button onclick="alert('Opening placement updater...')" class="btn btn-outline btn-sm">Upload Placement Report</button>
      </div>
    </div>
  </section>
  `;

  return c.html(renderLayout('College Representative — WebFoxx Colleges', content, '/rep/dashboard'));
});

// 11. Role Dashboard: Content Manager
app.get('/content/dashboard', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <div>
        <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy);">Content Manager Dashboard</h1>
        <p style="color: var(--color-text-muted);">Maintain college directories, courses, NIRF rankings, and news articles.</p>
      </div>
      <span class="badge badge-ownership" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Role: Content Manager</span>
    </div>

    <div class="card">
      <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 1rem;">Content Operations Queue</h3>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
        <li style="padding: 0.75rem; background: var(--color-background-gray); border-radius: var(--radius-md);" class="flex-align">
          ${ICONS.CheckCircle2} <span>Verify 2026 NIRF Engineering Ranks</span>
        </li>
        <li style="padding: 0.75rem; background: var(--color-background-gray); border-radius: var(--radius-md);" class="flex-align">
          ${ICONS.CheckCircle2} <span>Review 14 B.Tech Fee Updates</span>
        </li>
      </ul>
    </div>
  </section>
  `;

  return c.html(renderLayout('Content Manager — WebFoxx Colleges', content, '/content/dashboard'));
});

// 12. Auth Login (Guest)
app.get('/login', (c) => {
  const content = `
  <section class="container" style="padding: 5rem 1.5rem; display: flex; justify-content: center;">
    <div class="card" style="width: 100%; max-width: 450px;">
      <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">User Sign In</h2>
      <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">Sign in with Mobile OTP to save colleges, write reviews, and track admissions.</p>

      <form onsubmit="event.preventDefault(); alert('OTP dispatched to mobile number!');">
        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.35rem;">Mobile Number</label>
          <input type="tel" placeholder="+91 9876543210" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border-gray); border-radius: var(--radius-md); font-family: inherit; font-size: 1rem;">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Send One-Time Password</button>
      </form>
    </div>
  </section>
  `;

  return c.html(renderLayout('Sign In — WebFoxx Colleges', content, '/login'));
});

// Health Check API
app.get('/health', (c) => {
  return c.json({
    status: 'OK',
    worker: 'webfoxx-colleges-worker',
    domain: 'college.webfoxx.com',
    architecture: 'College Discovery Platform (Shiksha/CollegeDunia Style)',
    timestamp: new Date().toISOString()
  });
});

export default app;
