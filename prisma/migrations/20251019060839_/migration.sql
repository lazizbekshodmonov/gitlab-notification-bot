/*
  Warnings:

  - Added the required column `mergeRequesId` to the `GitlabBuildEvent` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `eventId` on the `GitlabBuildEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GitlabBuildEvent" ADD COLUMN     "mergeRequesId" TEXT NOT NULL,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GitlabBuildEvent_eventId_key" ON "GitlabBuildEvent"("eventId");
