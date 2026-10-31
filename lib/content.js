export const profile = {
  name: 'Cherry Mae Atibula',
  fullName: 'Cherry Mae Q. Atibula',
  email: 'atibulacherrymae7@gmail.com',
  phoneDisplay: '0963 265 7495',
  phoneHref: 'tel:+639632657495',
  course: 'BS Computer Science',
  school: 'Biliran Province State University',
  facebook: '', // paste the full profile link here
  github: '', // paste the full profile link here
};

export const typedLines = ['Aspiring Front-end Developer', 'BS Computer Science Student', 'HTML, CSS & JavaScript'];

export const project = {
  name: 'CamoteLens',
  subtitle: 'Sweet Potato Variety Classification Through Leaf Image Analysis Using CNNs',
  summary:
    'An image-based application that identifies different sweet potato varieties using images of their leaves, reducing manual identification through automated image classification.',
  description:
    'An image-based application that identifies different sweet potato varieties using images of their leaves. Its purpose is to reduce manual identification efforts through automated image classification.',
  tech: ['Python', 'Machine Learning (CNN)', 'Image Classification'],
  screens: {
    home: { src: '/assets/project/home.png', alt: 'CamoteLens home screen with capture and gallery options', width: 720, height: 1600 },
    varieties: { src: '/assets/project/varieties.png', alt: 'CamoteLens varieties reference screen', width: 720, height: 1600 },
    profile: { src: '/assets/project/profile.png', alt: 'CamoteLens profile screen with classification statistics', width: 720, height: 1600 },
  },
  varieties: [
    ['NSIC SP-37', 'Green, heart-shaped leaves with a clear central vein.'],
    ['STOKE PURPLE', 'Broad green leaves with shallow lobing and smooth margins.'],
    ['VSP-7 (V20-429)', 'Medium-sized leaves with gently angular lobes.'],
    ['VSP-6 (V20-209)', 'Deep green, slightly lobed leaves with a firm texture.'],
  ],
};

export const certificates = [
  {
    title: 'Introduction to AI Literacy and Responsible Use',
    issuer: 'CHED ACHIEVE, Mapúa University',
    date: '14 September 2026',
    file: 'ai-literacy',
    width: 1754,
    height: 1242,
  },
  {
    title: 'Networking Basics',
    fullTitle: 'Networking Basics: Certificate of Course Completion',
    issuer: 'Cisco Networking Academy, student level credential',
    date: '22 May 2026',
    file: 'cisco-networking-credential',
    width: 1650,
    height: 1275,
  },
  {
    title: 'Networking Basics',
    fullTitle: 'Networking Basics: Certificate of Completion',
    issuer: 'Cisco Networking Academy, completion certificate',
    date: '22 May 2026',
    file: 'cisco-networking-completion',
    width: 1938,
    height: 1313,
  },
];

export const skills = [
  ['Py', 'Python'],
  ['CNN', 'Machine Learning (CNN)'],
  ['IC', 'Image Classification'],
  ['</>', 'HTML & CSS'],
  ['JS', 'JavaScript'],
  ['RWD', 'Responsive Web Design'],
  ['UX', 'Basic UI/UX Design'],
  ['PS', 'Problem-Solving'],
  ['TW', 'Teamwork'],
];
