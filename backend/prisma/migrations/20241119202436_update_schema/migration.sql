/*
  Warnings:

  - You are about to drop the column `amount` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Contract` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contract_number]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `enterprise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contract_name` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract_number` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tec_retention` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "amount",
DROP COLUMN "title",
ADD COLUMN     "contract_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "contract_number" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tec_retention" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contract_contract_number_key" ON "Contract"("contract_number");

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_cnpj_key" ON "enterprise"("cnpj");
