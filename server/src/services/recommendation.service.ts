// Centralized Ecosystem Recommendation Engine Service

export interface ExamRecommendation {
  examId: string;
  examName: string;
  category: string;
  academyPrepUrl: string;
  targetCollegeName: string;
  recommendedReason: string;
}

export interface CollegeRecommendation {
  collegeId: string;
  collegeName: string;
  slug: string;
  location: string;
  naacGrade: string;
  cutoffScoreRange: string;
  matchPercentage: number;
}

export interface JobRecommendation {
  jobId: string;
  jobTitle: string;
  companyName: string;
  location: string;
  minQualification: string;
  jobsPortalUrl: string;
}

export class RecommendationEngineService {
  /**
   * 1. Colleges -> Academy: Recommend entrance exam preparation based on college admission criteria
   */
  public static async getExamPrepForCollege(collegeId: string): Promise<ExamRecommendation[]> {
    const examMap: Record<string, ExamRecommendation> = {
      'col-1': {
        examId: 'jee-adv-2026',
        examName: 'JEE Advanced 2026',
        category: 'Engineering',
        academyPrepUrl: 'https://academy.webfoxx.com/cuet-ug/jee-advanced',
        targetCollegeName: 'IIT Bombay',
        recommendedReason: 'Required for B.Tech CSE & Core Engineering Admissions at IIT Bombay.'
      },
      'col-2': {
        examId: 'cat-2026',
        examName: 'CAT 2026',
        category: 'Management',
        academyPrepUrl: 'https://academy.webfoxx.com/cat',
        targetCollegeName: 'IIM Ahmedabad',
        recommendedReason: 'Mandatory percentile requirement for MBA PGP Admissions at IIM Ahmedabad.'
      },
      'col-3': {
        examId: 'bitsat-2026',
        examName: 'BITSAT 2026',
        category: 'Engineering',
        academyPrepUrl: 'https://academy.webfoxx.com/bitsat',
        targetCollegeName: 'BITS Pilani',
        recommendedReason: 'Merit-based admission test for all BE & Integrated MSc programs.'
      }
    };

    return [examMap[collegeId] || examMap['col-1']];
  }

  /**
   * 2. Academy -> Colleges: Recommend eligible institutions based on mock test scores
   */
  public static async getEligibleCollegesForTestScore(examName: string, score: number): Promise<CollegeRecommendation[]> {
    if (score >= 600) {
      return [
        {
          collegeId: 'col-1',
          collegeName: 'IIT Bombay',
          slug: 'iit-bombay',
          location: 'Mumbai, Maharashtra',
          naacGrade: 'A++',
          cutoffScoreRange: '580 - 680',
          matchPercentage: 98
        },
        {
          collegeId: 'col-3',
          collegeName: 'BITS Pilani',
          slug: 'bits-pilani',
          location: 'Pilani, Rajasthan',
          naacGrade: 'A',
          cutoffScoreRange: '520 - 620',
          matchPercentage: 95
        }
      ];
    }

    return [
      {
        collegeId: 'col-3',
        collegeName: 'BITS Pilani',
        slug: 'bits-pilani',
        location: 'Pilani, Rajasthan',
        naacGrade: 'A',
        cutoffScoreRange: '450 - 550',
        matchPercentage: 88
      }
    ];
  }

  /**
   * 3. Jobs -> Academy: Recommend exams/certifications based on job eligibility
   */
  public static async getExamsForJobEligibility(jobRole: string): Promise<ExamRecommendation[]> {
    return [
      {
        examId: 'ugc-net-2026',
        examName: 'UGC NET 2026',
        category: 'Teaching & Research',
        academyPrepUrl: 'https://academy.webfoxx.com/net',
        targetCollegeName: 'Assistant Professor & JRF Vacancies',
        recommendedReason: 'Mandatory national eligibility requirement for Assistant Professor roles.'
      }
    ];
  }

  /**
   * 4. Academy -> Jobs: Recommend job vacancies after user achieves a qualification
   */
  public static async getJobVacanciesForQualification(qualification: string): Promise<JobRecommendation[]> {
    return [
      {
        jobId: 'job-101',
        jobTitle: 'Assistant Professor - Computer Science',
        companyName: 'University of Delhi',
        location: 'New Delhi',
        minQualification: 'UGC NET Qualified',
        jobsPortalUrl: 'https://jobs.webfoxx.com/assistant-professor-cs'
      }
    ];
  }
}
