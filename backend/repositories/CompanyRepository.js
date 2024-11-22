const { PrismaClient } = require('@prisma/client');
const { DomainError } = require('../domain/errors/DomainError');

class CompanyRepository {
  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByCNPJ(cnpj) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { cnpj },
        include: {
          contracts: true
        }
      })

      if (!company) return null

      if (!company.contracts || company.contracts.length === 0) {
        return null
      }

      return {
        id: company.id,
        cnpj: company.cnpj,
        name: company.name,
        tradeName: company.tradeName,
        contracts: company.contracts
      }
    } catch (error) {
      throw new DomainError('Error finding company')
    }
  }
}

module.exports = { CompanyRepository };