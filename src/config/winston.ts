import winston from 'winston';
import dayjs from 'dayjs';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      const formattedTime = dayjs(timestamp as string).format('DD.MM.YYYY, HH:mm:ss');
      return `[${formattedTime}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/all.log',
      maxsize: 50 * 1024 * 1024,
      tailable: true,
    }),
  ],
});
