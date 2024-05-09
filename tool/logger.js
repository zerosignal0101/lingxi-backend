const winston = require('winston');
require('winston-daily-rotate-file');

// 设置通用日志格式
const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level.toUpperCase()} ${message}`;
});

// 配置普通日志
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            dirname: 'log',
            filename: 'application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d', // Keep logs for 7 days
            handleExceptions: true
        })
    ]
});

// 配置错误日志
const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            dirname: 'log',
            filename: 'error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d', // Keep logs for 7 days
            handleExceptions: true
        })
    ]
});

module.exports = { logger, errorLogger };