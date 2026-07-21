import { DBCollege, DBCourse } from '@/db/schema';
import { BRAND } from '@/lib/constants';

/**
 * Generate Schema.org EducationalOrganization JSON-LD structure
 */
export function generateCollegeJsonLd(college: DBCollege) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: college.name,
    alternateName: college.shortName,
    url: `${BRAND.domain}/colleges/${college.slug}`,
    logo: college.logoUrl || `${BRAND.domain}/brand-logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: college.location.address,
      addressLocality: college.location.city,
      addressRegion: college.location.state,
      postalCode: college.location.pincode,
      addressCountry: college.location.country,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: college.rating,
      reviewCount: college.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Generate Schema.org EducationalOccupationalProgram JSON-LD structure
 */
export function generateCourseJsonLd(course: DBCourse, collegeName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: course.title,
    programPrerequisites: course.eligibility,
    educationalCredentialAwarded: course.degreeLevel,
    timeToComplete: `P${course.durationYears}Y`,
    offeredBy: {
      '@type': 'EducationalOrganization',
      name: collegeName,
    },
  };
}
