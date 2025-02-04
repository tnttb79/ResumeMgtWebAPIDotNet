import React, { useEffect, useState } from "react";
import { get, post } from "../../axiosConfig/axiosConfig";
import { Job as JobType, JobLevel, CreateJobRequest } from "../../types/job";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNotification } from "../../context/NotificationContext";
import styles from "./Job.module.scss";
import CreateJobModal from "./Components/CreateJobModal";
import ApplicationList from "./Components/ApplicationList";

const recordsPerPage = 5;

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const { showNotification } = useNotification();

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await get<JobType[]>("/api/Job");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      showNotification(
        "Failed to fetch jobs. Please try again later.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(jobs.length / recordsPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + recordsPerPage);

  const getJobLevelColor = (level: JobLevel): string => {
    const colors: Record<JobLevel, string> = {
      [JobLevel.Intern]: "var(--job-level-intern)",
      [JobLevel.Junior]: "var(--job-level-junior)",
      [JobLevel.MidLevel]: "var(--job-level-mid)",
      [JobLevel.Senior]: "var(--job-level-senior)",
      [JobLevel.TeamLead]: "var(--job-level-lead)",
      [JobLevel.CTO]: "var(--job-level-cto)",
      [JobLevel.Architectect]: "var(--job-level-architect)",
    };
    return colors[level] || "var(--text-secondary)";
  };

  // Function to handle job creation
  const handleCreateJob = async (jobData: CreateJobRequest) => {
    try {
      setIsLoading(true);
      await post<JobType>("/api/Job", jobData);
      await fetchJobs(); // Refresh the jobs list
      setIsModalOpen(false);
      showNotification("Job created successfully!", "success");
    } catch (error) {
      console.error("Error creating job:", error);
      showNotification("Failed to create job. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle going back to job list
  const handleBack = () => {
    setSelectedJob(null);
  };

  if (selectedJob) {
    return <ApplicationList job={selectedJob} onBack={handleBack} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1>Jobs</h1>
        <Button
          className={styles.createButton}
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Job
        </Button>
      </div>

      <div className={styles.jobList}>
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className={styles.jobCard}
            onClick={() => setSelectedJob(job)}
          >
            <div className={styles.jobHeader}>
              <h2>{job.title}</h2>
              <span
                className={styles.jobLevel}
                style={{ backgroundColor: getJobLevelColor(job.jobLevel) }}
              >
                {job.jobLevel}
              </span>
            </div>
            <div className={styles.companyInfo}>Company: {job.companyName}</div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(jobs.length / recordsPerPage)}
        >
          Next
        </button>
      </div>

      <CreateJobModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJob}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Job;
