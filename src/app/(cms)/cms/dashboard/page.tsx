'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, LayoutDashboard, Building2, BookOpen, Briefcase, Search } from 'lucide-react';

export default function CMSDashboardPage() {
  return (
    <div className="cms-layout">
      {/* CMS Sidebar */}
      <aside className="cms-sidebar">
        <div className="sidebar-header flex-align">
          <GraduationCap size={26} className="text-blue" />
          <span className="brand-title">WebFoxx CMS</span>
        </div>

        <nav className="sidebar-nav">
          <Link href="/cms/dashboard" className="nav-item active flex-align">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link href="/cms/colleges" className="nav-item flex-align">
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
            <h1 className="page-title">Executive CMS Dashboard</h1>
            <p className="page-subtitle">Manage institution data, placement statistics, and zero spam verification.</p>
          </div>
          <div className="admin-badge">Admin Workspace</div>
        </header>

        {/* Metric Overview Cards */}
        <div className="metrics-grid">
          <div className="card metric-card">
            <div className="metric-icon flex-align justify-center">
              <Building2 size={24} className="text-webfoxx-blue" />
            </div>
            <div>
              <span className="metric-val">12,450+</span>
              <span className="metric-lbl">Total Verified Institutions</span>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon flex-align justify-center">
              <BookOpen size={24} className="text-webfoxx-blue" />
            </div>
            <div>
              <span className="metric-val">45,200+</span>
              <span className="metric-lbl">Degree Courses Listed</span>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon flex-align justify-center">
              <Briefcase size={24} className="text-webfoxx-blue" />
            </div>
            <div>
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Zero Spam Compliance Rate</span>
            </div>
          </div>
        </div>

        {/* Quick Management Links */}
        <div className="card mt-6">
          <h2 className="card-title mb-4">Quick Management Actions</h2>
          <div className="quick-actions-grid">
            <Link href="/cms/colleges" className="action-btn card flex-align">
              <Building2 size={20} className="text-webfoxx-blue" />
              <span>Manage Colleges & Universities</span>
            </Link>
            <Link href="/cms/courses" className="action-btn card flex-align">
              <BookOpen size={20} className="text-webfoxx-blue" />
              <span>Update Fee Structures</span>
            </Link>
            <Link href="/cms/placements" className="action-btn card flex-align">
              <Briefcase size={20} className="text-webfoxx-blue" />
              <span>Audit Placement Data</span>
            </Link>
            <Link href="/search" className="action-btn card flex-align">
              <Search size={20} className="text-webfoxx-blue" />
              <span>Preview Public Search Engine</span>
            </Link>
          </div>
        </div>
      </main>

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

        .admin-badge {
          background-color: var(--color-webfoxx-blue-light);
          color: var(--color-webfoxx-blue);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.85rem;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .metric-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.5rem;
        }

        .metric-icon {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background-color: var(--color-webfoxx-blue-light);
          color: var(--color-webfoxx-blue);
        }

        .metric-val {
          display: block;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-midnight-navy);
        }

        .metric-lbl {
          font-size: 0.825rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .action-btn {
          padding: 1.25rem;
          font-weight: 700;
          color: var(--color-midnight-navy);
          transition: transform var(--transition-fast);
        }

        .action-btn:hover {
          transform: translateY(-2px);
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

        .mt-6 { margin-top: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
      `}</style>
    </div>
  );
}
