'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Smartphone, Menu, X } from 'lucide-react';
import { BRAND, NAVIGATION_LINKS } from '@/lib/constants';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand Logo & Tagline */}
        <Link href="/" className="brand-logo">
          <div className="brand-icon">
            <GraduationCap size={22} className="text-blue" />
          </div>
          <div className="brand-text">
            <span className="brand-title">{BRAND.name}</span>
            <span className="brand-tagline">{BRAND.tagline}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {NAVIGATION_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <Link href="/login" className="btn-outline btn-sm flex-align">
            <Smartphone size={16} />
            <span>Mobile Login / OTP</span>
          </Link>
          <Link href="/compare" className="btn-primary btn-sm">
            Compare Colleges
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu container">
          {NAVIGATION_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-menu-actions">
            <Link href="/login" className="btn-outline w-full flex-align justify-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Smartphone size={16} />
              <span>Mobile OTP Login</span>
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .site-header {
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-border-gray);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-sm);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background-color: var(--color-webfoxx-blue-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-webfoxx-blue);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--color-midnight-navy);
          line-height: 1.1;
        }

        .brand-tagline {
          font-size: 0.75rem;
          color: var(--color-webfoxx-blue);
          font-weight: 600;
        }

        .desktop-nav {
          display: flex;
          gap: 1.75rem;
        }

        .nav-link {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--color-text-muted);
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--color-webfoxx-blue);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .justify-center {
          justify-content: center;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .mobile-toggle {
          display: none;
          color: var(--color-midnight-navy);
          padding: 0.5rem;
        }

        .mobile-menu {
          display: flex;
          flex-direction: column;
          padding: 1rem 1.5rem;
          background-color: var(--color-white);
          border-bottom: 1px solid var(--color-border-gray);
        }

        .mobile-nav-link {
          padding: 0.75rem 0;
          font-weight: 600;
          border-bottom: 1px solid var(--color-border-gray);
        }

        .mobile-menu-actions {
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .header-actions .btn-outline,
          .header-actions .btn-primary {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
