# PokeDex 2.0
![EJS](https://img.shields.io/badge/EJS-blue?logo=ejs&logoColor=white)
![Node_v20.14.0](https://img.shields.io/badge/Node_v20.14.0-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-%23404d59?logo=express&logoColor=%2361DAFB)
![Axios](https://img.shields.io/badge/Axios-purple?logo=axios)

## Table of Contents
- [Overview](#Overview)
- [About](#About)
- [The Journey](#The-Journey)
- [Bugs](#Known-Bugs)
- [Running it Locally](#Running-it-Locally)

## Overview
- Creates a server using express
- Uses router to handle URL requests
- Uses Axios to address Promises from API call to https://pokeapi.co/api/v2/ 
- Process JSON for desired data 
- Uses EJS engine to render URL 

![preview](https://github.com/dongaCS/pokedex/blob/main/v2-ejs/public/images/preview.png?raw=true)

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
  - Color
- Sends all the information to **pokemonMerge.ejs** for rendering

---
### pokemonMerge.ejs
- pokemonMerge.ejs is made up of multiple EJS partials
![merge.png](https://github.com/dongaCS/pokedex/blob/main/v2-ejs/public/images/merge.png?raw=true)

---
### pokemonHome.ejs, pokemonMissingNo.ejs and pokemonBug.ejs
- **pokemonHome.ejs** is a blank landing page for when http://localhost:3000/api/pokemon/ is hit 
- **pokemonMissingNo.ejs** loads when there is an error with [pokeapi](https://pokeapi.co/api/v2/)
- **pokemonBug.ejs** appears when a bug occurs (dev side error)

| Home | Missing | Bug |
| --- | --- | --- |
| ![home.png](https://github.com/dongaCS/pokedex/blob/main/v2-ejs/public/images/home.png?raw=true) | ![missing.png](https://github.com/dongaCS/pokedex/blob/main/v2-ejs/public/images/missingNo.png?raw=true) | ![bug.png](https://github.com/dongaCS/pokedex/blob/main/v2-ejs/public/images/bug.png?raw=true) |

## The Journey
### Getting Type Banners
From text to stylish banners: To get the sprite for typing, I performed extensive drilling and accessed the original source of the [sprites](https://github.com/PokeAPI/sprites). I then extracted the base URL for the banner set I needed and hardcoded it into the EJS template. Each typing banner is updated based on the information from the `types` property found in the JSON data.
- Suppose: https://pokeapi.co/api/v2/pokemon/ho-oh
- Looking at the JSON we see inside of axios(URL).data
```JSON
{...
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "fire",
        "url": "https://pokeapi.co/api/v2/type/10/"
      }
    },
    {
      "slot": 2,
      "type": {
        "name": "flying",
        "url": "https://pokeapi.co/api/v2/type/3/"
      }
    }
  ],
...}
```
- the number at the end determines what we need to use to grab the type png
- ie) fire = 10 so the url would be https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/10.png ![fire](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/10.png)

---
### Pokemon Stats Array
#### pokemonLeft.ejs Error
```ESJ
<% for (e of stat) { %>
  <span> <%= e.base_stat %> </span>
<% } %>
```
In pokemon.js, info.data.stats was passed using `${}` therefore the data wasn't passed but rather a string was. Fixed but changing `stat: ${info.data.stats}` => `stat: info.data.stats`. It took a while to find this tiny mistake, worth remembering.

---
### Generating Charts
#### pokemonLeft.ejs Error - bane of this project
- This is suppose to generate a chart in on the page, the problem is that it take a DOM object. I try to create a new DOM object with `let chart = new Chart("stat-radar-chart" {...} ) `. This cause a syntax error at new Chart () saying there is a missing semicolon. I rewrite the code several times between JS and EJS to make sure I translate it properly to EJS, but it still gives me the same error. I smash my head into a wall and think of another solution as I couldn't see the problem after searching for HOURS. HOURS!!
```EJS
<% let chart = new Chart("stat-radar-chart" %>
    <% { %>
    <% type: "radar", %>
    <% data: { %>
        <% labels: label %>
        <% datasets: [ %>
            <% { %>
               <% data: stat %>
            <% }, %>
        <% ], %>
    <% }, %>
<% }) %>
```
- Upon reviewing examples, I realized that the `<script>` tag should be used to interact with the DOM because the page renders and calls `new Chart("stat-radar-chart", {...})` during render, so the DOM element with the `#stat-radar-chart` does not yet exist. To resolve this, I needed to place the `<script>` tag after the `<canvas id="stat-radar-chart">` element to ensure it is properly generated before attempting to initialize the chart.
```HTML
<script>
  const ctx = document.querySelector('.stats-radar-chart');    
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ["att", "hp", "def"],
      datasets: [{
        data: [10, 50, 120],
        borderWidth: 1,
      }]
    },
  });
</script>
```
- The code is running but now we have a 404 error in `pokemonMerge.ejs` the community said to import an updated script.
```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
```
- Now I have a problem trying to get labels of the chart to match the ones from pokemon.js and the data from the stats to display. I try `labels: <%= label %>` and `data: <%= stat %>` but it comes out as `hp,att,def,sp-att,sp-def,speed` and `10,30,40,50,60,70` strings. It was tricky since I wanted to pass EJS properites into a script using that was creating an object using Chart.js. This wasn't the same issue as `${}` where I was passing it strings by mistake, Charts.js read the data directly as strings rather than array data. My work around was to hardcoded the stat names (hp, att, def,...) and for stats I changed it to `data: [<%= stat %>]`. I hardcorded the labels because I didn't like how the ones from PokeApi looked and [<%= stat %>] tricks Charts.js into reading it as an array.
```Javascript
new Chart("stats-radar-chart", {
  type: 'radar',
  data: {
    labels: ['HP', 'ATTACK', 'DEFENSE', 'SP-ATT', 'SP-DEF', 'SPEED'],
    datasets: [{
      label: "BASE STATS (255)",
      data: [<%= stat %>],
      fill: true,
      pointRadius: 1,
      borderWidth: 2, 
    }]
  },
...
}
```
- All was well until I adjusted the window size and the chart became unresponsive. I searched the web for examples and documentation and found that: **"Detecting when the canvas size changes cannot be done directly from the canvas element in Chart.js**." The official documentation mentioned that the canvas's height and width properties depend on its parent element, so I needed to create a separate div to ensure the canvas was a perfect square for the chart to be centered and positioned correctly. I added the following styling: `<canvas id="stat-radar-chart" style="display: inline-block"></canvas>`. This adjustment ensures the chart adapts to the container's size.
```HTML
<div class="stats-radar">
  <canvas id="stats-radar-chart" style="display: inline-block;"></canvas> 
</div>
```
- I wanted to add dynamic coloring to my chart to match the colors of Pokémon. Fortunately, one of the JSON data fields includes a color property, which I used for the radar graph. After some research, I discovered that there are only 10 color options available. I needed to create a system to map color names, like `red`, to their corresponding RGB values so that Chart.js could interpret them correctly. I created an object mapping color names to RGB values, which Chart.js uses to render the outlines and points with rgb(), while the inner fill is rendered with rgba().
```Javascript
const rgb = {
    black: "rgb(0, 0, 0)",
    yellow: "rgb(255, 230, 66)",
    blue: "rgb(0, 0, 225)",
    brown: "rgb(150, 75, 0)",
    gray: "rgb(128, 128, 128)",
    green: "rgb(0, 255, 0)",
    pink: "rgb(255, 192, 0203)",
    purple: "rgb(160, 32, 240)",
    red: "rgb(255, 0, 0)",
    white: "rgba(192, 192, 192)",
} 

const rgba = {
    black: "rgba(0, 0, 0, 0.5)",
    yellow: "rgba(255, 230, 66, 0.2)",
    blue: "rgba(0, 0, 225, 0.2)",
    brown: "rgba(150, 75, 0, 0.2)",
    gray: "rgba(128, 128, 128, 0.2)",
    green: "rgba(0, 255, 0, 0.2)",
    pink: "rgba(255, 192, 203, 0.2)",
    purple: "rgba(160, 32, 240, 0.2)",
    red: "rgba(255, 0, 0, 0.2)",
    white: "rgba(192, 192, 192, 0.2)",
}

new Chart("stats-radar-chart", {
  type: 'radar',
  data: {
    labels: ['HP', 'ATTACK', 'DEFENSE', 'SP-ATT', 'SP-DEF', 'SPEED'],
    datasets: [{
      ...
      backgroundColor: rgba.<%= color %>,
      borderColor: rgb.<%= color %>,
      ...
    }]
  },
...
}
```

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
  - `http://localhost:3000/`
  - Use the search bar to look up a Pokemon via name or id 
- To stop the Server, hit `Control + C` in the terminal