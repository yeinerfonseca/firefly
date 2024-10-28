import { startWebServer } from '@api/entry-points/server'
import { logger } from '@api/libraries/logger'

startWebServer()
  .then((response) => {
    logger.info(`The app has started succesfully ${response}`)
  })
  .catch((error) => {
    // errorhandler
  })
