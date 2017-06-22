const server = require('./config/server')
require('./config/database')('dev')
require('./config/routes')(server)
