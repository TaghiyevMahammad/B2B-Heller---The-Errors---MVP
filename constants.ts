import { Student, UserRole, UniversityStats, Vacancy, TeacherReference, Partner } from './types';

export const MOCK_STUDENT: Student = {
  id: 'st-001',
  name: 'Aysel',
  surname: 'Məmmədova',
  email: 'test.student@unec.edu.az',
  faculty: 'Kompüter Elmləri',
  courseYear: 3,
  gpa: 3.85,
  avatar: 'https://picsum.photos/seed/aysel/200',
  skills: [
    { name: 'Alqoritmlər', value: 72, category: 'Technical' },
    { name: 'Problem Həll Etmə', value: 68, category: 'Analytical' },
    { name: 'Komanda İşi', value: 75, category: 'Soft' },
    { name: 'Tədqiqat', value: 55, category: 'Analytical' },
    { name: 'Frontend İnkişaf', value: 82, category: 'Technical' },
  ],
  links: [],
  cv: {
    fileName: '',
    uploadDate: '',
    analysisStatus: 'none'
  },
  certificates: [
    {
      id: 'c1',
      name: 'Google Data Analytics Professional Certificate',
      verificationNumber: 'GDA-9921-X',
      url: 'https://coursera.org/verify/GDA9921X',
      image: 'https://picsum.photos/seed/analytics/600/400',
      date: '2024-01-10'
    }
  ],
  applications: [],
  references: [
    {
      id: 'ref-1',
      teacherName: 'Dr. Əli Əliyev',
      studentName: 'Aysel Məmmədova',
      courseName: 'Verilənlər Strukturuna Giriş',
      date: '2023-12-15',
      rating: 5,
      skills: ['Alqoritmlər', 'Məntiqi Təfəkkür'],
      comment: 'Aysel dərslərdə çox aktiv idi və mürəkkəb alqoritmik problemləri həll etməkdə üstünlük göstərirdi.',
      isVerified: true
    }
  ],
  projects: [
    {
      id: 'p-1',
      title: 'Təhsil İdarəetmə Sistemi',
      grade: 'A',
      skillsGained: ['React', 'Node.js', 'UI/UX'],
      description: 'Universitet daxili imtahan nəticələrini izləyən tam funksional veb tətbiq.'
    }
  ]
};

export const MOCK_PARTNERS: Partner[] = [
  {
    id: 'p1',
    name: 'Pasha Bank',
    logo: 'https://picsum.photos/seed/pasha/100',
    description: 'Azərbaycanın aparıcı korporativ bankı.',
    website: 'https://www.pashabank.az',
    contactEmail: 'hr@pashabank.az',
    industry: 'Banking',
    status: 'Active'
  },
  {
    id: 'p2',
    name: 'Azercell',
    logo: 'https://picsum.photos/seed/azercell/100',
    description: 'Ölkənin ən böyük mobil rabitə operatoru.',
    website: 'https://www.azercell.com',
    contactEmail: 'career@azercell.com',
    industry: 'Telecommunications',
    status: 'Active'
  },
  {
    id: 'p3',
    name: 'Google Azerbaijan',
    logo: 'https://picsum.photos/seed/google/100',
    description: 'Qlobal texnologiya nəhənginin regional nümayəndəliyi.',
    website: 'https://www.google.az',
    contactEmail: 'partners@google.com',
    industry: 'Technology',
    status: 'Active'
  }
];

export const MOCK_TEACHER_QUEUE: Partial<Student>[] = [
  { id: 'st-001', name: 'Aysel', surname: 'Məmmədova', faculty: 'Kompüter Elmləri', courseYear: 3, avatar: 'https://picsum.photos/seed/aysel/200' },
  { id: 'st-002', name: 'Rauf', surname: 'Hüseynov', faculty: 'İqtisadiyyat', courseYear: 4, avatar: 'https://picsum.photos/seed/rauf/200' },
  { id: 'st-003', name: 'Nigar', surname: 'Qasımova', faculty: 'Kompüter Elmləri', courseYear: 2, avatar: 'https://picsum.photos/seed/nigar/200' },
  { id: 'st-004', name: 'Elvin', surname: 'Zeynalov', faculty: 'Maliyyə', courseYear: 3, avatar: 'https://picsum.photos/seed/elvin/200' },
];

