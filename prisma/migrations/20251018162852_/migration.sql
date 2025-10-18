/*
  Warnings:

  - Added the required column `iid` to the `GitlabMergeRequestEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GitlabMergeRequestEvent" ADD COLUMN     "iid" INTEGER NOT NULL;
