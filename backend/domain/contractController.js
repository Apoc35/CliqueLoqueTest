// const { getUserContracts, addContract } = require("./contractService");
// const Joi = require('joi');

// const schema = Joi.object({
//   contract_name: Joi.string().required(),
//   contract_number: Joi.number().required(),
//   tec_retention: Joi.number().required()
// });

// const getAllContracts = async (req, res) => {
//   const { cnpj } = req.query;
//   if (!cnpj) {
//     return res.status(400).json({ message: "CNPJ não fornecido" });
//   }

//   try {
//     const contracts = await getUserContracts(cnpj);
//     res.status(200).json(contracts);
//   } catch (error) {
//     res.status(500).json({ message: "Erro ao buscar contratos", error });
//   }
// };

// const createContract = async (req, res) => {
//   const { error } = schema.validate(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   const { contract_name, contract_number, tec_retention } = req.body;
//   try {
//     const contract = await addContract({ contract_name, contract_number, tec_retention });
//     res.status(201).json(contract);
//   } catch (error) {
//     res.status(500).json({ message: "Erro ao criar contrato", error });
//   }
// };

// module.exports = { getAllContracts, createContract };