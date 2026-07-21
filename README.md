# 🎓 WebFoxx Colleges (v1.1.0)

> **Tagline:** *Find Colleges. Not Spam.*  
> **Domain:** `colleges.webfoxx.com`

---

## 📌 Project Overview
WebFoxx Colleges is India’s most transparent, spam-free, data-driven college discovery platform. Designed with a student-first philosophy, it provides verified information on colleges, universities, courses, placement statistics, cut-offs, fees, and scholarships—without promotional bias or unwanted counseling calls.

---

## 📁 Directory Structure & Folder Tree

```
Colleges Webfoxx/
├── WebFoxx Colleges v1.1.0 Development Cycle.md   # Official Product Specification Blueprint
├── brand kit college.png                          # Brand asset reference
├── .env.example                                   # Environment configuration template
├── package.json                                   # Dependencies & project scripts
├── tsconfig.json                                  # TypeScript compiler configuration
└── src/
    ├── app/                                       # App Router Pages & API Routes
    │   ├── (public)/                              # 07. Website Development Public Pages
    │   │   ├── page.tsx                           # 7.1 Homepage
    │   │   ├── search/                            # 7.2 & 10. Search & Discovery
    │   │   ├── colleges/                          # 7.3 College Listing & 7.4 Detail
    │   │   ├── universities/                      # 7.5 University Detail
    │   │   ├── courses/                           # 7.6 Course Detail
    │   │   ├── compare/                           # 7.7 Compare Colleges Tool
    │   │   ├── scholarships/                      # 7.8 Scholarships Hub
    │   │   ├── exams/                             # 7.9 Entrance Exams Portal
    │   │   ├── about/                             # 7.10 About Us
    │   │   ├── contact/                           # 7.11 Contact Page
    │   │   └── legal/                             # 7.12 Legal Pages (Privacy, Terms, Disclaimer)
    │   ├── (auth)/                                # 08. Mobile OTP & Email Authentication
    │   │   ├── login/                             # Mobile OTP Login (Priority)
    │   │   ├── register/                          # Student & User Registration
    │   │   ├── verify-otp/                        # OTP Verification
    │   │   └── forgot-password/                   # Recovery Flow
    │   ├── (student)/                             # 09. Student Features & Portal
    │   │   └── student/
    │   │       ├── dashboard/                     # Student Overview
    │   │       ├── saved-colleges/                # Saved / Bookmarked Colleges
    │   │       ├── saved-comparisons/             # Saved Comparisons
    │   │       ├── recently-viewed/               # Recently Viewed History
    │   │       ├── downloads/                     # Downloaded Brochures
    │   │       └── profile/                       # Profile Management
    │   ├── (cms)/                                 # 05. CMS Management Modules
    │   │   └── cms/
    │   │       ├── dashboard/                     # CMS Executive Analytics Dashboard
    │   │       ├── colleges/                      # 5.2 College Manager
    │   │       ├── universities/                  # 5.3 University Manager
    │   │       ├── courses/                       # 5.4 Course Manager
    │   │       ├── admissions/                    # 5.5 Admission Manager
    │   │       ├── placements/                    # 5.6 Placement Manager
    │   │       ├── scholarships/                  # 5.7 Scholarship Manager
    │   │       ├── rankings/                      # 5.8 Ranking Manager
    │   │       ├── exams/                         # 5.9 Exam Manager
    │   │       ├── media/                         # 5.10 Media Manager
    │   │       ├── seo/                           # 5.11 SEO Manager
    │   │       ├── users/                         # 5.12 User Management
    │   │       ├── roles/                         # 5.13 Role Management
    │   │       └── settings/                      # 5.14 System Settings
    │   └── api/                                   # Backend REST / Next API Endpoints
    │       └── v1/
    │           ├── auth/                          # OTP & JWT Authentication Endpoints
    │           ├── colleges/                      # Public & Protected College APIs
    │           ├── universities/                  # University APIs
    │           ├── courses/                       # Course APIs
    │           ├── exams/                         # Exam APIs
    │           ├── scholarships/                  # Scholarship APIs
    │           ├── compare/                       # Comparison Engine APIs
    │           ├── student/                       # Student Profile & Saved Items APIs
    │           └── cms/                           # Dynamic CMS Management APIs
    ├── components/                                # 06. UI/UX Design System & Components
    │   ├── ui/                                    # Base Design Tokens & Atomic UI (Buttons, Cards, Modals)
    │   ├── common/                                # Navigation, Header, Footer, SearchBar
    │   ├── public/                                # Feature-specific Public Web Components
    │   ├── student/                               # Student Portal Dashboard Components
    │   └── cms/                                   # CMS Management & Data Table Components
    ├── db/                                        # 04. Database Architecture & Schemas
    │   ├── schema/                                # Database Table Schemas & Model Definitions
    │   ├── migrations/                            # SQL & Migration Scripts
    │   └── seeds/                                 # Initial Data Seeding Scripts
    ├── lib/                                       # Design System Utilities & Helpers
    │   ├── constants.ts                           # Brand Colors, Navigation & Role Definitions
    │   ├── utils.ts                               # Utility Functions
    │   ├── auth.ts                                # JWT & Session Validation
    │   └── seo.ts                                 # Metadata & Structured Data Generators
    ├── services/                                  # Business Logic & Service Layers
    │   ├── college.service.ts                     # College Service Operations
    │   ├── search.service.ts                      # Global Search & Filter Engines
    │   └── auth.service.ts                        # OTP & User Service Operations
    ├── styles/                                    # Design System Stylesheets
    │   ├── tokens.css                             # CSS Variable Tokens (WebFoxx Blue #2563EB, Midnight Navy #0F172A)
    │   └── globals.css                            # Global Styles & Typography Settings
    └── types/                                     # TypeScript Type Declarations
        └── index.ts                               # Central Domain Model Interfaces
```

---

## 🎨 Brand Design System Tokens

| Token | Hex | Role |
| ----- | ----- | ----- |
| **WebFoxx Blue** | `#2563EB` | Primary Action / Accent |
| **Midnight Navy** | `#0F172A` | Primary Dark / Headers |
| **White** | `#FFFFFF` | Card & Background |
| **Light Gray** | `#F8FAFC` | Page Background |
| **Border Gray** | `#E2E8F0` | Dividers & Borders |
| **Success Green** | `#16A34A` | Verification & Positive Badges |
| **Warning Amber** | `#F59E0B` | Deadlines & Pending States |
| **Error Red** | `#DC2626` | Validation Errors |

- **Primary Font:** Plus Jakarta Sans
- **Secondary Font:** Lato

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local

# 3. Start local development server
npm run dev
```
