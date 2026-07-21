'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Star, CheckCircle2, Scale, Search as SearchIcon } from 'lucide-react';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { SEED_COLLEGES } from '@/db/seeds/colleges.seed';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedOwnership, setSelectedOwnership] = useState<string>('All');

  const statesList = useMemo(() => {
    const states = Array.from(new Set(SEED_COLLEGES.map(c => c.location.state)));
    return ['All', ...states];
  }, []);

  const filteredColleges = useMemo(() => {
    return SEED_COLLEGES.filter(college => {
      const matchesSearch =
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (college.shortName && college.shortName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesState = selectedState === 'All' || college.location.state === selectedState;
      const matchesOwnership = selectedOwnership === 'All' || college.ownership === selectedOwnership;

      return matchesSearch && matchesState && matchesOwnership;
    });
  }, [searchTerm, selectedState, selectedOwnership]);

  return (
    <div className="page-wrapper">
      <Header />

      <main className="container main-content">
        <div className="search-header">
          <h1 className="page-title">Find Verified Colleges in India</h1>
          <p className="page-subtitle">No marketing calls. No hidden fees. 100% transparent data.</p>
        </div>

        <div className="search-layout">
          {/* Sidebar Filters */}
          <aside className="filter-sidebar card">
            <h3 className="filter-title">Filters</h3>

            <div className="filter-group">
              <label className="filter-label">State</label>
              <select
                className="filter-select"
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
              >
                {statesList.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Ownership Type</label>
              <select
                className="filter-select"
                value={selectedOwnership}
                onChange={e => setSelectedOwnership(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Government">Government / Public</option>
                <option value="Private">Private</option>
                <option value="Deemed">Deemed University</option>
                <option value="Autonomous">Autonomous</option>
              </select>
            </div>

            <button
              className="btn-outline w-full btn-sm mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedState('All');
                setSelectedOwnership('All');
              }}
            >
              Reset Filters
            </button>
          </aside>

          {/* Results Area */}
          <div className="results-container">
            <div className="search-bar-wrapper">
              <SearchIcon size={18} className="search-icon" />
              <input
                type="text"
                className="search-bar-input"
                placeholder="Search college name, short name or city..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="results-meta flex-between">
              <span className="results-count">
                Showing <strong>{filteredColleges.length}</strong> verified institutions
              </span>
              <span className="spam-badge flex-align">
                <CheckCircle2 size={14} className="text-success" />
                <span>Zero Spam Guarantee Enabled</span>
              </span>
            </div>

            <div className="results-list">
              {filteredColleges.map(college => (
                <div key={college.id} className="card result-card">
                  <div className="result-main">
                    <div className="college-logo-placeholder">
                      <Building2 size={28} className="text-webfoxx-blue" />
                    </div>
                    <div className="result-details">
                      <div className="badges-row">
                        <span className="badge-grade">{college.naacGrade ? `NAAC ${college.naacGrade}` : 'Verified'}</span>
                        <span className="badge-ownership">{college.ownership}</span>
                        {college.shortName && <span className="badge-short">{college.shortName}</span>}
                      </div>

                      <h2 className="college-title">{college.name}</h2>
                      <p className="college-location flex-align">
                        <MapPin size={14} />
                        <span>{college.location.city}, {college.location.state}</span>
                      </p>
                    </div>
                  </div>

                  <div className="result-sidebar">
                    <div className="rating-box flex-align">
                      <Star size={14} className="text-warning" fill="currentColor" />
                      <span className="rating-num">{college.rating}</span>
                      <span className="rating-count">({college.reviewCount} reviews)</span>
                    </div>

                    <div className="action-buttons">
                      <Link href={`/colleges/${college.slug}`} className="btn-outline btn-sm">
                        View Details
                      </Link>
                      <Link href={`/compare?colleges=${college.id}`} className="btn-primary btn-sm flex-align">
                        <Scale size={16} />
                        <span>Compare</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {filteredColleges.length === 0 && (
                <div className="card empty-state text-center">
                  <h3>No Colleges Found</h3>
                  <p>Try adjusting your search criteria or resetting the filters.</p>
                </div>
              )}
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

        .search-header {
          margin-bottom: 2rem;
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

        .search-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
        }

        .filter-sidebar {
          height: fit-content;
        }

        .filter-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-border-gray);
        }

        .filter-group {
          margin-bottom: 1.25rem;
        }

        .filter-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-midnight-navy);
          margin-bottom: 0.5rem;
        }

        .filter-select {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border-gray);
          background-color: var(--color-light-gray);
          font-family: inherit;
          outline: none;
        }

        .search-bar-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: var(--color-white);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border-gray);
          box-shadow: var(--shadow-sm);
          margin-bottom: 1.25rem;
        }

        .search-icon {
          color: var(--color-text-muted);
        }

        .search-bar-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.975rem;
          font-family: inherit;
          outline: none;
        }

        .flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .results-meta {
          margin-bottom: 1.25rem;
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .spam-badge {
          color: var(--color-success);
          font-weight: 600;
          font-size: 0.85rem;
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .result-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
        }

        .result-main {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .college-logo-placeholder {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          background-color: var(--color-webfoxx-blue-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-webfoxx-blue);
          flex-shrink: 0;
        }

        .badges-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .badge-grade {
          background-color: var(--color-success-light);
          color: var(--color-success);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .badge-ownership {
          background-color: var(--color-midnight-navy-light);
          color: var(--color-midnight-navy);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .badge-short {
          background-color: var(--color-light-gray);
          color: var(--color-text-muted);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .college-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
          margin-bottom: 0.35rem;
        }

        .college-location {
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }

        .result-sidebar {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        .rating-box {
          font-size: 0.9rem;
        }

        .rating-num {
          font-weight: 700;
          color: var(--color-midnight-navy);
        }

        .rating-count {
          color: var(--color-text-light);
          font-size: 0.8rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .text-success {
          color: var(--color-success);
        }

        .text-warning {
          color: var(--color-warning);
        }

        .empty-state {
          padding: 3rem 1.5rem;
        }

        @media (max-width: 850px) {
          .search-layout {
            grid-template-columns: 1fr;
          }
          .result-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .result-sidebar {
            align-items: flex-start;
            width: 100%;

            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
