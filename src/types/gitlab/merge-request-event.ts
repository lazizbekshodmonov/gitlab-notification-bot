import type { ObjectKind } from './index.js';

export interface GitLabMergeRequestEvent {
  object_kind: ObjectKind;
  event_type: string;
  user: {
    id: number;
    name: string;
    username: string;
    avatar_url: string;
    email: string;
  };
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
    ci_config_path: string;
    homepage: string;
    url: string;
    ssh_url: string;
    http_url: string;
  };
  repository: {
    name: string;
    url: string;
    description: string;
    homepage: string;
  };
  object_attributes: {
    id: number;
    iid: number;
    target_branch: string;
    source_branch: string;
    source_project_id: number;
    author_id: number;
    assignee_ids: number[];
    assignee_id: number;
    reviewer_ids: number[];
    title: string;
    created_at: string;
    updated_at: string;
    last_edited_at: string;
    last_edited_by_id: number;
    milestone_id: number | null;
    state_id: number;
    state: string;
    blocking_discussions_resolved: boolean;
    work_in_progress: boolean;
    draft: boolean;
    first_contribution: boolean;
    merge_status: string;
    target_project_id: number;
    description: string;
    prepared_at: string;
    total_time_spent: number;
    time_change: number;
    human_total_time_spent: string;
    human_time_change: string;
    human_time_estimate: string;
    url: string;
    source: {
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
    };
    target: {
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
    };
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
    labels: {
      id: number;
      title: string;
      color: string;
      project_id: number;
      created_at: string;
      updated_at: string;
      template: boolean;
      description: string;
      type: string;
      group_id: number;
    }[];
    action: string;
    detailed_merge_status: string;
  };
  labels: {
    id: number;
    title: string;
    color: string;
    project_id: number;
    created_at: string;
    updated_at: string;
    template: boolean;
    description: string;
    type: string;
    group_id: number;
  }[];
  changes: {
    updated_by_id: {
      previous: string | null;
      current: number;
    };
    draft: {
      previous: boolean;
      current: boolean;
    };
    updated_at: {
      previous: string;
      current: string;
    };
    labels: {
      previous: {
        id: number;
        title: string;
        color: string;
        project_id: number;
        created_at: string;
        updated_at: string;
        template: boolean;
        description: string;
        type: string;
        group_id: number;
      }[];
      current: {
        id: number;
        title: string;
        color: string;
        project_id: number;
        created_at: string;
        updated_at: string;
        template: boolean;
        description: string;
        type: string;
        group_id: number;
      }[];
    };
    last_edited_at: {
      previous: string | null;
      current: string;
    };
    last_edited_by_id: {
      previous: string | null;
      current: number;
    };
  };
  assignees: [
    {
      id: number;
      name: string;
      username: string;
      avatar_url: string;
    },
  ];
  reviewers: [
    {
      id: number;
      name: string;
      username: string;
      avatar_url: string;
    },
  ];
}
