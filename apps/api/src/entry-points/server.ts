import { Server } from 'node:http'
import { AddressInfo } from 'node:net'
import express, { Express } from 'express'
import { router } from 'express-file-routing'

let connection: Server

async function startWebServer(): Promise<AddressInfo> {
  const app: Express = express()
  app.use('/', await router())
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
    const port = process.env.PORT || 0
    connection = app.listen(port, () => {
      resolve(connection.address() as AddressInfo)
    })
  })
}

export { startWebServer, stopWebServer }
