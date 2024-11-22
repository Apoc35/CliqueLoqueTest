const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.invoice.deleteMany({})
  await prisma.contract.deleteMany({})
  await prisma.company.deleteMany({})

  // Create mock companies
  const companies = [
    {
      cnpj: '44021247000160',
      name: 'Tech Solutions Ltd',
      tradeName: 'TechSol',
      contracts: {
        create: [
          {
            contractName: 'Software Development Project',
            contractCode: 'TECH-001',
            technicalRetentionPct: 10.5,
          },
          {
            contractName: 'IT Infrastructure Maintenance',
            contractCode: 'TECH-002',
            technicalRetentionPct: 8.0,
          },
        ],
      },
    },
    {
      cnpj: '93426734000118',
      name: 'Digital Innovations Inc',
      tradeName: 'DigiInno',
      contracts: {
        create: [
          {
            contractName: 'Cloud Migration Services',
            contractCode: 'DIGI-001',
            technicalRetentionPct: 12.0,
          },
        ],
      },
    },
    {
      cnpj: '08575269000108',
      name: 'Global Systems Corporation',
      tradeName: 'GlobalSys',
      contracts: {
        create: [
          {
            contractName: 'Security Consulting',
            contractCode: 'GLOB-001',
            technicalRetentionPct: 15.0,
          },
          {
            contractName: 'Network Infrastructure',
            contractCode: 'GLOB-002',
            technicalRetentionPct: 9.5,
          },
          {
            contractName: 'Data Center Management',
            contractCode: 'GLOB-003',
            technicalRetentionPct: 11.0,
          },
        ],
      },
    },
    {
      cnpj: '77048498000197',
      name: 'Smart Solutions Brasil',
      tradeName: 'SmartSol',
      contracts: {
        create: [
          {
            contractName: 'AI Implementation Project',
            contractCode: 'SMART-001',
            technicalRetentionPct: 13.5,
          },
        ],
      },
    },
    {
      cnpj: '46867813000184',
      name: 'Business Analytics Ltda',
      tradeName: 'BizAnalytics',
      contracts: {
        create: [
          {
            contractName: 'Data Analytics Platform',
            contractCode: 'BIZ-001',
            technicalRetentionPct: 7.5,
          },
          {
            contractName: 'Business Intelligence Services',
            contractCode: 'BIZ-002',
            technicalRetentionPct: 8.5,
          },
        ],
      },
    },
  ]

  // Insert companies and their contracts
  for (const company of companies) {
    await prisma.company.create({
      data: company,
    })
  }

  // Add some sample invoices for the first company's first contract
  const firstCompany = await prisma.company.findFirst({
    include: {
      contracts: true,
    },
  })

  if (firstCompany && firstCompany.contracts[0]) {
    const contract = firstCompany.contracts[0]
    
    // Create sample invoices
    await prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2024-001',
        issueDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        amount: 50000.00,
        contractId: contract.id,
        
        // Tax Withholding Data
        hasTaxWithholding: true,
        issqn: 500.00,
        irrf: 750.00,
        csll: 250.00,
        cofins: 300.00,
        inss: 400.00,
        pis: 150.00,
        
        // Technical Retention Data
        hasTechnicalRetention: true,
        technicalRetentionAmount: 5250.00,
        technicalRetentionPct: contract.technicalRetentionPct,
        
        // Attachment Data
        attachmentFilename: 'invoice-001.pdf',
        attachmentPath: '/attachments/invoice-001.pdf',
      },
    })

    // Create a second invoice for the same contract
    await prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-2024-002',
        issueDate: new Date('2024-02-15'),
        dueDate: new Date('2024-03-15'),
        amount: 45000.00,
        contractId: contract.id,
        
        // Tax Withholding Data
        hasTaxWithholding: true,
        issqn: 450.00,
        irrf: 675.00,
        csll: 225.00,
        cofins: 270.00,
        inss: 360.00,
        pis: 135.00,
        
        // Technical Retention Data
        hasTechnicalRetention: true,
        technicalRetentionAmount: 4725.00,
        technicalRetentionPct: contract.technicalRetentionPct,
        
        // Attachment Data
        attachmentFilename: 'invoice-002.pdf',
        attachmentPath: '/attachments/invoice-002.pdf',
      },
    })
  }

  console.log('Database has been seeded! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })