// University Entity Schema (Section 4.2)

export interface DBUniversity {
  id: string;
  name: string;
  slug: string;
  code: string;
  type: 'Central' | 'State' | 'Private' | 'Deemed' | 'Autonomous';
  establishmentYear: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  website: string;
  email: string;
  phone?: string;
  logoUrl?: string;
  bannerUrl?: string;
  overview?: string;
  totalAffiliatedColleges?: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