export const MOCK_SENT_REFERENCES: TeacherReference[] = [
  {
    id: 'ref-h1',
    teacherName: 'Dr. Əli Əliyev',
    studentName: 'Rauf Hüseynov',
    courseName: 'Alqoritmlərin Analizi',
    date: '2024-02-10',
    rating: 5,
    skills: ['Python', 'Big O Notation'],
    comment: 'Tələbə mürəkkəb alqoritmik tapşırıqlarda yüksək məntiqi təfəkkür nümayiş etdirmişdir.',
    isVerified: true,
  },
  {
    id: 'ref-h2',
    teacherName: 'Dr. Əli Əliyev',
    studentName: 'Fidan Kərimova',
    courseName: 'Verilənlər Bazası',
    date: '2024-01-22',
    rating: 4,
    skills: ['SQL', 'PostgreSQL'],
    comment: 'Praktik məşğələlərdə verilənlər bazasının optimallaşdırılması üzrə uğurlu nəticələr göstərmişdir.',
    isVerified: true,
  }
];

export const MOCK_VACANCIES: Vacancy[] = [
  {
    id: 'v1',
    title: 'Junior Frontend Developer',
    company: 'Pasha Bank',
    description: 'Modern veb texnologiyaları ilə bank sistemlərinin frontend hissəsinin qurulmasında iştirak edin.',
    logo: 'https://picsum.photos/seed/pasha/100',
    tags: ['React', 'TypeScript', 'Tailwind']
  },
  {
    id: 'v2',
    title: 'Data Analyst Intern',
    company: 'Azercell',
    description: 'Telekommunikasiya verilənlərinin analizi və hesabatların hazırlanması üzrə təcrübə proqramı.',
    logo: 'https://picsum.photos/seed/azercell/100',
    tags: ['Python', 'SQL', 'Tableau']
  },
  {
    id: 'v3',
    title: 'UI/UX Designer',
    company: 'Google (Azerbaijan)',
    description: 'İstifadəçi təcrübəsinin artırılması üçün innovativ dizayn həllərinin hazırlanması.',
    logo: 'https://picsum.photos/seed/google/100',
    tags: ['Figma', 'User Research', 'Prototyping']
  }
];

export const DEMO_CV_ANALYSIS_SKILLS = [
  { name: 'Python', value: 78, category: 'Technical', isAiGenerated: true },
  { name: 'Machine Learning', value: 62, category: 'Technical', isAiGenerated: true },
  { name: 'Public Speaking', value: 84, category: 'Soft', isAiGenerated: true },
  { name: 'Docker', value: 45, category: 'Tools', isAiGenerated: true },
  { name: 'Strategic Planning', value: 68, category: 'Analytical', isAiGenerated: true }
];

export const MOCK_UNIVERSITY_STATS: UniversityStats = {
  totalStudents: 1250,
  totalTeachers: 85,
  partnerCompanies: 12,
  averageGpa: 3.2,
  topSkills: [
    { name: 'Proqramlaşdırma', count: 450 },
    { name: 'Data Analitika', count: 320 },
    { name: 'Maliyyə Savadlılığı', count: 210 },
    { name: 'Dizayn Təfəkkürü', count: 180 }
  ]
};

export const ROLES_CONFIG = [
  { role: UserRole.STUDENT, label: 'Tələbə / Magistr', description: 'Öz bacarıq profilini gör və referans istə.' },
  { role: UserRole.TEACHER, label: 'Müəllim', description: 'Tələbələrə strukturlaşdırılmış referans ver.' },
  { role: UserRole.UNIVERSITY_ADMIN, label: 'Administrasiya', description: 'Akademik effektivliyi analiz et.' },
  { role: UserRole.PARTNER_COMPANY, label: 'Tərəfdaş Şirkət', description: 'Təsdiqlənmiş istedadları kəşf et.' },
];

export const MOCK_AUTH_USERS = [
  { email: 'test.student@unec.edu.az', password: 'StudentPass123!', role: UserRole.STUDENT },
  { email: 'ali.aliyev@unec.edu.az', password: 'TeacherPass456!', role: UserRole.TEACHER },
  { email: 'admin@unec.edu.az', password: 'AdminPass789!', role: UserRole.UNIVERSITY_ADMIN },
  { email: 'hr@pasha.unex.az', password: 'PashaPass2025', role: UserRole.PARTNER_COMPANY },
  { email: 'tech@azercell.unex.az', password: 'AzercellPass2025', role: UserRole.PARTNER_COMPANY },
  { email: 'dev@google.unex.az', password: 'GooglePass2025', role: UserRole.PARTNER_COMPANY },
];