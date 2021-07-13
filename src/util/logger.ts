import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.json(),
  // defaultMeta: { service: 'sm-server' }
})

if (process.env.NODE_ENV !== 'production'){
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

export default logger
