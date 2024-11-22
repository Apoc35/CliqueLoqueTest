import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';

export default function Contracts() {
  const navigate = useNavigate();
  const { companyData } = useCompany();
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    if (!companyData) {
      navigate('/');
    }
  }, [companyData, navigate]);

  if (!companyData) return null;

  const handleNext = () => {
    if (!selectedContract) {
      alert('At least one Contract should be selected');
      return;
    }
    navigate('/invoice');
  };

  const handleDetails = (e, contractId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/contracts/${contractId}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{companyData.name}</h2>
        <p className="text-gray-600">CNPJ: {companyData.cnpj}</p>
        <p className="text-gray-600">Trade Name: {companyData.tradeName}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Linked Contracts</h3>
        {companyData.contracts.map((contract) => (
          <div
            key={contract.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <input
              type="radio"
              name="contract"
              checked={selectedContract?.id === contract.id}
              onChange={() => setSelectedContract(contract)}
              className="h-4 w-4"
            />
            <div className="flex-1 space-y-1">
              <p className="font-medium">{contract.contractName}</p>
              <p className="text-sm text-gray-600">
                Code: {contract.contractCode}
              </p>
              <p className="text-sm text-gray-600">
                Technical Retention: {contract.technicalRetentionPct}%
              </p>
            </div>
            <button
              onClick={(e) => handleDetails(e, contract.id)}
              className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
            >
              Details
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate('/')}
          className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
