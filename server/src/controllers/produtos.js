const Produto = require('../models/produtos');

const getAll = async (_req, res) => {
  const produtos = await Produto.getAll();

  res.status(200).json(produtos);
};

const create = async (req, res) => {
  const produto = await Produto.create(req.body);

  res.status(201).json(produto);
};

const update = async (req, res) => {
  const produto = await Produto.update(req.params.id);

  res.status(200).json(produto);
};

module.exports = {getAll, create, update};