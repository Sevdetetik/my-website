export interface Projects {
  _id: string;
  projectName: string;
  shortDescription: string;
  detailedDescription?: string;
  technologiesUsed?: string;
  mainImage?: string;
  projectUrl?: string;
  githubUrl?: string;
  completionDate?: string;
  isFeatured?: boolean;
}