let pokemones = []; 
const URL = "https://pokeapi.co/api/v2/pokemon";

let urlarray = []

//Nos obtiene los pokemones de la API
const getpokemons = async (url) => {
    try {
      const { data } = await axios.get(url); //desestructuración de objetos
     const  data1 = data.results;
      for (const key in data1) {
        if (data1.hasOwnProperty.call(data1, key)) {
          const poke = data1[key];
          console.log("un pokemon", poke.url)
      urlarray = poke.url
        }
      }
    } catch (error) {
      console.log(error);
      alert("Usuario, ocurrio un error");
      return [];
    }
  };

console.log(getpokemons(URL));
console.log(data1)


const containerImg = document.querySelector(".footer__figure");
const pokemonsImg = (pokemones, container) => {
  container.innerHTML = "";
  pokemones.forEach((pokemon) => {
    container.innerHTML += `<h3>${pokemon.name}</h3>

    <img src=${pokemon.url.sprites.front_default} alt=${pokemon.name} data-url=${pokemon.url}>
        `;
  });
};
// 
document.addEventListener("DOMContentLoaded", async()=> {
  // const urlPokemon = e.target.getAttribute("data-url");
  pokemones = await getpokemons(URL);
  pokemonsImg(pokemones,containerImg);
  

})

