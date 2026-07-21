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

// Layout wrapper helper
function renderLayout(title: string, content: string, currentPath: string = '/') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — WebFoxx Colleges</title>
  <meta name="description" content="India's most transparent, data-driven college discovery platform. Verified college fees, NIRF rankings, and zero spam calls.">
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

    /* Header */
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
      display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem;
    }
    .brand-title { font-weight: 800; font-size: 1.25rem; color: var(--color-midnight-navy); line-height: 1.1; }
    .brand-tagline { font-size: 0.75rem; color: var(--color-webfoxx-blue); font-weight: 700; display: block; }

    .desktop-nav { display: flex; gap: 1.75rem; }
    .nav-link { font-weight: 600; font-size: 0.95rem; color: var(--color-text-muted); transition: color 0.2s; }
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
        <div class="brand-icon">🎓</div>
        <div>
          <span class="brand-title">WebFoxx Colleges</span>
          <span class="brand-tagline">Find Colleges. Not Spam.</span>
        </div>
      </a>
      <nav class="desktop-nav">
        <a href="/" class="nav-link ${currentPath === '/' ? 'active' : ''}">Explore Colleges</a>
        <a href="/compare" class="nav-link ${currentPath === '/compare' ? 'active' : ''}">Compare Matrix</a>
        <a href="/search" class="nav-link ${currentPath === '/search' ? 'active' : ''}">Advanced Search</a>
        <a href="/cms/colleges" class="nav-link ${currentPath.startsWith('/cms') ? 'active' : ''}">CMS Panel</a>
        <a href="/student/dashboard" class="nav-link ${currentPath.startsWith('/student') ? 'active' : ''}">Student Portal</a>
      </nav>
      <div class="header-actions">
        <a href="/login" class="btn btn-outline btn-sm">📱 Mobile OTP</a>
        <a href="/compare" class="btn btn-primary btn-sm">Compare Colleges</a>
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
          <div class="brand-icon">🎓</div>
          <span class="brand-title" style="color:#fff;">WebFoxx Colleges</span>
        </div>
        <p style="color:#60a5fa; font-weight:700; font-size:0.9rem;">"Find Colleges. Not Spam."</p>
        <p class="footer-desc">India's most transparent, data-driven college discovery platform. Powered by Cloudflare Workers & Railway.</p>
      </div>
      <div class="footer-links">
        <h4>Explore</h4>
        <a href="/">Top Engineering Colleges</a>
        <a href="/">Top Management Colleges</a>
        <a href="/compare">Compare Matrix</a>
      </div>
      <div class="footer-links">
        <h4>Portals</h4>
        <a href="/student/dashboard">Student Dashboard</a>
        <a href="/cms/colleges">Executive CMS</a>
        <a href="/login">Mobile OTP Login</a>
      </div>
      <div class="footer-links">
        <h4>Trust & Legal</h4>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Zero Spam Promise</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container bottom-inner">
        <p>© 2026 WebFoxx Colleges. All rights reserved.</p>
        <span class="trust-badge">🛡️ 100% Verified Data & Privacy Guaranteed</span>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// Homepage Route
app.get('/', (c) => {
  const content = `
  <section style="background-color: var(--color-midnight-navy); color: #fff; padding: 4rem 0 5rem;">
    <div class="container" style="text-align: center; max-width: 800px;">
      <span style="background-color: rgba(37,99,235,0.2); color: #60a5fa; padding: 0.3rem 1rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 700; display: inline-block; margin-bottom: 1.25rem;">
        🛡️ ZERO SPAM CALLS GUARANTEE
      </span>
      <h1 style="font-size: 2.75rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem;">
        Find India's Best Colleges. <br><span style="color: #60a5fa;">Without Spam Telecallers.</span>
      </h1>
      <p style="color: #94a3b8; font-size: 1.1rem; margin-bottom: 2.5rem;">
        Compare NIRF rankings, verified total tuition fees, average placement packages, and campus facilities.
      </p>

      <form action="/search" method="GET" style="display: flex; background: #fff; padding: 0.5rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); gap: 0.5rem;">
        <input type="text" name="q" placeholder="Search IIT Bombay, MBA, B.Tech, Mumbai..." style="flex:1; border:none; padding: 0.75rem 1rem; font-size: 1rem; outline:none; font-family: inherit;">
        <button type="submit" class="btn btn-primary" style="padding: 0.75rem 1.75rem;">Search Colleges</button>
      </form>
    </div>
  </section>

  <section class="container" style="padding: 4rem 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem;">
      <div>
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--color-midnight-navy);">Featured Top Tier Institutions</h2>
        <p style="color: var(--color-text-muted); font-size: 0.95rem;">Verified placement records and NIRF accreditation.</p>
      </div>
      <a href="/search" class="btn btn-outline btn-sm">View All Colleges →</a>
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
            <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 1rem;">📍 ${col.location.city}, ${col.location.state} • Est. ${col.establishmentYear}</p>
            
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
            <a href="/colleges/${col.slug}" class="btn btn-primary btn-sm" style="flex:1;">View Details</a>
            <a href="/compare?colleges=${col.id}" class="btn btn-outline btn-sm">Compare</a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
  `;

  return c.html(renderLayout('WebFoxx Colleges — Find Colleges. Not Spam.', content, '/'));
});

