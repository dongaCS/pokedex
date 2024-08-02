const fs = require(`fs`);

// clears out html file to write in new pokemon data
function create(data, dex){
    clear();

    // populates an pokemon object with name, image, type, abilities and description
    let pokemon = {"NAME" :`<h1>#${data.id}: ${data.name}</h1>`,
                "AUDIO": `<button onclick="play('${data.cries.latest}')"></button>`,
                "IMAGE" : `<img src=${data.sprites.other["official-artwork"].front_default}></img>`,
                "TYPES" : `<p><b>TYPE</b></p>${getType(data)}`,
                "ABILITIES" : `<p><b>ABILITIES</b></p>${getAbility(data)}`,
                "DESCRIPTION" : `<p>${getFlavor(dex)}</p>`,
            };

    // places the pokemon data into html file, key = location of insert
    let html = fs.readFileSync(`./routes/pokemon/pokemon.html`, `utf8`);
    for(e of Object.keys(pokemon)) {
        html = html.replace(`${e}`, pokemon[e])
    }
    
    // writes to html file with pokemon data
    fs.writeFileSync("./routes/pokemon/pokemon.html", `${html}`);
    console.log(`pokemonHelper create()`)
    return;
}

// remakes a clean html file with some css
function clear() {
    // reading files that contain our html based template
    let top = fs.readFileSync(`./routes/pokemon/top.txt`, `utf8`);
    let style = fs.readFileSync(`./routes/pokemon/styles.css`, `utf8`);
    let bottom = fs.readFileSync(`./routes/pokemon/bottom.txt`, `utf8`);

    // writes our based template to html, we sandwich in the css 
    fs.writeFileSync("./routes/pokemon/pokemon.html", `${top} ${style} ${bottom}`);
    console.log(`pokemonHelper clear()`)
    return;

}

// grabs the pokemon type, gives it some tags, returns a string
function getType(data) {
    let str = "";
    for(e of data.types) {
        str += ` <span>${e.type.name}<br></span>`
    }
    return str;
}

// grabs the pokemon abilities, gives it some tabs, returns a string
function getAbility(data) {
    let str = "";
    for(e of data.abilities) {
        str += ` <span>${e.ability.name}<br></span>`
    }
    return str;
}

// grabs the english flavor(description) of pokemon, cleans it up, returns a string
function getFlavor(dex) {
    let flavor = "";
    for(e of dex.data.flavor_text_entries) {
        if(e.language.name === `en`) {
            flavor = e.flavor_text;
            break;
        }
    }
    flavor = flavor.replaceAll(/[\n\f]+/g, " ");
    return flavor;
}

module.exports = create;