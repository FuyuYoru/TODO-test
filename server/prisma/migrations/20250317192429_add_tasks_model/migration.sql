/*
  Warnings:

  - The primary key for the `Invitation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Invitation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `usedById` column on the `Invitation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `managerId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `createdById` on the `Invitation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'InProgress', 'Completed', 'Canceled');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('Low', 'Medium', 'High');

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_usedById_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_managerId_fkey";

-- DropIndex
DROP INDEX "Invitation_code_key";

-- AlterTable
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "createdById",
ADD COLUMN     "createdById" INTEGER NOT NULL,
DROP COLUMN "usedById",
ADD COLUMN     "usedById" INTEGER,
ADD CONSTRAINT "Invitation_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "managerId",
ADD COLUMN     "managerId" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "priority" "TaskPriority" NOT NULL DEFAULT 'Low',
    "status" "TaskStatus" NOT NULL DEFAULT 'New',
    "creatorId" INTEGER NOT NULL,
    "executorId" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_usedById_fkey" FOREIGN KEY ("usedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
