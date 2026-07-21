import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand-logo">
            <GraduationCap size={26} className="logo-icon text-blue" />
            <span className="brand-title">{BRAND.name}</span>
          </div>
          <p className="footer-tagline">"{BRAND.tagline}"</p>
          <p className="footer-desc">
            India's most transparent, data-driven college discovery platform. Empowering students with verified data, unbiased rankings, and zero spam calls.
          </p>
        </div>

        <div className="footer-links-group">
          <h4>Explore</h4>
          <Link href="/colleges">Colleges in India</Link>
          <Link href="/universities">Top Universities</Link>
          <Link href="/courses">Degree Courses</Link>
          <Link href="/exams">Entrance Exams</Link>
          <Link href="/scholarships">Scholarships</Link>
        </div>

        <div className="footer-links-group">
          <h4>Tools</h4>
          <Link href="/compare">Compare Colleges</Link>
          <Link href="/search">Advanced College Search</Link>
          <Link href="/student/dashboard">Student Portal</Link>
          <Link href="/cms/dashboard">CMS Admin Panel</Link>
        </div>

        <div className="footer-links-group">
          <h4>Legal & Trust</h4>
          <Link href="/legal/privacy-policy">Privacy Policy</Link>
          <Link href="/legal/terms-of-service">Terms of Service</Link>
          <Link href="/legal/disclaimer">Disclaimer</Link>
          <Link href="/about">About WebFoxx</Link>
          <Link href="/contact">Contact Support</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved. Zero Spam Guarantee.</p>
          <div className="trust-badge flex-align">
            <ShieldCheck size={16} />
            <span>100% Verified Data & Privacy Guaranteed</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: var(--color-midnight-navy);
          color: var(--color-white);
          padding-top: 4rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .brand-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-white);
        }

        .footer-tagline {
          color: #60a5fa;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
        }

        .footer-desc {
          color: #94a3b8;
          font-size: 0.875rem;
          line-height: 1.6;
          max-width: 380px;
        }

        .footer-links-group h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: var(--color-white);
        }

        .footer-links-group :global(a) {
          display: block;
          color: #94a3b8;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          transition: color var(--transition-fast);
        }

        .footer-links-group :global(a:hover) {
          color: var(--color-white);
        }

        .footer-bottom {
          background-color: #090d16;
          padding: 1.25rem 0;
        }

        .bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.825rem;
          color: #64748b;
        }

        .trust-badge {
          color: #4ade80;
          font-weight: 600;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        @media (max-width: 900px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
          .bottom-inner {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};
