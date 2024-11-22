// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // Função para buscar todos os contratos
// const getUserContracts = async (cnpj) => {
//   return await prisma.contract.findMany({
//     where: {
//       cnpj: {
//         cnpj: cnpj,
//       },
//     },
//     include: {
//       cnpj: true,
//     },
//   });
// };

// const addContract = async ({ contract_name, contract_number, tec_retention }) => {
//   return await prisma.contract.create({
//     data: {
//       contract_name,
//       contract_number,
//       tec_retention
//     },
//   });
// };

// module.exports = { getUserContracts, addContract };