const fetchSWPlanets = async () => {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const reponse = await fetch(endPoint);
  const data = await reponse.json();
  return data;
};

export default fetchSWPlanets;
