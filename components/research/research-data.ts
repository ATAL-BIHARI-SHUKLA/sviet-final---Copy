export const researchData = {
  stats: {
    publications: "1200+",
    patents: "87+",
    books: "50+",
    bookChapters: "1800+",
    funding: "₹40L+",
    projects: "30+",
    ongoingFunding: "₹13L+/year",
  },

  books: [
    {
      title: "Handbook on Big Data and Machine Learning",
      isbn: "978-93-5515-732-4",
      authors: "Ms. Vandana",
    },
    {
      title: "Artificial Intelligence in Cyber Security",
      isbn: "978-93-5515-908-3",
      authors: "Ms. Vandana",
    },
    {
      title: "8086 Microprocessor and Interfacing",
      isbn: "978-93-87393-74-5",
      authors: "Ms. Roop Shikha",
    },
    {
      title: "Introduction to Microprocessors",
      isbn: "978-93-87393-74-5",
      authors: "Ms. Yukti Gupta",
    },
    {
      title: "Types of Computers",
      isbn: "978-93-87393-74-5",
      authors: "Ms. Vandana",
    },
    {
      title: "Nanometrology Study",
      isbn: "0378-4568",
      authors: "Mr. Kapil Munjal",
    },
  ],

  projects: {
    ongoing: [
      {
        id: 1,
        title:
          "Optimization of Enteric-Coated Pantoprazole Capsules for Improved Acid Stability and Controlled Release",
        investigator: "Dr. Damit",
        funding: "",
      },
      {
        id: 2,
        title:
          "Development and Evaluation of Mucoadhesive Nano-Liposomal Levocetirizine Syrup",
        investigator: "Dr. Meenakshi Rana",
        funding: "₹12,58,100",
      },
    ],
    completed: [
      {
        id: 11,
        title: "Mini Refrigerator Design",
        investigator: "Mechanical Department",
        funding: "",
      },
    ],
  },

  funding: [
    {
      type: "Non-Govt",
      amount: "₹12,58,100",
      agency: "Industry Partner",
      document: "#",
    },
    {
      type: "Govt",
      amount: "₹27,10,704",
      agency: "Government Agency",
      document: "#",
    },
  ],

  publications: "external / large dataset (do not render fully in UI)",
} as const;

export type ResearchData = typeof researchData;
