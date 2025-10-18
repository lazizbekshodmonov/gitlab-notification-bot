-- AlterTable
ALTER TABLE "GitlabMergeRequestEvent" ADD COLUMN     "project" JSONB,
ADD COLUMN     "repository" JSONB;
