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

const SEED_EXAMS = [
  { slug: 'ugcnet', name: 'UGC NET 2026', category: 'Teaching & Research', portalUrl: 'https://academy.webfoxx.com/ugcnet' },
  { slug: 'cuet-ug', name: 'CUET UG 2026', category: 'University Admissions', portalUrl: 'https://academy.webfoxx.com/cuet-ug' },
  { slug: 'cat', name: 'CAT 2026', category: 'Management', portalUrl: 'https://academy.webfoxx.com/cat' },
  { slug: 'jee-advanced', name: 'JEE Advanced 2026', category: 'Engineering', portalUrl: 'https://academy.webfoxx.com/jee-advanced' }
];

// Lucide Icons
const ICONS = {
  GraduationCap: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
  ShieldCheck: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  Search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
};

// Layout Renderer
function renderGuestLayout(title: string, content: string, currentPath: string = '/') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — WebFoxx Ecosystem</title>
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
      --font-primary: 'Plus Jakarta Sans', sans-serif;
      --radius-md: 10px;
      --radius-lg: 16px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--font-primary); background-color: var(--color-background-gray); color: var(--color-text-main); line-height: 1.5; min-height: 100vh; display: flex; flex-direction: column; }
    a { text-decoration: none; color: inherit; }
    .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .site-header { background-color: #ffffff; border-bottom: 1px solid var(--color-border-gray); position: sticky; top: 0; z-index: 100; }
    .header-inner { display: flex; align-items: center; justify-content: space-between; height: 72px; }
    .brand-logo { display: flex; align-items: center; gap: 0.75rem; }
    .brand-icon { width: 40px; height: 40px; border-radius: var(--radius-md); background-color: var(--color-webfoxx-blue-light); color: var(--color-webfoxx-blue); display: flex; align-items: center; justify-content: center; }
    .brand-title { font-weight: 800; font-size: 1.25rem; color: var(--color-midnight-navy); }
    .btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.6rem 1.2rem; border-radius: var(--radius-md); font-weight: 700; font-size: 0.9rem; cursor: pointer; border: none; }
    .btn-primary { background-color: var(--color-webfoxx-blue); color: #fff; }
    .card { background-color: #fff; border-radius: var(--radius-lg); padding: 1.75rem; border: 1px solid var(--color-border-gray); }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="/" class="brand-logo">
        <div class="brand-icon">${ICONS.GraduationCap}</div>
        <span class="brand-title">WebFoxx Colleges</span>
      </a>
      <nav style="display:flex; gap:1.25rem; font-weight:600; font-size:0.9rem;">
        <a href="/colleges" style="color:var(--color-webfoxx-blue);">Colleges</a>
        <a href="https://academy.webfoxx.com" target="_blank">Academy</a>
        <a href="https://jobs.webfoxx.com" target="_blank">Jobs</a>
        <a href="/compare">Compare</a>
      </nav>
      <a href="/login" class="btn btn-primary">Sign In SSO</a>
    </div>
  </header>

  <main style="flex:1;">
    ${content}
  </main>

  <footer style="background-color: var(--color-midnight-navy); color: #fff; padding: 3rem 0; margin-top: auto;">
    <div class="container" style="display:flex; justify-content:space-between; font-size:0.875rem;">
      <p>© 2026 WebFoxx Ecosystem — One Platform • One Account • One Backend</p>
      <span>colleges.webfoxx.com</span>
    </div>
  </footer>
</body>
</html>`;
}

// 1. Landing Page
app.get('/', c => c.html(renderGuestLayout('WebFoxx Colleges — College Discovery Engine', `
  <section style="background-color: var(--color-midnight-navy); color: #fff; padding: 4.5rem 0; text-align:center;">
    <div class="container" style="max-width:800px;">
      <h1 style="font-size: 2.75rem; font-weight: 800; margin-bottom: 1rem;">Discover Top Colleges & Universities</h1>
      <p style="color: #94a3b8; font-size: 1.1rem; margin-bottom: 2rem;">Single Sign-On across Colleges, Academy, and Jobs ecosystem portals.</p>
      <form action="/colleges" method="GET" style="display:flex; background:#fff; padding:0.4rem; border-radius:12px;">
        <input type="text" name="q" placeholder="Search IIT Bombay, B.Sc, CUET UG..." style="flex:1; border:none; padding:0.75rem 1rem; outline:none; font-family:inherit;">
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
    </div>
  </section>

  <section class="container" style="padding: 4rem 1.5rem;">
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem;">
      ${SEED_COLLEGES.map(col => `
        <div class="card">
          <h3 style="font-size:1.25rem; font-weight:800; color:var(--color-midnight-navy); margin-bottom:0.4rem;">${col.name}</h3>
          <p style="color:var(--color-text-muted); font-size:0.875rem;">${col.location.city}, ${col.location.state} • Est. ${col.establishmentYear}</p>
          <div style="margin-top:1rem;">
            <a href="/colleges/${col.slug}" class="btn btn-primary" style="width:100%; font-size:0.85rem;">View Institution Profile</a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
`)));

// 2. API Endpoint for Ecosystem Universal Search (`/api/v1/search`)
app.get('/api/v1/search', c => {
  const query = (c.req.query('q') || '').toLowerCase();
  const matchedColleges = SEED_COLLEGES.filter(col => col.name.toLowerCase().includes(query) || col.shortName.toLowerCase().includes(query));
  const matchedExams = SEED_EXAMS.filter(exam => exam.name.toLowerCase().includes(query) || exam.slug.includes(query));

  return c.json({
    success: true,
    query,
    results: {
      colleges: matchedColleges,
      exams: matchedExams,
      academyUrl: `https://academy.webfoxx.com/search?q=${encodeURIComponent(query)}`,
      jobsUrl: `https://jobs.webfoxx.com/search?q=${encodeURIComponent(query)}`
    }
  });
});

// Health check
app.get('/health', c => c.json({
  status: 'OK',
  ecosystemVersion: 'v2.0',
  architecture: 'One Platform • One Account • One Backend • Subdomain Portals',
  timestamp: new Date().toISOString()
}));

export default app;
