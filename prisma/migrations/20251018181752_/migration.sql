/*
  Warnings:

  - You are about to drop the column `allowFailure` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `commit` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `createdAtDb` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `environment` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `failureReason` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `finishedAt` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `project` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `queuedDuration` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `repository` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `runner` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `sourcePipeline` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `GitlabBuildEvent` table. All the data in the column will be lost.
  - You are about to drop the column `assignees` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `detailedMergeStatus` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `iid` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `lastCommitAuthor` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `lastCommitId` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `lastCommitMessage` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `lastCommitUrl` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `mergeStatus` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `project` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `repository` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `reviewers` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `sourceBranch` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `sourceProjectId` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `targetBranch` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `targetProjectId` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `GitlabMergeRequestEvent` table. All the data in the column will be lost.
  - You are about to drop the column `beforeSha` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `commit` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `detailedStatus` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `finishedAt` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `iid` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `project` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `queuedDuration` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `ref` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `sha` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `sourcePipeline` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - You are about to drop the column `variables` on the `GitlabPipelineEvent` table. All the data in the column will be lost.
  - Made the column `chatId` on table `GitlabMergeRequestEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GitlabBuildEvent" DROP COLUMN "allowFailure",
DROP COLUMN "commit",
DROP COLUMN "createdAtDb",
DROP COLUMN "duration",
DROP COLUMN "environment",
DROP COLUMN "failureReason",
DROP COLUMN "finishedAt",
DROP COLUMN "name",
DROP COLUMN "project",
DROP COLUMN "queuedDuration",
DROP COLUMN "repository",
DROP COLUMN "runner",
DROP COLUMN "sourcePipeline",
DROP COLUMN "startedAt",
DROP COLUMN "user",
ADD COLUMN     "url" TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "GitlabMergeRequestEvent" DROP COLUMN "assignees",
DROP COLUMN "author",
DROP COLUMN "description",
DROP COLUMN "detailedMergeStatus",
DROP COLUMN "iid",
DROP COLUMN "lastCommitAuthor",
DROP COLUMN "lastCommitId",
DROP COLUMN "lastCommitMessage",
DROP COLUMN "lastCommitUrl",
DROP COLUMN "mergeStatus",
DROP COLUMN "project",
DROP COLUMN "repository",
DROP COLUMN "reviewers",
DROP COLUMN "sourceBranch",
DROP COLUMN "sourceProjectId",
DROP COLUMN "targetBranch",
DROP COLUMN "targetProjectId",
DROP COLUMN "title",
ALTER COLUMN "chatId" SET NOT NULL;

-- AlterTable
ALTER TABLE "GitlabPipelineEvent" DROP COLUMN "beforeSha",
DROP COLUMN "commit",
DROP COLUMN "detailedStatus",
DROP COLUMN "duration",
DROP COLUMN "finishedAt",
DROP COLUMN "iid",
DROP COLUMN "name",
DROP COLUMN "project",
DROP COLUMN "queuedDuration",
DROP COLUMN "ref",
DROP COLUMN "sha",
DROP COLUMN "source",
DROP COLUMN "sourcePipeline",
DROP COLUMN "tag",
DROP COLUMN "user",
DROP COLUMN "userId",
DROP COLUMN "variables";
