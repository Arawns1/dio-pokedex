
//Busca o id passado na URL e então realizará a requisição.
let params = new URLSearchParams(window.location.search)
let id = params.get('id');
let mainBody = document.getElementById("MainContainer")

function insertPokemonHeaderInfos(pokemon){
    return`
    <section class="pokemonHeader ">
    <div class="pokemon">
        <div class="detail">
            <h1 id="pokemonName">${pokemon.name}</h1>
            <ol class="types" id="pokemonTypesList">
                ${pokemon.types.map(type => `<li class="type"> ${type} </li>`).join('')}
            </ol>
        </div>
        <span id="pokemonNumber">#${pokemon.number}</span>
    </div>
    <img src="${pokemon.photo}" alt="Imagem do ${pokemon.name}" id="pokemonMainImage">
</section>
    `
}
function insertNavbar(pokemon){
    return `
        <section class="pokemonDetails">
            <nav>
                <ul class="navList">
                    <li class="navItem">About</li>
                    <li class="navItem">Base Status</li>
                    <li class="navItem">Evolution</li>
                </ul>  
            </nav>
            <article class="pokemonData">
                ${insertPokemonDetails(pokemon)}
                <div>
                    <h3>Breeding</h2>
                    <table class="abilitiesTable">
                        <tr>
                            <td class="colTitle">Gender</td>
                            <td></td>
                            <td class="colInfo"> - </td>
                        </tr>
                        <tr>
                            <td class="colTitle">Egg Groups</td>
                            <td></td>
                            <td class="colInfo"> - </td>
                        </tr>
                        <tr>
                            <td class="colTitle">Egg Cycle</td>
                            <td></td>
                            <td class="colInfo"> - </td>
                        </tr>
                    </table>
                </div>
            </div>
        </section>
    `
}

function insertPokemonDetails(pokemon){
    return `
    <table class="abilitiesTable">
        <tr>
            <td class="colTitle">Height</td>
            <td></td>
            <td class="colInfo">${pokemon.height} m</td>
        </tr>
        <tr>
            <td class="colTitle">Weight</td>
            <td></td>
            <td class="colInfo">${pokemon.weight} kg</td>
        </tr>
        <tr>
            <td class="colTitle">Abilities</td>
            <td></td>
            <td class="colInfo">${pokemon.abilities.join(", ")}</td>
        </tr>
    </table>
    `
}

pokeApi.getPokemonById(id)
       .then(pokemon => {
        mainBody.classList.add(pokemon.type)
        mainBody.innerHTML += insertPokemonHeaderInfos(pokemon)
        mainBody.innerHTML += insertNavbar(pokemon)
       })


