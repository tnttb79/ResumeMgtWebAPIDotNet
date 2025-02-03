import React, { useState } from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import styles from "./CreateCompanyModal.module.scss";
import { CompanySize, CreateCompanyRequest } from "../../../types/company";

interface CreateCompanyModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSubmit: (companyData: CreateCompanyRequest) => void;
  isLoading: boolean;
}

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  isModalOpen,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [companyData, setCompanyData] = useState<CreateCompanyRequest>({
    name: "",
    size: CompanySize.Small,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(companyData);
    setCompanyData({
      name: "",
      size: CompanySize.Small,
    });
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <Box className={styles.modal}>
        <h2>Create New Company</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label='Company Name'
            value={companyData.name}
            onChange={(e) =>
              setCompanyData({ ...companyData, name: e.target.value as string })
            }
            fullWidth
            required
            margin='normal'
          />
          <TextField
            select
            label='Company Size'
            value={companyData.size}
            onChange={(e) =>
              setCompanyData({
                ...companyData,
                size: e.target.value as CompanySize,
              })
            }
            fullWidth
            required
            margin='normal'
          >
            {Object.values(CompanySize).map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
          <div className={styles.actions}>
            <Button onClick={onClose} loading={isLoading} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={isLoading}
              loading={isLoading}
            >
              Create
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateCompanyModal;
