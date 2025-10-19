import type { EventType } from './index.js';

export interface IGitlabDeploymentEvent {
  object_kind: EventType;
  status: 'created' | 'running' | 'success' | 'failed' | 'canceled';
  status_changed_at: string;
  deployment_id: number;
  deployable_id: number;
  deployable_url: string;
  environment: string;
  environment_tier: 'production' | 'staging' | 'testing' | 'development' | string;
  environment_slug: string;
  environment_external_url: string;
  project: GitlabProject;
  short_sha: string;
  user: GitlabUser;
  user_url: string;
  commit_url: string;
  commit_title: string;
}

export interface GitlabProject {
  id: number;
  name: string;
  description: string;
  web_url: string;
  avatar_url: string | null;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  ci_config_path: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface GitlabUser {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email?: string;
}
