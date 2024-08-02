const logger = require(`morgan`); 
const express = require(`express`);
const app = express();

app.use(express.json()); // parses JSON
app.use(express.urlencoded({extended: false})); // parses JSON
app.use(logger(`dev`)); // see request in console 

// setup routes
const pokeRouter = require(`./routes/pokemon/pokemon.js`);
app.use(`/api/pokemon`, pokeRouter);

// server listening port
const PORT = 3000;
app.listen(PORT, () => console.log(`server listening on ${PORT}`));