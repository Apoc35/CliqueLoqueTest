import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';

export default function Home() {
  const [cnpj, setCnpj] = useState('');
  const navigate = useNavigate();
  const { setCompanyData } = useCompany();

  const handleCnpjChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length <= 14) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    setCnpj(value);
  };

  const validateCnpj = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '');
    return cnpj.length === 14;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCnpj(cnpj)) {
      alert('CNPJ inválido');
      return;
    }

    try {
      const response = await fetch('http://localhost:3200/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cnpj: cnpj.replace(/\D/g, '') }),
      });

      if (!response.ok) {
        throw new Error('CNPJ sem contratos ativos');
      }

      const data = await response.json();
      setCompanyData(data);
      navigate('/contracts');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold">Acesso ao Sistema</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6">
          <label
            htmlFor="cnpj"
            className="mb-2 block font-medium text-gray-700"
          >
            CNPJ
          </label>
          <input
            type="text"
            id="cnpj"
            value={cnpj}
            onChange={handleCnpjChange}
            placeholder="00.000.000/0000-00"
            className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            maxLength="18"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
