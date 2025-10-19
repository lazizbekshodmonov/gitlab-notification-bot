import type { GitLabMergeRequestEvent } from '../types/gitlab/merge-request-event.js';
import type { GitlabPipelineEvent } from '../types/gitlab/pipeline-event.js';
import type { IGitlabBuildEvent } from '../types/gitlab/build-event.js';
import prisma from '../config/prisma.js';

export class GitlabEventService {
  /** Merge Request Event */
  async handleMergeRequest(
    event: GitLabMergeRequestEvent,
    chatId: string,
    messageId: number,
    messageText: string
  ) {
    return prisma.gitlabMergeRequestEvent.upsert({
      where: { eventId: event.object_attributes.id },
      update: {
        messageText,
        state: event.object_attributes.state,
        status: event.object_attributes.merge_status,
      },
      create: {
        chatId,
        messageId,
        messageText,
        sha: event.object_attributes.merge_commit_sha,
        eventId: event.object_attributes.id,
        url: event.object_attributes.url,
        state: event.object_attributes.state,
        status: event.object_attributes.merge_status,
      },
    });
  }

  /** Pipeline Event */
  async handlePipeline(event: GitlabPipelineEvent) {
    const mergeRequest = await prisma.gitlabMergeRequestEvent.findFirst({
      where: { sha: event.object_attributes.sha },
    });

    if (!mergeRequest) throw new Error('Merge request not found');

    const pipeline = await prisma.gitlabPipelineEvent.upsert({
      where: { eventId: event.object_attributes.id },
      update: {
        status: event.object_attributes.status,
        stages: event.object_attributes.stages,
      },
      create: {
        eventId: event.object_attributes.id,
        sha: event.object_attributes.sha,
        status: event.object_attributes.status,
        stages: event.object_attributes.stages,
        url: event.object_attributes.url,
        mergeRequest: {
          connect: {
            id: mergeRequest.id,
          },
        },
      },
    });

    for (const item of event.builds) {
      await prisma.gitlabBuildEvent.upsert({
        where: { eventId: String(item.id) },
        update: {
          name: item.name,
          status: item.status,
          stage: item.stage,
        },
        create: {
          eventId: String(item.id),
          sha: event.object_attributes.sha,
          mergeRequestId: mergeRequest.id,
          name: item.name,
          status: item.status,
          stage: item.stage,
        },
      });
    }
    return {
      merge: mergeRequest,
      pipeline: pipeline,
    };
  }

  /** Build Event */
  async handleBuild(event: IGitlabBuildEvent) {
    const pipeline = await prisma.gitlabPipelineEvent.findFirst({
      where: { sha: event.sha },
    });
    //

    const mergeRequest = await prisma.gitlabMergeRequestEvent.findFirst({
      where: { sha: event.sha },
    });

    if (!mergeRequest) throw new Error(`Merge request not found: ${event.sha}`);

    const build = await prisma.gitlabBuildEvent.upsert({
      where: { eventId: String(event.build_id) },
      update: {
        stage: event.build_stage,
        status: event.build_status,
        name: event.build_name,
        url: event?.runner ? `${event.project.web_url}/-/jobs/${event.runner.id}` : null,
      },
      create: {
        eventId: String(event.build_id),
        stage: event.build_stage,
        status: event.build_status,
        sha: event.sha,
        name: event.build_name,
        mergeRequestId: mergeRequest.id,
        url: event?.runner ? `${event.project.web_url}/-/jobs/${event.runner.id}` : null,
      },
    });
    return {
      merge: mergeRequest,
      pipeline: pipeline,
      build,
    };
  }
}
