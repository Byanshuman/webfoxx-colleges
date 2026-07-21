import { Router } from 'express';
import { CollegeController } from '../controllers/college.controller.js';

const router = Router();

router.get('/', CollegeController.searchColleges);
router.get('/compare', CollegeController.compareColleges);
router.get('/:slug', CollegeController.getCollegeBySlug);

export default router;
