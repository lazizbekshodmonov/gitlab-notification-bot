/*
  Warnings:

  - Made the column `url` on table `GitlabBuildEvent` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `messageText` to the `GitlabMergeRequestEvent` table without a default value. This is not possible if the table is not empty.
  - Made the column `messageId` on table `GitlabMergeRequestEvent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `GitlabMergeRequestEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GitlabBuildEvent" ALTER COLUMN "url" SET NOT NULL;

-- AlterTable
ALTER TABLE "GitlabMergeRequestEvent" ADD COLUMN     "messageText" TEXT NOT NULL,
ALTER COLUMN "messageId" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;
