/*
  Warnings:

  - You are about to drop the column `buildId` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `GitlabBuildEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `GitlabBuildEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."GitlabBuildEvent_buildId_key";

-- AlterTable
ALTER TABLE "GitlabBuildEvent" DROP COLUMN "buildId",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GitlabMergeRequestEvent" ALTER COLUMN "eventId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "GitlabPipelineEvent" ALTER COLUMN "pipelineId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GitlabBuildEvent_eventId_key" ON "GitlabBuildEvent"("eventId");
