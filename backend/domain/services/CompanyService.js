const { validateCNPJ } = require('../utils/cnpjValidator');
const { ValidationError } = require('../errors/ValidationError');
const { DomainError } = require('../errors/DomainError');

class CompanyService {
  constructor(companyRepository) {
    this.companyRepository = companyRepository
  }

  async validateAndFindCompany(cnpj) {
    if (!validateCNPJ(cnpj)) {
      throw new ValidationError('Invalid CNPJ')
    }

    const company = await this.companyRepository.findByCNPJ(cnpj)

    if (!company) {
      throw new DomainError('CNPJ without active contracts')
    }

    return company
  }

  async getCompanyContracts(cnpj) {
    const company = await this.validateAndFindCompany(cnpj)

    if (!company) {
      throw new DomainError('Company not found')
    }

    return company
  }
}

module.exports = { CompanyService };