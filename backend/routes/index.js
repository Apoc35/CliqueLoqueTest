const express = require("express");

const { CompanyService } = require('../domain/services/CompanyService')
const { ContractService } = require('../domain/services/ContractService')
const { InvoiceService } = require('../domain/services/InvoiceService')
const { CompanyRepository } = require('../repositories/CompanyRepository')
const { ContractRepository } = require('../repositories/ContractRepository')
const { InvoiceRepository } = require('../repositories/InvoiceRepository')

const router = express.Router();

// Initialize repositories
const companyRepository = new CompanyRepository()
const contractRepository = new ContractRepository()
const invoiceRepository = new InvoiceRepository()

// Initialize services
const companyService = new CompanyService(companyRepository)
const contractService = new ContractService(contractRepository)
const invoiceService = new InvoiceService(invoiceRepository)

// Access Page - CNPJ Validation and Login
router.post('/login', async (req, res) => {
  try {
    const { cnpj } = req.body
    const company = await companyService.validateAndFindCompany(cnpj)
    return res.json(company)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    return res.status(404).json({ error: 'CNPJ without active contracts' })
  }
})

// Linked Contracts Page - Get Company Contracts
router.get('/companies/:cnpj/contracts', async (req, res) => {
  try {
    const { cnpj } = req.params
    const contracts = await contractService.getContractsByCompanyCNPJ(cnpj)
    return res.json(contracts)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error: error.message })
  }
})

// Get Contract Details
router.get('/contracts/:id', async (req, res) => {
  try {
    const { id } = req.params
    const contract = await contractService.getContractDetails(id)
    return res.json(contract)
  } catch (error) {
    return res.status(404).json({ error: 'Contract not found' })
  }
})


// Create Invoice
router.post('/contracts/:id/invoices', async (req, res) => {
  try {
    const { id: contractId } = req.params
    const {
      invoiceNumber,
      issueDate,
      dueDate,
      amount,
      hasTaxWithholding,
      taxData,
      hasTechnicalRetention,
      attachment
    } = req.body

    const invoice = await invoiceService.createInvoice({
      contractId,
      invoiceNumber,
      issueDate: new Date(issueDate),
      dueDate: new Date(dueDate),
      amount,
      hasTaxWithholding,
      ...(hasTaxWithholding && {
        issqn: taxData?.issqn,
        irrf: taxData?.irrf,
        csll: taxData?.csll,
        cofins: taxData?.cofins,
        inss: taxData?.inss,
        pis: taxData?.pis
      }),
      hasTechnicalRetention,
      ...(attachment && {
        attachmentFilename: attachment.filename,
        attachmentPath: attachment.path
      })
    })

    return res.status(201).json({
      message: `Request ${invoice.id} was sent successfully.`,
      invoice
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error: error.message })
  }
})

module.exports = router;