// College Entity Schema (Section 4.1, 4.8, 4.9, 4.10, 4.11, 4.13, 4.14)

export interface DBCollege {
  id: string;
  name: string;
  slug: string;
  shortName?: string;
  logoUrl?: string;
  universityId?: string;
  establishmentYear: number;
  ownership: 'Government' | 'Private' | 'Deemed' | 'Autonomous';
  approvalStatus: string[]; // e.g. UGC, AICTE, NAAC, NIRF, MCI, BCI
  naacGrade?: 'A++' | 'A+' | 'A' | 'B++' | 'B+' | 'B' | 'C' | 'Unaccredited';
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  contact: {
    website: string;
    email: string;
    phone?: string;
    admissionHelpline?: string;
  };
  overview: string;
  highlights: string[];
  facilities: {
    icon: string;
    name: string;
    description?: string;
  }[];
  faculty: {
    id: string;
    name: string;
    designation: string;
    department: string;
    qualification: string;
  }[];
  gallery: {
    id: string;
    url: string;
    caption?: string;
    category: 'Campus' | 'Infrastructure' | 'Events' | 'Hostel';
  }[];
  documents: {
    id: string;
    title: string;
    url: string;
    fileType: string;
  }[];
  featured: boolean;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
