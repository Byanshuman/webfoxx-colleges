'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, Building2, Star, Plus, X } from 'lucide-react';

import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { SEED_COLLEGES, SEED_PLACEMENTS } from '@/db/seeds/colleges.seed';
import { DBCollege } from '@/db/schema/college.schema';

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['col-1', 'col-2']);

  const selectedColleges: DBCollege[] = selectedIds
    .map(id => SEED_COLLEGES.find(c => c.id === id))
    .filter((c): c is DBCollege => c !== undefined);

  const availableColleges = SEED_COLLEGES.filter(c => !selectedIds.includes(c.id));

  const addCollegeToCompare = (id: string) => {
    if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeCollegeFromCompare = (id: string) => {
    setSelectedIds(selectedIds.filter(item => item !== id));
  };

  const getPlacement = (collegeId: string) => {
    return SEED_PLACEMENTS.find(p => p.collegeId === collegeId);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="container main-content">
        <div className="compare-header">
          <div className="badge-pill flex-align justify-center mb-2">
            <Scale size={14} />
            <span>Unbiased Matrix</span>
          </div>
          <h1 className="page-title">Side-by-Side College Comparison</h1>
          <p className="page-subtitle">Compare up to 4 institutions across fees, placements, and ratings without marketing bias.</p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="card compare-card">
          <div className="table-responsive">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="feature-col">Parameters</th>
                  {selectedColleges.map(college => (
                    <th key={college.id} className="college-header-cell">
                      <div className="college-header-content">
                        <button
                          className="remove-btn"
                          onClick={() => removeCollegeFromCompare(college.id)}
                          title="Remove from comparison"
                        >
                          <X size={14} />
                        </button>
                        <div className="college-logo-placeholder">
                          <Building2 size={28} className="text-webfoxx-blue" />
                        </div>
                        <h3 className="college-name">{college.name}</h3>
                        <span className="badge-ownership">{college.ownership}</span>
                      </div>
                    </th>
                  ))}

                  {selectedColleges.length < 4 && (
                    <th className="add-college-cell">
                      <div className="add-box">
                        <label className="add-label flex-align justify-center">
                          <Plus size={18} />
                          <span>Add College</span>
                        </label>
                        <select
                          className="add-select"
                          onChange={e => {
                            if (e.target.value) {
                              addCollegeToCompare(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        >
                          <option value="">Select Institution...</option>
                          {availableColleges.map(col => (
                            <option key={col.id} value={col.id}>{col.name}</option>
                          ))}
                        </select>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="feature-label">Location</td>
                  {selectedColleges.map(c => (
                    <td key={c.id}>{c.location.city}, {c.location.state}</td>
                  ))}
                  {selectedColleges.length < 4 && <td></td>}
                </tr>

                <tr>
                  <td className="feature-label">Est. Year</td>
                  {selectedColleges.map(c => (
                    <td key={c.id}>{c.establishmentYear}</td>
                  ))}
                  {selectedColleges.length < 4 && <td></td>}
                </tr>

                <tr>
                  <td className="feature-label">NAAC Grade</td>
                  {selectedColleges.map(c => (
                    <td key={c.id}>
                      <span className="badge-grade">{c.naacGrade ? `NAAC ${c.naacGrade}` : 'N/A'}</span>
                    </td>
                  ))}
                  {selectedColleges.length < 4 && <td></td>}
                </tr>

                <tr>
                  <td className="feature-label">Student Rating</td>
                  {selectedColleges.map(c => (
                    <td key={c.id} className="rating-cell">
                      <span className="flex-align">
                        <Star size={14} className="text-warning" fill="currentColor" />
                        <strong>{c.rating}</strong> / 5.0
                      </span>
                    </td>
                  ))}
                  {selectedColleges.length < 4 && <td></td>}
                </tr>

                <tr>
                  <td className="feature-label">Avg Placement Package</td>
                  {selectedColleges.map(c => {
                    const plc = getPlacement(c.id);
                    return (
                      <td key={c.id} className="highlight-cell">
                        {plc ? `₹${plc.averagePackageLPA} LPA` : 'N/A'}
                      </td>
                    );
                  })}
                  {selectedColleges.length < 4 && <td></td>}
                </tr>

                <tr>
                  <td className="feature-label">Highest Placement Package</td>
                  {selectedColleges.map(c => {
                    const plc = getPlacement(c.id);
                    return (
                      <td key={c.id}>
                        {plc ? `₹${plc.highestPackageLPA} LPA` : 'N/A'}
                      </td>
                    );
                  })}
                  {selectedColleges.length < 4 && <td></td>}
                </tr>

                <tr>
                  <td className="feature-label">Placement Record</td>
                  {selectedColleges.map(c => {
                    const plc = getPlacement(c.id);
                    return (
                      <td key={c.id}>{plc ? `${plc.placementPercentage}% Placed` : 'N/A'}</td>
                    );
                  })}
                  {selectedColleges.length < 4 && <td></td>}
                </tr>

                <tr>
                  <td className="feature-label">Top Recruiters</td>
                  {selectedColleges.map(c => {
                    const plc = getPlacement(c.id);
                    return (
                      <td key={c.id} className="recruiters-cell">
                        {plc ? plc.topRecruiters.map(r => r.name).join(', ') : 'N/A'}
                      </td>
                    );
                  })}
                  {selectedColleges.length < 4 && <td></td>}
                </tr>

                <tr>
                  <td className="feature-label">Action</td>
                  {selectedColleges.map(c => (
                    <td key={c.id}>
                      <Link href={`/colleges/${c.slug}`} className="btn-outline btn-sm w-full">
                        View Profile
                      </Link>
                    </td>
                  ))}
                  {selectedColleges.length < 4 && <td></td>}
                </tr>
              </tbody>
            </table>
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

        .compare-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .badge-pill {
          display: inline-flex;
          background-color: var(--color-white);
          border: 1px solid #bfdbfe;
          color: var(--color-webfoxx-blue);
          padding: 0.35rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .justify-center {
          justify-content: center;
        }

        .page-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--color-midnight-navy);
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: var(--color-text-muted);
          font-size: 1.05rem;
        }

        .compare-card {
          padding: 0;
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .compare-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .compare-table th, .compare-table td {
          padding: 1.25rem;
          border-bottom: 1px solid var(--color-border-gray);
          border-right: 1px solid var(--color-border-gray);
          vertical-align: middle;
        }

        .feature-col {
          width: 220px;
          background-color: var(--color-light-gray);
          font-weight: 700;
          color: var(--color-midnight-navy);
        }

        .feature-label {
          font-weight: 700;
          color: var(--color-midnight-navy);
          background-color: var(--color-light-gray);
          font-size: 0.9rem;
        }

        .college-header-cell {
          width: 280px;
          position: relative;
          background-color: var(--color-white);
        }

        .college-header-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .remove-btn {
          position: absolute;
          top: -5px; right: -5px;
          background-color: var(--color-light-gray);
          color: var(--color-text-muted);
          border-radius: var(--radius-full);
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .college-logo-placeholder {
          width: 56px; height: 56px;
          border-radius: var(--radius-md);
          background-color: var(--color-webfoxx-blue-light);
          display: flex; align-items: center; justify-content: center;
          color: var(--color-webfoxx-blue);
          margin-bottom: 0.75rem;
        }

        .college-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
          margin-bottom: 0.5rem;
        }

        .badge-ownership {
          background-color: var(--color-midnight-navy-light);
          color: var(--color-midnight-navy);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .badge-grade {
          background-color: var(--color-success-light);
          color: var(--color-success);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .add-college-cell {
          width: 250px;
          background-color: var(--color-light-gray);
        }

        .add-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .add-label {
          font-weight: 700;
          color: var(--color-webfoxx-blue);
          font-size: 0.9rem;
        }

        .add-select {
          padding: 0.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border-gray);
          font-family: inherit;
          font-size: 0.85rem;
        }

        .highlight-cell {
          font-weight: 800;
          color: var(--color-webfoxx-blue);
          font-size: 1.05rem;
        }

        .recruiters-cell {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .text-warning { color: var(--color-warning); }
      `}</style>
    </div>
  );
}
