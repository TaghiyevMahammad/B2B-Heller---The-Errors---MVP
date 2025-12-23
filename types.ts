export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  UNIVERSITY_ADMIN = 'UNIVERSITY_ADMIN',
  PARTNER_COMPANY = 'PARTNER_COMPANY'
}

export interface Skill {
  name: string;
  value: number; // 0-100
  category: 'Technical' | 'Soft' | 'Analytical' | 'Project' | 'Tools';
  isAiGenerated?: boolean;
}

export interface ProfileLink {
  id: string;
  platform: 'LinkedIn' | 'GitHub' | 'LeetCode' | 'Other';
  label?: string;
  url: string;
}

export interface CVData {
  fileName: string;
  uploadDate: string;
  analysisStatus: 'none' | 'processing' | 'completed' | 'demo';
}

export interface Certificate {
  id: string;
  name: string;
  verificationNumber: string;
  url: string;
  image: string;
  date: string;
}

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  description: string;
  logo: string;
  tags: string[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  contactEmail: string;
  industry: string;
  status: 'Active' | 'Inactive';
}

export type ApplicationStatus = 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';

export interface JobApplication {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  company: string;
  appliedDate: string;
  status: ApplicationStatus;
}

export interface TeacherReference {
  id: string;
  teacherName: string;
  studentName: string;
  courseName: string; // Used as Subject name
  date: string;
  rating: number; // 1-5
  skills: string[];
  comment: string;
  isVerified: boolean;
}

export interface AcademicProject {
  id: string;
  title: string;
  grade: string;
  skillsGained: string[];
  description: string;
}

export interface Student {
  id: string;
  name: string;
  surname: string;
  email: string;
  faculty: string;
  courseYear: number;
  gpa: number;
  skills: Skill[];
  references: TeacherReference[];
  projects: AcademicProject[];
  avatar: string;
  links: ProfileLink[];
  certificates: Certificate[];
  applications: JobApplication[];
  cv?: CVData;
}

export interface UniversityStats {
  totalStudents: number;
  totalTeachers: number;
  partnerCompanies: number;
  averageGpa: number;
  topSkills: { name: string; count: number }[];
}