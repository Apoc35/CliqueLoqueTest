const { validateDate } = require('../utils/dateValidator');

class InvoiceService {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository
  }

  async createInvoice(invoiceData) {
    // Validate required fields
    this.validateInvoiceData(invoiceData)

    // Create invoice
    const invoice = await this.invoiceRepository.create(invoiceData)

    return invoice
  }

  validateInvoiceData({
    invoiceNumber,
    issueDate,
    dueDate,
    amount,
    hasTaxWithholding,
    taxData,
    hasTechnicalRetention,
  }) {
    if (!invoiceNumber) {
      throw new ValidationError('Invoice Number Required')
    }

    if (!issueDate || !validateDate(new Date(issueDate))) {
      throw new ValidationError('Issue Date Required')
    }

    if (!dueDate || !validateDate(new Date(dueDate))) {
      throw new ValidationError('Due Date Required')
    }

    if (!amount || amount <= 0) {
      throw new ValidationError('Amount Required and must be greater than zero')
    }

    // Validate tax data if tax withholding is enabled - use this in frontend?
    if (hasTaxWithholding && taxData) {
      this.validateTaxData(taxData)
    }

  }

  validateTaxData({
    issqn,
    irrf,
    csll,
    cofins,
    inss,
    pis
  }) {
    if (issqn && issqn <= 0) {
      throw new ValidationError('ISSQN must be greater than zero')
    }

    if (irrf && irrf <= 0) {
      throw new ValidationError('IRRF must be greater than zero')
    }

    if (csll && csll <= 0) {
      throw new ValidationError('CSLL must be greater than zero')
    }

    if (cofins && cofins <= 0) {
      throw new ValidationError('COFINS must be greater than zero')
    }

    if (inss && inss <= 0) {
      throw new ValidationError('INSS must be greater than zero')
    }

    if (pis && pis <= 0) {
      throw new ValidationError('PIS must be greater than zero')
    }
  }
}

module.exports = { InvoiceService };