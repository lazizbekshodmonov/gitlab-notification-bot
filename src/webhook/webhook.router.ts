import { Router } from 'express';
import { webhookHandler } from './webhook-handler.js';

const webhookRouter = Router();

webhookRouter.post('/gitlab/webhook/:chatId', webhookHandler);

webhookRouter.post('/gitlab/webhook/:chatId/:threadId', webhookHandler);

export default webhookRouter;
