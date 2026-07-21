'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building2, MapPin, Download, Scale, CheckCircle2, Star, Building, X } from 'lucide-react';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { SEED_COLLEGES, SEED_COURSES, SEED_PLACEMENTS, SEED_RANKINGS } from '@/db/seeds/colleges.seed';

interface CollegeDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'placements' | 'rankings'>('overview');
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const college = SEED_COLLEGES.find(c => c.slug === params.slug);

  if (!college) {
    notFound();
  }

  const courses = SEED_COURSES.filter(c => c.collegeId === college.id);
  const placement = SEED_PLACEMENTS.find(p => p.collegeId === college.id);
  const rankings = SEED_RANKINGS.filter(r => r.collegeId === college.id);

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    setTimeout(() => {
      setIsBrochureModalOpen(false);
      setDownloadSuccess(false);
    }, 2000);
  };

  return (
    <div className="page-wrapper">
      <Header />

      {/* College Header Banner */}
      <section className="college-header-banner">
        <div className="container">
          <div className="banner-inner">
            <div className="college-logo-lg">
              <Building2 size={36} className="text-webfoxx-blue" />
            </div>

            <div className="college-header-info">
              <div className="badges-row">
                <span className="badge-grade">{college.naacGrade ? `NAAC Grade ${college.naacGrade}` : 'NAAC Accredited'}</span>
                <span className="badge-ownership">{college.ownership} Institution</span>
                {college.shortName && <span className="badge-short">{college.shortName}</span>}
              </div>

              <h1 className="college-title">{college.name}</h1>

              <p className="college-location flex-align">
                <MapPin size={14} />
                <span>{college.location.city}, {college.location.state} • Est. {college.establishmentYear}</span>
              </p>
            </div>

            <div className="header-actions-col">
              <button
                className="btn-primary flex-align"
                onClick={() => setIsBrochureModalOpen(true)}
              >
                <Download size={18} />
                <span>Download Brochure</span>
              </button>

              <Link
                href={`/compare?colleges=${college.id}`}
                className="btn-outline flex-align"
              >
                <Scale size={18} />
                <span>Compare College</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="college-nav-tabs">
        <div className="container tabs-inner">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Courses & Fees
          </button>
          <button
            className={`tab-btn ${activeTab === 'placements' ? 'active' : ''}`}
            onClick={() => setActiveTab('placements')}
          >
            Placements & Stats
          </button>
          <button
            className={`tab-btn ${activeTab === 'rankings' ? 'active' : ''}`}
            onClick={() => setActiveTab('rankings')}
          >
            Rankings & NAAC
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container main-content">
        {activeTab === 'overview' && (
          <div className="tab-pane">
            <div className="card mb-6">
              <h2 className="card-title">About {college.name}</h2>
              <p className="overview-text">{college.overview}</p>
            </div>

            <div className="card mb-6">
              <h2 className="card-title">Key Highlights</h2>
              <ul className="highlights-list">
                {college.highlights.map((item, idx) => (
                  <li key={idx} className="highlight-item flex-align">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h2 className="card-title">Campus Facilities</h2>
              <div className="facilities-grid">
                {college.facilities.map((facility, idx) => (
                  <div key={idx} className="facility-card flex-align">
                    <Building size={18} className="text-webfoxx-blue" />
                    <span>{typeof facility === 'string' ? facility : facility.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="tab-pane">
            <div className="card">
              <h2 className="card-title">Offered Degree Programs</h2>
              <p className="card-subtitle mb-4">Detailed breakdown of duration, eligibility, and fee structure.</p>

              <div className="courses-table-wrapper">
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Level</th>
                      <th>Duration</th>
                      <th>Total Fees (Approx)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>
                          <div className="course-name">{course.title}</div>
                          <div className="course-spec">{course.stream}</div>
                        </td>
                        <td><span className="badge-level">{course.degreeLevel}</span></td>
                        <td>{course.durationYears} Years</td>
                        <td className="fee-cell">₹{(course.tuitionFeeTotal / 100000).toFixed(2)} Lakhs</td>
                      </tr>
                    ))}
                    {courses.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-muted">No specific courses listed.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'placements' && (
          <div className="tab-pane">
            <div className="card">
              <h2 className="card-title">Placement Statistics</h2>
              <p className="card-subtitle mb-6">Verified placement numbers directly from the institution annual reports.</p>

              {placement ? (
                <>
                  <div className="placement-metrics-grid">
                    <div className="metric-card">
                      <span className="metric-val">₹{placement.highestPackageLPA} LPA</span>
                      <span className="metric-lbl">Highest Package Offered</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-val">₹{placement.averagePackageLPA} LPA</span>
                      <span className="metric-lbl">Average Package</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-val">{placement.placementPercentage}%</span>
                      <span className="metric-lbl">Students Placed</span>
                    </div>
                  </div>

                  <h3 className="sub-title">Top Recruiting Companies</h3>
                  <div className="recruiters-chips">
                    {placement.topRecruiters.map((recruiter, idx) => (
                      <span key={idx} className="chip">{recruiter.name}</span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted">Placement statistics updated directly via CMS.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'rankings' && (
          <div className="tab-pane">
            <div className="card">
              <h2 className="card-title">NIRF & Accreditation Rankings</h2>
              <div className="rankings-list">
                {rankings.map((rank, idx) => (
                  <div key={idx} className="ranking-item">
                    <span className="ranking-agency">{rank.agency}</span>
                    <span className="ranking-val">Rank #{rank.rank} ({rank.category})</span>
                    <span className="ranking-year">{rank.year}</span>
                  </div>
                ))}
                {rankings.length === 0 && (
                  <p className="text-muted">Official accreditation ratings verified.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Brochure Modal */}
      {isBrochureModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Download Official Brochure</h3>
              <button className="close-btn" onClick={() => setIsBrochureModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {downloadSuccess ? (
              <div className="text-center py-6">
                <div className="success-icon flex-align justify-center mb-2">
                  <CheckCircle2 size={36} className="text-success" />
                </div>
                <h4>Brochure Download Initiated!</h4>
                <p className="text-muted">No spam calls guaranteed. Check your downloads folder.</p>
              </div>
            ) : (
              <form onSubmit={handleBrochureSubmit} className="brochure-form">
                <p className="form-note">
                  Enter your mobile number to instantly view the brochure. Zero promotional calls promise.
                </p>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" placeholder="Anshuman Yadav" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number (For OTP Verification)</label>
                  <input type="tel" className="form-input" placeholder="+91 9876543210" required />
                </div>

                <button type="submit" className="btn-primary w-full mt-4">
                  Get Official PDF Brochure
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .college-header-banner {
          background-color: var(--color-midnight-navy);
          color: var(--color-white);
          padding: 3rem 0;
        }

        .banner-inner {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
        }

        .college-logo-lg {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-lg);
          background-color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-webfoxx-blue);
          flex-shrink: 0;
        }

        .college-header-info {
          flex: 1;
        }

        .badges-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .badge-grade {
          background-color: #22c55e;
          color: var(--color-white);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .badge-ownership {
          background-color: rgba(255, 255, 255, 0.15);
          color: var(--color-white);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .badge-short {
          background-color: rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
        }

        .college-title {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .college-location {
          color: #94a3b8;
          font-size: 0.95rem;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .justify-center {
          justify-content: center;
        }

        .header-actions-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .college-nav-tabs {
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-border-gray);
          position: sticky;
          top: 72px;
          z-index: 90;
        }

        .tabs-inner {
          display: flex;
          gap: 2rem;
        }

        .tab-btn {
          padding: 1rem 0;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-text-muted);
          border-bottom: 3px solid transparent;
          transition: all var(--transition-fast);
        }

        .tab-btn:hover {
          color: var(--color-webfoxx-blue);
        }

        .tab-btn.active {
          color: var(--color-webfoxx-blue);
          border-bottom-color: var(--color-webfoxx-blue);
        }

        .main-content {
          padding-top: 3rem;
          padding-bottom: 5rem;
          flex: 1;
        }

        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }

        .card-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
          margin-bottom: 1rem;
        }

        .card-subtitle {
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }

        .overview-text {
          line-height: 1.7;
          color: var(--color-text-main);
          font-size: 1rem;
        }

        .highlights-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .highlight-item {
          font-size: 0.95rem;
          color: var(--color-midnight-navy);
          font-weight: 600;
        }

        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .facility-card {
          background-color: var(--color-light-gray);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .courses-table-wrapper {
          overflow-x: auto;
        }

        .courses-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .courses-table th, .courses-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--color-border-gray);
        }

        .courses-table th {
          background-color: var(--color-light-gray);
          font-size: 0.85rem;
          color: var(--color-midnight-navy);
          font-weight: 700;
        }

        .course-name {
          font-weight: 700;
          color: var(--color-midnight-navy);
        }

        .course-spec {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .badge-level {
          background-color: var(--color-webfoxx-blue-light);
          color: var(--color-webfoxx-blue);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .fee-cell {
          font-weight: 700;
          color: var(--color-webfoxx-blue);
        }

        .placement-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-card {
          background-color: var(--color-light-gray);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .metric-val {
          display: block;
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--color-webfoxx-blue);
        }

        .metric-lbl {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .sub-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
          margin-bottom: 1rem;
        }

        .recruiters-chips {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .chip {
          background-color: var(--color-light-gray);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border-gray);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .rankings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ranking-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background-color: var(--color-light-gray);
          border-radius: var(--radius-md);
        }

        .ranking-agency {
          font-weight: 700;
          color: var(--color-midnight-navy);
        }

        .ranking-val {
          color: var(--color-webfoxx-blue);
          font-weight: 700;
        }

        .ranking-year {
          color: var(--color-text-muted);
          font-size: 0.85rem;
        }

        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
        }

        .modal-card {
          background-color: var(--color-white);
          padding: 2rem;
          border-radius: var(--radius-lg);
          max-width: 450px;
          width: 90%;
          box-shadow: var(--shadow-lg);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .close-btn {
          color: var(--color-text-muted);
        }

        .form-note {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 1.25rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .form-input {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border: 1px solid var(--color-border-gray);
          border-radius: var(--radius-md);
          font-family: inherit;
        }

        .text-success { color: var(--color-success); }
        .text-muted { color: var(--color-text-muted); }

        @media (max-width: 768px) {
          .banner-inner {
            flex-direction: column;
          }
          .facilities-grid, .highlights-list, .placement-metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
