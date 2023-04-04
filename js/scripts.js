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
        pokemonsImg(pokeresponse.data.sprites.front_default, containerImg);
        }
        }

    } catch (error) {
      console.log(error);
      alert("Usuario, ocurrio un error");
      return [];
    }
  };

  console.log(getpokemons(URL));

const containerImg = document.querySelector(".footer__figure");
const pokemonsImg = (pokemones, container) => {
    container.innerHTML += `
    <img src=${pokemones} alt="">
        `;
};
