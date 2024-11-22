const { validateCNPJ } = require('../utils/cnpjValidator');
const { ValidationError } = require('../errors/ValidationError');
const { DomainError } = require('../errors/DomainError');

class ContractService {
  constructor(contractRepository) {
    this.contractRepository = contractRepository
  }

  async getContractsByCompanyCNPJ(cnpj) {
    if (!cnpj) {
      throw new ValidationError('CNPJ is required')
    }

    const contracts = await this.contractRepository.findByCompanyCNPJ(cnpj)

    if (!contracts || contracts.length === 0) {
      throw new DomainError('No contracts found for this CNPJ')
    }

    return contracts
  }

  async getContractDetails(id) {
    if (!id) {
      throw new ValidationError('Contract ID is required')
    }

    const contract = await this.contractRepository.findById(id)

    if (!contract) {
      throw new DomainError('Contract not found')
    }

    return contract
  }
}

module.exports = { ContractService };