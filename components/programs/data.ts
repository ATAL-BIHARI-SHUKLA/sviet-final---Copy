export const PROGRAM_META_CHIPS = ["4 Years", "10+2 PCM with 45%", "July / August 2025"];

export const PLACEMENT_OUTCOMES = [
  { label: "Highest Package", value: "45 LPA", description: "Across marquee recruiters" },
  { label: "Placement Rate", value: "95%+", description: "Consistent campus outcomes" },
  { label: "Companies Visited", value: "500+", description: "National and multinational recruiters" },
  { label: "Students Placed", value: "2000+", description: "Placed annually across domains" },
] as const;

export const RECRUITERS = [
  { name: "Amazon", src: "/assets/img/companies/amazon.png" },
  { name: "TCS", src: "/assets/img/companies/tcs.png" },
  { name: "Infosys", src: "/assets/img/companies/infosys.png" },
  { name: "Wipro", src: "/assets/img/companies/wipro.png" },
  { name: "Deloitte", src: "/assets/img/companies/deloitte.png" },
  { name: "Dabur", src: "/assets/img/companies/dabur.png" },
  { name: "JIO Digital", src: "/assets/img/companies/jio_digital.png" },
  { name: "Mamsys", src: "/assets/img/companies/mamsys.png" },
  { name: "Calvin", src: "/assets/img/companies/calvin.png" },
] as const;

export const PROGRAM_HIGHLIGHTS = [
  {
    title: "Industry-Aligned Curriculum",
    description: "Curriculum designed with practical exposure, coding rigor, and project-based learning.",
  },
  {
    title: "Advanced Labs & Infrastructure",
    description: "Well-equipped labs for computing, electronics, innovation, and interdisciplinary practice.",
  },
  {
    title: "Expert Faculty Mentorship",
    description: "Learn from experienced faculty focused on concept clarity and career readiness.",
  },
  {
    title: "Strong Placement Support",
    description: "Structured training, mock interviews, and recruiter engagement for job outcomes.",
  },
  {
    title: "Internships & Live Projects",
    description: "Hands-on project work and internship opportunities with industry exposure.",
  },
  {
    title: "Holistic Student Development",
    description: "Balanced academic, cultural, and leadership activities to build confident graduates.",
  },
  {
    title: "Research & Innovation Culture",
    description: "Encouragement for idea incubation, research initiatives, and problem-solving mindset.",
  },
];

export const FIT_TRAITS = [
  "Likes Problem Solving",
  "Interested in Technology",
  "Has an Analytical Mindset",
  "Enjoys Building Things",
];

export const ALUMNI_LIST = [
  { name: "Rahul Sharma", company: "TCS", package: "₹7.8 LPA" },
  { name: "Priya Singh", company: "Dabur", package: "₹9.2 LPA" },
  { name: "Arjun Mehta", company: "Maruti Suzuki", package: "₹8.6 LPA" },
  { name: "Neha Gupta", company: "Cipla", package: "₹6.8 LPA" },
  { name: "Vikram Patel", company: "Infosys BPM", package: "₹6.4 LPA" },
] as const;

export const CURRICULUM_ROWS = [
  ["CSE101", "Introduction to Programming", "4"],
  ["CSE102", "Engineering Mathematics", "4"],
  ["CSE103", "Digital Electronics", "3"],
  ["CSE104", "Engineering Physics", "3"],
  ["CSE105", "Communication Skills", "2"],
  ["CSE106", "Workshop / Lab Practice", "2"],
] as const;

export const CURRICULUM_BY_YEAR = {
  "Year 1": [
    ["CSE101", "Introduction to Programming (C/C++)", "4"],
    ["CSE102", "Engineering Mathematics I", "4"],
    ["CSE103", "Digital Electronics", "3"],
    ["CSE104", "Engineering Physics", "3"],
    ["CSE105", "Communication Skills", "2"],
    ["CSE106", "Workshop / Lab Practice", "2"],
  ],
  "Year 2": [
    ["CSE201", "Data Structures & Algorithms", "4"],
    ["CSE202", "Object Oriented Programming (Java)", "4"],
    ["CSE203", "Database Management Systems", "3"],
    ["CSE204", "Computer Organization & Architecture", "3"],
    ["CSE205", "Discrete Mathematics", "3"],
    ["CSE206", "Operating Systems", "3"],
  ],
  "Year 3": [
    ["CSE301", "Computer Networks", "4"],
    ["CSE302", "Software Engineering", "3"],
    ["CSE303", "Web Technologies", "3"],
    ["CSE304", "Theory of Computation", "3"],
    ["CSE305", "Elective I - AI / ML", "3"],
    ["CSE306", "Elective II - Cloud Computing", "3"],
  ],
  "Year 4": [
    ["CSE401", "Machine Learning & Deep Learning", "4"],
    ["CSE402", "Blockchain Technology", "3"],
    ["CSE403", "Cybersecurity & Ethical Hacking", "3"],
    ["CSE404", "Major Project (6 months)", "6"],
    ["CSE405", "Industry Internship", "4"],
    ["CSE406", "Professional Ethics & IPR", "2"],
  ],
} as const;

export const FACILITIES = ["Computer Labs", "Central Library", "Sports Complex", "Research Labs"];

export const FACILITY_DETAILS = [
  ["Computer Labs", "10 labs, 400+ workstations, 24x7 access"],
  ["Central Library", "50,000+ books, e-journals, digital access"],
  ["Sports Complex", "Indoor & outdoor sports, gym, courts"],
  ["Research Labs", "AI, IoT, Embedded, Robotics, DSP labs"],
] as const;

export const FACILITY_EXTRAS = ["Campus-wide Wi-Fi", "Cafeteria & Food Court", "E-Learning Portal", "Smart Classrooms"];

export const COMPARISON_ROWS = [
  ["Duration", "4 Years", "4 Years", "4 Years", "3 Years"],
  ["Annual Fees", "₹80,000/yr", "₹75,000/yr", "₹70,000/yr", "₹55,000/yr"],
  ["Career Paths", "SDE, Data Scientist, DevOps, AI Engineer", "VLSI, Embedded, Telecom, IoT", "Design, Manufacturing, R&D", "Web Dev, App Dev, IT Support"],
  ["Placement Rate", "94%", "88%", "80%", "85%"],
  ["Avg. Package", "₹6.4 LPA", "₹5.8 LPA", "₹5.2 LPA", "₹4.5 LPA"],
] as const;
