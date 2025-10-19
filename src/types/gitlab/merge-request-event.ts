import type { ObjectKind } from './index.js';

export interface GitLabMergeRequestEvent {
  object_kind: ObjectKind;
  event_type: 'merge_request';
  user: {
    id: number;
    name: string;
    username: string;
    avatar_url: string;
    email: string;
  };
  project: GitLabProject;
  object_attributes: {
    assignee_id: number | null;
    author_id: number;
    created_at: string;
    description: string;
    draft: boolean;
    head_pipeline_id: number | null;
    id: number;
    iid: number;
    last_edited_at: string | null;
    last_edited_by_id: number | null;
    merge_commit_sha: string;
    merge_error: string | null;
    merge_params: {
      force_remove_source_branch: string;
    };
    merge_status: string;
    merge_user_id: number | null;
    merge_when_pipeline_succeeds: boolean;
    milestone_id: number | null;
    source_branch: string;
    source_project_id: number;
    state_id: number;
    target_branch: string;
    target_project_id: number;
    time_estimate: number;
    title: string;
    updated_at: string;
    updated_by_id: number | null;
    prepared_at: string;
    assignee_ids: number[];
    blocking_discussions_resolved: boolean;
    detailed_merge_status: string;
    first_contribution: boolean;
    human_time_change: string | null;
    human_time_estimate: string | null;
    human_total_time_spent: string | null;
    labels: string[];
    last_commit: {
      id: string;
      message: string;
      title: string;
      timestamp: string;
      url: string;
      author: {
        name: string;
        email: string;
      };
    };
    reviewer_ids: number[];
    source: GitLabProject;
    state: string;
    system: boolean;
    target: GitLabProject;
    time_change: number;
    total_time_spent: number;
    url: string;
    work_in_progress: boolean;
    approval_rules: any[];
    action: string;
  };
  labels: string[];
  changes: {
    merge_commit_sha?: {
      previous: string | null;
      current: string | null;
    };
    state_id?: {
      previous: number;
      current: number;
    };
    updated_at?: {
      previous: string;
      current: string;
    };
    [key: string]: any;
  };
  repository: {
    name: string;
    url: string;
    description: string | null;
    homepage: string;
  };
}

export interface GitLabProject {
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
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}
