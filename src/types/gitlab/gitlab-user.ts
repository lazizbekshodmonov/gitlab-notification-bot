export interface IGitlabUser {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email: string;
}

export interface IGitlabCommitAuthor {
  name: string;
  email: string;
}
