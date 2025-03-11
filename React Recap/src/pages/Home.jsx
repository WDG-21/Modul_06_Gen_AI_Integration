import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

  console.log(isLoggedIn);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=150'
        );
        // console.log(response);
        setPokemons(response.data.results);
      } catch (error) {
        console.error('error fetching pokemons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  // console.log(pokemons);

  return (
    <div className='p-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        pokemons.map((pokemon, index) => {
          const pokemonId = index + 1;
          return (
            <Link
              key={pokemonId}
              to={`/pokemon/${pokemonId}`}
              className='bg-white p-4 shadow-lg rounded-lg text-center hover:scale-105 transition'
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`}
                alt='pokemon'
                className='w-24 h-24 mx-auto'
              />
              <p className='text-lg font-bold uppercase'>{pokemon.name}</p>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default Home;
