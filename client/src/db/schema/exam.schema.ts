// Exam Entity Schema (Section 4.4)

export interface DBExam {
  id: string;
  name: string;
  slug: string;
  fullTitle: string;
  category: 'Engineering' | 'Management' | 'Medical' | 'Law' | 'Design' | 'Arts';
  conductingBody: string;
  examLevel: 'National' | 'State' | 'University';
  modeOfExam: 'Online (Computer Based)' | 'Offline (Pen and Paper)' | 'Hybrid';
  frequency: 'Once a year' | 'Twice a year' | 'Multiple sessions';
  applicationFee: number;
  eligibilitySummary: string;
  importantDates: {
    title: string;
    date: string;
    isKeyDate?: boolean;
  }[];
  officialWebsite: string;
  overview: string;
  createdAt: string;
  updatedAt: string;
}
