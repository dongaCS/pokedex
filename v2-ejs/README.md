# PokeDex 2.0
![EJS](https://img.shields.io/badge/EJS-blue?logo=ejs&logoColor=white)
![Node_v20.14.0](https://img.shields.io/badge/Node_v20.14.0-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-%23404d59?logo=express&logoColor=%2361DAFB)
![Axios](https://img.shields.io/badge/Axios-purple?logo=axios)


## Table of Contents
- [Overview](#Overview)
- [About](#About)
- [Bugs](#Known-Bugs)
- [Running it Locally](#Running-it-Locally)

## Overview
- Creates a server using express
- Uses router to handle URL requests
- Uses Axios to address Promises from API call to https://pokeapi.co/api/v2/ 
- Process JSON for desired data 
- Uses EJS engine to render URL 

![preview](https://raw.githubusercontent.com/dongaCS/pokedex/main/v2-ejs/preview.png)

### Lay of the Land
```
v2-ejs
  - public
    - images
        bugcatcher.png
    - script
        postRender.ejs
    - style
        pokemonLeft.css
        pokemonRight.css
        pokemonMain.css
  - routes
      pokemon.js
  - views
      pokemonBug.ejs
      pokemonHome.ejs
      pokemonLeft.ejs
      pokemonMerge.ejs
      pokemonMissingNo.ejs
      pokemonRight.ejs
      searchbar.ejs
index.js
```

## About
### index.js
- Contains basic setup for using Express App and supporting modules.
  - parser: Express
  - router: Express
  - view engine: EJS
  - port: a number we defined for server to listen to 
- When user goes to `http://localhost:3000/api/pokemon/POKEMON_NAME`, this file makes **pokemon.js** handle it

---
### pokemon.js
- Does the API request call to https://pokeapi.co/api/v2/. 
- Uses Axios to address data sent back from pokeapi. 
- Handles all errors that may occur during this exchange
- Extracts JSON data such as:
  - Name and Pokemon Sound (pokemon cry)
  - Image
  - Type
  - Abilities
  - Description (pokemon flavor)
  - ID, Height and Weight
  - Base Stats
  - Gender Rates
  - Evolution Chain
- Sends all the information to **pokemonMerge.ejs** for rendering

---
### pokemonMerge.ejs
- pokemonMerge.ejs is made up of multiple EJS partials
![merge.png](https://raw.githubusercontent.com/dongaCS/pokedex/main/v2-ejs/merge.png)

---
### pokemonHome.ejs, pokemonMissingNo.ejs and pokemonBug.ejs
- **pokemonHome.ejs** is a blank landing page for when http://localhost:3000/api/pokemon/ is hit 
- **pokemonMissingNo.ejs** loads when there is an error with [pokeapi](https://pokeapi.co/api/v2/)
- **pokemonBug.ejs** appears when a bug occurs (dev side error)

## Known Bugs
#### Evolution Chains
- ie) Eevee (FIXED) - multiply second evolution
- ie) Tyrogue (FIXED) - multiple second evolution
- ie) Ralts (FIXED) - multiple 3rd evolution
- ie) Poliwag (FIXED) - multiple 3rd evolution 
- ie) Wurmple(FIXED) - multiple second into different 3rd

## Running it Locally
- Make sure Node is installed from: 
  - https://nodejs.org/en
  - You can check if it's installed by typing `node -v` in terminal, returns something like  **v20.14.0**
- Navigate to file path, open a terminal and do command: 
  - `npm install` (this installs all dependencies defined in __package-lock.json__)
-  To run the Server, keep the terminal open and do command: 
   -  `node index.js`
   -  returns: **server listening on 3000**
- Wtih the terminal still running, open any web browser and in address bar go to:
  - `http://localhost:3000/api/pokemon/POKEMON_NAME`
  - replace POKEMON_NAME with a pokemon 
  - ie) http://localhost:3000/api/pokemon/charmander
- To stop the Server, hit `Control + C` in the terminal
