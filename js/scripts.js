const URL = "https://pokeapi.co/api/v2/pokemon";
let pokeresponse
//Nos obtiene los pokemones de la API
const getpokemons = async (url) => {
  try {
    const { data } = await axios.get(url);
    const data1 = data.results;
    for (const key in data1) {
      if (data1.hasOwnProperty.call(data1, key)) {
        const poke = data1[key];
        //console.log("un pokemon", poke.url)
        pokeresponse = await axios.get(poke.url);
        console.log("soy pokeresponse", pokeresponse.data.name)
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
    showOnePokemon(pokemon.data, containerShowPokemon);
    console.log("voy a ver info de poke", pokemon.data.name);
  }
});

const containerShowPokemon = document.querySelector(".container-show-pokemon");
const showOnePokemon = (pokemon, container) => {
  // ************************funciones para leer abilities y types*********************
  let typeToShow = [];
  let abilityToShow = [];
  const types = pokemon.types;
  types.forEach((element) => {
    typeToShow.push(element.type.name);
  });
  const abilities = pokemon.abilities;
  abilities.forEach((element) => {
    abilityToShow.push(element.ability.name);
  });

  // ************************funciones imprimir en html info de pokemon*********************
  container.innerHTML = "";
  container.innerHTML = `
  <article class="section__pokemon">
  <div class="section_pokemon-name">
      <figure class="section__pokemon-element">
          <img src=${pokemon.sprites.other.dream_world.front_default} alt="Element Water">
      </figure>
      <h2 class="section__pokemon-title">${pokemon.name}</h2>
  </div>
  <figure class="section__pokemon-img">
      <img src=${pokemon.sprites.other.dream_world.front_default} alt="greninja">
  </figure>
</article>

<article class="section__information">
  <span>NO. <p>${pokemon.id}</p></span>
  <span>LEVEL <p>${pokemon.id}</p></span>
  <span>TYPES <p>${typeToShow.join(" / ")}</p></span>
  <span>HABILITIES <p>${abilityToShow.join(" / ")}</p></span>
  <span>HEIGHT <p>${pokemon.height} m</p></span>
  <span>WEIGHT <p>${pokemon.weight} kg</p></span>
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


// Filtro por buscador por nombre con keyup
const searchKeyUp = document.getElementById('mySearch');
searchKeyUp.addEventListener("keyup", async (event) => {
  event.preventDefault();
  const searchByName = event.target;
  console.log(searchByName.value)

  const getAllPoke = async (url) => {
    try {
      const { data } = await axios.get(url);
      const data1 = data.results;
      const pokeList = [];

      for (const key in data1) {
        if (data1.hasOwnProperty.call(data1, key)) {
          const poke = data1[key];
          //console.log("un pokemon", poke.url)
          const pokeresponse = await axios.get(poke.url);
          console.log("soy pokeresponse", pokeresponse.data.name)
          pokeList.push(pokeresponse.data);
          const pokeFilterByName = pokeList.filter((element) => element.name.toLowerCase().includes(searchByName.value.toLowerCase()));
          console.log(pokeFilterByName)
          if (pokeFilterByName) {
            for (const poke of pokeFilterByName) {
              console.log(poke.name);
              showOnePokemon(poke, containerShowPokemon);
            }

          } else {
            Swal.fire("Ingrese una Palabra", "Error");
          }

        }
      }

    } catch (error) {
      console.log(error);
      alert("Pokemon no encontrado");
      return [];
    }
  };

  getAllPoke(URL);
});

