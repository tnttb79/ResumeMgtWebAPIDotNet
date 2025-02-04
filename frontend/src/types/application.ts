// Interface for application data from API
export interface Application {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  jobName: string;
  jobId: number;
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
