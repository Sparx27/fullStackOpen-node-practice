const { PORT } = require('./utils/config.js')
const app = require('./app.js')
const { logInfo } = require('./utils/logger.js')

app.listen(PORT, () => {
  logInfo(`Server running at port ${PORT}`)
})