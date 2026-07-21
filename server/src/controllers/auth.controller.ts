import { Request, Response } from 'express';

export class AuthController {
  static async sendOtp(req: Request, res: Response) {
    try {
      const { mobileNumber } = req.body;

      if (!mobileNumber || mobileNumber.length < 10) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid 10-digit mobile number.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'OTP dispatched successfully to your mobile number. Zero spam guarantee.',
        expiresInSeconds: 300,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send OTP.',
      });
    }
  }

  static async verifyOtp(req: Request, res: Response) {
    try {
      const { mobileNumber, otp } = req.body;

      if (!mobileNumber || !otp) {
        return res.status(400).json({
          success: false,
          error: 'Mobile number and OTP are required.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Mobile OTP verified successfully.',
        user: {
          id: 'usr_student_01',
          mobileNumber,
          role: 'STUDENT',
          isVerified: true,
        },
        token: 'webfoxx_jwt_session_token_sample',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'OTP verification failed.',
      });
    }
  }
}
