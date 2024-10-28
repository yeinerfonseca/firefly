import { AsyncLocalStorage } from 'node:async_hooks'

let currentContext: AsyncLocalStorage<unknown>

export function context<T = any>(): AsyncLocalStorage<T> {
  currentContext ??= new AsyncLocalStorage<T>()
  return currentContext as AsyncLocalStorage<T>
}
