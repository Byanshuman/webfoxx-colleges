// Scholarship Entity Schema (Section 4.5)

export interface DBScholarship {
  id: string;
  title: string;
  slug: string;
  provider: string;
  providerType: 'Government' | 'Corporate' | 'University' | 'NGO';
  amountOrBenefit: string;
  category: 'Merit-Based' | 'Need-Based' | 'Sports' | 'Minority' | 'Girl Student';
  degreeLevels: string[];
  eligibilityCriteria: string[];
  applicationDeadline?: string;
  applicationProcess: string;
  officialUrl: string;
  createdAt: string;
  updatedAt: string;
}
