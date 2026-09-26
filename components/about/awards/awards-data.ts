export type AwardsRecord = {
  id: string;
  title: string;
  description: string;
  /** small logo/icon used in the grid */
  logoSrc: string;
  logoAlt: string;
  /** optional primary asset (image or pdf) placed in the record detail */
  assetSrc?: string;
  assetType?: "image" | "pdf";
  assetAlt?: string;
};

export const AWARDS_RECORDS: AwardsRecord[] = [
  {
    id: "times-interdisciplinary-2026",
    title: "Interdisciplinary Science Rankings 2026",
    description:
      "SVGOI has been listed in national interdisciplinary science rankings for academic research impact and collaboration.",
    logoSrc: "",
    logoAlt: "Times Higher Education style ranking logo",
  },
  {
    id: "qs-asia-band",
    title: "QS World University Ranking - Asia",
    description:
      "Recognized among Asia-focused institutional ranking cohorts for quality indicators in teaching and outcomes.",
    logoSrc: "",
    logoAlt: "QS style ranking logo",
  },
  {
    id: "r-world-institutional",
    title: "Platinum Band in Institutional Ranking",
    description:
      "Rated in a high-performance band for education quality and institutional benchmarks.",
    logoSrc: "",
    logoAlt: "Institutional ranking logo",
  },
  {
    id: "centre-of-excellence",
    title: "Notified as Centre of Excellence - 2025",
    description:
      "Notified under state-level recognition initiatives for innovation-led academic progress.",
    logoSrc: "",
    logoAlt: "Centre of Excellence badge",
  },
  {
    id: "impact-rank-band",
    title: "1001-1500 World University Ranking and Top 50 in India - 2025",
    description:
      "Placed in a global ranking band with strong national standing in impact-oriented evaluation frameworks.",
    logoSrc: "",
    logoAlt: "Impact ranking logo",
  },
  {
    id: "et-business-award",
    title: "Excellence in University Education Award - 2025",
    description:
      "Awarded for educational quality and sustained institutional excellence.",
    logoSrc: "",
    logoAlt: "Business education award logo",
  },
  {
    id: "qs-i-gauge-diamond",
    title: "QS I-Gauge Diamond Rating - 2024",
    description:
      "Received Diamond category recognition in quality benchmarking assessments.",
    logoSrc: "https://www.igauge.in/igaugeinvertedrgb.svg",
    logoAlt: "QS I-Gauge logo",
  },
  {
    id: "nirf-innovation-top-50",
    title: "NIRF - Top 50 Universities in Innovation - 2024",
    description:
      "Ranked among India's leading institutions for innovation performance and outcomes.",
    logoSrc: "https://www.nirfindia.org/Images/main-logo.png",
    logoAlt: "NIRF innovation logo",
  },
  {
    id: "nirf-pharmacy-rank",
    title: "NIRF - Rank Among Pharmacy Institutes in India - 2024",
    description:
      "Pharmacy faculty recognized in national ranking for academic and research quality.",
    logoSrc: "https://www.nirfindia.org/Images/main-logo.png",
    logoAlt: "NIRF pharmacy logo",
  },
  {
    id: "nirf-101-150",
    title: "NIRF - Ranked in the 101-150 Band of Universities in India - 2024",
    description:
      "Featured in the national university ranking band for broad institutional performance.",
    logoSrc: "https://www.nirfindia.org/Images/main-logo.png",
    logoAlt: "NIRF university ranking logo",
  },
  {
    id: "ugc-category-1",
    title: "Category 1 University by UGC - 2024",
    description:
      "Designated under Category 1 framework with graded autonomy recognition.",
    logoSrc: "https://www.ugc.gov.in/Content/images/Header/ugc_logo.png",
    logoAlt: "UGC category logo",
  },
  {
    id: "iic-4-star",
    title: "Rated 4 out of 4 Stars by IIC - 2024",
    description:
      "Highest star rating secured under innovation council initiatives.",
    logoSrc:
      "https://silicon.ac.in/wp-content/uploads/2022/12/6.-IIC-Star-Rating.jpg",
    logoAlt: "Innovation Council rating logo",
  },
  {
    id: "naac-accreditation",
    title: "NAAC Accreditation Certificate",
    description:
      "SVGOI has been accredited by NAAC demonstrating sustained quality assurance and academic standards.",
    logoSrc: "/assets/img/awards/NAAC Accreditation Certificate.jpg",
    logoAlt: "NAAC Accreditation",
    assetSrc: "/assets/img/awards/NAAC Accreditation Certificate.jpg",
    assetType: "image",
    assetAlt: "NAAC Accreditation Certificate",
  },
  {
    id: "ugc-2f-recognition",
    title: "UGC 2(f) Recognition",
    description:
      "UGC 2(f) recognition granted to SVGOI, marking an important milestone in institutional recognition.",
    logoSrc: "/assets/img/awards/UGC 2(f) Recognition.jpg",
    logoAlt: "UGC 2(f)",
    assetSrc: "/assets/img/awards/2F RecognitionLetter.pdf",
    assetType: "pdf",
    assetAlt: "UGC 2(f) Recognition Letter",
  },
  {
    id: "autonomous-status",
    title: "Autonomous Status Granted",
    description:
      "SVGOI granted autonomy by UGC/affiliating authorities (certificate available).",
    logoSrc: "/assets/img/awards/Autonomous post.jpg",
    logoAlt: "Autonomous status",
    assetSrc: "/assets/img/awards/Autonomous Letter.pdf",
    assetType: "pdf",
    assetAlt: "Autonomous Letter",
  },
  {
    id: "world-education-2024",
    title: "3rd World Education & Business Conclave & Awards 2024",
    description:
      "Recognition received at the 3rd World Education & Business Conclave — highlights and trophies.",
    logoSrc:
      "/assets/img/awards/3rd World Education & Business Conclave & Awards 2024/487032404_1125118346325857_811749101722748028_n.jpg",
    logoAlt: "World Education Awards 2024",
    assetSrc:
      "/assets/img/awards/3rd World Education & Business Conclave & Awards 2024/487032404_1125118346325857_811749101722748028_n.jpg",
    assetType: "image",
    assetAlt: "World Education Awards 2024 image",
  },
  {
    id: "best-in-north-india",
    title: "Best Institution in North India",
    description:
      "Awarded Best Institution in North India at the World Education & Business Awards.",
    logoSrc: "/assets/img/awards/Best Institution in North India.jpg",
    logoAlt: "Best Institution in North India",
    assetSrc: "/assets/img/awards/Best Institution in North India.jpg",
    assetType: "image",
    assetAlt: "Best Institution in North India image",
  },
];
