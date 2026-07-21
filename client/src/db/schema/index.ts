// WebFoxx Colleges v1.1.0 - Database Schema Export Manifest

export * from './university.schema';
export * from './college.schema';
export * from './course.schema';
export * from './placement.schema';
export * from './ranking.schema';
export * from './exam.schema';
export * from './scholarship.schema';
export * from './user.schema';

export const DB_TABLES = {
  COLLEGES: 'colleges',
  UNIVERSITIES: 'universities',
  COURSES: 'courses',
  EXAMS: 'exams',
  SCHOLARSHIPS: 'scholarships',
  RANKINGS: 'rankings',
  PLACEMENTS: 'placements',
  FEE_STRUCTURES: 'fee_structures',
  ADMISSIONS: 'admissions',
  FACULTY: 'faculty',
  FACILITIES: 'facilities',
  REVIEWS: 'reviews',
  GALLERY: 'gallery',
  DOCUMENTS: 'documents',
  USERS: 'users',
  OTPS: 'otps',
  AUDIT_LOGS: 'audit_logs',
} as const;
