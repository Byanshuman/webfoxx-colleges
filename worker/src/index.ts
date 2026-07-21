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
  LayoutDashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,
  User: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  Users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  Settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  Shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`
};

// Base Layout Renderer for Guest Public View
function renderGuestLayout(title: string, content: string, currentPath: string = '/') {
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
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.6rem 1.2rem; border-radius: var(--radius-md); font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; border: none; }
    .btn-primary { background-color: var(--color-webfoxx-blue); color: #fff; }
    .btn-primary:hover { background-color: var(--color-webfoxx-blue-hover); }
    .btn-outline { border: 1px solid var(--color-border-gray); background-color: #fff; color: var(--color-midnight-navy); }
    .btn-outline:hover { border-color: var(--color-webfoxx-blue); color: var(--color-webfoxx-blue); }
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
    .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700; }
    .badge-grade { background-color: #22c55e; color: #fff; }
    .badge-ownership { background-color: var(--color-webfoxx-blue-light); color: var(--color-webfoxx-blue); }
    .data-text { font-family: var(--font-data); }

    @media (max-width: 768px) { .desktop-nav { display: none; } .footer-content { grid-template-columns: 1fr; gap: 2rem; } }
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
        <p class="footer-desc">India's leading institution discovery engine. Explore verified fees, NIRF rankings, courses, and cutoffs without marketing spam.</p>
      </div>
      <div class="footer-links">
        <h4>Guest Discovery</h4>
        <a href="/colleges">Explore Colleges</a>
        <a href="/courses">Browse Courses</a>
        <a href="/exams">Entrance Exams</a>
        <a href="/rankings">NIRF Rankings</a>
      </div>
      <div class="footer-links">
        <h4>Role Dashboards</h4>
        <a href="/student/dashboard">Student Portal</a>
        <a href="/rep/dashboard">College Rep Portal</a>
        <a href="/content/dashboard">Content Manager</a>
        <a href="/moderator/dashboard">Moderator Portal</a>
        <a href="/admin/dashboard">Administrator</a>
        <a href="/superadmin/dashboard">Super Administrator</a>
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

// Dedicated Role Workspace Layout Renderer (with Role-specific Sidebar Navigation)
function renderRoleWorkspaceLayout(roleTitle: string, roleName: string, navSections: { title: string; items: { label: string; href: string }[] }[], content: string, currentPath: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${roleTitle} — WebFoxx Workspace</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-primary); background-color: var(--color-background-gray); color: var(--color-text-main); min-height: 100vh; display: flex; flex-direction: column; }
    a { text-decoration: none; color: inherit; }
    .workspace-wrapper { display: flex; flex: 1; }
    .sidebar { width: 260px; background-color: #ffffff; border-right: 1px solid var(--color-border-gray); padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .role-badge { display: inline-block; padding: 0.35rem 0.75rem; background: var(--color-webfoxx-blue-light); color: var(--color-webfoxx-blue); border-radius: 9999px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-top: 0.25rem; }
    .sidebar-section-title { font-size: 0.725rem; font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 0.05em; margin-bottom: 0.5rem; margin-top: 0.75rem; }
    .sidebar-menu { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; }
    .sidebar-menu-item a { display: block; padding: 0.55rem 0.85rem; border-radius: var(--radius-md); font-size: 0.875rem; font-weight: 600; color: var(--color-text-main); transition: all 0.2s; }
    .sidebar-menu-item a:hover, .sidebar-menu-item a.active { background-color: var(--color-webfoxx-blue-light); color: var(--color-webfoxx-blue); font-weight: 700; }
    .main-workspace { flex: 1; padding: 2.5rem; overflow-y: auto; }
    .card { background-color: #fff; border-radius: var(--radius-lg); padding: 1.75rem; border: 1px solid var(--color-border-gray); box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
    .flex-align { display: flex; align-items: center; gap: 0.4rem; }
    .btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.6rem 1.2rem; border-radius: var(--radius-md); font-weight: 700; font-size: 0.875rem; cursor: pointer; border: none; }
    .btn-primary { background-color: var(--color-webfoxx-blue); color: #fff; }
    .btn-outline { border: 1px solid var(--color-border-gray); background-color: #fff; color: var(--color-midnight-navy); }
  </style>
</head>
<body>
  <div class="workspace-wrapper">
    <aside class="sidebar">
      <div>
        <a href="/" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
          <div style="width:32px; height:32px; background:var(--color-webfoxx-blue-light); color:var(--color-webfoxx-blue); border-radius:8px; display:flex; align-items:center; justify-content:center;">
            ${ICONS.GraduationCap}
          </div>
          <span style="font-weight:800; font-size:1.05rem; color:var(--color-midnight-navy);">WebFoxx</span>
        </a>
        <span class="role-badge">${roleName}</span>
      </div>

      <nav>
        ${navSections.map(sec => `
          <div class="sidebar-section-title">${sec.title}</div>
          <ul class="sidebar-menu">
            ${sec.items.map(item => `
              <li class="sidebar-menu-item">
                <a href="${item.href}" class="${currentPath === item.href ? 'active' : ''}">${item.label}</a>
              </li>
            `).join('')}
          </ul>
        `).join('')}
      </nav>

      <div style="margin-top:auto; padding-top:1rem; border-top:1px solid var(--color-border-gray);">
        <a href="/" style="font-size:0.825rem; color:var(--color-text-muted); font-weight:600;">← Back to Public Platform</a>
      </div>
    </aside>

    <main class="main-workspace">
      ${content}
    </main>
  </div>
</body>
</html>`;
}

