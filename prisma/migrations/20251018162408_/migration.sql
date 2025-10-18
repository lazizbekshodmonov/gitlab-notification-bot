-- CreateTable
CREATE TABLE "GitlabMergeRequestEvent" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "chatId" TEXT NOT NULL,
    "messageId" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "status" TEXT,
    "mergeStatus" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "sourceBranch" TEXT NOT NULL,
    "targetBranch" TEXT NOT NULL,
    "sourceProjectId" INTEGER NOT NULL,
    "targetProjectId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "lastCommitId" TEXT,
    "lastCommitMessage" TEXT,
    "lastCommitAuthor" TEXT,
    "lastCommitUrl" TEXT,
    "assignees" JSONB,
    "reviewers" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GitlabMergeRequestEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitlabPipelineEvent" (
    "id" SERIAL NOT NULL,
    "pipelineId" INTEGER NOT NULL,
    "iid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "tag" BOOLEAN NOT NULL,
    "sha" TEXT NOT NULL,
    "beforeSha" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "detailedStatus" TEXT NOT NULL,
    "stages" TEXT[],
    "url" TEXT NOT NULL,
    "variables" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "duration" DOUBLE PRECISION,
    "queuedDuration" DOUBLE PRECISION,
    "mergeRequestId" INTEGER NOT NULL,
    "sourcePipeline" JSONB,
    "userId" INTEGER NOT NULL,
    "user" JSONB NOT NULL,
    "commit" JSONB NOT NULL,
    "project" JSONB NOT NULL,
    "createdAtDb" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GitlabPipelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitlabBuildEvent" (
    "id" SERIAL NOT NULL,
    "buildId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "duration" DOUBLE PRECISION,
    "queuedDuration" DOUBLE PRECISION,
    "allowFailure" BOOLEAN NOT NULL,
    "failureReason" TEXT,
    "environment" TEXT,
    "runner" JSONB,
    "commit" JSONB,
    "user" JSONB,
    "project" JSONB,
    "repository" JSONB,
    "pipelineId" INTEGER NOT NULL,
    "sourcePipeline" JSONB,
    "createdAtDb" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GitlabBuildEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GitlabMergeRequestEvent_eventId_key" ON "GitlabMergeRequestEvent"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "GitlabPipelineEvent_pipelineId_key" ON "GitlabPipelineEvent"("pipelineId");

-- CreateIndex
CREATE UNIQUE INDEX "GitlabBuildEvent_buildId_key" ON "GitlabBuildEvent"("buildId");

-- AddForeignKey
ALTER TABLE "GitlabPipelineEvent" ADD CONSTRAINT "GitlabPipelineEvent_mergeRequestId_fkey" FOREIGN KEY ("mergeRequestId") REFERENCES "GitlabMergeRequestEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitlabBuildEvent" ADD CONSTRAINT "GitlabBuildEvent_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES "GitlabPipelineEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
