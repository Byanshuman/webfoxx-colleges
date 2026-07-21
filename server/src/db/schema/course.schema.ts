// Course Entity Schema (Section 4.3 & 4.8 Fee Structure)

export interface DBCourse {
  id: string;
  collegeId: string;
  title: string;
  slug: string;
  code?: string;
  degreeLevel: 'Diploma' | 'Undergraduate' | 'Postgraduate' | 'Doctorate';
  stream: 'Engineering' | 'Management' | 'Medical' | 'Law' | 'Arts' | 'Science' | 'Commerce' | 'Design';
  specialization?: string;
  durationYears: number;
  mode: 'Full Time' | 'Part Time' | 'Distance' | 'Online';
  tuitionFeeTotal: number;
  tuitionFeePerYear: number;
  currency: string;
  eligibility: string;
  acceptedExams: string[];
  seatIntake: number;
  syllabusOverview?: string;
  createdAt: string;
  updatedAt: string;
}
