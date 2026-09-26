export type EventSpeaker = {
  id: string;
  name: string;
  photo?: string | null;
  company?: string | null;
  designation?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  displayOrder: number;
};

export type EventRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  venue?: string | null;
  images: string[];
  driveGalleryUrl?: string | null;
  startDate: string;
  endDate?: string | null;
  category: string;
  isFeatured: boolean;
  speakers: EventSpeaker[];
};

export type EventCard = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  venue: string;
  overview: string;
  category: string;
  isFeatured: boolean;
  images: string[];
  speakers: EventSpeaker[];
};
