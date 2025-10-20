-- CreateTable
CREATE TABLE "EventMessageMap" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "threadId" TEXT,
    "messageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventMessageMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventMessageMap_eventId_key" ON "EventMessageMap"("eventId");