// 1. Public Guest Routes
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

      <form action="/colleges" method="GET" style="display: flex; background: #fff; padding: 0.5rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); gap: 0.5rem;">
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
          </div>
          <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <a href="/colleges/${col.slug}" class="btn btn-primary btn-sm" style="flex:1;">View Profile</a>
            <a href="/compare?colleges=${col.id}" class="btn btn-outline btn-sm">Compare</a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
`, '/')));

app.get('/colleges', c => c.html(renderGuestLayout('Search & Browse Colleges', `
  <section class="container" style="padding: 4rem 1.5rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">Explore & Search Colleges</h1>
    <p style="color: var(--color-text-muted); margin-bottom: 2rem;">Showing verified institution profiles.</p>
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      ${SEED_COLLEGES.map(col => `
        <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-midnight-navy);">${col.name}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;" class="flex-align">${ICONS.MapPin} <span>${col.location.city}, ${col.location.state}</span></p>
          </div>
          <a href="/colleges/${col.slug}" class="btn btn-primary btn-sm">View Profile</a>
        </div>
      `).join('')}
    </div>
  </section>
`, '/colleges')));

app.get('/colleges/:slug', c => {
  const col = SEED_COLLEGES.find(item => item.slug === c.req.param('slug')) || SEED_COLLEGES[0];
  return c.html(renderGuestLayout(`${col.name} Profile`, `
    <section class="container" style="padding: 4rem 1.5rem;">
      <div class="card">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">${col.name}</h1>
        <p style="color: var(--color-text-muted); font-size: 1rem; margin-bottom: 1.5rem;">${col.overview}</p>
        <a href="/compare?colleges=${col.id}" class="btn btn-primary">Compare Institution</a>
      </div>
    </section>
  `, '/colleges'));
});

app.get('/courses', c => c.html(renderGuestLayout('Academic Courses', `<section class="container" style="padding:4rem 1.5rem;"><h1>Courses Directory</h1></section>`, '/courses')));
app.get('/exams', c => c.html(renderGuestLayout('Entrance Exams', `<section class="container" style="padding:4rem 1.5rem;"><h1>Exams Directory</h1></section>`, '/exams')));
app.get('/rankings', c => c.html(renderGuestLayout('College Rankings', `<section class="container" style="padding:4rem 1.5rem;"><h1>NIRF College Rankings</h1></section>`, '/rankings')));
app.get('/compare', c => c.html(renderGuestLayout('Compare Matrix', `<section class="container" style="padding:4rem 1.5rem;"><h1>Compare Colleges Matrix</h1></section>`, '/compare')));
app.get('/scholarships', c => c.html(renderGuestLayout('Scholarships', `<section class="container" style="padding:4rem 1.5rem;"><h1>Scholarships & Aid</h1></section>`, '/scholarships')));
app.get('/login', c => c.html(renderGuestLayout('Sign In', `<section class="container" style="padding:5rem 1.5rem; text-align:center;"><h1>User Sign In</h1></section>`, '/login')));

// 2. Role Workspace 1: Student Dedicated Navigation Workspace
app.get('/student/dashboard', c => {
  const navSections = [
    { title: 'Overview', items: [{ label: 'Dashboard', href: '/student/dashboard' }] },
    { title: 'College Discovery', items: [{ label: 'Search Colleges', href: '/colleges' }, { label: 'Saved Colleges', href: '/student/saved' }, { label: 'Compare List', href: '/compare' }, { label: 'Recently Viewed', href: '#' }] },
    { title: 'Applications', items: [{ label: 'My Applications', href: '#' }, { label: 'Application Tracker', href: '#' }, { label: 'Admission Timeline', href: '#' }, { label: 'Required Documents', href: '#' }] },
    { title: 'Reviews & Community', items: [{ label: 'My Reviews', href: '#' }, { label: 'My Questions', href: '#' }, { label: 'My Answers', href: '#' }] },
    { title: 'Scholarships', items: [{ label: 'Scholarship Tracker', href: '#' }, { label: 'Saved Scholarships', href: '#' }] },
    { title: 'Account', items: [{ label: 'Notifications', href: '#' }, { label: 'Messages', href: '#' }, { label: 'Profile', href: '#' }, { label: 'Settings', href: '#' }] }
  ];
  return c.html(renderRoleWorkspaceLayout('Student Portal', 'Student', navSections, `
    <h1 style="font-size:2rem; font-weight:800; margin-bottom:0.5rem; color:var(--color-midnight-navy);">Student Dashboard</h1>
    <p style="color:var(--color-text-muted); margin-bottom:2rem;">Welcome back! Track saved colleges, application timelines, and reviews.</p>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1.5rem;">
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Saved Colleges</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-webfoxx-blue);">3</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Active Applications</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-midnight-navy);">1</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Scholarship Alerts</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-success);">2 Active</h2></div>
    </div>
  `, '/student/dashboard'));
});

// 3. Role Workspace 2: College Representative Dedicated Navigation Workspace
app.get('/rep/dashboard', c => {
  const navSections = [
    { title: 'Overview', items: [{ label: 'Dashboard', href: '/rep/dashboard' }] },
    { title: 'Institution Management', items: [{ label: 'College Profile', href: '#' }, { label: 'Campus Information', href: '#' }, { label: 'Courses & Fees', href: '#' }, { label: 'Faculty & Departments', href: '#' }, { label: 'Placements & CTC', href: '#' }, { label: 'Infrastructure & Hostels', href: '#' }, { label: 'Gallery & Videos', href: '#' }] },
    { title: 'Student Management', items: [{ label: 'Applications Received', href: '#' }, { label: 'Enquiries', href: '#' }, { label: 'Messages', href: '#' }, { label: 'FAQs Management', href: '#' }] },
    { title: 'Analytics', items: [{ label: 'Visitor Analytics', href: '#' }, { label: 'Profile Performance', href: '#' }] },
    { title: 'Account', items: [{ label: 'Notifications', href: '#' }, { label: 'Profile Settings', href: '#' }] }
  ];
  return c.html(renderRoleWorkspaceLayout('College Representative Portal', 'College Representative', navSections, `
    <h1 style="font-size:2rem; font-weight:800; margin-bottom:0.5rem; color:var(--color-midnight-navy);">College Representative Workspace</h1>
    <p style="color:var(--color-text-muted); margin-bottom:2rem;">Manage verified institution profiles, admissions, and student enquiries for IIT Bombay.</p>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1.5rem;">
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Profile Views</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-webfoxx-blue);">14,280</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Student Enquiries</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-midnight-navy);">48 Pending</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Verification Status</span><h2 style="font-size:1.25rem; font-weight:800; color:var(--color-success);">VERIFIED REP</h2></div>
    </div>
  `, '/rep/dashboard'));
});

// 4. Role Workspace 3: Content Manager Dedicated Navigation Workspace
app.get('/content/dashboard', c => {
  const navSections = [
    { title: 'Overview', items: [{ label: 'Dashboard', href: '/content/dashboard' }] },
    { title: 'Institutions', items: [{ label: 'Colleges Directory', href: '#' }, { label: 'Universities Directory', href: '#' }, { label: 'Categories', href: '#' }] },
    { title: 'Academic Data', items: [{ label: 'Courses Database', href: '#' }, { label: 'Entrance Exams', href: '#' }, { label: 'Scholarships Directory', href: '#' }, { label: 'NIRF Rankings', href: '#' }] },
    { title: 'Location Master', items: [{ label: 'Countries', href: '#' }, { label: 'States', href: '#' }, { label: 'Cities', href: '#' }] },
    { title: 'Content & Editorial', items: [{ label: 'Articles & News', href: '#' }, { label: 'Media Library', href: '#' }, { label: 'SEO Management', href: '#' }] }
  ];
  return c.html(renderRoleWorkspaceLayout('Content Manager Portal', 'Content Manager', navSections, `
    <h1 style="font-size:2rem; font-weight:800; margin-bottom:0.5rem; color:var(--color-midnight-navy);">Content Manager Workspace</h1>
    <p style="color:var(--color-text-muted); margin-bottom:2rem;">Maintain institutional datasets, course catalogs, and editorial publications.</p>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1.5rem;">
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Total Institutions</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-webfoxx-blue);">5,420</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Pending Content Edits</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-midnight-navy);">12</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Published Articles</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-success);">142</h2></div>
    </div>
  `, '/content/dashboard'));
});

// 5. Role Workspace 4: Moderator Dedicated Navigation Workspace
app.get('/moderator/dashboard', c => {
  const navSections = [
    { title: 'Overview', items: [{ label: 'Dashboard', href: '/moderator/dashboard' }] },
    { title: 'Moderation Queue', items: [{ label: 'Pending Reviews', href: '#' }, { label: 'Reported Content', href: '#' }, { label: 'Pending Q&A', href: '#' }, { label: 'College Verifications', href: '#' }, { label: 'Representative Approvals', href: '#' }] },
    { title: 'Logs & History', items: [{ label: 'Moderation History', href: '#' }, { label: 'Activity Logs', href: '#' }] }
  ];
  return c.html(renderRoleWorkspaceLayout('Moderator Portal', 'Moderator', navSections, `
    <h1 style="font-size:2rem; font-weight:800; margin-bottom:0.5rem; color:var(--color-midnight-navy);">Moderator Quality Workspace</h1>
    <p style="color:var(--color-text-muted); margin-bottom:2rem;">Verify institutional claims, moderate student reviews, and approve representative credentials.</p>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1.5rem;">
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Pending Student Reviews</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-webfoxx-blue);">18</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Rep Verification Queue</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-midnight-navy);">4</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Moderation Score</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-success);">99.8%</h2></div>
    </div>
  `, '/moderator/dashboard'));
});

// 6. Role Workspace 5: Administrator Dedicated Navigation Workspace
app.get('/admin/dashboard', c => {
  const navSections = [
    { title: 'Overview', items: [{ label: 'Dashboard', href: '/admin/dashboard' }] },
    { title: 'User Governance', items: [{ label: 'Students', href: '#' }, { label: 'College Representatives', href: '#' }, { label: 'Content Managers', href: '#' }, { label: 'Moderators', href: '#' }, { label: 'Roles & Permissions', href: '#' }] },
    { title: 'Institution Management', items: [{ label: 'Colleges', href: '#' }, { label: 'Universities', href: '#' }, { label: 'Scholarships', href: '#' }] },
    { title: 'Operations', items: [{ label: 'Analytics Reports', href: '#' }, { label: 'Audit Logs', href: '#' }, { label: 'Support Tickets', href: '#' }] },
    { title: 'Settings', items: [{ label: 'System Configuration', href: '#' }, { label: 'Email Templates', href: '#' }] }
  ];
  return c.html(renderRoleWorkspaceLayout('Administrator Workspace', 'Administrator', navSections, `
    <h1 style="font-size:2rem; font-weight:800; margin-bottom:0.5rem; color:var(--color-midnight-navy);">Platform Administrator Workspace</h1>
    <p style="color:var(--color-text-muted); margin-bottom:2rem;">Governance over platform operations, users, institutional verification, and analytics.</p>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1.5rem;">
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Total Users</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-webfoxx-blue);">128,490</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Verified Representatives</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-midnight-navy);">1,240</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">System Operational Health</span><h2 style="font-size:1.25rem; font-weight:800; color:var(--color-success);">100% HEALTHY</h2></div>
    </div>
  `, '/admin/dashboard'));
});

// 7. Role Workspace 6: Super Administrator Dedicated Navigation Workspace
app.get('/superadmin/dashboard', c => {
  const navSections = [
    { title: 'Overview', items: [{ label: 'Dashboard', href: '/superadmin/dashboard' }] },
    { title: 'Organization & Billing', items: [{ label: 'Organizations', href: '#' }, { label: 'Subscriptions & Plans', href: '#' }, { label: 'Billing Settings', href: '#' }] },
    { title: 'Security & Access', items: [{ label: 'Role Matrix', href: '#' }, { label: 'API Keys & OAuth', href: '#' }, { label: 'SSO Configuration', href: '#' }] },
    { title: 'Infrastructure', items: [{ label: 'System Health', href: '#' }, { label: 'Feature Flags', href: '#' }, { label: 'Maintenance Mode', href: '#' }, { label: 'Backups & Logs', href: '#' }] },
    { title: 'Global Settings', items: [{ label: 'Site Branding', href: '#' }, { label: 'CDN & Storage', href: '#' }, { label: 'Email & SMS Services', href: '#' }] }
  ];
  return c.html(renderRoleWorkspaceLayout('Super Administrator Workspace', 'Super Administrator', navSections, `
    <h1 style="font-size:2rem; font-weight:800; margin-bottom:0.5rem; color:var(--color-midnight-navy);">Super Administrator Governance</h1>
    <p style="color:var(--color-text-muted); margin-bottom:2rem;">Global platform control, infrastructure health monitoring, security API keys, and feature flags.</p>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1.5rem;">
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Active Feature Flags</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-webfoxx-blue);">14 Enabled</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Worker Request Rate</span><h2 style="font-size:2rem; font-weight:800; color:var(--color-midnight-navy);">4,200 req/min</h2></div>
      <div class="card"><span style="color:var(--color-text-muted); font-size:0.85rem;">Infrastructure Status</span><h2 style="font-size:1.25rem; font-weight:800; color:var(--color-success);">CLOUDFLARE EDGE OK</h2></div>
    </div>
  `, '/superadmin/dashboard'));
});

// Health Check API
app.get('/health', c => c.json({
  status: 'OK',
  worker: 'webfoxx-colleges-worker',
  domain: 'college.webfoxx.com',
  architecture: '7-Role Dedicated Navigation Engine',
  timestamp: new Date().toISOString()
}));

export default app;
