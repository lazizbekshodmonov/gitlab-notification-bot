import type { ObjectKind } from './index.js';

export interface GitlabPipelineEvent {
  object_kind: ObjectKind;
  object_attributes: {
    id: number;
    iid: number;
    name: string;
    ref: string;
    tag: boolean;
    sha: string;
    before_sha: string;
    source: string;
    status: string;
    detailed_status: string;
    stages: string[];
    created_at: string;
    finished_at: string;
    duration: number;
    queued_duration: number;
    variables: {
      key: string;
      value: string;
    }[];
    url: string;
  };
  merge_request: {
    id: number;
    iid: number;
    title: string;
    source_branch: string;
    source_project_id: number;
    target_branch: string;
    target_project_id: number;
    state: string;
    merge_status: string;
    detailed_merge_status: string;
    url: string;
  };
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
    ci_config_path: string | null;
  };
  commit: {
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
  builds: {
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
    user: {
      id: number;
      name: string;
      username: string;
      avatar_url: string;
      email: string;
    };
    runner?: {
      id: number;
      description: string;
      runner_type: string;
      active: boolean;
      is_shared: boolean;
      tags: string[];
    };
    artifacts_file: {
      filename: string | null;
      size: number | null;
    };
    environment: {
      name: string;
      action: string;
      deployment_tier: string;
    };
  }[];
  source_pipeline: {
    project: {
      id: number;
      web_url: string;
      path_with_namespace: string;
    };
    pipeline_id: number;
    job_id: number;
  };
}
