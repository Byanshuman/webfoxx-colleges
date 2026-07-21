import { SEED_COLLEGES, SEED_COURSES, SEED_PLACEMENTS, SEED_RANKINGS } from '../db/seeds/colleges.seed';
import { DBCollege, DBCourse, DBPlacement, DBRanking } from '../db/schema';

export interface CollegeSearchFilters {
  query?: string;
  stream?: string;
  state?: string;
  city?: string;
  ownership?: string;
  naacGrade?: string;
  minFee?: number;
  maxFee?: number;
  featuredOnly?: boolean;
}

export class CollegeService {
  /**
   * Search colleges with filters and sorting
   */
  static async searchColleges(filters: CollegeSearchFilters = {}): Promise<DBCollege[]> {
    let result = [...SEED_COLLEGES];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.shortName?.toLowerCase().includes(q) ||
          c.location.city.toLowerCase().includes(q) ||
          c.location.state.toLowerCase().includes(q)
      );
    }

    if (filters.state) {
      result = result.filter(c => c.location.state.toLowerCase() === filters.state?.toLowerCase());
    }

    if (filters.city) {
      result = result.filter(c => c.location.city.toLowerCase() === filters.city?.toLowerCase());
    }

    if (filters.ownership) {
      result = result.filter(c => c.ownership.toLowerCase() === filters.ownership?.toLowerCase());
    }

    if (filters.featuredOnly) {
      result = result.filter(c => c.featured);
    }

    return result;
  }

  /**
   * Get college full details by slug
   */
  static async getCollegeBySlug(slug: string): Promise<{
    college: DBCollege | null;
    courses: DBCourse[];
    placements: DBPlacement[];
    rankings: DBRanking[];
  }> {
    const college = SEED_COLLEGES.find(c => c.slug === slug) || null;
    if (!college) {
      return { college: null, courses: [], placements: [], rankings: [] };
    }

    const courses = SEED_COURSES.filter(crs => crs.collegeId === college.id);
    const placements = SEED_PLACEMENTS.filter(p => p.collegeId === college.id);
    const rankings = SEED_RANKINGS.filter(r => r.collegeId === college.id);

    return { college, courses, placements, rankings };
  }

  /**
   * Compare up to 4 colleges by IDs
   */
  static async compareColleges(collegeIds: string[]): Promise<{
    colleges: DBCollege[];
    courses: DBCourse[];
    placements: DBPlacement[];
    rankings: DBRanking[];
  }> {
    const colleges = SEED_COLLEGES.filter(c => collegeIds.includes(c.id));
    const courses = SEED_COURSES.filter(crs => collegeIds.includes(crs.collegeId));
    const placements = SEED_PLACEMENTS.filter(p => collegeIds.includes(p.collegeId));
    const rankings = SEED_RANKINGS.filter(r => collegeIds.includes(r.collegeId));

    return { colleges, courses, placements, rankings };
  }
}
