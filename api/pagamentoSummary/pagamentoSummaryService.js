const _ = require('lodash')
const CicloPagamento = require('../cicloPagamento/cicloPagamento')

//Mais uma função MIDDLEWARE
function getSummary(req, res){
  CicloPagamento.aggregate({
    $project: {
      credito: {$sum: "$creditos.valor"},
      debito: {$sum: "$debitos.valor"}}
  }, {
    $group: {
      _id: null,
      credito: {$sum: "$credito"},
      debito: {$sum: "$debito"}}
  }, {
    $project: {
      _id: 0,
      credito: 1,
      debito: 1
    }
  }, function(error, result){
    if(error){
      res.status(500).json({errors: [error]})
    } else {
      res.json(_.defaults(result[0], {credito: 0, debito: 0}))
    }
  })
}

module.exports = { getSummary }
