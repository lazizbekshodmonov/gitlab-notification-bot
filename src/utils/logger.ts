import type { ReadStream } from 'fs';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import dayjs from 'dayjs';

export function getLogFileStream(dateStr?: string): {
  stream: ReadStream | NodeJS.ReadableStream;
  filename: string;
} {
  const date = dateStr ? dayjs(dateStr, 'YYYY-MM-DD') : dayjs();
  const logDir = path.resolve('logsCommand');
  const logName = `bot-${date.format('YYYY-MM-DD')}.log`;
  const logPath = path.join(logDir, logName);
  const gzPath = logPath + '.gz';

  if (fs.existsSync(logPath)) {
    // Oddiy log fayl
    return {
      stream: fs.createReadStream(logPath) as ReadStream,
      filename: logName,
    };
  } else if (fs.existsSync(gzPath)) {
    // Gzip ochib uzatamiz
    const stream = fs.createReadStream(gzPath).pipe(zlib.createGunzip());
    return {
      stream: stream as NodeJS.ReadableStream,
      filename: logName,
    };
  } else {
    throw new Error(`Log file for ${date.format('YYYY-MM-DD')} not found`);
  }
}
