// Shared Firebase Ecosystem User Entity Schema & Audit Logs

export type WebFoxxEcosystemRole =
  | 'academy_student'
  | 'college_student'
  | 'college_representative'
  | 'content_manager'
  | 'moderator'
  | 'administrator'
  | 'super_administrator';

export interface DBUser {
  id: string;
  firebaseUid?: string;
  mobile: string;
  email?: string;
  fullName: string;
  roles: WebFoxxEcosystemRole[];
  primaryRole: WebFoxxEcosystemRole;
  isMobileVerified: boolean;
  isEmailVerified: boolean;
  savedColleges: string[];
  savedComparisons: {
    id: string;
    title: string;
    collegeIds: string[];
    createdAt: string;
  }[];
  downloadedBrochures: {
    collegeId: string;
    downloadedAt: string;
  }[];
  preferences?: {
    preferredStreams: string[];
    preferredStates: string[];
    maxBudgetLakhs?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DBOTPRecord {
  id: string;
  mobile: string;
  otpHash: string;
  expiresAt: string;
  attempts: number;
  isUsed: boolean;
  createdAt: string;
}

export interface DBAuditLog {
  id: string;
  userId: string;
  userRole: string;
  action: string; // e.g. "COLLEGE_UPDATE", "USER_ROLE_CHANGE", "DELETE_COURSE"
  entityName: string;
  entityId: string;
  changesSummary?: string;
  ipAddress?: string;
  createdAt: string;
}
