const URL = "https://pokeapi.co/api/v2/pokemon";

//Nos obtiene los pokemones de la API
const getpokemons = async (url) => {
  try {
    const { data } = await axios.get(url);
    const data1 = data.results;
    for (const key in data1) {
      if (data1.hasOwnProperty.call(data1, key)) {
        const poke = data1[key];
        //console.log("un pokemon", poke.url)
        const pokeresponse = await axios.get(poke.url);
        pokemonsImg(pokeresponse, containerImg, poke);
      }
    }
  } catch (error) {
    console.log(error);
    alert("Usuario, ocurrio un error");
    return [];
  }
};
console.log(getpokemons(URL));

const containerImg = document.querySelector(".footer__container");
const pokemonsImg = (pokemones, container, poke) => {
  container.innerHTML += `
    <figure class="footer__figure">
      <img src=${pokemones.data.sprites.front_default} alt="" data-url=${poke.url}
     <h6>${pokemones.data.name}</h6> 
    </figure>`;
};

document.addEventListener("click", async (e) => {
  const urlPokemon = e.target.getAttribute("data-url");
  console.log(urlPokemon);

  if (urlPokemon) {
    const pokemon = await axios.get(urlPokemon);
    showOnePokemon(pokemon, containerShowPokemon);
    console.log("voy a ver info de poke", pokemon.data.name);
  }
});

const containerShowPokemon = document.querySelector(".container-show-pokemon");
const showOnePokemon = (pokemon, container) => {
  // ************************funciones para leer abilities y types*********************
  let typeToShow = [];
  let abilityToShow = [];
  const types = pokemon.data.types;
  types.forEach((element) => {
    typeToShow.push(element.type.name);
  });
  const abilities = pokemon.data.abilities;
  abilities.forEach((element) => {
    abilityToShow.push(element.ability.name);
  });

  // ************************funciones imprimir en html info de pokemon*********************
  container.innerHTML = "";
  container.innerHTML = `
  <article class="section__pokemon">
  <div class="section_pokemon-name">
      <figure class="section__pokemon-element">
          <img src=${pokemon.data.sprites.other.dream_world.front_default} alt="Element Water">
      </figure>
      <h2 class="section__pokemon-title">${pokemon.data.name}</h2>
  </div>
  <figure class="section__pokemon-img">
      <img src=${pokemon.data.sprites.other.dream_world.front_default} alt="greninja">
  </figure>
</article>

<article class="section__information">
  <span>NO. <p>${pokemon.data.id}</p></span>
  <span>LEVEL <p>${pokemon.data.id}</p></span>
  <span>TYPES <p>${typeToShow}</p></span>
  <span>HABILITIES <p>${abilityToShow}</p></span>
  <span>HEIGHT <p>${pokemon.data.height} m</p></span>
  <span>WEIGHT <p>${pokemon.data.weight} kg</p></span>
</article>
    `;
};

// opción de búquedad

const searchPoke = (word, pokeList) => {
  const pokeFilter = pokeList.filter((pokemon) => 
  pokemon.data.name.toString().toLowerCase().includes(word.toLowerCase())
  );
  const result = pokeFilter.length ? pokeFilter : pokeList;
  const message = pokeList.length ? false : "Pokemón no Encontrado";
  return {
    resultEnd: result,
    messageEnd: message, 
  };
};

const search = document.querySelector(".search");
console.log(search);
search.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.children);
  const formChildren = Array.from(search.children);

  const inputSearch = formChildren.find(
    (item) => item.localName === "input"
  );
  console.log(inputSearch.value);

  const word = inputSearch.value;
  //const list = document.querySelector(".footer__figure");

  if (word) {
    const resultSearch = searchPoke(word, list);
    console.log (resultSearch);

    showOnePokemon (containerShowPokemon, resultSearch.resultEnd);
    if (resultSearch.messageEnd) {
      Swal.fire("Oops!", resultSearch.messageEnd, "Error");
    }
  } else {
    Swal.fire("Ingrese una Palabra", "Error");

  }
})