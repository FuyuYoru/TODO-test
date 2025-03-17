/*
  Warnings:

  - You are about to drop the `Tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_executorId_fkey";

-- DropTable
DROP TABLE "Tasks";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "priority" "TaskPriority" NOT NULL DEFAULT 'Low',
    "status" "TaskStatus" NOT NULL DEFAULT 'New',
    "creatorId" INTEGER NOT NULL,
    "executorId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
