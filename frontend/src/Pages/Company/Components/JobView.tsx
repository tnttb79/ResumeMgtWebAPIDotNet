import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Company } from "../../../types/company";
import { JobLevel } from "../../../types/job";
import styles from "./JobView.module.scss";

interface JobViewProps {
  company: Company;
  onBack: () => void;
}

const JobView: React.FC<JobViewProps> = ({ company, onBack }) => {
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
      <div className={styles.header}>
        <Button
          className={styles.backButton}
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
        >
          Back to Companies
        </Button>
        <h1>Jobs at {company.name}</h1>
      </div>

      {company.jobs.length === 0 ? (
        <div className={styles.noJobs}>
          <p>No jobs available</p>
        </div>
      ) : (
        <div className={styles.jobList}>
          {company.jobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobHeader}>
                <h2>{job.title}</h2>
                <span
                  className={styles.jobLevel}
                  style={{
                    backgroundColor: getJobLevelColor(job.jobLevel as JobLevel),
                  }}
                >
                  {job.jobLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobView;
