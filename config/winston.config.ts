import winston, { info } from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "logs/all.log",
        }),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: '[on] MM-DD-YYYY [at] HH:mm'
        }),
        winston.format.printf(info => {
            return `${info.timestamp} :: ${info.level.toUpperCase()} :: ${info.message}`;
        })
    )
})

export default logger;