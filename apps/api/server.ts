import { Server } from 'node:http'
import { AddressInfo } from 'node:net'
import express, { Express } from 'express'
import helmet from 'helmet'
import { router } from 'express-file-routing'
import { logger } from 'libraries/logger'
import {
  AppError,
  errorHandler,
  errorMiddleware,
} from 'libraries/error-handling'
import { addRequestId } from 'libraries/middlewares'

let connection: Server

async function startWebServer(): Promise<AddressInfo> {
  // logger.configureLogger(
  //   {
  //     prettyPrint: Boolean(
  //       configurationProvider.getValue('logger.prettyPrint'),
  //     ),
  //   },
  //   true,
  // )
  const app: Express = express()
  app.use('/', await router())
  defineCommonMiddlewares(app)
  const apiAddress = await openConnection(app)
  return apiAddress
}

async function stopWebServer(): Promise<void> {
  return new Promise<void>((resolve) => {
    if (connection !== undefined) {
      connection.close(() => {
        resolve()
      })
    }
  })
}

async function openConnection(app: express.Application): Promise<AddressInfo> {
  return new Promise((resolve) => {
    const port = process.env.PORT || 3000
    connection = app.listen(port, () => {
      errorHandler.listenToErrorEvents(connection)
      resolve(connection.address() as AddressInfo)
    })
  })
}

function defineCommonMiddlewares(app: express.Application) {
  app.use(addRequestId)
  app.use(helmet())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(errorMiddleware)
}

startWebServer()
  .then(({ address }) => {
    logger.info(`The app has started successfully ${address}`)
  })
  .catch((error) => {
    errorHandler.handleError(
      new AppError('startup-failure', error.message, 500, false, error),
    )
  })
