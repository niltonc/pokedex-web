"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from '../styles/home.module.scss';

type Pokemon = {
  name: string;
  id: number;
  types: { type: { name: string } }[];
  sprites: { other: { 'official-artwork': { front_default: string } } };
};

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      const pokemonData = response.data.results;

      const fetchedPokemons = await Promise.all(
        pokemonData.map(async (pokemon: any) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        })
      );

      setPokemons(fetchedPokemons);
    };

    fetchPokemons();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Pokedex</h1>
      <div className={styles.grid}>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className={styles.card}>
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
            <p>Tipos: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
