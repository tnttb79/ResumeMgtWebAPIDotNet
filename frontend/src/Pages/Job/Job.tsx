import React, { useEffect, useState } from "react";
import { get } from "../../axiosConfig/axiosConfig";
import { Job as JobType, JobLevel } from "../../types/job";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNotification } from "../../context/NotificationContext";
import styles from "./Job.module.scss";

const recordsPerPage = 5;

const Job: React.FC = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <div key={job.id} className={styles.jobCard}>
            <div className={styles.jobHeader}>
              <h2>{job.title}</h2>
              <span
                className={styles.jobLevel}
                style={{ backgroundColor: getJobLevelColor(job.jobLevel) }}
              >
                {job.jobLevel}
              </span>
            </div>
            <div className={styles.companyInfo}>
              <span>Company: {job.companyName}</span>
            </div>
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

      {/* TODO: Add CreateJobModal component */}
    </div>
  );
};

export default Job;
