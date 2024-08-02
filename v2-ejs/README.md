# PokeDex 2.0
Learning to work with EJS, Node, Express, and Axios. 

## Table of Contents
- [Overview](#Overview)
- [About](#About)
- [Running it Locally](#Running-it-Locally)

## Overview
- Creates a server using express
- Uses router to handle URL requests
- Uses Axios to address Promises from API call to https://pokeapi.co/api/v2/ 
- Process JSON for desired data 
- Uses EJS engine to render URL 

![preview](https://raw.githubusercontent.com/dongaCS/pokedex/main/v2-ejs/preview.png)

## About
### index.js
- Contains basic setup for using Express App and supporting modules.
  - parser: Express
  - router: Express
  - port: a number we defined for server to listen to 
- When user goes to `http://localhost:3000/api/pokemon/POKEMON_NAME`, this file makes **pokemon.js** handle it

---
### pokemon.js
- Does the API request call to https://pokeapi.co/api/v2/. 
- Uses Axios to address data sent back from pokeapi. 
- Handles all errors that may occur during this exchange
- TO BE UPDATED


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


## Known Bugs
#### Evolution Chains
- Eevee - multiply second evolution 
- Ralts - multiple 3rd evolution 

