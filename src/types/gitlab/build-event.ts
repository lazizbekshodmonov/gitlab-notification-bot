import type { ObjectKind } from './index.js';

export interface IGitlabBuildEvent {
  object_kind: ObjectKind;
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
  runner: GitlabRunner | null;
  project_id: number;
  project_name: string;
  user: GitlabUser;
  commit: GitlabBuildCommit;
  repository: GitlabRepository;
  project: GitlabProject;
  environment: string | null;
}

export interface GitlabUser {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email: string;
}

export interface GitlabBuildCommit {
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

export interface GitlabRepository {
  name: string;
  url: string;
  description: string | null;
  homepage: string;
  git_http_url: string;
  git_ssh_url: string;
  visibility_level: number;
}

export interface GitlabProject {
  id: number;
  name: string;
  description: string | null;
  web_url: string;
  avatar_url: string | null;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  ci_config_path: string;
}

export interface GitlabRunner {
  id: number;
  description: string;
  runner_type: string;
  active: boolean;
  is_shared: boolean;
  tags: string[];
}
