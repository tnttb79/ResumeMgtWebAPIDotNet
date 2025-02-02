// Enum for company sizes that matches backend
export enum CompanySize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

// Company interface
export interface Company {
  id: number;
  name: string;
  size: string;
  jobs: Job[];
}

// Job interface
export interface Job {
  id: number;
  title: string;
  jobLevel: string;
}

// Request type for creating a company
export interface CreateCompanyRequest {
  name: string;
  size: CompanySize;
}
