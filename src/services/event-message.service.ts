import prisma from '../config/prisma.js';

export class EventMessageService {
  async saveEventMessage(
    eventId: string,
    eventType: string,
    chatId: string,
    messageId: string,
    threadId?: string,
    eventSha?: string
  ) {
    return prisma.eventMessageMap.upsert({
      where: { eventId },
      update: { chatId, messageId, threadId: String(threadId) },
      create: {
        eventId,
        eventSha: eventSha ?? eventId,
        chatId,
        messageId,
        threadId: String(threadId),
        eventType,
      },
    });
  }

  getMessageByEvent(eventId: string) {
    return prisma.eventMessageMap.findFirst({
      where: { eventId },
    });
  }

  async cleanupOldRecords(days = 30) {
    await prisma.eventMessageMap.deleteMany({
      where: {
        createdAt: {
          lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
        },
      },
    });
  }
}

export default new EventMessageService();
