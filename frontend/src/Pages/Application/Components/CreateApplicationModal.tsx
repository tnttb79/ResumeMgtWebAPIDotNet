import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { get, post } from "../../../axiosConfig/axiosConfig";
import { Job } from "../../../types/job";
import { useNotification } from "../../../context/NotificationContext";
import styles from "./CreateApplicationModal.module.scss";

interface CreateApplicationModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isLoading: boolean;
}

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  coverLetter: "",
  jobId: 0,
  resume: null as File | null,
};

// Track which fields have been touched/interacted with
const initialTouchedState = {
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
  coverLetter: false,
  jobId: false,
  resume: false,
};

const CreateApplicationModal: React.FC<CreateApplicationModalProps> = ({
  isModalOpen,
  onClose,
  onSuccess,
  isLoading,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState(initialFormState);
  const [touched, setTouched] = useState(initialTouchedState);

  // Handle field blur (when user leaves a field)
  const handleBlur = (field: keyof typeof initialTouchedState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Fetch jobs for the dropdown
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await get<Job[]>("/api/Job");
        setJobs(response.data);
        if (response.data.length > 0) {
          setFormData((prev) => ({ ...prev, jobId: response.data[0].id }));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("FirstName", formData.firstName.trim());
      formDataToSend.append("LastName", formData.lastName.trim());
      formDataToSend.append("Email", formData.email.trim());
      formDataToSend.append("Phone", formData.phone.trim());
      formDataToSend.append("CoverLetter", formData.coverLetter.trim());
      formDataToSend.append("JobId", formData.jobId.toString());

      if (formData.resume instanceof File) {
        formDataToSend.append("Resume", formData.resume);
      } else {
        throw new Error("Resume file is required");
      }
      await post("/api/Candidate", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showNotification("Application submitted successfully!", "success");
      setFormData(initialFormState);
      setTouched(initialTouchedState);
      onSuccess();
    } catch (error: unknown) {
      console.error("Error submitting application:", error);
      showNotification(
        "Failed to submit application. Please try again.",
        "error"
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate file type
    if (file.type !== "application/pdf") {
      showNotification("Please upload a PDF file", "error");
      return;
    }
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("File size should be less than 5MB", "error");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <Box className={styles.modal}>
        <h2>Submit Application</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label='First Name'
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            onBlur={() => handleBlur("firstName")}
            fullWidth
            required
            error={touched.firstName && formData.firstName.trim() === ""}
            helperText={
              touched.firstName && formData.firstName.trim() === ""
                ? "First Name is required"
                : ""
            }
            margin='normal'
          />

          <TextField
            label='Last Name'
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            onBlur={() => handleBlur("lastName")}
            fullWidth
            required
            error={touched.lastName && formData.lastName.trim() === ""}
            helperText={
              touched.lastName && formData.lastName.trim() === ""
                ? "Last Name is required"
                : ""
            }
            margin='normal'
          />

          <TextField
            label='Email'
            type='email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onBlur={() => handleBlur("email")}
            fullWidth
            required
            error={touched.email && formData.email.trim() === ""}
            helperText={
              touched.email && formData.email.trim() === ""
                ? "Email is required"
                : ""
            }
            margin='normal'
          />

          <TextField
            label='Phone'
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            onBlur={() => handleBlur("phone")}
            fullWidth
            required
            error={touched.phone && formData.phone.trim() === ""}
            helperText={
              touched.phone && formData.phone.trim() === ""
                ? "Phone is required"
                : ""
            }
            margin='normal'
          />

          <TextField
            select
            label='Job'
            value={formData.jobId}
            onChange={(e) =>
              setFormData({
                ...formData,
                jobId: Number(e.target.value),
              })
            }
            onBlur={() => handleBlur("jobId")}
            fullWidth
            required
            error={touched.jobId && formData.jobId === 0}
            helperText={
              touched.jobId && formData.jobId === 0 ? "Please select a job" : ""
            }
            margin='normal'
          >
            {jobs.map((job) => (
              <MenuItem key={job.id} value={job.id}>
                {job.title} at {job.companyName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label='Cover Letter'
            value={formData.coverLetter}
            onChange={(e) =>
              setFormData({ ...formData, coverLetter: e.target.value })
            }
            onBlur={() => handleBlur("coverLetter")}
            fullWidth
            required
            error={touched.coverLetter && formData.coverLetter.trim() === ""}
            helperText={
              touched.coverLetter && formData.coverLetter.trim() === ""
                ? "Cover Letter is required"
                : ""
            }
            multiline
            rows={4}
            margin='normal'
          />

          <div
            className={`${styles.fileUploadControl} ${
              touched.resume && !formData.resume ? styles.error : ""
            }`}
          >
            <span className={styles.fileUploadLabel}>
              Resume (PDF only, max 5MB)
            </span>
            <div className={styles.fileUploadWrapper}>
              <span className={styles.fileNameDisplay}>
                {formData.resume ? formData.resume.name : "No file chosen"}
              </span>
              <label className={styles.uploadButton}>
                Choose File
                <input
                  type='file'
                  onChange={handleFileUpload}
                  onBlur={() => handleBlur("resume")}
                  required
                  accept='application/pdf'
                />
              </label>
            </div>
            <span className={styles.fileUploadHelper}>
              {touched.resume && !formData.resume
                ? "Resume is required"
                : "Accepted format: PDF, Maximum size: 5MB"}
            </span>
          </div>

          <div className={styles.actions}>
            <Button onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={isLoading}
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateApplicationModal;
