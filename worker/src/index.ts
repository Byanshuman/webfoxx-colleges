import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors());

// Sample seed dataset for Cloudflare Worker Edge
const SEED_COLLEGES = [
  {
    id: 'col-1',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    slug: 'iit-bombay',
    establishmentYear: 1958,
    ownership: 'Public',
    location: { city: 'Mumbai', state: 'Maharashtra' },
    naacGrade: 'A++',
    rating: 4.8,
    overview: 'Premier engineering and technology institution located in Powai, Mumbai.'
  },
  {
    id: 'col-2',
    name: 'Indian Institute of Technology Delhi',
    shortName: 'IIT Delhi',
    slug: 'iit-delhi',
    establishmentYear: 1961,
    ownership: 'Public',
    location: { city: 'New Delhi', state: 'Delhi' },
    naacGrade: 'A++',
    rating: 4.9,
    overview: 'Leading research and technological institute situated in Hauz Khas, New Delhi.'
  },
  {
    id: 'col-3',
    name: 'Bits Pilani',
    shortName: 'BITS',
    slug: 'bits-pilani',
    establishmentYear: 1964,
    ownership: 'Private',
    location: { city: 'Pilani', state: 'Rajasthan' },
    naacGrade: 'A',
    rating: 4.7,
    overview: 'Deemed university and institution of eminence known for innovation.'
  }
];

// Base Route
app.get('/', (c) => {
  return c.json({
    platform: 'WebFoxx Colleges Edge API',
    domain: 'college.webfoxx.com',
    status: 'ACTIVE',
    version: '1.1.0',
    endpoints: [
      '/api/v1/colleges',
      '/api/v1/colleges/:slug',
      '/api/v1/auth/send-otp',
      '/health'
    ]
  });
});

// Health Check Endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'OK',
    environment: 'production',
    timestamp: new Date().toISOString()
  });
});

// Colleges API
app.get('/api/v1/colleges', (c) => {
  const query = c.req.query('q')?.toLowerCase();
  let results = SEED_COLLEGES;

  if (query) {
    results = results.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.shortName.toLowerCase().includes(query) ||
      item.location.city.toLowerCase().includes(query)
    );
  }

  return c.json({
    success: true,
    count: results.length,
    data: results
  });
});

app.get('/api/v1/colleges/:slug', (c) => {
  const slug = c.req.param('slug');
  const college = SEED_COLLEGES.find(item => item.slug === slug);

  if (!college) {
    return c.json({ success: false, error: 'College not found' }, 404);
  }

  return c.json({
    success: true,
    data: college
  });
});

// Auth API
app.post('/api/v1/auth/send-otp', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { mobileNumber } = body;

  if (!mobileNumber || mobileNumber.length < 10) {
    return c.json({ success: false, error: 'Invalid mobile number' }, 400);
  }

  return c.json({
    success: true,
    message: 'OTP sent successfully. Zero spam promise.',
    expiresInSeconds: 300
  });
});

export default app;
