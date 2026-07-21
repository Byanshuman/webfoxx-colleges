'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, LayoutDashboard, Building2, BookOpen, Briefcase, Plus, CheckCircle2, X } from 'lucide-react';
import { SEED_COLLEGES } from '@/db/seeds/colleges.seed';
import { DBCollege } from '@/db/schema/college.schema';

export default function CMSCollegeManagerPage() {
  const [collegesList, setCollegesList] = useState<DBCollege[]>(SEED_COLLEGES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [ownership, setOwnership] = useState<'Government' | 'Private' | 'Deemed' | 'Autonomous'>('Government');
  const [naacGrade, setNaacGrade] = useState('A++');

  const handleAddCollege = (e: React.FormEvent) => {
    e.preventDefault();
    const newCollege: DBCollege = {
      id: `c_${Date.now()}`,
      name,
      slug: slug || name.toLowerCase().replace(/ /g, '-'),
      establishmentYear: 2020,
      ownership,
      naacGrade: naacGrade as DBCollege['naacGrade'],
      location: { city, state, country: 'India', address: `${city}, ${state}`, pincode: '000000' },
      approvalStatus: ['UGC', 'AICTE'],
      rating: 4.5,
      reviewCount: 1,
      overview: `${name} is a newly added higher education institution.`,
      contact: { website: 'https://webfoxx.com', email: 'info@webfoxx.com' },
      facilities: [
        { icon: 'Library', name: 'Library' },
        { icon: 'Wifi', name: 'Wi-Fi' },
        { icon: 'Building', name: 'Sports Complex' }
      ],
      faculty: [],
      gallery: [],
      documents: [],
      highlights: ['Verified Admission Data'],
      featured: true,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCollegesList([newCollege, ...collegesList]);
    setIsModalOpen(false);
    // Reset Form
    setName('');
    setSlug('');
    setCity('');
    setState('');
  };

  return (
    <div className="cms-layout">
      {/* CMS Sidebar */}
      <aside className="cms-sidebar">
        <div className="sidebar-header flex-align">
          <GraduationCap size={26} className="text-blue" />
          <span className="brand-title">WebFoxx CMS</span>
        </div>

        <nav className="sidebar-nav">
          <Link href="/cms/dashboard" className="nav-item flex-align">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link href="/cms/colleges" className="nav-item active flex-align">
            <Building2 size={18} />
            <span>College Manager</span>
          </Link>
          <Link href="/cms/courses" className="nav-item flex-align">
            <BookOpen size={18} />
            <span>Courses & Fees</span>
          </Link>
          <Link href="/cms/placements" className="nav-item flex-align">
            <Briefcase size={18} />
            <span>Placement Stats</span>
          </Link>
        </nav>
      </aside>

      {/* Main CMS Content */}
      <main className="cms-main">
        <header className="main-header flex-between">
          <div>
            <h1 className="page-title">College Data Manager</h1>
            <p className="page-subtitle">Add, edit, and publish verified college profile records.</p>
          </div>
          <button className="btn-primary flex-align" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            <span>Add New College</span>
          </button>
        </header>

        {/* Colleges Table */}
        <div className="card table-card">
          <div className="table-responsive">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>College Name</th>
                  <th>City & State</th>
                  <th>Ownership</th>
                  <th>NAAC Grade</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {collegesList.map(college => (
                  <tr key={college.id}>
                    <td>
                      <div className="college-name">{college.name}</div>
                      <div className="college-slug">/colleges/{college.slug}</div>
                    </td>
                    <td>{college.location.city}, {college.location.state}</td>
                    <td><span className="badge-ownership">{college.ownership}</span></td>
                    <td><span className="badge-grade">{college.naacGrade ? `NAAC ${college.naacGrade}` : 'N/A'}</span></td>
                    <td>
                      <span className="status-verified flex-align">
                        <CheckCircle2 size={14} className="text-success" />
                        <span>Verified</span>
                      </span>
                    </td>
                    <td>
                      <Link href={`/colleges/${college.slug}`} className="btn-outline btn-sm" target="_blank">
                        Preview
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add College Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Add New Institution</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCollege} className="college-form">
              <div className="form-group">
                <label className="form-label">College Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. National Institute of Technology Trichy"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">URL Slug</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="nit-trichy"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Tiruchirappalli"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Tamil Nadu"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Ownership</label>
                  <select
                    className="form-select"
                    value={ownership}
                    onChange={e => setOwnership(e.target.value as any)}
                  >
                    <option value="Government">Government</option>
                    <option value="Private">Private</option>
                    <option value="Deemed">Deemed</option>
                    <option value="Autonomous">Autonomous</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">NAAC Grade</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="A++"
                    value={naacGrade}
                    onChange={e => setNaacGrade(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-4">
                Publish College Record
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .cms-layout {
          display: flex;
          min-height: 100vh;
          background-color: var(--color-light-gray);
        }

        .cms-sidebar {
          width: 260px;
          background-color: var(--color-midnight-navy);
          color: var(--color-white);
          padding: 1.5rem;
          flex-shrink: 0;
        }

        .sidebar-header {
          gap: 0.5rem;
          margin-bottom: 2.5rem;
        }

        .brand-title {
          font-weight: 800;
          font-size: 1.15rem;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          color: #94a3b8;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all var(--transition-fast);
        }

        .nav-item:hover, .nav-item.active {
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--color-white);
        }

        .cms-main {
          flex: 1;
          padding: 2.5rem;
        }

        .main-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-midnight-navy);
        }

        .page-subtitle {
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }

        .table-card {
          padding: 0;
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .cms-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .cms-table th, .cms-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--color-border-gray);
        }

        .cms-table th {
          background-color: var(--color-light-gray);
          font-size: 0.85rem;
          color: var(--color-midnight-navy);
          font-weight: 700;
        }

        .college-name {
          font-weight: 700;
          color: var(--color-midnight-navy);
        }

        .college-slug {
          font-size: 0.775rem;
          color: var(--color-text-muted);
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

        .status-verified {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-success);
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
          max-width: 500px;
          width: 90%;
          box-shadow: var(--shadow-lg);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .close-btn {
          color: var(--color-text-muted);
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border: 1px solid var(--color-border-gray);
          border-radius: var(--radius-md);
          font-family: inherit;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .text-success { color: var(--color-success); }
      `}</style>
    </div>
  );
}
