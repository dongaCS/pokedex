const express = require(`express`);
const axios = require(`axios`);

router = express.Router();

router.get(`/`, (req, res) => {
    res.render(`pokemonHome`);
});


router.get(`/search-pokemon`, async (req, res) => {
    try{
        let { pokemon } = req.query
        pokemon = pokemon.toLowerCase();     // the code might break on uppercase pokemon name, need to check
        let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        let dex = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${info.data.id}`);
        // dex.data.gender_rate = x /8 * 100 for female
        // dex.color.name = color of pokemon
        // dex.evolution_chain = url for chain

        // horrid drilling for evolutions doesn't work for eevee we can maybe keep looping at x level, also check for pokemon like ralts 3rd evo => 2 options
        let evo = await axios.get(dex.data.evolution_chain.url);
        let evoData = evo.data.chain
        let chain = [];
        // want to place and > between evolution chains 
        // maybe 3n = > and in html for 3n of length we insert > 
        // but eevee = fml
        do {
            chain.push(evoData.species.name, evoData.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
            evoData = evoData['evolves_to'][0];
        } while ( evoData && evoData.hasOwnProperty('evolves_to'));
        
        // console.log(chain)

        // for eevee
        // if(pokemon === "eevee") {
        //     for(e of evo.data.chain.evolves_to) {
        //     let details = e.evolution_details[0]
        //     let arr = [];
        //     for(c of Object.keys(details)) { // this is evolution conditions
        //         if(details[c]) arr.push(details[c]) /
        //     }
        //         console.log(e.species.name)
        //     }
        // }
        

        // pokemon gender rate, some has no gender
        let rates = [0];
        if(dex.data.gender_rate != -1) {
            let female = dex.data.gender_rate  / 8 * 100
            rates = [female, 100 - female] // female and male rate
        }

        res.render(`pokemonMerge`, {
            id: `DEX ID: ${info.data.id}`,
            height: `HEIGHT: ${info.data.height*10}cm`,
            weight: `WEIGHT: ${info.data.weight/10}kg`,
            stat: info.data.stats.map(e => e.base_stat),
            gender: rates,
            name: `${info.data.name}`,
            audio: `${info.data.cries.latest}`,
            image: `${info.data.sprites.other["official-artwork"].front_default}`,
            types: info.data.types,
            abilities: info.data.abilities,
            description: dex.data.flavor_text_entries,
            color: `${dex.data.color.name}`,
            evolution: chain,
        });
    } catch (error) {
        if(error.name === "AxiosError") {
            res.render(`pokemonMissingNo`, {
                name: `MissingNo`,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`,
                types: `1`,
                abilities: [`Immunity`, `Magic Guard`],
                description: `Unlike most glitch Pokémon, whose names consist of data cobbled together from random locations, MissingNo.'s name is clearly a deliberately-added abbreviation of "missing number". This is because "MissingNo." was added as a name for the empty slots to avoid the game crashing if a glitch Pokémon was encountered.`,
                errorLog: error,
            });
        } else {
            res.render(`pokemonBug`, {
                name: `Bug Catcher Anna`,
                types: [2, 11],
                abilities: [`Dark Aura`, `Oblivious`, `Alt+F4`],
                description: `Code bugs, often called “bugs” or “software bugs,” are common in software development. In brief, code bugs are unintentional mistakes made by developers during the coding process. They can include syntax errors, logic flaws, or issues related to the software's functionality. - END ME`,
                errorLog: error,
            });
            console.log('bug catcher anna caught: \n', error);
        }
    }
    return;
});


module.exports = router;