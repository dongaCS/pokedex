const express = require(`express`);
const axios = require(`axios`);

router = express.Router();

router.get(`/`, (req, res) => {
    res.render(`pokemonHome`);
});


router.get(`/search-pokemon`, async (req, res) => {
    try{
        let { pokemon } = req.query
        pokemon = pokemon.toLowerCase(); //pokeapi only supports lowercase names
        let info = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        let dex = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${info.data.id}`);
        
        // setting up to get pokemon evolution
        let evo = await axios.get(dex.data.evolution_chain.url);
        let chain = [];
        evolution(evo.data.chain, chain); 
        // console.log(chain)
        
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
        // error because of API call
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
            // this error should only occur if there is a dev problem
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

function evolution(evoData, chain) {
    // end of evolution case or no evolution
    if(evoData['evolves_to'].length == 0) {
        chain.push(evoData.species.name, evoData.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
        return chain;
    // multiple evolution for stage, ie more than 1 option to evolve into
    } else if(evoData['evolves_to'].length > 1) {
        chain.push(evoData.species.name, evoData.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "")); // add self
        for(let e of evoData['evolves_to']) {
            evolution(e, chain)
        }
    // normal evolution 1 to 1
    } else {
        chain.push(evoData.species.name, evoData.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
        evolution(evoData['evolves_to'][0], chain)
    }
}


module.exports = router;