import React from 'react';
import '@/styles/globals.css';
import { BRAND } from '@/lib/constants';

export const metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: 'India’s most transparent, spam-free, data-driven college discovery platform. Verified college fees, NIRF rankings, and placement statistics.',
  keywords: ['Colleges in India', 'College Comparison', 'NIRF Rankings', 'Engineering Colleges', 'MBA Colleges', 'Spam Free College Discovery'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
