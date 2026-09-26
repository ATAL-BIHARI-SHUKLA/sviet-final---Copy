export const galleryTabs = [
  "All",
  "Campus",
  "Academic Blocks",
  "Events",
  "Labs",
  "Hostel",
  "Sports",
] as const;

export type GalleryFilter = (typeof galleryTabs)[number];
export type GalleryCategory = Exclude<GalleryFilter, "All">;

export type GalleryItem = {
  id: number;
  title: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  caption: string;
  aspectClass: string;
};

export type AchievementGraphic = {
  id: number;
  title: string;
  src: string;
  alt: string;
  caption: string;
  aspectClass: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Main Campus Gate",
    category: "Campus",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790442936/sviet_assets/maingate.jpg",
    alt: "SVGOI main campus gate",
    caption: "The primary campus entrance and arrival point.",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: 2,
    title: "Campus Front View",
    category: "Campus",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443472/sviet_assets/college/main.jpg",
    alt: "SVGOI campus front view",
    caption: "A broad view of the institution and its approach road.",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 3,
    title: "Administration Block",
    category: "Campus",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443499/sviet_assets/college/admin.jpg",
    alt: "SVGOI administration building",
    caption: "The administrative heart of the campus.",
    aspectClass: "aspect-[5/6]",
  },
  {
    id: 4,
    title: "Academic Block One",
    category: "Academic Blocks",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443004/sviet_assets/block1.webp",
    alt: "Academic block one",
    caption: "A core academic block used for day-to-day learning.",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 5,
    title: "Academic Block Four",
    category: "Academic Blocks",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443004/sviet_assets/block2.webp",
    alt: "Academic block four",
    caption: "One of the prominent teaching and classroom spaces.",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 6,
    title: "Academic Block Eight",
    category: "Academic Blocks",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443002/sviet_assets/block3.webp",
    alt: "Academic block eight",
    caption: "A landmark academic space visible across campus.",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: 7,
    title: "Library Interior",
    category: "Academic Blocks",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790442932/sviet_assets/library.jpg",
    alt: "SVGOI library interior",
    caption: "A focused space for study, reference, and reading.",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 8,
    title: "Research Center",
    category: "Academic Blocks",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443152/sviet_assets/section_card/ResearchCenter.jpg",
    alt: "Research center",
    caption: "Dedicated spaces for experimentation and applied research.",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 9,
    title: "Laboratory Facility",
    category: "Labs",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443478/sviet_assets/college/lab.jpg",
    alt: "Campus laboratory",
    caption: "A hands-on learning lab for technical and practical work.",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: 10,
    title: "Advanced Laboratory",
    category: "Labs",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443183/sviet_assets/section_card/Labo.jpg",
    alt: "Advanced laboratory",
    caption: "Modern lab infrastructure for skill-based learning.",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 11,
    title: "Campus Auditorium",
    category: "Events",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443513/sviet_assets/college/auditorium.png",
    alt: "Campus auditorium",
    caption: "The main indoor venue for gatherings and celebrations.",
    aspectClass: "aspect-[16/10]",
  },
  {
    id: 12,
    title: "Sportsmania Highlight",
    category: "Events",
    src: "/assets/img/section_card/Sportsmania.jpeg",
    alt: "Sportsmania event",
    caption: "A high-energy campus event captured in action.",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 13,
    title: "Elevate Event",
    category: "Events",
    src: "/assets/img/section_card/Elevate.jpeg",
    alt: "Elevate event",
    caption: "A student-facing event that brought the campus together.",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 14,
    title: "Conference Moment",
    category: "Events",
    src: "/assets/img/con1.JPG",
    alt: "Conference event",
    caption: "Moments from a formal academic or industry conference.",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: 15,
    title: "Hostel Residence",
    category: "Hostel",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443202/sviet_assets/section_card/Hostels.jpg",
    alt: "Campus hostel",
    caption: "Residential living spaces designed for student comfort.",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: 16,
    title: "Playground",
    category: "Sports",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443177/sviet_assets/section_card/Playground.jpg",
    alt: "Campus playground",
    caption: "Open outdoor facilities for daily sports and recreation.",
    aspectClass: "aspect-[16/10]",
  },
  {
    id: 17,
    title: "Cricket Ground",
    category: "Sports",
    src: "/assets/img/section_card/Cricket.jpeg",
    alt: "Cricket ground",
    caption: "Competitive matches and practice sessions in one place.",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: 18,
    title: "Kabaddi Arena",
    category: "Sports",
    src: "/assets/img/section_card/Kabbadi.jpeg",
    alt: "Kabaddi arena",
    caption: "Traditional sports action and intercollegiate energy.",
    aspectClass: "aspect-[4/3]",
  },
];

export const achievementGraphics: AchievementGraphic[] = [
  {
    id: 1,
    title: "Best Institution Award",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443542/sviet_assets/awards/Best%20Institution%20in%20North%20India.jpg",
    alt: "Best Institution in North India award",
    caption: "A milestone recognition celebrating institutional excellence.",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: 2,
    title: "Placement Excellence",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443542/sviet_assets/awards/Best%20Campus%20for%20Placement%20in%20North%20India.jpg",
    alt: "Best Campus for Placement in North India award",
    caption: "Awards and recognitions reflecting career outcomes.",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 3,
    title: "NAAC Accreditation",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443537/sviet_assets/awards/NAAC%20Accreditation%20Certificate.jpg",
    alt: "NAAC accreditation certificate",
    caption: "Official accreditation graphic and institutional credential.",
    aspectClass: "aspect-[5/6]",
  },
  {
    id: 4,
    title: "UGC Recognition",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443536/sviet_assets/awards/UGC%202%28f%29%20Recognition.jpg",
    alt: "UGC 2(f) recognition",
    caption: "Regulatory recognition and academic legitimacy.",
    aspectClass: "aspect-[4/3]",
  },
  {
    id: 5,
    title: "Global Recognition",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443483/sviet_assets/college/global_recognition.png",
    alt: "Global recognition graphic",
    caption: "A visual highlight of external recognition and achievements.",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: 6,
    title: "Scholarship Support",
    src: "https://res.cloudinary.com/qbxjwpwp/image/upload/v1790443471/sviet_assets/college/scholarship.png",
    alt: "Scholarship graphic",
    caption: "Student support and scholarship messaging.",
    aspectClass: "aspect-[16/10]",
  },
];
