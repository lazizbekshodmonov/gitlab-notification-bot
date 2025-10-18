/*
  Warnings:

  - You are about to drop the column `createdAtDb` on the `GitlabPipelineEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GitlabPipelineEvent" DROP COLUMN "createdAtDb",
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
