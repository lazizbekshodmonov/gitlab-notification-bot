import type { IGitlabPushEvent } from './push-event.js';
import type { IGitLabMergeRequestEvent } from './merge-request-event.js';
import type { IGitlabPipelineEvent } from './pipeline-event.js';
import type { IGitlabBuildEvent } from './build-event.js';
import type { IGitlabNoteEvent } from './note-event.js';
import type { IGitlabDeploymentEvent } from './deployment-event.js';
import type { IGitlabReleaseEvent } from './release-event.js';

export type GitlabEvent = IGitlabPushEvent &
  IGitLabMergeRequestEvent &
  IGitlabPipelineEvent &
  IGitlabBuildEvent &
  IGitlabNoteEvent &
  IGitlabDeploymentEvent &
  IGitlabReleaseEvent;

export type EventType =
  | 'push'
  | 'merge_request'
  | 'pipeline'
  | 'build'
  | 'note'
  | 'deployment'
  | 'release';
