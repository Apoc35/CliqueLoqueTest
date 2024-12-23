import {useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function ContractDetails() {
  const navigate = useNavigate();
  const { companyData } = useCompany();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { contractId } = useParams();
  const contract = companyData.contracts.find(c => c.id === contractId);


  const hasTaxRetention = watch("hasTaxRetention", false);
  const hasTechnicalRetention = watch("hasTechnicalRetention", false);

  const sendData = async (data) => {
    try {
      const payload = {
        invoiceNumber: data.accountNumber,
        issueDate: data.issueDate,
        dueDate: data.dueDate,
        amount: parseFloat(data.value),
      };

      const response = await fetch(
        `http://localhost:3200/api/contracts/${contractId}/invoices`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log('Dados enviados com sucesso:', await response.json());
        alert('Dados enviados com sucesso!');
        navigate('/');
      } else {
        console.error('Falha ao enviar dados:', await response.json());
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Logo and Header */}
      <img src={logo} alt="CliqueLoque Logo" className="h-20 w-30 bg-blue-900" />
      <div className="flex justify-center mb-8">
        <h1 className="text-2xl font-bold ml-4">PAGAMENTO DE FORNECEDOR</h1>
      </div>

      <form onSubmit={handleSubmit(sendData)} className="space-y-6">
        {/* Company Information */}
        <div className="border border-red-200 rounded-md p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex">
              <label className="text-sm font-semibold w-24">Razão Social:</label>
              <div className="text-sm">{companyData.name}</div>
            </div>
            <div className="flex">
              <label className="text-sm font-semibold w-10">CNPJ:</label>
              <div className="text-sm">{companyData.cnpj}</div>
            </div>
          </div>
          <div className="flex mt-2">
            <label className="text-sm font-semibold w-28">Nome Fantasia:</label>
            <div className="text-sm">{companyData.tradeName}</div>
          </div>
        </div>

        {/* Invoice Details */}
        <h3 className="text-center border border-red-200 rounded mb-4">Dados da Nota Fiscal</h3>
        <div className="rounded-md border border-red-200 p-4">
        <div className="grid grid-cols-2 gap-4">

        <div className="block text-sm mb-4 ">
            <label className="">Código do Contrato:</label>
            <div className="w-full h-10 p-2 bg-gray-100 border rounded">{contract ? contract.contractCode : ''}</div>
        </div>
        <div className="block text-sm mb-4">
          <label className="">Titulo do Contrato:</label>
        <div className="w-full h-10 p-2 bg-gray-100 border rounded">{contract ? contract.contractName : ''}</div>
        </div>
        </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Número da Nota</label>
              <input
                {...register('accountNumber')}
                type="text"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Data de Emissão</label>
              <div className="relative">
                <input
                  {...register('issueDate')}
                  type="date"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div>
            <label className="block text-sm mb-1">Data de Vencimento</label>
              <div className="relative">
                <input
                  {...register('dueDate')}
                  type="date"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Valor</label>
              <input
                {...register('value')}
                type="text"
                defaultValue=""
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
            </div>
          </div>
        </div>

        {/* Tax Retention */}
        <div className="border border-red-200 rounded-md p-4">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              {...register('hasTaxRetention')}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label className="ml-2">Retenção de Impostos</label>
          </div>

          <div className="grid grid-cols-3 gap-4">
          {["ISSQN", "IRRF", "CSLL", "COFINS", "INSS", "PIS"].map((tax) => (
            <div key={tax}>
              <label className="block text-sm mb-1">{tax}</label>
              <input
                {...register(tax.toLowerCase(), {
                })}
                type="number"
                className={`w-full p-2 border rounded ${
                  errors[tax.toLowerCase()] ? "border-red-500" : "border-gray-300"
                }`}
                disabled={!hasTaxRetention}
              />
              {errors[tax.toLowerCase()] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[tax.toLowerCase()].message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

        {/* Technical Retention */}
        <div className="border border-red-200 rounded-md p-4">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              {...register('hasTechnicalRetention')}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label className="ml-2">Retenção Técnica</label>
          </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Valor</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="w-full p-2 bg-gray-200 border rounded"
                    disabled={!hasTechnicalRetention}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Percentual</label>
                  <input
                    type="text"
                    defaultValue=""
                    className="w-full p-2 bg-gray-200 border rounded"
                    disabled={!hasTechnicalRetention}
                  />
                </div>
              </div>

              <div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/contracts')}
            className="px-6 py-2 w-64 bg-CancelButtonColor text-white rounded hover:bg-yellow-600"
          >
            Anterior
          </button>
          <button
            type="submit"
            className="px-6 py-2 w-64 bg-SendButtonColor text-white rounded hover:bg-green-700"
          >
            Próximo
          </button>
        </div>
        <div className="mt-8">
          <img
            src={logo}
            alt="CliqueLoque Logo"
            className="w-10 h-15 bg-blue-900"
          />
          <p className="mt-2 text-xs text-gray-500 text-end">
            © 2022-2022 Constituindo Patrimônios
          </p>
        </div>
      </form>
    </div>
  );
}