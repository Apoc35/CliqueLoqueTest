import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useCompany } from '../context/CompanyContext';
import { Search } from 'lucide-react';
import logo from '../assets/logo.png';

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
    <div className="mx-auto max-w-5xl p-6 bg-white">
      <div className="mb-8">
        <img
          src={logo}
          alt="CliqueLoque Logo"
          className="mb-6 w-20 h-30 bg-blue-900"
        />
        <h1 className="mb-6 text-2xl font-bold">PAGAMENTO DE FORNECEDOR</h1>
      </div>
      <form onSubmit={handleSubmit(handleNext)} className="space-y-6">
        <div className="rounded-lg border border-red-200 p-4 grid grid-cols-2 gap-4">
          <div>
            <div className="flex gap-2">
              <span className="font-semibold">Razão Social:</span>
              <span>{companyData.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Nome Fantasia:</span>
              <span>{companyData.tradeName}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex justify-end gap-2">
              <span className="font-semibold">CNPJ:</span>
              <span>{companyData.cnpj}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <div className="rounded-lg border border-red-200 p-4">
            <h3 className="text-center font-semibold">Contratos Vinculados</h3>
          </div>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="w-12 p-3"></th>
                  <th className="p-3 text-left">Nome do Contrato</th>
                  <th className="p-3 text-left">Código do Contrato</th>
                  <th className="p-3 text-center">Retenção Técnica</th>
                  <th className="w-24 p-3 text-center">Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {companyData.contracts.map((contract, index) => (
                  <tr
                    key={contract.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="p-3 text-center">
                      <Controller
                        name="selectedContract"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="checkbox"
                            value={contract.id}
                            checked={field.value === contract.id}
                            onChange={() => field.onChange(contract.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        )}
                      />
                    </td>
                    <td className="p-3">{contract.contractName}</td>
                    <td className="p-3">{contract.contractCode}</td>
                    <td className="p-3">
                      <div className="w-20 mx-auto py-1 text-center text-white bg-techRetencialColor rounded">
                        {contract.technicalRetentionPct}%
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={handleDetails}
                        className="rounded bg-techRetencialColor p-2 hover:bg-blue-400"
                      >
                        <Search className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-evenly">
          <button
            onClick={handlePrevious}
            className="rounded-md bg-yellow-500 px-8 py-2 font-semibold text-white hover:bg-yellow-600"
          >
            Anterior
          </button>
          <button
            type="submit"
            className="rounded-md bg-green-600 px-8 py-2 font-semibold text-white hover:bg-green-700"
          >
            Próximo
          </button>
        </div>

        <div className="mt-8">
          <img
            src={logo}
            alt="CliqueLoque Logo"
            className="w-20 h-30 bg-blue-900"
          />
          <p className="mt-2 text-xs text-gray-500">
            © 2022-2022 Constituindo Patrimônios
          </p>
        </div>
      </form>
    </div>
  );
}

