abstract class LoggerBase {
  next: any

  setNext(next: LoggerBase) {
    this.next = next
    return next
  }

  abstract call(message :string, loggerType :number)

  info = 0
  error = 1
}

class Logger extends LoggerBase {

  call(message:string, loggerType :number) {
    if (loggerType===this.info) {
      console.log('Logger:', message)
    }
    
    if (this.next) {
      this.next.call(...arguments)
    }
  }
}

class FileLogger extends LoggerBase {
  call(message:string, loggerType :number) {
    if (loggerType===this.error) {
      console.log('FileLogger:', message)
      if (this.next) this.next.call(...arguments)
    }
    
  }
}

class ErrorHandler {
  next: any

  setNext(next) {
    this.next = next
    return next
  }

  call(...args) {
    try {
      if (this.next) {
        this.next.call(...arguments)
      }
    } catch(e) {
      console.log(e)
    }
  }
}

class SlackNotifer {
  next: any

  setNext(next) {
    this.next = next
    return next
  }

  call(...args) {
    console.log('Slack:', args[0])
    
    if (this.next) {
      this.next.call(...arguments)
    }
  }
}

const logger = new Logger()
const fileLogger = new FileLogger()

logger.setNext(fileLogger)
logger.call('コンソールに出力されるログです', 0)
logger.call('重大なエラー発生しました', 1)

const root = new ErrorHandler()
const slackNotifer = new SlackNotifer()

root.setNext(logger).setNext(fileLogger).setNext(slackNotifer)

root.call('コンソールに出力されるログです', 0)
root.call('重大なエラー発生しました', 1)