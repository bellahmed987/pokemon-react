import { useEffect, useState } from "react";
import Card from './card.jsx';

export default function Poke() {
    const [limit, setLimit] = useState(32);
    const [offset, setOffset] = useState(0);
    const [pokee, setPoke] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchapi = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await res.json();
            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            });
            const details = await Promise.all(detailedPokemonData);
            setPoke((prev) => [...prev, ...details]);
            setHasMore(data.next !== null); // Check if there's more data to load
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchapi();
    }, [offset]);

    const loadMore = () => {
        setOffset((prev) => prev + limit);
    };

    const filteredPokemons = pokee.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <h1>LET'S CATCH THE POKÉMON</h1>
            <input
                placeholder="Search Pokémon"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="cardslist">
                {filteredPokemons.map((pokemon) => (
                    <Card key={pokemon.id} pokmon={pokemon} />
                ))}
            </div>
            {loading && <span className="loader"></span>}
            {hasMore && !loading && (
                <button className="button-27" onClick={loadMore}>Load More</button>
            )}
        </>
    );
}
