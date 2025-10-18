-- AlterTable
ALTER TABLE "GitlabMergeRequestEvent" ALTER COLUMN "chatId" DROP NOT NULL,
ALTER COLUMN "messageId" DROP NOT NULL;
