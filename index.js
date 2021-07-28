// START API URL
let url = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0";
// VARIABLES FOR NEXT AND PREVIOUS PAGE
let next, prev;
// GET LIST IN HTML FILE
const pokemonList = document.getElementById("pokemonList");

fetchMultiplePokemons();

function fetchMultiplePokemons() {
   fetch(url, {
      method: "GET",
   })
      .then((res) => res.json())
      .then((res) => {
         res.results.forEach((pokemon) => {
            fetchSinglePokemon(pokemon.url);
         });
      });
}

function fetchSinglePokemon(pokemonUrl) {
   fetch(pokemonUrl, {
      method: "GET",
   })
      .then((res) => res.json())
      .then((res) => {
         pokemonList.innerHTML += `<li>
                                       <img src="${res.sprites.other.dream_world.front_default}" alt="${res.name}">
                                       <h1>${res.name}</h1>
                                 </li>`;
      });
}
