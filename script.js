// Getting element using their 'id' values

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const spriteContainer = document.getElementById('sprite-container');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');


// const handleValue = () => {
//     return searchInput.value.toLowerCase();
// }


const URL = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon`

let data = []

let isDataFetched = false;


const fetchData = async (urlToBeParsed) => {
    try {
        const response = await fetch(urlToBeParsed);

        let fetchData = await response.json();

        if (!isDataFetched) { // If the data is not fetched, we'll push the fetched data to the 'data' array
            data.push(...fetchData.results);
            isDataFetched = true;
        }
    }
    catch (err) {
        console.error(err)
    }
}


const fetchDataIfNeeded = async () => {
    if (data.length === 0) { // Only fetch data if there is no data in the 'data' array
        await fetchData(URL);
    }
};


const showData = (pokemonData) => {
    pokemonName.innerText = pokemonData.name.toUpperCase();
    pokemonId.innerText = `#${pokemonData.id}`;
    weight.innerText = `Weight: ${pokemonData.weight}`;
    height.innerText = `Height: ${pokemonData.height}`;

    spriteContainer.innerHTML = `
      <img id="sprite" src="${pokemonData.sprites.front_default}" alt="${data.name}">
    `;

    types.innerHTML = pokemonData.types
        .map(obj => `<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`)
        .join(' ');

    hp.innerText = pokemonData.stats[0].base_stat;
    attack.innerText = pokemonData.stats[1].base_stat;
    defense.innerText = pokemonData.stats[2].base_stat;
    specialAttack.innerText = pokemonData.stats[3].base_stat;
    specialDefense.innerText = pokemonData.stats[4].base_stat;
    speed.innerText = pokemonData.stats[5].base_stat;

}

const resetData = () => {
    pokemonName.innerText = '';
    pokemonId.innerText = '';
    weight.innerText = '';
    height.innerText = '';
    spriteContainer.innerHTML = '';
    types.innerHTML = '';
    hp.innerText = '';
    attack.innerText = '';
    defense.innerText = '';
    specialAttack.innerText = ''
    specialDefense.innerText = '';
    speed.innerText = '';

}

const notFound = (inputStr) => {
    if (inputStr === 'Red' || !inputStr) {
        alert('Pokémon not found')
        return
    }
}


searchButton.addEventListener('click', async (e) => {
    e.preventDefault()

    await fetchDataIfNeeded() // Fetching data

    let inputValue = searchInput.value; // The input value

    let pokemon = data.find(pokemon => {
        return pokemon.id === Number(inputValue) || pokemon.name.toLowerCase() === inputValue.toLowerCase();
    }); // If the input and corresponding value match, it'll be a truthy value. Also, the corresponding pokemon's "id", "name" and "url" properties are being assigned.


    if (pokemon) { // If it's true, we'll fetch the data from the corresponding pokemon's URL
        let pokemonData = await fetch(pokemon.url.replace('http', 'https')).then(response => response.json());

        showData(pokemonData) // Calling the function to show the output on the screen
    }
    else {
        resetData() // Reseting all the info
        notFound(inputValue);
    }
})

