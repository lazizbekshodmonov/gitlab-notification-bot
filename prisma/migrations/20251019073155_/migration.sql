/*
  Warnings:

  - You are about to drop the column `pipelineId` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - Added the required column `mergeRequestId` to the `GitlabBuildEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."GitlabBuildEvent" DROP CONSTRAINT "GitlabBuildEvent_pipelineId_fkey";

-- AlterTable
ALTER TABLE "GitlabBuildEvent" DROP COLUMN "pipelineId",
ADD COLUMN     "mergeRequestId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GitlabBuildEvent" ADD CONSTRAINT "GitlabBuildEvent_mergeRequestId_fkey" FOREIGN KEY ("mergeRequestId") REFERENCES "GitlabMergeRequestEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
