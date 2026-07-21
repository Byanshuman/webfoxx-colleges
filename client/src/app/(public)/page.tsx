'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Search, PhoneOff, BadgeCheck, Scale, Building2, MapPin, Star } from 'lucide-react';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { SEED_COLLEGES } from '@/db/seeds/colleges.seed';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredColleges = SEED_COLLEGES.filter(c => c.featured);

  return (
    <div className="page-wrapper">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="badge-pill flex-align justify-center">
            <Sparkles size={14} />
            <span>Zero Spam Guarantee</span>
          </div>

          <h1 className="hero-title">
            Find Colleges. <span className="highlight-blue">Not Spam.</span>
          </h1>

          <p className="hero-subtitle">
            Explore verified details on Indian colleges, fees, real placement packages, NIRF rankings, and cut-offs without promotional calls or sold numbers.
          </p>

          {/* Search Box */}
          <div className="search-box-card">
            <div className="search-input-group">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search colleges (e.g. IIT Bombay, IIM Ahmedabad, BITS Pilani)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Link
                href={`/search${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ''}`}
                className="btn-primary"
              >
                Search Colleges
              </Link>
            </div>

            <div className="quick-tags">
              <span className="tag-label">Popular Searches:</span>
              <Link href="/search?stream=Engineering" className="chip">Engineering</Link>
              <Link href="/search?stream=Management" className="chip">MBA / Management</Link>
              <Link href="/search?state=Maharashtra" className="chip">Mumbai</Link>
              <Link href="/search?ownership=Government" className="chip">IITs & NITs</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="values-section container">
        <div className="section-header text-center">
          <h2 className="section-title">Why Students Trust WebFoxx Colleges</h2>
          <p className="section-subtitle">We put student privacy and factual data before commissions.</p>
        </div>

        <div className="values-grid">
          <div className="card value-card">
            <div className="value-icon">
              <PhoneOff size={32} className="text-webfoxx-blue" />
            </div>
            <h3>Zero Phone Spam</h3>
            <p>Your contact details are strictly private. We never sell your phone number to third-party admission agents or marketing telecallers.</p>
          </div>

          <div className="card value-card">
            <div className="value-icon">
              <BadgeCheck size={32} className="text-webfoxx-blue" />
            </div>
            <h3>Verified Data Only</h3>
            <p>Every fee structure, NIRF ranking, NAAC accreditation grade, and placement statistic is cross-referenced with official records.</p>
          </div>

          <div className="card value-card">
            <div className="value-icon">
              <Scale size={32} className="text-webfoxx-blue" />
            </div>
            <h3>Unbiased Rankings</h3>
            <p>Our search rankings are strictly objective based on parameters you choose—never paid positions or sponsored institution priority.</p>
          </div>
        </div>
      </section>

      {/* Featured Colleges Showcase */}
      <section className="colleges-section container">
        <div className="section-header flex-between">
          <div>
            <h2 className="section-title">Premier Colleges & Universities</h2>
            <p className="section-subtitle">Explore top-rated institutions across India.</p>
          </div>
          <Link href="/search" className="btn-outline">
            View All Colleges →
          </Link>
        </div>

        <div className="colleges-grid">
          {featuredColleges.map(college => (
            <div key={college.id} className="card college-card">
              <div className="college-card-header">
                <div className="college-logo-placeholder">
                  <Building2 size={24} className="text-webfoxx-blue" />
                </div>
                <div>
                  <span className="badge-grade">{college.naacGrade ? `NAAC ${college.naacGrade}` : 'Verified'}</span>
                  <span className="badge-ownership">{college.ownership}</span>
                </div>
              </div>

              <h3 className="college-name">{college.name}</h3>
              <p className="college-location flex-align">
                <MapPin size={14} />
                <span>{college.location.city}, {college.location.state}</span>
              </p>

              <div className="college-stats">
                <div className="stat-item">
                  <span className="stat-label">Est. Year</span>
                  <span className="stat-val">{college.establishmentYear}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Rating</span>
                  <span className="stat-val flex-align">
                    <Star size={14} className="text-warning" fill="currentColor" />
                    <span>{college.rating} ({college.reviewCount})</span>
                  </span>
                </div>
              </div>

              <div className="college-card-actions">
                <Link href={`/colleges/${college.slug}`} className="btn-outline w-full">
                  View Full Profile
                </Link>
                <Link href={`/compare?colleges=${college.id}`} className="btn-primary btn-icon" title="Compare">
                  <Scale size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .hero-section {
          background: linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%);
          padding: 5rem 0 4rem;
          border-bottom: 1px solid var(--color-border-gray);
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .justify-center {
          justify-content: center;
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
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-sm);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--color-midnight-navy);
          line-height: 1.15;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }

        .highlight-blue {
          color: var(--color-webfoxx-blue);
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
        }

        .search-box-card {
          background-color: var(--color-white);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-border-gray);
        }

        .search-input-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: var(--color-light-gray);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border-gray);
          margin-bottom: 1rem;
        }

        .search-icon {
          color: var(--color-text-muted);
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 1rem;
          font-family: inherit;
          outline: none;
        }

        .quick-tags {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 0.85rem;
        }

        .tag-label {
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .chip {
          background-color: var(--color-light-gray);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border-gray);
          color: var(--color-text-main);
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .chip:hover {
          border-color: var(--color-webfoxx-blue);
          color: var(--color-webfoxx-blue);
        }

        .values-section {
          padding: 5rem 1.5rem;
        }

        .section-header {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--color-midnight-navy);
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: var(--color-text-muted);
          font-size: 1.05rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .value-card {
          text-align: left;
          padding: 2rem;
        }

        .value-icon {
          margin-bottom: 1rem;
          color: var(--color-webfoxx-blue);
        }

        .value-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
          margin-bottom: 0.75rem;
        }

        .value-card p {
          color: var(--color-text-muted);
          font-size: 0.925rem;
          line-height: 1.6;
        }

        .colleges-section {
          padding-bottom: 5rem;
        }

        .flex-between {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .colleges-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .college-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .college-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .college-logo-placeholder {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background-color: var(--color-webfoxx-blue-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-webfoxx-blue);
        }

        .badge-grade {
          background-color: var(--color-success-light);
          color: var(--color-success);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          margin-right: 0.5rem;
        }

        .badge-ownership {
          background-color: var(--color-midnight-navy-light);
          color: var(--color-midnight-navy);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .college-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .college-location {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }

        .college-stats {
          display: flex;
          gap: 1.5rem;
          padding: 0.75rem 0;
          border-top: 1px solid var(--color-border-gray);
          border-bottom: 1px solid var(--color-border-gray);
          margin-bottom: 1.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--color-text-light);
          font-weight: 600;
        }

        .stat-val {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
        }

        .college-card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-icon {
          padding: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-warning {
          color: var(--color-warning);
        }

        @media (max-width: 992px) {
          .values-grid, .colleges-grid {
            grid-template-columns: 1fr 1fr;
          }
          .hero-title {
            font-size: 2.75rem;
          }
        }

        @media (max-width: 640px) {
          .values-grid, .colleges-grid {
            grid-template-columns: 1fr;
          }
          .search-input-group {
            flex-direction: column;
          }
          .hero-title {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </div>
  );
}
