/*
  Warnings:

  - You are about to drop the column `cnpjId` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `contract_name` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `contract_number` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `tec_retention` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `due_date` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `invoice_number` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `issue_date` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `tax_retention` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `technical_rate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `technical_retention` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `technical_value` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the `Enterprise` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contractCode]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceNumber]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractCode` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractName` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalRetentionPct` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_cnpjId_fkey";

-- DropIndex
DROP INDEX "Contract_contract_number_key";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "cnpjId",
DROP COLUMN "contract_name",
DROP COLUMN "contract_number",
DROP COLUMN "tec_retention",
ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "contractCode" TEXT NOT NULL,
ADD COLUMN     "contractName" TEXT NOT NULL,
ADD COLUMN     "technicalRetentionPct" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "due_date",
DROP COLUMN "invoice_number",
DROP COLUMN "issue_date",
DROP COLUMN "tax_retention",
DROP COLUMN "technical_rate",
DROP COLUMN "technical_retention",
DROP COLUMN "technical_value",
DROP COLUMN "value",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "attachmentFilename" TEXT,
ADD COLUMN     "attachmentPath" TEXT,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hasTaxWithholding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasTechnicalRetention" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "invoiceNumber" TEXT NOT NULL,
ADD COLUMN     "issueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "technicalRetentionAmount" DOUBLE PRECISION,
ADD COLUMN     "technicalRetentionPct" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Enterprise";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_contractCode_key" ON "Contract"("contractCode");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
