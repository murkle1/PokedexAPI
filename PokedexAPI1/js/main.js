const poke_container = 
document.getElementById('poke_container');
const pokemons_number = 386; 
const colors = {
     fire: '#FDDFDF', 
     grass: '#DEFDE0', 
     electric: '#FCF7DE', 
     water: '#DEF3FD', 
     ground: '#f4e7da', 
     rock: '#d5d5d4', 
     fairy: '#fceaff', 
     poison: '#98d7a5', 
     bug: '#f8d5a3', 
     dragon: '#97b3e6', 
     psychic: '#eaeda1', 
     flying: '#F5F5F5', 
     fighting: '#E6E0D4', 
     normal: '#F5F5F5', 
     dark: '#0C090A', 
     ghost: '#151B54', 
     ice: '#82CAFF', 
     steel: '#A9A9A9' 

};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 252; i <= pokemons_number; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async id => { // this function fetches a single pokemon from API
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
};


function createPokemonCard(pokemon){ // creating a CARD for each pokemon fetched
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon');

    const poke_type = pokemon.types.map(el =>el.type.name); // this extracts the types found in the API and puts it into an array (MAP)
    const type = main_types.filter(type => poke_type.indexOf(type) > -1); // returns filtered array
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const pokeInnerHTML = `
        <div class="img-container">
            <div class="img-container">
            <img src="https://serebii.net/swordshield/pokemon/${pokemon.id}.png" alt="${name}" />
        </div>
            <div class="info">
            <span class="number">#${pokemon.id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `; // name was redefined using pokemon.name which returned a string that we used 

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);


}



fetchPokemons();

