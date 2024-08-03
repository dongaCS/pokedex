# PokeDex 1.0
![HTML5](https://img.shields.io/badge/HTML5-%23E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-%231572B6?logo=css3&logoColor=white)
![Node_v20.14.0](https://img.shields.io/badge/Node_v20.14.0-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-%23404d59?logo=express&logoColor=%2361DAFB)
![Axios](https://img.shields.io/badge/Axios-purple?logo=axios)
![Morgan](https://img.shields.io/badge/Morgan-blue)


## Table of Contents
- [Overview](#Overview)
- [About](#About)
- [Running it Locally](#Running-it-Locally)

## Overview
- Creates a server using express
- Uses router to handle URL requests
- Uses Axios to address Promises from API call to https://pokeapi.co/api/v2/ 
- Process JSON for desired data 
- Generates HTML & CSS, then loads it to URL

![preview.png](https://raw.githubusercontent.com/dongaCS/pokedex/main/v1-html/preview.png)
  
## About
### index.js
- Contains basic setup for using Express App and supporting modules.
  - parser: Express
  - logger: Morgan
  - router: Express
  - port: a number we defined for server to listen to 
- When user goes to `http://localhost:3000/api/pokemon/POKEMON_NAME`, this file makes **pokemon.js** handle it

---
### pokemon.js
- Does the API request call to https://pokeapi.co/api/v2/. 
- Uses Axios to address data sent back from pokeapi. 
- Handles all errors that may occur during this exchange
- Passes data to **pokemonHelper.js** to be processed, gets back a HTML file
- Sends complete HTML to be displayed at server address

---
### pokemonHelper.js
- Does all the data processing
  - Name and ID
  - Pokemon Sound (pokemon cry)
  - Image
  - Type
  - Abilities 
  - Description (pokemon flavor)
- Uses files *top.txt*, *styles.css*, *bottom.txt* to create a skeleton for injecting pokemon data into and then produces *pokemon.html*
  - Why am I doing this? Let's go on tour... or don't

**Tour de Dilemma:** 
I have some set of data that I need to be displayed onto HTML, however, I don't have access to things like document.getElementbById(). I can send things like text, json, and HTML pages but I cannot edit the elements after I've sent it.

**La Solution:**
My solution is to have a premade HTML page, insert the data where I want them to be and then display that. Pokemon.html is the file that will display on the server, however in order for this to work multiple times, I need a way generate a clean html everytime the server is hit. Enter: top.txt, styles.css, and bottom.txt. I Frankenstein the three files together along with my pokemon data to make pokemon.html.

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
