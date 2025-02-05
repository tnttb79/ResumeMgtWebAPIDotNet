import React, { useEffect, useState } from "react";
import { get } from "../../axiosConfig/axiosConfig";
import { Application as ApplicationType } from "../../types/application";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { useNotification } from "../../context/NotificationContext";
import styles from "./Application.module.scss";
import CreateApplicationModal from "./Components/CreateApplicationModal";
import { CircularProgress } from "@mui/material";

const recordsPerPage = 5;

const Application: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showNotification } = useNotification();

  // Function to fetch all applications
  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const response = await get<ApplicationType[]>("/api/Candidate/GetAll");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      showNotification(
        "Failed to fetch applications. Please try again later.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(applications.length / recordsPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentApplications = applications.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handleDownloadResume = async (applicationId: number) => {
    try {
      const response = await get<Blob>(
        `/api/Candidate/download/${applicationId}`,
        {
          responseType: "blob",
        }
      );

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume-${applicationId}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
      showNotification("Failed to download resume. Please try again.", "error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1>Applications</h1>
        <Button
          className={styles.createButton}
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Application
        </Button>
      </div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
      ) : applications.length === 0 ? (
        <div className={styles.noApplications}>
          <p>No applications found</p>
        </div>
      ) : (
        <div className={styles.applicationList}>
          {currentApplications.map((application) => (
            <div key={application.id} className={styles.applicationCard}>
              <div className={styles.applicationHeader}>
                <div>
                  <h2>{`${application.firstName} ${application.lastName}`}</h2>
                  <span className={styles.jobName}>
                    Applied for: {application.jobName} at{" "}
                    {application.companyName}
                  </span>
                </div>
                <Button
                  variant='outlined'
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownloadResume(application.id)}
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

      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(applications.length / recordsPerPage)
          }
        >
          Next
        </button>
      </div>

      <CreateApplicationModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchApplications();
        }}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Application;
