import React from "react";
import styles from "./JobView.module.scss";

interface Job {
  id: number;
  title: string;
  jobLevel: string;
}

interface Company {
  id: number;
  name: string;
  size: string;
  jobs: Job[];
}

interface JobViewProps {
  company: Company;
  onBack: () => void;
}

const JobView: React.FC<JobViewProps> = ({ company, onBack }) => {
  return (
    <div className={styles.jobsContainer}>
      <button onClick={onBack} className={styles.backButton}>
        Back
      </button>
      <h2>Jobs at {company.name}</h2>
      <ul className={styles.jobsList}>
        {company.jobs.length !== 0 ? (
          company.jobs.map((job) => (
            <li key={job.id} className={styles.jobItem}>
              <h3>{job.title}</h3>
            </li>
          ))
        ) : (
          <li>No jobs available</li>
        )}
      </ul>
    </div>
  );
};

export default JobView;
