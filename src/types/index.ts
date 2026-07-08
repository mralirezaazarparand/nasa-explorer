export interface NavLink {
  label: string;
  href: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface MissionObjective {
  title: string;
  description: string;
}

export interface MissionAchievement {
  year: string;
  title: string;
  description: string;
}

export interface MissionFact {
  label: string;
  value: string;
}

export interface Mission {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  year: string;
  icon: string;
  image: string;
  heroImage: string;
  objectives: MissionObjective[];
  achievements: MissionAchievement[];
  facts: MissionFact[];
  related: string[];
}

export interface GalleryImage {
  src: string;
  title: string;
  alt: string;
  category: string;
}


