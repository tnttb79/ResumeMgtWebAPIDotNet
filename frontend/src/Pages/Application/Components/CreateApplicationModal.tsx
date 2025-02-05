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
import { CreateApplicationRequest } from "../../../types/application";
import { Job } from "../../../types/job";
import { useNotification } from "../../../context/NotificationContext";
import styles from "./CreateApplicationModal.module.scss";

interface CreateApplicationModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isLoading: boolean;
}

const CreateApplicationModal: React.FC<CreateApplicationModalProps> = ({
  isModalOpen,
  onClose,
  onSuccess,
  isLoading,
}) => {
  // State for jobs list
  const [jobs, setJobs] = useState<Job[]>([]);
  const { showNotification } = useNotification();
  const [isError, setIsError] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    jobId: 0,
    resume: null as File | null,
  });

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

      // Handle resume file upload
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
      onSuccess();
    } catch (error: unknown) {
      console.error("Error submitting application:", error);
      const errorMessage =
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
          ? (error.response.data.message as string)
          : error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again.";
      showNotification(errorMessage, "error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // Store the file object directly
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
            fullWidth
            required
            error={isError}
            onBlur={() => setIsError(formData.firstName.trim() === "")}
            helperText={isError ? "First Name is required" : ""}
            margin='normal'
          />

          <TextField
            label='Last Name'
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            fullWidth
            required
            error={formData.lastName.trim() === ""}
            helperText={
              formData.lastName.trim() === "" ? "Last Name is required" : ""
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
            fullWidth
            required
            error={formData.email.trim() === ""}
            helperText={formData.email.trim() === "" ? "Email is required" : ""}
            margin='normal'
          />

          <TextField
            label='Phone'
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            fullWidth
            required
            error={formData.phone.trim() === ""}
            helperText={formData.phone.trim() === "" ? "Phone is required" : ""}
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
            fullWidth
            required
            error={formData.jobId === 0}
            helperText={formData.jobId === 0 ? "Please select a job" : ""}
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
            fullWidth
            required
            error={formData.coverLetter.trim() === ""}
            helperText={
              formData.coverLetter.trim() === ""
                ? "Cover Letter is required"
                : ""
            }
            multiline
            rows={4}
            margin='normal'
          />

          <FormControl fullWidth margin='normal' error={!formData.resume}>
            <InputLabel shrink>Resume (PDF only, max 5MB)</InputLabel>
            <Input
              type='file'
              onChange={handleFileChange}
              required
              inputProps={{
                accept: "application/pdf",
              }}
            />
            {!formData.resume && (
              <FormHelperText>Resume is required</FormHelperText>
            )}
          </FormControl>

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
