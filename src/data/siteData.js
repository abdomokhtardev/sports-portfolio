// ─────────────────────────────────────────────────────────────────────────────
//  siteData.js — Central store for all site content.
//
//  SUPABASE READY:
//  Each exported constant maps directly to a Supabase table.
//  To switch from static data → live database, replace the array/object
//  with a Supabase query (see src/lib/supabase.js for the client setup).
//
//  Table schema reference:
//    videos:       (id, title, video_url, duration, platform)
//                   platform = 'youtube' | 'facebook'
//                   video_url = full URL e.g. https://youtube.com/watch?v=xxx
//    timeline:     (id, year, role, club, description, order)
//    testimonials: (id, quote, name, title, initials)
//    skills:       plain string array (or table with id, label)
//    languages:    plain string array
//    socialLinks:  (id, href, label, platform)
// ─────────────────────────────────────────────────────────────────────────────

/** @type {{ name: string, title: string, description: string, languageOptions: string[], whatsapp?: string, email?: string, profileImageUrl?: string }} */
export const personalInfo = {
  name: "Coach Interpreter",
  title: "Professional Football Interpreter",
  description: "Bridging the gap between the manager and the pitch.",
  languageOptions: ['🇵🇹 Portuguese', '🇬🇧 English', '🇪🇸 Spanish'],
  whatsapp: '1234567890',
  email: 'contact@example.com',
  profileImageUrl: '',
};

/** @type {{ id: number, title: string, video_url: string, duration: string, platform: 'youtube'|'facebook' }[]} */
export const videos = [
  {
    id: 1,
    title: "Inside the Touchline: A Coach's Voice",
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '8:42',
    platform: 'youtube',
  },
  {
    id: 2,
    title: 'The Art of Sports Interpretation',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '12:15',
    platform: 'youtube',
  },
  {
    id: 3,
    title: 'Football Culture Across Languages',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '6:30',
    platform: 'youtube',
  },
];

/** @type {{ id: number, year: string, role: string, club: string, description: string }[]} */
export const timelineEvents = [
  {
    id: 1,
    year: '2024',
    role: 'Lead Interpreter — Pre-Season Tour',
    club: 'European Club / Asia Tour',
    description:
      'Provided full-time simultaneous and consecutive interpretation across training sessions, tactical meetings, and press conferences during a multi-city pre-season tour.',
  },
  {
    id: 2,
    year: '2023',
    role: 'Sports Content Creator',
    club: 'Independent — YouTube & Social Media',
    description:
      'Launched a Portuguese-language channel covering elite football coaching methodologies, interpretation behind the scenes, and cross-cultural sports culture with an engaged audience of thousands.',
  },
  {
    id: 3,
    year: '2022',
    role: 'Media Liaison & Interpreter',
    club: 'Professional Football Club',
    description:
      'Managed multilingual media relations for a first-division club, interpreting for the head coach in post-match press conferences and facilitating player communications with local and international journalists.',
  },
  {
    id: 4,
    year: '2021',
    role: 'Training Ground Interpreter',
    club: 'Academy & First Team Setup',
    description:
      'Embedded within the technical staff of a professional academy, translating real-time instructions from the coaching team to international players and providing cultural mediation.',
  },
  {
    id: 5,
    year: '2019',
    role: 'Freelance Sports Interpreter',
    club: 'Various Clubs & Agencies',
    description:
      'Began freelance interpreting career working with coaches and scouting agencies across Portugal, Spain, and the UK, rapidly building a reputation for accuracy, discretion, and deep football knowledge.',
  },
];

/** @type {{ id: number, quote: string, name: string, title: string, initials: string }[]} */
export const testimonials = [
  {
    id: 1,
    quote:
      "Your role as guide and translator was essential for the smooth execution of our participation, contributing not only to the team’s communication and logistics but also through your kindness, hospitality, and commitment in representing the Egyptian people in the best possible way.",
    name: "Handebol Taubaté Sports Association",
    title: "Official Letter of Recognition — 2025 IHF Men’s Super Globe",
    initials: "HTSA"
  },
];

/** @type {string[]} */
export const skills = [
  'Sports Interpretation',
  'International Handball',
  'Brazilian Portuguese',
  'Spanish & Portuguese',
  'Content Creation',
  'Cross-Cultural Communication ',
  'Press Conferences',
  'Founder of Portuguese Way Academy',
];

/** @type {string[]} */
export const languages = ['🇵🇹 Portuguese', '🇬🇧 English', '🇪🇸 Spanish'];

/** @type {{ id: string, href: string, label: string, platform: string }[]} */
export const socialLinks = [
  { id: 'social-youtube', href: 'https://youtube.com', label: 'YouTube', platform: 'youtube' },
  { id: 'social-facebook', href: 'https://facebook.com', label: 'Facebook', platform: 'facebook' },
  { id: 'social-linkedin', href: 'https://linkedin.com', label: 'LinkedIn', platform: 'linkedin' },
];
