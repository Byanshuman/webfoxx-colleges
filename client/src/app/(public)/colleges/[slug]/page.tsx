import React from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { SEED_COLLEGES, SEED_COURSES, SEED_PLACEMENTS, SEED_RANKINGS } from '@/db/seeds/colleges.seed';
import { CollegeDetailClient } from '@/components/college/college-detail-client';

interface CollegeDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return SEED_COLLEGES.map(college => ({
    slug: college.slug,
  }));
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const college = SEED_COLLEGES.find(c => c.slug === params.slug);

  if (!college) {
    notFound();
  }

  const courses = SEED_COURSES.filter(c => c.collegeId === college.id);
  const placement = SEED_PLACEMENTS.find(p => p.collegeId === college.id);
  const rankings = SEED_RANKINGS.filter(r => r.collegeId === college.id);

  return (
    <div className="page-wrapper">
      <Header />
      <CollegeDetailClient
        college={college}
        courses={courses}
        placement={placement}
        rankings={rankings}
      />
      <Footer />
    </div>
  );
}
