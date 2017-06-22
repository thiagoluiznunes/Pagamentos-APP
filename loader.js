const server = require('./config/server')
require('./config/database')('production')
require('./config/routes')(server)
