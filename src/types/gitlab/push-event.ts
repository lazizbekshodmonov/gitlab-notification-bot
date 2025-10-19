import type { EventType } from './index.js';
import type { IGitlabCommit, IGitlabProject, IGitlabRepository } from './gitlab-repository.js';

export interface IGitlabPushEvent {
  object_kind: EventType;
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
  project: IGitlabProject;
  commits: IGitlabCommit[];
  total_commits_count: number;
  push_options: {};
  repository: IGitlabRepository;
}
