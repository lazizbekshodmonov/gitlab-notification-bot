import type { EventType } from './index.js';

export interface IGitlabNoteEvent {
  object_kind: EventType;
  event_type: EventType;
  user: GitlabUser;
  project_id: number;
  project: GitlabProject;
  repository: GitlabRepository;
  object_attributes: GitlabNoteAttributes;
  issue?: GitlabIssue; // Note faqat issue uchun bo‘lmasligi mumkin (merge_request, commit, snippet ham bo‘lishi mumkin)
}

export interface GitlabUser {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email?: string;
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
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface GitlabRepository {
  name: string;
  url: string;
  description: string;
  homepage: string;
}

export interface GitlabNoteAttributes {
  id: number;
  note: string;
  noteable_type: 'Issue' | 'MergeRequest' | 'Commit' | 'Snippet';
  author_id: number;
  created_at: string;
  updated_at: string;
  project_id: number;
  attachment: string | null;
  line_code: string | null;
  commit_id: string;
  noteable_id: number;
  system: boolean;
  st_diff: any | null;
  action: 'create' | 'update' | 'delete' | 'open' | 'reopen' | 'close';
  url: string;
}

export interface GitlabIssue {
  id: number;
  title: string;
  assignee_ids: number[];
  assignee_id: number | null;
  author_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  position: number;
  branch_name: string | null;
  description: string;
  milestone_id: number | null;
  state: 'opened' | 'closed';
  iid: number;
  labels: GitlabLabel[];
}

export interface GitlabLabel {
  id: number;
  title: string;
  color: string;
  project_id: number | null;
  created_at: string;
  updated_at: string;
  template: boolean;
  description: string | null;
  type: 'GroupLabel' | 'ProjectLabel';
  group_id: number | null;
}
