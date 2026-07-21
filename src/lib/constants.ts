export const BRAND = {
  name: 'WebFoxx Colleges',
  domain: 'colleges.webfoxx.com',
  version: '1.1.0',
  tagline: 'Find Colleges. Not Spam.',
  taglineSupporting: [
    'Transparent Information.',
    'Verified Data.',
    'Smarter Decisions.',
    'Student First.',
    'Zero Spam.'
  ],
  colors: {
    primary: '#2563EB',      // WebFoxx Blue
    navy: '#0F172A',         // Midnight Navy
    white: '#FFFFFF',
    lightGray: '#F8FAFC',
    borderGray: '#E2E8F0',
    success: '#16A34A',
    warning: '#F59E0B',
    error: '#DC2626',
  },
};

export const NAVIGATION_LINKS = [
  { label: 'Colleges', href: '/colleges' },
  { label: 'Universities', href: '/universities' },
  { label: 'Courses', href: '/courses' },
  { label: 'Exams', href: '/exams' },
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Compare', href: '/compare' },
];

export const CMS_MODULES = [
  { id: 'dashboard', label: 'Dashboard', path: '/cms/dashboard' },
  { id: 'colleges', label: 'College Manager', path: '/cms/colleges' },
  { id: 'universities', label: 'University Manager', path: '/cms/universities' },
  { id: 'courses', label: 'Course Manager', path: '/cms/courses' },
  { id: 'admissions', label: 'Admission Manager', path: '/cms/admissions' },
  { id: 'placements', label: 'Placement Manager', path: '/cms/placements' },
  { id: 'scholarships', label: 'Scholarship Manager', path: '/cms/scholarships' },
  { id: 'rankings', label: 'Ranking Manager', path: '/cms/rankings' },
  { id: 'exams', label: 'Exam Manager', path: '/cms/exams' },
  { id: 'media', label: 'Media Manager', path: '/cms/media' },
  { id: 'seo', label: 'SEO Manager', path: '/cms/seo' },
  { id: 'users', label: 'User Management', path: '/cms/users' },
  { id: 'roles', label: 'Role Management', path: '/cms/roles' },
  { id: 'settings', label: 'Settings', path: '/cms/settings' },
];

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  CONTENT_MANAGER: 'CONTENT_MANAGER',
  VERIFICATION_OFFICER: 'VERIFICATION_OFFICER',
  INSTITUTION_ADMIN: 'INSTITUTION_ADMIN',
  STUDENT: 'STUDENT',
} as const;
