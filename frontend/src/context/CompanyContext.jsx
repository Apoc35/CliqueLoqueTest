import { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [companyData, setCompanyData] = useState(null);

  return (
    <CompanyContext.Provider value={{ companyData, setCompanyData }}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => useContext(CompanyContext);
