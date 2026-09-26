export type PlacementRecord = {
  name: string;
  year: number;
  company: string;
  packageValue: number;
  packageLabel: string;
  imageSrc?: string;
  imageAlt?: string;
};

type PlacementGroup = {
  year: number;
  placements: readonly Omit<PlacementRecord, "year">[];
};

type PlacementShowcaseCard = PlacementRecord & {
  imageAlt: string;
  iconLabel: string;
  cardTone: string;
  badgeTone: string;
};

const PLACEMENT_GROUPS: readonly PlacementGroup[] = [
  {
    year: 2027,
    placements: [
      {
        name: "Taniya Singh",
        company: "Caelius Consulating",
        packageValue: 12,
        packageLabel: "12 LPA",
      },
      {
        name: "Kshitij Raj",
        company: "Caelius Consulating",
        packageValue: 12,
        packageLabel: "12 LPA",
      },
    ],
  },
  {
    year: 2026,
    placements: [
      {
        name: "Himachal Kumar",
        company: "75 ways Technologies",
        packageValue: 3.3,
        packageLabel: "3.3 LPA",
      },
      {
        name: "Aman Kumar",
        company: "Deftsoft",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Ashwini Mani",
        company: "Deftsoft",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Hassain Akhtar",
        company: "Deftsoft",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Abhishek Saini",
        company: "Deftsoft",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Deepali Chauhan",
        company: "Deftsoft",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Manpreet Singh",
        company: "Deftsoft",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Rahul Kumar Pandit",
        company: "Revocept Solutions",
        packageValue: 2.7,
        packageLabel: "2.7 LPA",
      },
      {
        name: "Avinash Kumar",
        company: "Revocept Solutions",
        packageValue: 2.7,
        packageLabel: "2.7 LPA",
      },
      {
        name: "Muskan Kumari",
        company: "Learing Routes",
        packageValue: 5.7,
        packageLabel: "5.7 LPA",
      },
      {
        name: "Afnan Mir",
        company: "Hanu Ai",
        packageValue: 3.5,
        packageLabel: "3.5 LPA",
      },
      {
        name: "Minisha Singh",
        company: "Hanu Ai",
        packageValue: 3.5,
        packageLabel: "3.5 LPA",
      },
      {
        name: "Annu Kumari",
        company: "Hanu Ai",
        packageValue: 3.5,
        packageLabel: "3.5 LPA",
      },
      {
        name: "Avinash Kumar",
        company: "Hanu Ai",
        packageValue: 3.5,
        packageLabel: "3.5 LPA",
      },
    ],
  },
  {
    year: 2025,
    placements: [
      {
        name: "Ankit Kumar",
        company: "Hanu Ai",
        packageValue: 5,
        packageLabel: "5 LPA",
      },
      {
        name: "Eshaan Singh",
        company: "Grazitti Interactive",
        packageValue: 3.1,
        packageLabel: "3.1 LPA",
      },
      {
        name: "Shruti",
        company: "Grazitti Interactive",
        packageValue: 3.1,
        packageLabel: "3.1 LPA",
      },
      {
        name: "Akash Singh",
        company: "Oriental Outsourcing",
        packageValue: 5,
        packageLabel: "5 LPA",
      },
      {
        name: "Nikhil Chaudhary",
        company: "Codeation",
        packageValue: 5,
        packageLabel: "5 LPA",
      },
      {
        name: "Aman Kapri",
        company: "Movidu",
        packageValue: 6,
        packageLabel: "6 LPA",
      },
      {
        name: "Vikramjeet",
        company: "Movidu",
        packageValue: 6,
        packageLabel: "6 LPA",
      },
      {
        name: "Wahiduzzama Azad",
        company: "Movidu",
        packageValue: 6,
        packageLabel: "6 LPA",
      },
      {
        name: "Abhishek Saini",
        company: "Movidu",
        packageValue: 6,
        packageLabel: "6 LPA",
      },
      {
        name: "Anil Kumar Sah",
        company: "Goteso LLP",
        packageValue: 3,
        packageLabel: "3 LPA",
      },
      {
        name: "Abhishek Kumar",
        company: "Skill Intern",
        packageValue: 3,
        packageLabel: "3 LPA",
      },
      {
        name: "Ankit Kumar",
        company: "Skill Intern",
        packageValue: 3,
        packageLabel: "3 LPA",
      },
      {
        name: "Vishwajeet Kumar",
        company: "Skill Intern",
        packageValue: 3,
        packageLabel: "3 LPA",
      },
      {
        name: "Sriniwash Saw",
        company: "Skill Intern",
        packageValue: 3,
        packageLabel: "3 LPA",
      },
      {
        name: "Manoj Kumar",
        company: "Skill Intern",
        packageValue: 3,
        packageLabel: "3 LPA",
      },
      {
        name: "Aman Kapri",
        company: "Skill Intern",
        packageValue: 3,
        packageLabel: "3 LPA",
      },
      {
        name: "Manisha Singh",
        company: "Skill Intern",
        packageValue: 3,
        packageLabel: "3 LPA",
      },
      {
        name: "Atul Pratab Singh",
        company: "Off Beat",
        packageValue: 3,
        packageLabel: "3 LPA",
      },
    ],
  },
  {
    year: 2024,
    placements: [
      {
        name: "Doulat Ram",
        company: "Ellocent Lab",
        packageValue: 2.5,
        packageLabel: "2.5 LPA",
      },
      {
        name: "Raushan Kumar",
        company: "Aspire Fox",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Mukul Anand",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Amit Kumar",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Harikrishna Kumar Karsh",
        company: "Aspire Fox",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Piyushi Kumari",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Mohit Kumar",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Rishav Kumar",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Isha Kumari",
        company: "Ellocent Lab",
        packageValue: 2.5,
        packageLabel: "2.5 LPA",
      },
      {
        name: "Mohan Kumar",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Raushan Kumar",
        company: "Omninos",
        packageValue: 3,
        packageLabel: "3.0 LPA",
      },
      {
        name: "Tarique Anwar Seikh",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Arjun katoch",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Waqquas Ahmad",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Somya Sinha",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Rupali Sharma",
        company: "Omninos",
        packageValue: 3,
        packageLabel: "3.0 LPA",
      },
      {
        name: "Prince Punday",
        company: "Shine Dezign",
        packageValue: 4.2,
        packageLabel: "4.2 LPA",
      },
      {
        name: "Mohit Kumar",
        company: "Omninos",
        packageValue: 3,
        packageLabel: "3.0 LPA",
      },
    ],
  },
  {
    year: 2023,
    placements: [
      {
        name: "Mona Kumari",
        company: "Gpcoders",
        packageValue: 1.8,
        packageLabel: "1.8 LPA",
      },
      {
        name: "Manish Kumar",
        company: "Idea Foundation",
        packageValue: 2.4,
        packageLabel: "2.4 LPA",
      },
      {
        name: "Anku Kumar",
        company: "Appwrk IT solution",
        packageValue: 4,
        packageLabel: "4 LPA",
      },
      {
        name: "Pitush Kumar",
        company: "Appwrk IT solution",
        packageValue: 4,
        packageLabel: "4 LPA",
      },
      {
        name: "Sashi Ranjan Sinha",
        company: "TCS",
        packageValue: 3.36,
        packageLabel: "3.36 LPA",
      },
      {
        name: "Navleen Kaur",
        company: "Escalon and done buiness private Limited",
        packageValue: 6,
        packageLabel: "6 LPA",
      },
      {
        name: "Atul Prakash",
        company: "Grazitti Interactive",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Ayush Kumar",
        company: "Grazitti Interactive",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Ritika Mittal",
        company: "Grazitti Interactive",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
      {
        name: "Shrishtee",
        company: "Grazitti Interactive",
        packageValue: 3.2,
        packageLabel: "3.2 LPA",
      },
    ],
  },
  {
    year: 2022,
    placements: [
      {
        name: "Prateek Kumar",
        company: "Byju's",
        packageValue: 8.2,
        packageLabel: "8.2 LPA",
      },
      {
        name: "Kumari Anjali",
        company: "Bebo Technologies",
        packageValue: 4.3,
        packageLabel: "4.3 LPA",
      },
      {
        name: "Chandam Kumar",
        company: "Bebo Technologies",
        packageValue: 4.3,
        packageLabel: "4.3 LPA",
      },
      {
        name: "Deepak Kumar Jha",
        company: "Wipro",
        packageValue: 6.5,
        packageLabel: "6.5 LPA",
      },
      {
        name: "Ritu koal",
        company: "Sun Media",
        packageValue: 2,
        packageLabel: "2 LPA",
      },
      {
        name: "Prince Kumar",
        company: "Infosys",
        packageValue: 3.6,
        packageLabel: "3.6 LPA",
      },
      {
        name: "Kumar Divyashank Gaurav",
        company: "Nagrarro",
        packageValue: 4.5,
        packageLabel: "4.5 LPA",
      },
      {
        name: "Akansha Chaudhary",
        company: "Learing Routes",
        packageValue: 5.7,
        packageLabel: "5.70 LPA",
      },
    ],
  },
] as const;

export const PLACEMENT_RECORDS = PLACEMENT_GROUPS.flatMap((group) =>
  group.placements.map((placement) => ({
    ...placement,
    year: group.year,
  })),
);

const sortPlacementsByOutcome = (
  left: PlacementRecord,
  right: PlacementRecord,
) => {
  if (right.packageValue !== left.packageValue) {
    return right.packageValue - left.packageValue;
  }

  if (right.year !== left.year) {
    return right.year - left.year;
  }

  return left.name.localeCompare(right.name);
};

const TOP_PLACEMENT_CARD_SOURCE = [
  {
    name: "Taniya Singh",
    year: 2027,
    company: "Caelius Consulating",
    packageValue: 12,
    packageLabel: "12 LPA",
    imageSrc: "/assets/img/stu/Taniya.png",
  },
  {
    name: "Utkarsh Kumar",
    year: 2022,
    company: "Byju's",
    packageValue: 11,
    packageLabel: "11 LPA",
    imageSrc: "/assets/img/stu/Utkarsh.png",
  },
  {
    name: "Anam Rashid",
    year: 2025,
    company: "Placed in Skillkart , Ucertify , Placed in Dentsu!",
    packageValue: 12,
    packageLabel: "12 LPA",
    imageSrc: "/assets/img/stu/Anam.png",
  },
  {
    name: "Pallavi Sharma",
    year: 2021,
    company: "Extra Marks",
    packageValue: 7.2,
    packageLabel: "7.2 LPA",
    imageSrc: "/assets/img/stu/Pallavi.png",
  },
  {
    name: "Naveen Jaiswal",
    year: 2025,
    company: "Placed in Entab Infotech PVt Ltd",
    packageValue: 12,
    packageLabel: "12 LPA",
    imageSrc: "/assets/img/stu/Naveen.png",
  },

  {
    name: "Priyanshi Sharma",
    year: 2025,
    company: "Placed in Caelius Consulting",
    packageValue: 12,
    packageLabel: "12 LPA",
    imageSrc: "/assets/img/stu/Priyanshi.png",
  },

  {
    name: "Shikhsa Singh",
    year: 2022,
    company: "Byju's",
    packageValue: 10,
    packageLabel: "10 LPA",
    imageSrc: "/assets/img/stu/Shikha.png",
  },
  {
    name: "Prateek Kumar",
    year: 2022,
    company: "Byju's",
    packageValue: 8.2,
    packageLabel: "8.2 LPA",
    imageSrc: "/assets/img/stu/Prateek.png",
  },
  {
    name: "Parvesh Sharma",
    year: 2022,
    company: "Byju's",
    packageValue: 10,
    packageLabel: "10 LPA",
    imageSrc: "/assets/img/stu/Parvesh.png",
  },
] as const;

export const TOP_PLACEMENT_CARDS: PlacementShowcaseCard[] =
  TOP_PLACEMENT_CARD_SOURCE.map((placement, index) => ({
    ...placement,
    imageAlt: `${placement.name} placement highlight`,
    iconLabel: "SV",
    cardTone: index % 2 === 0 ? "bg-[#0b3b8f]" : "bg-[#fea700]",
    badgeTone:
      index % 3 === 0
        ? "bg-[#fea700]"
        : index % 3 === 1
          ? "bg-white"
          : "bg-[#0b3b8f]",
  }));

export const FEATURED_PLACEMENTS = [...PLACEMENT_RECORDS]
  .sort(sortPlacementsByOutcome)
  .slice(0, 2);

export const YEARLY_PLACEMENT_TRENDS = [
  ...new Set(PLACEMENT_RECORDS.map((placement) => placement.year)),
]
  .sort((left, right) => left - right)
  .map((year) => {
    const yearPlacements = PLACEMENT_RECORDS.filter(
      (placement) => placement.year === year,
    );
    const totalPackage = yearPlacements.reduce(
      (sum, placement) => sum + placement.packageValue,
      0,
    );
    const highestPackage = Math.max(
      ...yearPlacements.map((placement) => placement.packageValue),
    );

    return {
      year: String(year),
      placements: yearPlacements.length,
      highestPackage,
      averagePackage: Number((totalPackage / yearPlacements.length).toFixed(1)),
    };
  });

export const PLACEMENT_KEY_STATS = [
  
  {
    value: "60 LPA",
    label: "Highest Package",
  },
  {
    value: "2,200+",
    label: "Recruiting Companies",
  },
] as const;

export const OVERALL_AVERAGE_PACKAGE = Number(
  (
    PLACEMENT_RECORDS.reduce(
      (sum, placement) => sum + placement.packageValue,
      0,
    ) / PLACEMENT_RECORDS.length
  ).toFixed(1),
);
