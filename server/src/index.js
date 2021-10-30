const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const Produto = require('./controllers/produtos');
const Model = require('./models/produtos');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }});

io.on('connection', (socket) => {
  socket.idCustom = `Client${socket.id}`;

  socket.on('inc', async ({ id, value }) => {
    const produto = await Model.update(id, value);
    io.emit('refresh', { data: produto, user: 'Fernando' });
  });
});

app.get('/produtos', Produto.getAll);
app.post('/produtos', Produto.create);

server.listen(3333, () => console.log(`Rodando na porta ${3333}`));