import type { EventType } from './index.js';
import type { IGitlabUser } from './gitlab-user.js';
import type { IGitlabCommit, IGitlabProject, IGitlabRepository } from './gitlab-repository.js';

export interface IGitlabMergeRequestEvent {
  object_kind: EventType;
  event_type: EventType;
  user: IGitlabUser;
  project: IGitlabProject;
  object_attributes: IGitlabMergeRequestAttributes;
  labels: any[];
  changes: IGitlabChanges;
  repository: IGitlabRepository;
  assignees?: IGitlabUser[];
  reviewers?: IGitlabUser[];
}

export interface IGitlabMergeRequestAttributes {
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
  merge_commit_sha: string | null;
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
  labels: any[];
  last_commit: IGitlabCommit;
  reviewer_ids: number[];
  source: IGitlabProject;
  state: string;
  system: boolean;
  target: IGitlabProject;
  time_change: number;
  total_time_spent: number;
  url: string;
  work_in_progress: boolean;
  approval_rules: any[];
  action: string;
}

export interface IGitlabChanges {
  merge_status?: {
    previous: string;
    current: string;
  };
  updated_at?: {
    previous: string;
    current: string;
  };
  prepared_at?: {
    previous: string | null;
    current: string;
  };
}
