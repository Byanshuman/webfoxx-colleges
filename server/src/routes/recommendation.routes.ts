import { Router } from 'express';
import { RecommendationEngineService } from '../services/recommendation.service.js';

const router = Router();

// 1. Colleges -> Academy: Exam recommendations for a college
router.get('/colleges-to-academy', async (req, res) => {
  try {
    const collegeId = (req.query.collegeId as string) || 'col-1';
    const recommendations = await RecommendationEngineService.getExamPrepForCollege(collegeId);
    res.json({ success: true, type: 'COLLEGES_TO_ACADEMY', recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch recommendations' });
  }
});

// 2. Academy -> Colleges: College recommendations for test score
router.get('/academy-to-colleges', async (req, res) => {
  try {
    const examName = (req.query.examName as string) || 'JEE Advanced';
    const score = Number(req.query.score) || 600;
    const recommendations = await RecommendationEngineService.getEligibleCollegesForTestScore(examName, score);
    res.json({ success: true, type: 'ACADEMY_TO_COLLEGES', recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch recommendations' });
  }
});

// 3. Jobs -> Academy: Exam recommendations for job eligibility
router.get('/jobs-to-academy', async (req, res) => {
  try {
    const jobRole = (req.query.jobRole as string) || 'Assistant Professor';
    const recommendations = await RecommendationEngineService.getExamsForJobEligibility(jobRole);
    res.json({ success: true, type: 'JOBS_TO_ACADEMY', recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch recommendations' });
  }
});

// 4. Academy -> Jobs: Job recommendations for achieved qualification
router.get('/academy-to-jobs', async (req, res) => {
  try {
    const qualification = (req.query.qualification as string) || 'UGC NET';
    const recommendations = await RecommendationEngineService.getJobVacanciesForQualification(qualification);
    res.json({ success: true, type: 'ACADEMY_TO_JOBS', recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch recommendations' });
  }
});

export default router;
