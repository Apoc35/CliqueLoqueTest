import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useCompany } from '../context/CompanyContext';

export default function Contracts() {
  const navigate = useNavigate();
  const { companyData } = useCompany();
  const { handleSubmit, control, watch } = useForm({
    defaultValues: { selectedContract: null },
  });

  const selectedContract = watch('selectedContract');

  useEffect(() => {
    if (!companyData) {
      navigate('/');
    }
  }, [companyData, navigate]);

  if (!companyData) return null;

  const handleNext = () => {
    if (!selectedContract) {
      alert('Ao menos um Contrato deverá ser selecionado');
      return;
    }
    navigate(`/contracts/${selectedContract}`);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/');
  };

  const handleDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/invoice');
  };

  return (
    <form onSubmit={handleSubmit(handleNext)} className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Razão Social: {companyData.name}</h2>
        <p className="text-gray-600">CNPJ: {companyData.cnpj}</p>
        <p className="text-gray-600">Nome Fantasia: {companyData.tradeName}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contratos vinculados</h3>
        {companyData.contracts.map((contract) => (
          <div
            key={contract.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <Controller
              name="selectedContract"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="radio"
                  value={contract.id}
                  checked={field.value === contract.id}
                  className="h-4 w-4"
                />
              )}
            />
            <div className="flex-1 space-y-1">
              <p className="font-medium">{contract.contractName}</p>
              <p className="text-sm text-gray-600">{contract.contractCode}</p>
              <p className="text-sm text-gray-600">
                Retenção técnica: {contract.technicalRetentionPct}%
              </p>
            </div>
            <button
              onClick={handleDetails}
              className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
            >
              Detalhes
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Anterior
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Próximo
        </button>
      </div>
    </form>
  );
}
