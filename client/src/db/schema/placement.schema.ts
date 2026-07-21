// Placement Entity Schema (Section 4.7)

export interface DBPlacement {
  id: string;
  collegeId: string;
  year: number;
  highestPackageLPA: number;
  averagePackageLPA: number;
  medianPackageLPA?: number;
  lowestPackageLPA?: number;
  placementPercentage: number;
  totalStudentsPlaced?: number;
  totalOffersMade?: number;
  topRecruiters: {
    name: string;
    logoUrl?: string;
  }[];
  sectorWiseBreakup?: {
    sector: string;
    percentage: number;
  }[];
  createdAt: string;
  updatedAt: string;
}
