import { IncomingMessage, ServerResponse } from 'node:http'
import { randomUUID } from 'node:crypto'
import { context } from '../context'

const REQUEST_ID_HEADER = 'x-request-id'

export function addRequestId(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
) {
  let requestId = req.headers[REQUEST_ID_HEADER]

  if (!requestId) {
    requestId = randomUUID()
    req.headers[REQUEST_ID_HEADER] = requestId
  }

  res.setHeader(REQUEST_ID_HEADER, requestId)

  const currentContext = context().getStore()

  if (currentContext) {
    // Append to the current context
    currentContext.requestId = requestId
    next()
    return
  }

  context().run({ requestId }, next)
}
