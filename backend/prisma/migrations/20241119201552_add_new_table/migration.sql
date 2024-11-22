/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "enterprise" (
    "id" TEXT NOT NULL,
    "cnpj" DOUBLE PRECISION NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "fantasy_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "enterprise_pkey" PRIMARY KEY ("id")
);
