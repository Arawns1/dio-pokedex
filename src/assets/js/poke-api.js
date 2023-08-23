const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;
    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.weight = (pokeDetail.weight/10).toFixed(2);
    pokemon.height = (pokeDetail.height/10).toFixed(2);
    pokemon.abilities = pokeDetail.abilities.map(ability => ability.ability.name)
    console.log(pokemon)
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) =>{
   return fetch(pokemon.url)
          .then(response => response.json())
          .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(BASE_URL)
        .then(res => res.json())
        .then(data => data.results)
        .then(pokemonList => pokemonList.map(pokeApi.getPokemonDetail))
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonsDetails => pokemonsDetails)
        .catch(err => console.error("Erro ao realizar a requisição: " + err))
}

pokeApi.getPokemonById = (id) => {
    const BASE_URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(BASE_URL)
            .then(res => res.json())
            .then(data => convertPokeApiDetailToPokemon(data))
            .catch(err => console.error("Não foi possível realizar a requisição: " + err))
}
