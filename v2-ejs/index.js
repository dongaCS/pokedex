const express = require(`express`);
const path = require(`path`);
const app = express();

app.set(`views`, path.join(__dirname, `views`));
app.use(express.static(path.join(__dirname, `public`)));
app.set(`view engine`, `ejs`);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const pokemonRouter = require(`./routes/pokemon.js`)
app.use(`/api/pokemon`, pokemonRouter); 

app.get(`/`, (req, res) => res.send(`http://localhost:3000/api/pokemon/`))

const PORT = 3000;
app.listen(PORT, () => console.log(`pokeDex ejs server running ${PORT}`));