import type { EventType } from './index.js';

export interface IGitlabReleaseEvent {
  object_kind: EventType;
  id: number;
  created_at: string;
  description: string;
  name: string;
  released_at: string;
  tag: string;
  project: GitlabProject;
  url: string;
  action: 'create' | 'update' | 'delete';
  assets: GitlabReleaseAssets;
  commit: GitlabCommit;
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
  ci_config_path: string | null;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface GitlabReleaseAssets {
  count: number;
  links: GitlabAssetLink[];
  sources: GitlabAssetSource[];
}

export interface GitlabAssetLink {
  id: number;
  link_type: string;
  name: string;
  url: string;
}

export interface GitlabAssetSource {
  format: string;
  url: string;
}

export interface GitlabCommit {
  id: string;
  message: string;
  title: string;
  timestamp: string;
  url: string;
  author: {
    name: string;
    email: string;
  };
}
