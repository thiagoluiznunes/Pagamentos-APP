//Responsável pela conexão e mapeamento com o MongoDB
const mongoose = require('mongoose')

module.exports = function (user) {
  const urlDev = 'mongodb://localhost/db_finance'
  const urlProduction = 'mongodb://pagamentosapp:ti1606@ds133932.mlab.com:33932/db_finance'
  const url = (user == 'dev' ? urlDev : urlProduction)

  mongoose.connect(url)
}

mongoose.Error.messages.general.required = "0 atributo '{PATH}' é obrigatório"
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite maior de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é valido para o atributo '{PATH}'."
