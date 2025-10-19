import type { EventType } from './index.js';
import type { IGitlabUser } from './gitlab-user.js';
import type { IGitlabRunner } from './gitlab-runner.js';
import type { IGitlabCommit, IGitlabProject } from './gitlab-repository.js';

export interface IGitlabPipelineEvent {
  object_kind: EventType;
  object_attributes: IGitlabPipelineAttributes;
  merge_request: any | null;
  user: IGitlabUser;
  project: IGitlabProject;
  commit: IGitlabCommit;
  builds: IGitlabBuild[];
}

export interface IGitlabPipelineAttributes {
  id: number;
  iid: number;
  name: string | null;
  ref: string;
  tag: boolean;
  sha: string;
  before_sha: string;
  source: string;
  status: string;
  detailed_status: string;
  stages: string[];
  created_at: string; // ISO yoki UTC string
  finished_at: string | null;
  duration: number | null;
  queued_duration: number | null;
  protected_ref: boolean;
  variables: Record<string, any>[];
  url: string;
}

export interface IGitlabBuild {
  id: number;
  stage: string;
  name: string;
  status: string;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  duration: number | null;
  queued_duration: number | null;
  failure_reason: string | null;
  when: string;
  manual: boolean;
  allow_failure: boolean;
  user: IGitlabUser;
  runner: IGitlabRunner | null;
  artifacts_file: {
    filename: string | null;
    size: number | null;
  };
  environment: string | null;
}
