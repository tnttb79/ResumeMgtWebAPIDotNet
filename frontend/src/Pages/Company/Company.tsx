import React, { useEffect, useState } from "react";
import JobView from "./Components/JobView";
import { get, post } from "../../axiosConfig/axiosConfig";
import styles from "./Company.module.scss";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateCompanyModal from "./Components/CreateCompanyModal";
import {
  Company as CompanyType,
  CreateCompanyRequest,
} from "../../types/company";
import { useNotification } from "../../context/NotificationContext";

const recordsPerPage = 5;

const Company: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showNotification } = useNotification();

  // Function to fetch companies from the API
  const fetchCompanies = async () => {
    try {
      const response = await get<CompanyType[]>("/api/Company");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      showNotification(
        "Failed to fetch companies. Please try again later.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleShowJobs = (company: CompanyType) => {
    setSelectedCompany(company);
  };

  const handleBack = () => {
    setSelectedCompany(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(companies.length / recordsPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentCompanies = companies.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handleCreateCompany = async (companyData: CreateCompanyRequest) => {
    try {
      setIsLoading(true);
      await post<CompanyType>("/api/Company", companyData);
      await fetchCompanies();
      setIsModalOpen(false);
      showNotification("Company created successfully!", "success");
    } catch (error) {
      console.error("Error creating company:", error);
      showNotification("Failed to create company. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {selectedCompany ? (
        <JobView company={selectedCompany} onBack={handleBack} />
      ) : (
        <>
          <div className={styles.headerContainer}>
            <h1>Company</h1>
            <Button
              className={styles.createButton}
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Create Company
            </Button>
          </div>

          <ul className={styles.companyList}>
            {currentCompanies.map((company) => (
              <li
                key={company.id}
                className={styles.companyItem}
                onClick={() => handleShowJobs(company)}
              >
                <div className={styles.companyInfo}>
                  <strong>{company.name}</strong>
                  <span> {company.size}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.pagination}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(companies.length / recordsPerPage)
              }
            >
              Next
            </button>
          </div>
        </>
      )}

      <CreateCompanyModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCompany}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Company;
