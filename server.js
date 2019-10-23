const express = require('express');
const request = require('request');
const port = process.env.PORT || 8087;
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const app = express();

let pokemon;
function getPokemon(req, res, next)
{
    const pokemonId = Math.floor(Math.random() * 965) + 1;
    const options = {
        url: `${pokeAPI}${pokemonId}`
    };
    request(options, (err, res, body) => {
        if (err) {
            console.error('Request got an error: ', err);
            return next();
        }
        if (res.statusCode !== 200) {
            console.log(`Attempted to get Pokemon #${pokemonId}`);
            console.error(`Request was not successful ${res.body}`);
            return next();
        }
        pokemon = JSON.parse(body);
        console.log(`Setting global pokemnon to ${pokemon.name}`);
        next();
    });
}

app.use(getPokemon);
function properName(str) 
{
    return str[0].toUpperCase() + str.slice(1);
}

app.get('/', (req, res) => {
    if (typeof pokemon.name !== 'string' || pokemon.name === '') {
        res.send('Invalid Pokemon');
        return;
    }

const body = `
<div>
  <img src="${pokemon.sprites.front_default}">
  <ul>Stats
    <li>Name: ${properName(pokemon.name)}</li>
    <li>Height: ${pokemon.height}</li>
    <li>Weight: ${pokemon.weight}</li>
  </ul>
</div>
`;
res.send(body);

});

app.listen(port, (err) => {
    if (err)
    {
        console.log("Error starting the server: ", err);
    }
    console.log(`Server is running at port ${port}`);
});

/*
request(pokeAPI, (err, res, body) => {
    console.log("err: ", err);
    console.log("res: ", res);
    console.log("body: ", body);
});
*/
