// WebFoxx Ecosystem - Unified Single PostgreSQL Master Database Manifest

export * from './user.schema.js';
export * from './university.schema.js';
export * from './college.schema.js';
export * from './course.schema.js';
export * from './placement.schema.js';
export * from './ranking.schema.js';
export * from './exam.schema.js';
export * from './scholarship.schema.js';

export const WEBFOXX_DB_TABLES = {
  // 1. Core Platform Foundation Tables (Shared across all products)
  USERS: 'users',
  ROLES: 'roles',
  PERMISSIONS: 'permissions',
  ORGANIZATIONS: 'organizations',
  ORGANIZATION_MEMBERS: 'organization_members',
  NOTIFICATIONS: 'notifications',
  AUDIT_LOGS: 'audit_logs',
  RECOMMENDATION_LOGS: 'recommendation_logs',
  APP_SETTINGS: 'app_settings',

  // 2. WebFoxx Colleges Module Tables
  COLLEGES: 'colleges',
  UNIVERSITIES: 'universities',
  COLLEGE_COURSES: 'college_courses',
  COLLEGE_PLACEMENTS: 'college_placements',
  COLLEGE_RANKINGS: 'college_rankings',
  SCHOLARSHIPS: 'scholarships',
  COLLEGE_REVIEWS: 'college_reviews',
  COLLEGE_APPLICATIONS: 'college_applications',

  // 3. WebFoxx Academy Module Tables
  EXAMS: 'exams',
  MOCK_TESTS: 'mock_tests',
  QUESTIONS: 'questions',
  QUESTION_ATTEMPTS: 'question_attempts',
  TEST_RESULTS: 'test_results',
  STUDY_PLANS: 'study_plans',

  // 4. WebFoxx Jobs Module Tables
  JOBS: 'jobs',
  COMPANIES: 'companies',
  JOB_APPLICATIONS: 'job_applications',
  JOB_ELIGIBILITY: 'job_eligibility'
} as const;
