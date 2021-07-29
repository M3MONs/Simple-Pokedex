// START API URL
let url = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0";
// VARIABLES FOR NEXT AND PREVIOUS PAGE
let next, prev;
// GET LIST IN HTML FILE
const pokemonList = document.getElementById("pokemonList");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

fetchMultiplePokemons();

function fetchMultiplePokemons() {
   fetch(url, {
      method: "GET",
   })
      .then((res) => res.json())
      .then((res) => {
         next = res.next;
         prev = res.prev;

         return Promise.all(
            res.results.map((poke) => {
               return fetch(poke.url).then((res) => res.json());
            })
         );
      })
      .then((res) => {
         res.forEach((pokemon) => {
            pokemonList.innerHTML += `
         <li class="${pokemon.types[0].type.name}">
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            <h1>${pokemon.name}</h1>
            <h3>Height: ${pokemon.height}</h3>
            <h3>Weight: ${pokemon.weight}</h3>
         </li>`;
         });
      });
}

nextBtn.addEventListener("click", function () {
   if (typeof next !== "undefined") {
      pokemonList.innerHTML = "";
      url = next;
      fetchMultiplePokemons();
   }
});

prevBtn.addEventListener("click", function () {
   if (typeof prev !== "undefined") {
      pokemonList.innerHTML = "";
      url = prev;
      fetchMultiplePokemons();
   }
});
