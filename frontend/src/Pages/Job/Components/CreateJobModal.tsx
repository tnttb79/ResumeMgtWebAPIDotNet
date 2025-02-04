import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { get } from "../../../axiosConfig/axiosConfig";
import { JobLevel, CreateJobRequest } from "../../../types/job";
import { Company } from "../../../types/company";
import styles from "./CreateJobModal.module.scss";

interface CreateJobModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: CreateJobRequest) => void;
  isLoading: boolean;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({
  isModalOpen,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  const initialFormState: CreateJobRequest = {
    title: "",
    jobLevel: JobLevel.Intern,
    companyId: 0,
  };

  const [jobData, setJobData] = useState<CreateJobRequest>(initialFormState);

  // Fetch companies for the dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await get<Company[]>("/api/Company");
        setCompanies(response.data);
        if (response.data.length > 0) {
          setJobData((prev) => ({ ...prev, companyId: response.data[0].id }));
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(jobData);
    setJobData(initialFormState);
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <Box className={styles.modal}>
        <h2>Create New Job</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Job Title Input */}
          <TextField
            label='Job Title'
            value={jobData.title}
            onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
            fullWidth
            required
            margin='normal'
          />

          {/* Job Level Dropdown */}
          <TextField
            select
            label='Job Level'
            value={jobData.jobLevel}
            onChange={(e) =>
              setJobData({
                ...jobData,
                jobLevel: e.target.value as JobLevel,
              })
            }
            fullWidth
            required
            margin='normal'
          >
            {Object.values(JobLevel).map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>

          {/* Company Selection Dropdown */}
          <TextField
            select
            label='Company'
            value={jobData.companyId}
            onChange={(e) =>
              setJobData({
                ...jobData,
                companyId: Number(e.target.value),
              })
            }
            fullWidth
            required
            margin='normal'
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </TextField>

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
              Create
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateJobModal;
