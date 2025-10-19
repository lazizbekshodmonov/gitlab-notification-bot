/*
  Warnings:

  - You are about to drop the column `mergeRequesId` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - Added the required column `sha` to the `GitlabBuildEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sha` to the `GitlabMergeRequestEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sha` to the `GitlabPipelineEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GitlabBuildEvent" DROP COLUMN "mergeRequesId",
ADD COLUMN     "sha" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GitlabMergeRequestEvent" ADD COLUMN     "sha" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GitlabPipelineEvent" ADD COLUMN     "sha" TEXT NOT NULL;
