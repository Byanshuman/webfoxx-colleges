// Ranking Entity Schema (Section 4.6)

export interface DBRanking {
  id: string;
  collegeId: string;
  agency: 'NIRF' | 'QS World' | 'THE' | 'India Today' | 'Outlook' | 'The Week';
  rank: number;
  rankRange?: string; // e.g. "1-5", "101-150"
  category: string; // e.g. "Overall", "Engineering", "Management", "Medical", "University"
  year: number;
  score?: number;
  createdAt: string;
  updatedAt: string;
}
