'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Bookmark, Building2, Scale, Download, FileText } from 'lucide-react';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

export default function StudentDashboardPage() {
  return (
    <div className="page-wrapper">
      <Header />

      <main className="container main-content">
        {/* Profile Header */}
        <div className="card dashboard-header-card mb-6">
          <div className="profile-info flex-align">
            <div className="avatar-placeholder flex-align justify-center">
              <GraduationCap size={32} className="text-webfoxx-blue" />
            </div>
            <div>
              <h1 className="user-name">Anshuman Yadav</h1>
              <p className="user-contact">+91 9876543210 • Verified Student Profile</p>
            </div>
          </div>
          <span className="badge-spam flex-align">
            <span>Zero Spam Active</span>
          </span>
        </div>

        {/* Dashboard Sections Grid */}
        <div className="dashboard-grid">
          {/* Saved Colleges */}
          <div className="card">
            <div className="section-header flex-align mb-4">
              <Bookmark size={20} className="text-webfoxx-blue" />
              <h2 className="section-title">Saved Colleges</h2>
            </div>

            <div className="saved-list">
              <div className="saved-item flex-between">
                <div className="flex-align">
                  <Building2 size={16} className="text-muted" />
                  <div>
                    <h4 className="item-name">IIT Bombay</h4>
                    <span className="item-sub">Mumbai, Maharashtra</span>
                  </div>
                </div>
                <Link href="/colleges/iit-bombay" className="btn-outline btn-sm">
                  View
                </Link>
              </div>

              <div className="saved-item flex-between">
                <div className="flex-align">
                  <Building2 size={16} className="text-muted" />
                  <div>
                    <h4 className="item-name">BITS Pilani</h4>
                    <span className="item-sub">Pilani, Rajasthan</span>
                  </div>
                </div>
                <Link href="/colleges/bits-pilani" className="btn-outline btn-sm">
                  View
                </Link>
              </div>
            </div>
          </div>

          {/* Saved Comparisons */}
          <div className="card">
            <div className="section-header flex-align mb-4">
              <Scale size={20} className="text-webfoxx-blue" />
              <h2 className="section-title">Saved Comparisons</h2>
            </div>

            <div className="saved-list">
              <div className="saved-item flex-between">
                <div>
                  <h4 className="item-name">IIT Bombay vs BITS Pilani</h4>
                  <span className="item-sub">Engineering Comparison</span>
                </div>
                <Link href="/compare?colleges=c1,c3" className="btn-primary btn-sm">
                  Compare
                </Link>
              </div>
            </div>
          </div>

          {/* Downloaded Brochures */}
          <div className="card full-width">
            <div className="section-header flex-align mb-4">
              <Download size={20} className="text-webfoxx-blue" />
              <h2 className="section-title">Downloaded Brochures & Reports</h2>
            </div>

            <div className="brochures-grid">
              <div className="brochure-card flex-between">
                <div className="flex-align">
                  <FileText size={20} className="text-webfoxx-blue" />
                  <div>
                    <h4 className="item-name">IIT Bombay 2026 Official Admission Brochure.pdf</h4>
                    <span className="item-sub">Downloaded on July 21, 2026</span>
                  </div>
                </div>
                <button className="btn-outline btn-sm">Re-Download</button>
              </div>
            </div>
          </div>
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
          padding-top: 3rem;
          padding-bottom: 5rem;
          flex: 1;
        }

        .dashboard-header-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem;
        }

        .avatar-placeholder {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          background-color: var(--color-webfoxx-blue-light);
          color: var(--color-webfoxx-blue);
          flex-shrink: 0;
        }

        .user-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-midnight-navy);
          margin-bottom: 0.25rem;
        }

        .user-contact {
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }

        .badge-spam {
          background-color: var(--color-success-light);
          color: var(--color-success);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.85rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .full-width {
          grid-column: span 2;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .justify-center {
          justify-content: center;
        }

        .flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }

        .section-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
        }

        .saved-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .saved-item {
          padding: 0.85rem 1rem;
          background-color: var(--color-light-gray);
          border-radius: var(--radius-md);
        }

        .item-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
        }

        .item-sub {
          font-size: 0.775rem;
          color: var(--color-text-muted);
        }

        .brochures-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .brochure-card {
          padding: 1rem 1.25rem;
          background-color: var(--color-light-gray);
          border-radius: var(--radius-md);
        }

        .text-muted { color: var(--color-text-muted); }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .full-width {
            grid-column: span 1;
          }
          .dashboard-header-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
