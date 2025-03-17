/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_code_key" ON "Invitation"("code");
