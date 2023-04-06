const URL = "https://pokeapi.co/api/v2/pokemon";

//Nos obtiene los pokemones de la API
  const getpokemons = async (url) => {
    try {
      const { data } = await axios.get(url);
     const  data1 = data.results;
      for (const key in data1) {
        if (data1.hasOwnProperty.call(data1, key)) {
        const poke = data1[key];
          //console.log("un pokemon", poke.url)
         const pokeresponse =  await axios.get(poke.url);
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
      <img src=${pokemones.data.sprites.front_default} alt="" data-url=${poke.url}>
    </figure>`;
};

document.addEventListener("click", async (e) => {
  const urlPokemon = e.target.getAttribute("data-url");
  console.log(urlPokemon)

  if (urlPokemon) {
    const pokemon = await axios.get(urlPokemon);
    showOnePokemon(pokemon, containerShowPokemon);
    console.log("voy a ver info de poke", pokemon.data.name);
  }
});

const containerShowPokemon = document.querySelector(".container-show-pokemon");
const showOnePokemon = (pokemon, container) => {

  // ************************funciones para leer abilities y types*********************
  let typeToShow = []
  let abilityToShow = []
    const types = pokemon.data.types
      types.forEach(element => {
          typeToShow.push( element.type.name)
          });
    const abilities = pokemon.data.abilities
      abilities.forEach(element => {
          abilityToShow.push( element.ability.name)
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
  <span>TYPES <p>${typeToShow.join(" / ")}</p></span>
  <span>HABILITIES <p>${abilityToShow}</p></span>
  <span>HEIGHT <p>${pokemon.data.height} m</p></span>
  <span>WEIGHT <p>${pokemon.data.weight} kg</p></span>
</article>
    `;
};

// *********************botones para overflow de imagenes***********************
const contenedor = document.querySelector('.contenedor');
const botonIzquierda = document.querySelector('#izquierda');
const botonDerecha = document.querySelector('#derecha');

botonIzquierda.addEventListener('click', () => {
  contenedor.scrollLeft -= 100;
});

botonDerecha.addEventListener('click', () => {
  contenedor.scrollLeft += 100;});
