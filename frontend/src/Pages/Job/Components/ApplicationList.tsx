import React, { useEffect, useState } from "react";
import { get } from "../../../axiosConfig/axiosConfig";
import { Application } from "../../../types/application";
import { Job } from "../../../types/job";
import { useNotification } from "../../../context/NotificationContext";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "./ApplicationList.module.scss";

interface ApplicationListProps {
  job: Job;
  onBack: () => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ job, onBack }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const { showNotification } = useNotification();

  // Function to fetch applications for the job
  const fetchApplications = async () => {
    try {
      const response = await get<Application[]>(`/api/Candidate/job/${job.id}`);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      showNotification(
        "Failed to fetch applications. Please try again later.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Function to handle resume download
  const handleDownloadResume = async (applicationId: number) => {
    try {
      const response = await get<Blob>(
        `/api/Candidate/download/${applicationId}`,
        {
          responseType: "blob",
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume-${applicationId}.pdf`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);
      showNotification("Failed to download resume. Please try again.", "error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          className={styles.backButton}
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
        >
          Back to Jobs
        </Button>
        <h1>
          Applications for {job.title} at {job.companyName}
        </h1>
      </div>

      {applications.length === 0 ? (
        <div className={styles.noApplications}>
          <p>No applications found for this job.</p>
        </div>
      ) : (
        <div className={styles.applicationList}>
          {applications.map((application) => (
            <div key={application.email} className={styles.applicationCard}>
              <div className={styles.applicationHeader}>
                <h2>{`${application.firstName} ${application.lastName}`}</h2>
                <Button
                  variant='outlined'
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownloadResume(application.jobId)}
                  size='small'
                >
                  Resume
                </Button>
              </div>
              <div className={styles.applicationDetails}>
                <p>
                  <strong>Email:</strong> {application.email}
                </p>
                <p>
                  <strong>Phone:</strong> {application.phone}
                </p>
                <div className={styles.coverLetter}>
                  <strong>Cover Letter:</strong>
                  <p>{application.coverLetter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
