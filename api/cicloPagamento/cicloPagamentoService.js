const CicloPagamento = require('./cicloPagamento')
const _ = require('lodash')

CicloPagamento.methods(['get', 'post', 'put', 'delete'])
CicloPagamento.updateOptions({new: true, runValidators: true})

//Tratamento de erros após métodos POST e PUT
CicloPagamento.after('post', sendErrosOrNext).after('put', sendErrosOrNext)

function sendErrosOrNext(req, res, next) {
    const bundle = res.locals.bundle

    if(bundle.errors) {
      var errors = parseErrors(bundle.errors)
      res.status(500).json({errors})
    } else {
      next()
    }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

//Retornar quantidade de registros na collection
CicloPagamento.route('count', function(req, res, next){
  CicloPagamento.count(function(error, value){
    if(error) {
      res.status(500).json({errors: [error]})
    }else {
      res.json({value})
    }
  })
})

module.exports = CicloPagamento
