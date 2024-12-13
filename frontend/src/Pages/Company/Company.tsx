import React, { useEffect, useState } from "react";
import JobView from "./Components/JobView";
import { get } from "../../axiosConfig/axiosConfig";
import styles from "./Company.module.scss";

interface Company {
  id: number;
  name: string;
  size: string;
  jobs: Job[];
}

interface Job {
  id: number;
  title: string;
  jobLevel: string;
}

const Company: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const recordsPerPage = 5;

  useEffect(() => {
    get<Company[]>("/api/Company")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  const handleShowJobs = (companyId: number) => {
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
    }
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

  return (
    <div className={styles.container}>
      {selectedCompany ? (
        <JobView company={selectedCompany} onBack={handleBack} />
      ) : (
        <>
          <h1>Company</h1>
          <ul className={""}>
            {currentCompanies.map((company) => (
              <li key={company.id} className={""}>
                <div>
                  <strong>{company.name}</strong> - {company.size}
                </div>
                <button
                  onClick={() => handleShowJobs(company.id)}
                  className={""}
                >
                  Show Jobs
                </button>
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
    </div>
  );
};

export default Company;
