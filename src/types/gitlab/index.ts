import type { GitLabPushEvent } from './push-event.js';
import type { GitLabMergeRequestEvent } from './merge-request-event.js';
import type { GitlabPipelineEvent } from './pipeline-event.js';
import type { IGitlabBuildEvent } from './build-event.js';

export type GitlabEvent = GitLabPushEvent &
  GitLabMergeRequestEvent &
  GitlabPipelineEvent &
  IGitlabBuildEvent;

export type ObjectKind = 'push' | 'merge_request' | 'pipeline' | 'build';
