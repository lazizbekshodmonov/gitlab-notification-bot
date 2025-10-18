import type { ObjectKind } from './index.js';

export interface GitLabPushEvent {
  object_kind: ObjectKind;
  event_name: string;
  before: string;
  after: string;
  ref: string;
  ref_protected: boolean;
  checkout_sha: string;
  message: string;
  user_id: number;
  user_name: string;
  user_username: string;
  user_email: string;
  user_avatar: string;
  project_id: number;
  project: {
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
  };
  commits: {
    id: string;
    message: string;
    title: string;
    timestamp: string;
    url: string;
    author: {
      name: string;
      email: string;
    };
    added: string[];
    modified: string[];
    removed: [];
  }[];
  total_commits_count: number;
  push_options: {};
  repository: {
    name: string;
    url: string;
    description: string;
    homepage: string;
    git_http_url: string;
    git_ssh_url: string;
    visibility_level: number;
  };
}
