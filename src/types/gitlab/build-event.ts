import type { EventType } from './index.js';
import type { IGitlabUser } from './gitlab-user.js';
import type { IGitlabRunner } from './gitlab-runner.js';
import type { IGitlabProject, IGitlabRepository } from './gitlab-repository.js';

export interface IGitlabBuildEvent {
  object_kind: EventType;
  ref: string;
  tag: boolean;
  before_sha: string;
  sha: string;
  retries_count: number;
  build_id: number;
  build_name: string;
  build_stage: string;
  build_status: string;
  build_created_at: string;
  build_started_at: string | null;
  build_finished_at: string | null;
  build_created_at_iso: string;
  build_started_at_iso: string | null;
  build_finished_at_iso: string | null;
  build_duration: number | null;
  build_queued_duration: number | null;
  build_allow_failure: boolean;
  build_failure_reason: string | null;
  pipeline_id: number;
  runner: IGitlabRunner | null;
  project_id: number;
  project_name: string;
  user: IGitlabUser;
  commit: IGitlabBuildCommit;
  repository: IGitlabRepository;
  project: IGitlabProject;
  environment: string | null;
}

export interface IGitlabBuildCommit {
  id: number;
  name: string | null;
  sha: string;
  message: string;
  author_name: string;
  author_email: string;
  author_url: string;
  status: string;
  duration: number | null;
  started_at: string | null;
  finished_at: string | null;
  started_at_iso: string | null;
  finished_at_iso: string | null;
}
