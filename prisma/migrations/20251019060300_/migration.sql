/*
  Warnings:

  - You are about to drop the column `pipelineId` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `GitlabPipelineEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `GitlabPipelineEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."GitlabPipelineEvent_pipelineId_key";

-- AlterTable
ALTER TABLE "GitlabPipelineEvent" DROP COLUMN "pipelineId",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GitlabPipelineEvent_eventId_key" ON "GitlabPipelineEvent"("eventId");
