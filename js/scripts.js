const URL = "https://pokeapi.co/api/v2/pokemon";

//Nos obtiene los pokemones de la API
const getpokemons = async (url) => {
    try {
      const { data } = await axios.get(url);
     const  data1 = data.results;
      for (const key in data1) {
        if (data1.hasOwnProperty.call(data1, key)) {
          const poke = data1[key];
          // console.log("un pokemon", poke.url)
         const pokeresponse =  await axios.get(poke.url);
        pokemonsImg(pokeresponse, containerImg);
        }
        }

    } catch (error) {
      console.log(error);
      alert("Usuario, ocurrio un error");
      return [];
    }
  };

  console.log(getpokemons(URL));

const containerImg = document.querySelector(".main__footer");
const pokemonsImg = (pokemones, container) => {
    container.innerHTML += `
    <figure class="footer__figure">
      <img src=${pokemones.data.sprites.front_default} data-url=${pokemones.data.name}>
    </figure>
    `;
};


//escuchar los clicks de las imagenes
document.addEventListener('click', async (e) => {
  const urlPokemon = e.target.getAttribute("data-url");
  console.log(urlPokemon);
  // if (urlPokemon) {
  //     const pokemon = await getPokemon(urlPokemon);
  //     console.log(pokemon);
  // }
  showOnePokemon(containerShowPokemon)
})

const containerShowPokemon = document.querySelector(".container-show-pokemon");
const showOnePokemon = (container) => {
  container.innerHTML = "";
  container.innerHTML = `
  <article class="section__pokemon">
  <div class="section_pokemon-name">
      <figure class="section__pokemon-element">
          <img src=${pokemones.sprites.front_default} alt="Element Water">
      </figure>
      <h2 class="section__pokemon-title">${pokemones.data.name}</h2>
  </div>
  <figure class="section__pokemon-img">
      <img src=${pokemones.sprites.front_default} alt="greninja">
  </figure>
  </article>

  <article class="section__information">
    <span>NO. <p>658</p></span>
    <span>LEVEL <p>36</p></span>
    <span>TYPE <p>WATER</p></span>
    <span>HABILITY <p>STRONG AFFECTION</p></span>
    <span>HEIGHT <p>1.5 m</p></span>
    <span>WEIGHT <p>40 kg</p></span>
  </article>
      `;
};