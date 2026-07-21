// WebFoxx Colleges v1.1.0 - Core TypeScript Type Definitions

export interface College {
  id: string;
  name: string;
  slug: string;
  shortName?: string;
  universityId?: string;
  establishmentYear: number;
  ownership: 'Government' | 'Private' | 'Deemed' | 'Autonomous';
  approvalStatus: string[]; // UGC, AICTE, NAAC, etc.
  naacGrade?: string;
  location: {
    city: string;
    state: string;
    country: string;
    address: string;
    pincode: string;
    coordinates?: { lat: number; lng: number };
  };
  contact: {
    website: string;
    email: string;
    phone?: string;
  };
  highlights: string[];
  bannerUrl?: string;
  logoUrl?: string;
  featured: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface University {
  id: string;
  name: string;
  slug: string;
  type: 'Central' | 'State' | 'Private' | 'Deemed';
  establishmentYear: number;
  location: {
    city: string;
    state: string;
  };
  website: string;
  totalAffiliatedColleges?: number;
}

export interface Course {
  id: string;
  collegeId: string;
  title: string;
  slug: string;
  degreeLevel: 'Diploma' | 'Undergraduate' | 'Postgraduate' | 'Doctorate';
  stream: 'Engineering' | 'Management' | 'Medical' | 'Law' | 'Arts' | 'Science' | 'Commerce';
  durationYears: number;
  totalTuitionFee: number;
  feeCurrency: string;
  eligibility: string;
  acceptedExams: string[];
  seatIntake: number;
}

export interface Exam {
  id: string;
  name: string;
  slug: string;
  category: string;
  conductingBody: string;
  examLevel: 'National' | 'State' | 'University';
  examDate?: string;
  applicationDeadline?: string;
  officialWebsite: string;
}

export interface Scholarship {
  id: string;
  title: string;
  slug: string;
  provider: string;
  amountOrBenefit: string;
  eligibilityCriteria: string;
  applicationDeadline?: string;
  category: 'Merit-Based' | 'Need-Based' | 'Government' | 'Sports';
}

export interface Placement {
  id: string;
  collegeId: string;
  year: number;
  highestPackageLPA: number;
  averagePackageLPA: number;
  medianPackageLPA?: number;
  placementPercentage: number;
  topRecruiters: string[];
}

export interface Ranking {
  id: string;
  collegeId: string;
  agency: 'NIRF' | 'QS World' | 'THE' | 'India Today' | 'Outlook';
  rank: number;
  category: string;
  year: number;
}

export interface User {
  id: string;
  mobile: string;
  email?: string;
  fullName: string;
  role: 'SUPER_ADMIN' | 'CONTENT_MANAGER' | 'VERIFICATION_OFFICER' | 'INSTITUTION_ADMIN' | 'STUDENT';
  isMobileVerified: boolean;
  isEmailVerified: boolean;
  savedColleges: string[];
  createdAt: string;
}
