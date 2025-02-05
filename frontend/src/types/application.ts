// Interface for application data from API
export interface Application {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  jobName: string;
  jobId: number;
  companyName: string;
}

// Interface for creating a new application
export interface CreateApplicationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  jobId: number;
  resume: File;
}
