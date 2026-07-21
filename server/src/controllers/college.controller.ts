import { Request, Response } from 'express';
import { CollegeService } from '../services/college.service.js';

export class CollegeController {
  static async searchColleges(req: Request, res: Response) {
    try {
      const { query, stream, state, city, ownership, naacGrade } = req.query;

      const colleges = await CollegeService.searchColleges({
        query: query as string,
        stream: stream as string,
        state: state as string,
        city: city as string,
        ownership: ownership as string,
        naacGrade: naacGrade as string,
      });

      return res.status(200).json({
        success: true,
        count: colleges.length,
        data: colleges,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve colleges.',
      });
    }
  }

  static async getCollegeBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const data = await CollegeService.getCollegeBySlug(slug);

      if (!data.college) {
        return res.status(404).json({
          success: false,
          error: 'College record not found.',
        });
      }

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error retrieving college details.',
      });
    }
  }

  static async compareColleges(req: Request, res: Response) {
    try {
      const idsParam = req.query.ids as string;
      const collegeIds = idsParam ? idsParam.split(',') : [];

      const data = await CollegeService.compareColleges(collegeIds);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error generating comparison matrix.',
      });
    }
  }
}
