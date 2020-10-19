const fetchPokemon = () =>{

    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemonPromises = [];

    for(let i =1; i <= 151; i++){
        pokemonPromises.push(
            fetch(getPokemonUrl(i)).then(response => response.json())
        );
    };

    Promise.all(pokemonPromises)
        .then(pokemons => {

            const trPokemons = pokemons.reduce((accumulator, pokemon) => {

                const types = pokemon.types.map(typeInfo => typeInfo.type.name);


                const sprites = pokemon.sprites.front_default;

                accumulator += `
                    <tr class="${types[0]}">
                        <td>
                            <img class="pokemon-image" alt="${pokemon.name}" src="${sprites}"/>
                        </td>
                        <td>
                            <p>Nº:${pokemon.id}</P>
                            <p>Name:${pokemon.name}</P>
                            <p>Type:${types.join(' | ')}</p>
                        </td>
                    </tr>
                `;

                return accumulator;

            }, '');

            const tbody = document.querySelector('[data-js="pokedex"]');

            tbody.innerHTML = trPokemons;

        });
    
}
fetchPokemon();