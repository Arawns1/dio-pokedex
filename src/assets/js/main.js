const pokeListHTML = document.querySelector("#pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton")
const limit = 5;
let offset = 0;
const maxRecords = 151;

let body = document.querySelector("body")
let main = document.querySelector("main")
let button = document.querySelector("#btnFilter")
let header = document.getElementById("pokedexHeader")

header.addEventListener("click", () => {
    body.classList.remove("center")
    main.classList.remove("hidden")
    button.classList.remove("hidden")
    loadPokemonItems(offset, limit)
    header.style.borderRadius = "0px 0px 10px 10px";
 
})

function convertPokemonToLI(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map(type => `<li class="type"> ${type} </li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="Imagem do ${pokemon.name}">
        </div>
    </li>
    `
}
function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokeList = []) => {
        pokeListHTML.innerHTML += pokeList.map(convertPokemonToLI).join('');

        const pokemonItems = pokeListHTML.querySelectorAll('.pokemon');
        pokemonItems.forEach((pokemonItem, index) => {
            pokemonItem.addEventListener('click', () => {
                window.location.href = `../../pages/home/pokemonPage.html?id=${index+1}`
            });
        });
    })

    .catch(err => console.error("Erro ao realizar a requisição: " + err));
    
}

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItems(offset, limit)
    }
    
})

