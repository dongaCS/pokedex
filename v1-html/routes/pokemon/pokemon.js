const fs = require("fs");
const axios = require(`axios`);
const express = require(`express`);

const router = express.Router();
const create = require(`./pokemonHelper.js`)


// /api/pokemon/charmander
router.get(`/:pokemon`, async (req, res) => {
    try {
        let { pokemon } = req.params;
        let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        let dex = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${info.data.id}`);
        create(info.data, dex); // makes the pokemon.html file
        res.status(200).sendFile(`pokemon.html`, {root: __dirname })

    } catch (error) {
        console.log('bug catcher anna caught: \n', error); // if you know, you know
        res.status(500).send(`no pokemon found`);
    }
    return;
});


module.exports = router;