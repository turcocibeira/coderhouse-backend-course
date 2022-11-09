const dC4 = require("../Desafio Clase 4/desafioClase4");
const cont1 = new dC4.Contenedor("productos");

const express = require('express');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)});

app.get('/', (req, res) => {
    res.send("<h1>Homepage</h1>")
});

app.get('/productos', async (req, res) => {
    res.send(await cont1.getAll())
});

app.get('/productoRandom', async (req, res) => {
    let rndQ = Math.floor(Math.random() * 2);
    res.send(await cont1.getById(rndQ))
});

server.on("error", (err) => {console.error(err)});