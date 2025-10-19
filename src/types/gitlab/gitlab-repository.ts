import type { IGitlabCommitAuthor } from './gitlab-user.js';

export interface IGitlabRepository {
  name: string;
  url: string;
  description: string | null;
  homepage: string;
}

export interface IGitlabProject {
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
  homepage?: string;
  url?: string;
  ssh_url?: string;
  http_url?: string;
}

export interface IGitlabCommit {
  id: string;
  message: string;
  title: string;
  timestamp: string;
  url: string;
  author: IGitlabCommitAuthor;
}
