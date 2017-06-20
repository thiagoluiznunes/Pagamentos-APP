const express = require('express')
const path = require('path');
const auth = require('./auth')

module.exports = function(server) {

  /*
  * Rotas API abertas
  */
  const openApi = express.Router()
  server.use('/oapi', openApi)
  server.use(express.static(path.join(__dirname, '../public')));

  const AuthService = require('../api/user/authService')
  openApi.post('/login', AuthService.login)
  openApi.post('/signup', AuthService.signup)
  openApi.post('/validateToken', AuthService.validateToken)

  /*
  * Rotas API protegidas
  */
  const protectedApi = express.Router()
  server.use('/api', protectedApi)

  protectedApi.use(auth)

  //rotas da API
  const cicloPagamento = require('../api/cicloPagamento/cicloPagamentoService')
  cicloPagamento.register(protectedApi, '/cicloPagamento')

  const pagamentoSummaryService = require('../api/pagamentoSummary/pagamentoSummaryService')
  protectedApi.route('/pagamentoSummary').get(pagamentoSummaryService.getSummary)

}
