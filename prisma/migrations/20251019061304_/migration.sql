/*
  Warnings:

  - Changed the type of `eventId` on the `GitlabMergeRequestEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `GitlabPipelineEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GitlabMergeRequestEvent" DROP COLUMN "eventId",
ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GitlabPipelineEvent" DROP COLUMN "eventId",
ADD COLUMN     "eventId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GitlabMergeRequestEvent_eventId_key" ON "GitlabMergeRequestEvent"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "GitlabPipelineEvent_eventId_key" ON "GitlabPipelineEvent"("eventId");
