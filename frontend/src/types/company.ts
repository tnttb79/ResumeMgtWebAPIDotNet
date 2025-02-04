export enum CompanySize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export interface Company {
  id: number;
  name: string;
  size: string;
  jobs: Job[];
}

export interface Job {
  id: number;
  title: string;
  jobLevel: string;
}

export interface CreateCompanyRequest {
  name: string;
  size: CompanySize;
}
