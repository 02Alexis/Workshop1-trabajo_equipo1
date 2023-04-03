const URL = "https://pokeapi.co/api/v2/pokemon";

//Nos obtiene los pokemones de la API
const getpokemons = async (url) => {
    try {
      const { data } = await axios.get(url); //desestructuración de objetos
      return data.results;
    } catch (error) {
      console.log(error);
      alert("Usuario, ocurrio un error");
      return [];
    }
  };

console.log(getpokemons(URL));