const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  const produtos = await db.collection('produtos').find().toArray();
  return produtos;
};

const create = async (data) => {
  const db = await connection();
  const produto = await db.collection('produtos').insertOne({ ...data });
  return { id: produto.insertedId, ...data };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const produto = await db.collection('produtos').findOne({ _id: ObjectId(id) });
  return produto
}

const update = async (id, value) => {
  const db = await connection();
  await db.collection('produtos').updateOne({ _id: ObjectId(id) }, { $inc: { initialValue: value } });
  const produto = await getById(id);
  return produto;
};

module.exports = {
  getAll,
  create,
  getById,
  update
}