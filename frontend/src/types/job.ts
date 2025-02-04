export enum JobLevel {
  Intern = "Intern",
  Junior = "Junior",
  MidLevel = "MidLevel",
  Senior = "Senior",
  TeamLead = "TeamLead",
  CTO = "CTO",
  Architectect = "Architectect",
}

export interface Job {
  id: number;
  title: string;
  jobLevel: JobLevel;
  companyId: number;
  companyName: string;
}

export interface CreateJobRequest {
  title: string;
  jobLevel: JobLevel;
  companyId: number;
}