// College Detail Route
app.get('/colleges/:slug', (c) => {
  const slug = c.req.param('slug');
  const col = SEED_COLLEGES.find(item => item.slug === slug);

  if (!col) {
    return c.html(renderLayout('College Not Found', `
      <div class="container" style="padding: 5rem 1.5rem; text-align: center;">
        <h1 style="font-size: 2.5rem; color: var(--color-midnight-navy);">College Record Not Found</h1>
        <p style="color: var(--color-text-muted); margin: 1rem 0 2rem;">The requested college profile slug does not exist.</p>
        <a href="/" class="btn btn-primary">Back to Discovery Home</a>
      </div>
    `), '/');
  }

  const content = `
  <section style="background-color: var(--color-midnight-navy); color: #fff; padding: 3rem 0;">
    <div class="container">
      <div style="display: flex; align-items: flex-start; gap: 2rem;">
        <div style="width: 72px; height: 72px; background: #fff; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; font-size: 2.2rem; flex-shrink:0;">
          🏫
        </div>
        <div style="flex:1;">
          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span class="badge badge-grade">NAAC Grade ${col.naacGrade}</span>
            <span class="badge badge-ownership">${col.ownership} Institution</span>
          </div>
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.4rem;">${col.name}</h1>
          <p style="color: #94a3b8; font-size: 0.95rem;">📍 ${col.location.city}, ${col.location.state} • Est. ${col.establishmentYear} • Rating ⭐ ${col.rating}/5.0</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a href="/compare?colleges=${col.id}" class="btn btn-primary">Scale Compare</a>
          <button onclick="alert('Instant PDF brochure download initiated! Zero spam calls promise.')" class="btn btn-outline" style="background:#fff;">Download Brochure</button>
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
            ${col.highlights.map(h => `<li style="font-weight: 600; color: var(--color-midnight-navy);">✅ ${h}</li>`).join('')}
          </ul>
        </div>

        <div class="card">
          <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem; color: var(--color-midnight-navy);">Campus Facilities</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            ${col.facilities.map(f => `<div style="background: var(--color-background-gray); padding: 0.85rem 1rem; border-radius: var(--radius-md); font-weight: 600;">🏢 ${f}</div>`).join('')}
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

  return c.html(renderLayout(`${col.name} — Overview & Placements`, content, '/colleges'));
});

// Compare Matrix Route
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
          <tr>
            <td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 700;">Ownership Type</td>
            ${SEED_COLLEGES.map(col => `<td style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--color-border-gray);">${col.ownership}</td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  `;

  return c.html(renderLayout('Comparison Matrix — WebFoxx Colleges', content, '/compare'));
});

