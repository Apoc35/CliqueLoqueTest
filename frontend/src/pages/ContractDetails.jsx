import { useParams, useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

export default function ContractDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companyData } = useCompany();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const hasTaxRetention = watch('hasTaxRetention');
  const hasTechnicalRetention = watch('hasTechnicalRetention');

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Contract Details</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Informações Básicas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número da conta
              </label>
              <input
                {...register('accountNumber', {
                  required: 'Campo obrigatório',
                })}
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
              {errors.accountNumber && (
                <span className="text-red-500 text-sm">
                  {errors.accountNumber.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de emissão
              </label>
              <input
                {...register('issueDate', { required: 'Campo obrigatório' })}
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
              {errors.issueDate && (
                <span className="text-red-500 text-sm">
                  {errors.issueDate.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de vencimento
              </label>
              <input
                {...register('dueDate', { required: 'Campo obrigatório' })}
                type="date"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
              {errors.dueDate && (
                <span className="text-red-500 text-sm">
                  {errors.dueDate.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor
              </label>
              <Controller
                name="value"
                control={control}
                rules={{ required: 'Campo obrigatório' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                )}
              />
              {errors.value && (
                <span className="text-red-500 text-sm">
                  {errors.value.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tax Retention Section */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              {...register('hasTaxRetention')}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label className="ml-2 text-lg font-medium">
              Retenção de impostos
            </label>
          </div>

          {hasTaxRetention && (
            <div className="grid grid-cols-2 gap-4">
              {['ISSQN', 'IRRF', 'CSLL', 'COFINS', 'INSS', 'PIS'].map((tax) => (
                <div key={tax}>
                  <label className="block text-sm font-medium text-gray-700">
                    {tax}
                  </label>
                  <Controller
                    name={tax.toLowerCase()}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Technical Retention Section */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              {...register('hasTechnicalRetention')}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label className="ml-2 text-lg font-medium">Retenção Técnica</label>
          </div>

          {hasTechnicalRetention && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Valor
                  </label>
                  <Controller
                    name="technicalValue"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Percentual
                  </label>
                  <Controller
                    name="technicalPercentage"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Anexar nota fiscal
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="mt-1 block w-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate('/contracts')}
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
