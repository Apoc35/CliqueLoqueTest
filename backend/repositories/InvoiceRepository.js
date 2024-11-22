const { PrismaClient } = require('@prisma/client')
const { DomainError } = require('../domain/errors/DomainError')

class InvoiceRepository {
  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(invoiceData) {
    try {
      // First, get the contract to calculate technical retention if needed
      const contract = await this.prisma.contract.findUnique({
        where: { id: invoiceData.contractId }
      })

      if (!contract) {
        throw new DomainError('Contract not found')
      }

      // Calculate technical retention amount if enabled
      let technicalRetentionAmount = null
      if (invoiceData.hasTechnicalRetention) {
        technicalRetentionAmount = (invoiceData.amount * contract.technicalRetentionPct) / 100
      }

      // Create the invoice
      const invoice = await this.prisma.invoice.create({
        data: {
          contractId: invoiceData.contractId,
          invoiceNumber: invoiceData.invoiceNumber,
          issueDate: invoiceData.issueDate,
          dueDate: invoiceData.dueDate,
          amount: invoiceData.amount,
          hasTaxWithholding: invoiceData.hasTaxWithholding,
          // Tax withholding data
          ...(invoiceData.hasTaxWithholding && {
            issqn: invoiceData.issqn,
            irrf: invoiceData.irrf,
            csll: invoiceData.csll,
            cofins: invoiceData.cofins,
            inss: invoiceData.inss,
            pis: invoiceData.pis
          }),
          // Technical retention data
          hasTechnicalRetention: invoiceData.hasTechnicalRetention,
          technicalRetentionAmount,
          technicalRetentionPct: contract.technicalRetentionPct,
          // Attachment data
          attachmentFilename: invoiceData.attachmentFilename,
          attachmentPath: invoiceData.attachmentPath
        },
        include: {
          contract: {
            include: {
              company: true
            }
          }
        }
      })

      return invoice
    } catch (error) {
      if (error.name === 'DomainError') throw error
      throw new DomainError('Error creating invoice')
    }
  }
}

module.exports = { InvoiceRepository };