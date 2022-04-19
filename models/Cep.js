// importada a conexao com o bando de dados

const res = require('express/lib/response');
const connection = require('./connection');

//Regex para validacao do CEP
const CEP_REGEX = /\d{5}-\d{3}/;

// Para formatar o CEP
function formatCep(cep) {
  // Caso esteja formatado, retornar ele mesmo
  if (CEP_REGEX.test(cep)) {
    return cep;
  }

  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
};

// Formatação dos campos para exibição
function getNewCep({ cep, logradouro, bairro, localidade, uf }) {
  cep: formatCep(cep),
  logradouro,
  bairro,
  localidade,
  uf;
}

// Função para pesquisar pelo CEP
async function findAddressByCep(cepToSearch) {
  const treatedCep = cepToSearch.replace('-', '');
  const query = 'SELECT cep, logradouro, bairro, localidade, uf FROM ceps WHERE cep = ?';

  // A quey será executada, caso o primeiro resultado exista elea irá selciona-lo
  // caso contrário, ela retornará 'null'
  const result = await res.connection.execute(query, [treatedCep])
    .then(([results]) => (results.length ? results[0] : null));
  
  // se nao seja encontrado nenhum resultado, será retornado null
  if (!result) return null;

  // 
  return getNewCep(result);
};

module.exports = {
  findAddressByCep,
};
