// carregando as variáveis de ambiente
require('dotenv').config();
const express = require('express');
const res = require('express/lib/response');

// Iniciando uma nova aplicação
const app = express()

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'pong!' });
});

