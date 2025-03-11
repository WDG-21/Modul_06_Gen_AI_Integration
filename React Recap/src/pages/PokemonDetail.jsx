import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        // console.log(response);
        setPokemon(response.data);
      } catch (error) {
        console.error('error fetching pokemon details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  return (
    <div className='p-6 text-center flex flex-col'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className='text-3-xl uppercase font-bold'>{pokemon.name}</h2>
          <img
            src={pokemon.sprites?.other?.showdown?.front_default}
            alt='pokemonImage'
            className='w-40 mx-auto'
          />
          <p className='text-lg'>Weight:{pokemon.weight / 10} kg</p>
          <p className='text-lg'>Height:{pokemon.height / 10} m</p>
          <ul>
            <p>MOVES:</p>
            {pokemon.moves?.slice(0, 5).map((m, index) => (
              <li key={index}>{m.move.name}</li>
            ))}
          </ul>
          <button
            onClick={() => navigate(-1)}
            className='text-blue-500 underline'
          >
            BACK
          </button>
          <br />
          <Link className='text-blue-500 underline' to='/'>
            BACK TO HOMEPAGE
          </Link>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
