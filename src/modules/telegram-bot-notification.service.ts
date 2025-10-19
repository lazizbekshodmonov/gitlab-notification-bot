import bot from '../bot/index.js';
import prisma from '../config/prisma.js';
import type { GitLabPushEvent } from '../types/gitlab/push-event.js';
import type { GitLabMergeRequestEvent } from '../types/gitlab/merge-request-event.js';
import type { GitlabPipelineEvent } from '../types/gitlab/pipeline-event.js';
import { GitlabEventService } from './gitlab-event.service.js';
import { MessageGeneratorService } from './message-generator.service.js';
import { KeyboardGeneratorService } from './keyboard-generator.service.js';
import type { IGitlabBuildEvent } from '../types/gitlab/build-event.js';
import type { GitlabBuildEvent } from '@prisma/client';
import getEnvVariable from '../config/env.js';

const threadId = getEnvVariable('TELEGRAM_THREAD_ID');

export class GrammyTelegramService {
  private readonly gitlabEventService = new GitlabEventService();
  private readonly messageGeneratorService = new MessageGeneratorService();
  private readonly keyboardGeneratorService = new KeyboardGeneratorService();

  /** -------------------- Push Event -------------------- */
  async handlePushEvent(event: GitLabPushEvent, chatId: string) {
    const message = this.messageGeneratorService.pushEventMessage(event);
    await bot.api.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      message_thread_id: Number(threadId),
    });
  }

  /** -------------------- Merge Request Event -------------------- */
  async handleMergeEvent(event: GitLabMergeRequestEvent, chatId: string) {
    const merge = await prisma.gitlabMergeRequestEvent.findFirst({
      where: {
        sha: event.object_attributes.merge_commit_sha,
      },
    });

    const text = this.messageGeneratorService.mergeRequestMessage(event);

    if (merge) {
      await bot.api.editMessageText(merge.chatId, merge.messageId, text, {
        parse_mode: 'HTML',
      });
      await this.gitlabEventService.handleMergeRequest(event, chatId, merge.messageId, text);
    } else {
      const msg = await bot.api.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        message_thread_id: Number(threadId),
      });
      await this.gitlabEventService.handleMergeRequest(event, chatId, msg.message_id, text);
    }
  }

  /** -------------------- Pipeline Event -------------------- */
  async handlePipelineEvent(event: GitlabPipelineEvent) {
    const { merge } = await this.gitlabEventService.handlePipeline(event);
    const text =
      merge.messageText +
      this.messageGeneratorService.generateCICDJobsMessage(
        event.builds.map((item) => ({
          name: item.name,
          status: item.status,
        }))
      );

    await bot.api.editMessageText(merge.chatId, merge.messageId, text, {
      parse_mode: 'HTML',
      reply_markup: this.keyboardGeneratorService.generatePipelineButton(
        event.object_attributes.status,
        event.object_attributes.url
      ),
    });
  }

  /** -------------------- Build/Job Event -------------------- */
  async handleBuildEvent(event: IGitlabBuildEvent) {
    const buildResponse = await this.gitlabEventService.handleBuild(event);

    const merge = buildResponse?.merge;
    const pipeline = buildResponse?.pipeline;
    const build = buildResponse?.build;

    if (!merge || !pipeline || !build) return;

    const builds = await prisma.gitlabBuildEvent.findMany({
      where: {
        sha: pipeline.sha,
      },
    });
    const messageText = merge.messageText;

    const text =
      messageText +
      this.messageGeneratorService.generateCICDJobsMessage(
        builds.map((item: GitlabBuildEvent) => {
          return { name: item.name, status: item.status, url: item.url };
        })
      );

    await bot.api.editMessageText(merge.chatId, merge.messageId, text, {
      parse_mode: 'HTML',
      reply_markup: this.keyboardGeneratorService.generatePipelineButton(
        pipeline.status,
        pipeline.url
      ),
    });
  }
}