// Search Route
app.get('/search', (c) => {
  const query = c.req.query('q')?.toLowerCase() || '';
  const filtered = query
    ? SEED_COLLEGES.filter(item => item.name.toLowerCase().includes(query) || item.location.city.toLowerCase().includes(query))
    : SEED_COLLEGES;

  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">College Discovery Engine</h1>
    <p style="color: var(--color-text-muted); margin-bottom: 2rem;">Showing ${filtered.length} verified institution profiles.</p>

    <form action="/search" method="GET" style="display: flex; gap: 0.75rem; margin-bottom: 2.5rem;">
      <input type="text" name="q" value="${query}" placeholder="Search by college name, city, stream..." style="flex:1; padding: 0.75rem 1rem; border: 1px solid var(--color-border-gray); border-radius: var(--radius-md); font-family: inherit; font-size: 1rem;">
      <button type="submit" class="btn btn-primary">Filter Results</button>
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
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">📍 ${col.location.city}, ${col.location.state} • Est. ${col.establishmentYear}</p>
          </div>
          <div style="text-align: right; display: flex; flex-direction: column; gap: 0.75rem;" class="data-text">
            <div>
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">Avg Package</span>
              <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-webfoxx-blue);">${col.avgPackage}</div>
            </div>
            <a href="/colleges/${col.slug}" class="btn btn-primary btn-sm">View Full Profile</a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
  `;

  return c.html(renderLayout('Advanced College Search — WebFoxx Colleges', content, '/search'));
});

// CMS Dashboard Route
app.get('/cms/colleges', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <div>
        <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy);">Executive CMS Dashboard</h1>
        <p style="color: var(--color-text-muted);">Manage institution verification statuses and database records.</p>
      </div>
      <button onclick="alert('Creating new college record modal...')" class="btn btn-primary">+ Add New Institution</button>
    </div>

    <div class="card">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background-color: var(--color-background-gray);">
            <th style="padding: 1rem; font-weight: 700; border-bottom: 2px solid var(--color-border-gray);">Institution Name</th>
            <th style="padding: 1rem; font-weight: 700; border-bottom: 2px solid var(--color-border-gray);">Location</th>
            <th style="padding: 1rem; font-weight: 700; border-bottom: 2px solid var(--color-border-gray);">Grade</th>
            <th style="padding: 1rem; font-weight: 700; border-bottom: 2px solid var(--color-border-gray);">Status</th>
            <th style="padding: 1rem; font-weight: 700; border-bottom: 2px solid var(--color-border-gray);">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${SEED_COLLEGES.map(col => `
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray); font-weight: 700;">${col.name}</td>
              <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray); color: var(--color-text-muted);">${col.location.city}, ${col.location.state}</td>
              <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray);"><span class="badge badge-grade">Grade ${col.naacGrade}</span></td>
              <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray);"><span style="color: #22c55e; font-weight:700;">VERIFIED</span></td>
              <td style="padding: 1rem; border-bottom: 1px solid var(--color-border-gray);"><a href="/colleges/${col.slug}" class="btn btn-outline btn-sm">Edit Record</a></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </section>
  `;

  return c.html(renderLayout('Executive CMS — WebFoxx Colleges', content, '/cms/colleges'));
});

// Student Dashboard Route
app.get('/student/dashboard', (c) => {
  const content = `
  <section class="container" style="padding: 4rem 1.5rem;">
    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">Student Portal Dashboard</h1>
    <p style="color: var(--color-text-muted); margin-bottom: 2rem;">Manage your saved college bookmarks and comparison lists.</p>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
      <div class="card">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Saved Colleges</span>
        <h3 style="font-size: 2rem; font-weight: 800; color: var(--color-webfoxx-blue);">3</h3>
      </div>
      <div class="card">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Comparison Sets</span>
        <h3 style="font-size: 2rem; font-weight: 800; color: var(--color-midnight-navy);">1</h3>
      </div>
      <div class="card">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">Privacy Guarantee</span>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #16a34a; margin-top: 0.5rem;">Zero Spam Calls</h3>
      </div>
    </div>
  </section>
  `;

  return c.html(renderLayout('Student Dashboard — WebFoxx Colleges', content, '/student/dashboard'));
});

// Auth Login Route
app.get('/login', (c) => {
  const content = `
  <section class="container" style="padding: 5rem 1.5rem; display: flex; justify-content: center;">
    <div class="card" style="width: 100%; max-width: 450px;">
      <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-midnight-navy); margin-bottom: 0.5rem;">Mobile OTP Login</h2>
      <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">No password required. Instant 1-click OTP verification.</p>

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

  return c.html(renderLayout('Mobile OTP Login — WebFoxx Colleges', content, '/login'));
});

// Health Check API
app.get('/health', (c) => {
  return c.json({
    status: 'OK',
    worker: 'webfoxx-colleges-worker',
    domain: 'college.webfoxx.com',
    timestamp: new Date().toISOString()
  });
});

export default app;
