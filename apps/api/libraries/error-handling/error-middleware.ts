import type { Request, Response, NextFunction } from 'express'
import { errorHandler } from './error-handler'

export async function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  // Express requires next function in default error handlers
  next: NextFunction,
) {
  if (error && typeof error === 'object') {
    if (error.isCatastrophic === undefined || error.isCatastrophic === null) {
      error.isCatastrophic = true // Error during a specific request is usually not fatal and should not lead to process exit
    }
  }
  errorHandler.handleError(error)
  res.status(error?.HTTPStatus || 500).json({})
}
