import type { ObjectKind } from './index.js';

export interface GitlabPipelineEvent {
  object_kind: ObjectKind;
  object_attributes: GitlabPipelineAttributes;
  merge_request: any | null;
  user: GitlabUser;
  project: GitlabProject;
  commit: GitlabCommit;
  builds: GitlabBuild[];
}

export interface GitlabPipelineAttributes {
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

export interface GitlabUser {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email: string;
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

export interface GitlabCommit {
  id: string;
  message: string;
  title: string;
  timestamp: string;
  url: string;
  author: GitlabCommitAuthor;
}

export interface GitlabCommitAuthor {
  name: string;
  email: string;
}

export interface GitlabBuild {
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
  user: GitlabUser;
  runner: GitlabRunner | null;
  artifacts_file: {
    filename: string | null;
    size: number | null;
  };
  environment: string | null;
}

export interface GitlabRunner {
  id: number;
  description: string;
  runner_type: string;
  active: boolean;
  is_shared: boolean;
  tags: string[];
}
