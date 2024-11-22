/*
  Warnings:

  - You are about to drop the `enterprise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cnpjId` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "cnpjId" TEXT NOT NULL;

-- DropTable
DROP TABLE "enterprise";

-- CreateTable
CREATE TABLE "Enterprise" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "fantasy_name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enterprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "invoice_number" DOUBLE PRECISION NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "tax_retention" BOOLEAN NOT NULL,
    "issqn" DOUBLE PRECISION,
    "irrf" DOUBLE PRECISION,
    "csll" DOUBLE PRECISION,
    "cofins" DOUBLE PRECISION,
    "inss" DOUBLE PRECISION,
    "pis" DOUBLE PRECISION,
    "technical_retention" BOOLEAN NOT NULL,
    "technical_value" DOUBLE PRECISION,
    "technical_rate" DOUBLE PRECISION,
    "contractId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_cnpj_key" ON "Enterprise"("cnpj");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_cnpjId_fkey" FOREIGN KEY ("cnpjId") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
