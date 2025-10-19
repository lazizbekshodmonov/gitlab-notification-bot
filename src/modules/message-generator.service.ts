import type { GitLabPushEvent } from '../types/gitlab/push-event.js';
import type { GitLabMergeRequestEvent } from '../types/gitlab/merge-request-event.js';

export class MessageGeneratorService {
  pushEventMessage(event: GitLabPushEvent) {
    const branch = event.ref.replace('refs/heads/', '');
    const commits = event.commits
      .map(
        (commit) => `        • ${commit.author.name}: <a href="${commit.url}">${commit.title}</a>`
      )
      .join('\n');
    return `
<b>🚀 Pushed to <a href="${event.project.web_url}">${event.project.name}</a></b>

📦 <b>Project:</b> <a href="${event.project.url}">${event.project.name}</a>
👤 <b>User:</b> ${event.user_name}
🌿 <b>Branch:</b> ${branch}
💬 <b>Commits:</b>
${commits}
`;
  }

  mergeRequestMessage(event: GitLabMergeRequestEvent): string {
    const { user, object_attributes, project } = event;

    const actionEmoji =
      {
        open: '🟢 Opened',
        close: '🔴 Closed',
        merge: '🟣 Merged',
        reopen: '🟡 Reopened',
        update: '🔵 Updated',
      }[object_attributes.action] || 'ℹ️ Updated';

    const author = user?.name || 'Unknown';
    // const assigneeList =
    //   assignees && assignees.length > 0 ? assignees.map((a) => a.name).join(', ') : 'No assignee';
    // const reviewerList =
    //   reviewers && reviewers.length > 0 ? reviewers.map((r) => r.name).join(', ') : 'No reviewer';

    const sourceBranch = object_attributes.source_branch;
    const targetBranch = object_attributes.target_branch;
    const title = object_attributes.title || 'No title';
    const url = object_attributes.url;

    const projectName = project?.name || 'Unknown Project';

    return `
🚀 <b>${actionEmoji} Merge Request</b>\n

👤 <b>Author:</b> ${author}
📦 <b>Project:</b> <a href="${event.project.url}">${projectName}</a>
📄 <b>Title:</b> ${title}
🔀 <b>Branches:</b> <a href="${url}">${sourceBranch} → ${targetBranch}</a> 
  `.trim();
  }
  // 👥 <b>Assignees:</b> ${assigneeList}
  // 🧑‍💻 <b>Reviewers:</b> ${reviewerList}

  generateCICDJobsMessage(builds: { name: string; status: string; url?: string | null }[]): string {
    return (
      '\n\n<b>⚙️ CI/CD Jobs:</b>\n' +
      builds.map((item) => `       • ${item.name}: ${this.statusEmoji(item.status)}`).join('\n')
    );
  }

  /** -------------------- Helper -------------------- */
  private statusEmoji(status: string) {
    switch (status) {
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      case 'running':
        return '⏳';
      case 'canceled':
        return '🚫';
      default:
        return '⚪';
    }
  }
}
