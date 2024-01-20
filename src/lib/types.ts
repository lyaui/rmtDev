export type TJobItem = {
  id: number;
  badgeLetters: string;
  company: string;
  title: string;
  daysAgo: number;
  relevanceScore: number;
};

export type TJobItemExpanded = TJobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};
