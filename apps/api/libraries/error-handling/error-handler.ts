import { Server } from 'node:http'
import { AppError } from './app-error'
import { logger } from '../logger'

let httpServerRef: Server

export const errorHandler = {
  // Listen to the global process-level error events
  listenToErrorEvents: (httpServer: Server) => {
    httpServerRef = httpServer

    process.on('uncaughtException', async (error) => {
      await errorHandler.handleError(error)
    })

    process.on('unhandledRejection', async (reason) => {
      await errorHandler.handleError(reason)
    })

    process.on('SIGTERM', async () => {
      logger.error(
        'App received SIGTERM event, try to gracefully close the server',
      )
      await terminateHttpServerAndExit()
    })

    process.on('SIGINT', async () => {
      logger.error(
        'App received SIGINT event, try to gracefully close the server',
      )
      await terminateHttpServerAndExit()
    })
  },

  handleError: (errorToHandle: unknown): number => {
    try {
      logger.info('Handling error')
      const appError: AppError = convertUnknownToAppError(errorToHandle)
      logger.error(appError.message, appError)
      if (appError.isCatastrophic) {
        terminateHttpServerAndExit()
      }
      return appError.httpStatus
    } catch (handlingError: unknown) {
      // Not using the logger here because it might have failed
      process.stdout.write(
        'The error handler failed, here are the handler failure and then the origin error that it tried to handle',
      )
      process.stdout.write(JSON.stringify(handlingError))
      process.stdout.write(JSON.stringify(errorToHandle))
      return 500
    }
  },
}

const terminateHttpServerAndExit = async () => {
  // TODO: implement more complex logic here (like using 'http-terminator' library)
  if (httpServerRef) {
    await httpServerRef.close()
  }
  process.exit()
}

// Responsible to get all sort of crazy error objects including none error objects and
// return the best standard AppError object
export function convertUnknownToAppError(errorToHandle: unknown): AppError {
  if (errorToHandle instanceof AppError) {
    // This means the error was thrown by our code and contains all the necessary information
    return errorToHandle
  }
  const errorToEnrich: object = getObjectIfNotAlreadyObject(errorToHandle)
  const message = getOneOfTheseProperties(
    errorToEnrich,
    ['message', 'reason', 'description'],
    'Unknown error',
  )
  const name = getOneOfTheseProperties(
    errorToEnrich,
    ['name', 'code'],
    'unknown-error',
  )
  const httpStatus = getOneOfTheseProperties(
    errorToEnrich,
    ['httpStatus', 'statusCode', 'status'],
    500,
  )
  const isCatastrophic = getOneOfTheseProperties<boolean>(
    errorToEnrich,
    ['isCatastrophic', 'catastrophic'],
    true,
  )

  const stackTrace = getOneOfTheseProperties<string | undefined>(
    errorToEnrich,
    ['stack'],
    undefined,
  )
  const standardError = new AppError(name, message, httpStatus, isCatastrophic)
  standardError.stack = stackTrace
  const standardErrorWithOriginProperties = Object.assign(
    standardError,
    errorToEnrich,
  )

  return standardErrorWithOriginProperties
}

const getOneOfTheseProperties = <ReturnType>(
  object: object,
  possibleExistingProperties: string[],
  defaultValue: ReturnType,
): ReturnType => {
  for (const property of possibleExistingProperties) {
    if (property in object) {
      return object[property]
    }
  }
  return defaultValue
}

function getObjectIfNotAlreadyObject(target: unknown): object {
  if (typeof target === 'object' && target !== null) {
    return target
  }

  return {}
}
