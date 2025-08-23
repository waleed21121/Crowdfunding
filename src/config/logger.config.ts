import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const logger = createLogger({
    level: 'http',
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        printf((info) => `${info.timestamp} ${info.level}: ${info.message}.`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'combined.log',
            level: 'http'
        })
    ]
})

export default logger