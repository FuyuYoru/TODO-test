/*
  Warnings:

  - You are about to drop the column `userId` on the `Invitation` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_userId_fkey";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usedById" TEXT;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_usedById_fkey" FOREIGN KEY ("usedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
