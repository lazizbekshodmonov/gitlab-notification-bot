import type { GitlabPipelineEvent } from '../types/gitlab/pipeline-event.js';
import { InlineKeyboard } from 'grammy';

export class KeyboardGeneratorService {
  generatePipelineButton(status: string, url: string): InlineKeyboard {
    const statusLabel =
      status === 'success'
        ? '✅ Passed'
        : status === 'failed'
          ? '❌ Failed'
          : status === 'running'
            ? '⚙️ Running'
            : '⏳ Pending';

    return new InlineKeyboard().url(statusLabel, url);
  }
}
