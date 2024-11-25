import { useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import { useForm } from "react-hook-form";
import logo from '../assets/logo.png';


export default function Home() {
  const navigate = useNavigate();
  const { setCompanyData } = useCompany();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const handleCnpjChange = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length <= 14) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    setValue("cnpj", value);
  };


  // I should create an external service to use this validation!
  function validateCnpj(cnpj) {
    // Remove any characters that aren't digits
    cnpj = cnpj.replace(/[^\d]/g, '')

    // Validate length
    if (cnpj.length !== 14) return false

    // Validate if all digits are the same
    if (/^(\d)\1{13}$/.test(cnpj)) return false

    // Calculate first check digit
    let sum = 0
    let weight = 2
    for (let i = 11; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight
      weight = weight === 9 ? 2 : weight + 1
    }
    let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (parseInt(cnpj.charAt(12)) !== digit) return false

    // Calculate second check digit
    sum = 0
    weight = 2
    for (let i = 12; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight
      weight = weight === 9 ? 2 : weight + 1
    }
    digit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (parseInt(cnpj.charAt(13)) !== digit) return false

    return true
  }

  const onSubmit = async (data) => {
    const { cnpj } = data;

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center h-[400px] w-[500px] bg-white rounded-lg shadow-lg p-6">
      <img src={ logo } alt="CliqueLoque Logo" className='w-32 h-auto bg-blue-900' />
        <h1 className="mb-8 text-2xl font-bold">Pagamento de fornecedor</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-96 flex flex-col items-center">
          <div className="mb-4 w-full">
            <label htmlFor="cnpj" className="mb-2 block font-medium text-black">
              CNPJ
            </label>
            <input
              type="text"
              id="cnpj"
              {...register("cnpj", {
                required: "CNPJ é obrigatório",
                validate: validateCnpj,
                onChange: (e) => handleCnpjChange(e.target.value),
              })}
              placeholder="00.000.000/0000-00"
              className={`w-full h-8 rounded-md border p-3 shadow-sm ${
                errors.cnpj ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              maxLength="18"
            />
            {errors.cnpj && (
              <p className="mt-1 text-sm text-red-500">{errors.cnpj.message || "CNPJ inválido"}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-72 bg-SendButtonColor px-2 py-2 text-white hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            shadow-lg rounded"
          >
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}