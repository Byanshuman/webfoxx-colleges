'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

export default function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="container main-content">
        <div className="login-card card">
          <div className="login-header text-center">
            <div className="icon-wrapper flex-align justify-center">
              <Smartphone size={32} className="text-webfoxx-blue" />
            </div>
            <h1 className="login-title">Zero Spam Mobile Login</h1>
            <p className="login-subtitle">Access your saved colleges, comparisons, and brochure downloads.</p>
          </div>

          {isLoggedIn ? (
            <div className="success-view text-center">
              <div className="success-icon flex-align justify-center mb-3">
                <CheckCircle2 size={42} className="text-success" />
              </div>
              <h2 className="success-title">Successfully Logged In!</h2>
              <p className="text-muted mb-6">Welcome to WebFoxx Colleges Student Dashboard.</p>

              <Link href="/student/dashboard" className="btn-primary w-full">
                Go to Student Dashboard
              </Link>
            </div>
          ) : step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="login-form">
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div className="input-phone-group">
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="9876543210"
                    value={mobileNumber}
                    onChange={e => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full btn-lg">
                Send OTP
              </button>

              <div className="spam-promise-box flex-align justify-center">
                <ShieldCheck size={16} className="text-success" />
                <span>Zero Spam Promise: We never share or sell your phone number.</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="login-form">
              <div className="form-group">
                <label className="form-label">Enter 6-Digit OTP sent to +91 {mobileNumber}</label>
                <input
                  type="text"
                  className="form-input text-center otp-input"
                  placeholder="123456"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full btn-lg" disabled={isVerifying}>
                {isVerifying ? 'Verifying...' : 'Verify & Continue'}
              </button>

              <button
                type="button"
                className="btn-link text-center w-full mt-3"
                onClick={() => setStep('phone')}
              >
                Change Mobile Number
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          padding-top: 4rem;
          padding-bottom: 5rem;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-card {
          max-width: 440px;
          width: 100%;
          padding: 2.5rem;
        }

        .icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          background-color: var(--color-webfoxx-blue-light);
          margin: 0 auto 1.25rem;
          color: var(--color-webfoxx-blue);
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .justify-center {
          justify-content: center;
        }

        .login-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--color-midnight-navy);
          margin-bottom: 0.5rem;
        }

        .login-subtitle {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-midnight-navy);
          margin-bottom: 0.5rem;
        }

        .input-phone-group {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border-gray);
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: var(--color-light-gray);
        }

        .country-code {
          padding: 0.75rem 1rem;
          background-color: #e2e8f0;
          font-weight: 700;
          color: var(--color-midnight-navy);
          font-size: 0.95rem;
        }

        .form-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          font-size: 1rem;
          font-family: inherit;
          outline: none;
        }

        .otp-input {
          letter-spacing: 0.5em;
          font-size: 1.25rem;
          font-weight: 700;
          border: 1px solid var(--color-border-gray);
          border-radius: var(--radius-md);
          background-color: var(--color-light-gray);
        }

        .btn-lg {
          padding: 0.85rem 1.5rem;
          font-size: 1rem;
        }

        .spam-promise-box {
          margin-top: 1.5rem;
          font-size: 0.775rem;
          color: var(--color-text-muted);
          text-align: center;
        }

        .btn-link {
          background: none;
          border: none;
          color: var(--color-webfoxx-blue);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .text-success { color: var(--color-success); }
        .text-muted { color: var(--color-text-muted); }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-6 { margin-bottom: 1.5rem; }

        .success-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
        }
      `}</style>
    </div>
  );
}
