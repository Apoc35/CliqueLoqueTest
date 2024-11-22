const { PrismaClient } = require('@prisma/client')
const { DomainError } = require('../domain/errors/DomainError')

class ContractRepository {
  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByCompanyCNPJ(cnpj) {
    try {
      const contracts = await this.prisma.contract.findMany({
        where: {
          company: {
            cnpj
          }
        },
        include: {
          company: true
        }
      })

      return contracts.map(contract => ({
        id: contract.id,
        contractName: contract.contractName,
        contractCode: contract.contractCode,
        technicalRetentionPct: contract.technicalRetentionPct,
        company: {
          id: contract.company.id,
          name: contract.company.name,
          tradeName: contract.company.tradeName,
          cnpj: contract.company.cnpj
        }
      }))
    } catch (error) {
      throw new DomainError('Error finding contracts')
    }
  }

  async findById(id) {
    try {
      const contract = await this.prisma.contract.findUnique({
        where: { id },
        include: {
          company: true
        }
      })

      if (!contract) return null

      return {
        id: contract.id,
        contractName: contract.contractName,
        contractCode: contract.contractCode,
        technicalRetentionPct: contract.technicalRetentionPct,
        company: {
          id: contract.company.id,
          name: contract.company.name,
          tradeName: contract.company.tradeName,
          cnpj: contract.company.cnpj
        }
      }
    } catch (error) {
      throw new DomainError('Error finding contract')
    }
  }
}

module.exports = { ContractRepository };