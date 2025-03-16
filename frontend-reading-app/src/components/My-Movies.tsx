import React, { useState, useEffect } from "react";
import { Movie } from "../types/Types"
import MovieCard from "../components/Movie-card";


const MyMovies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [search, setSearch] = useState<string>(""); // Search term
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchMovieData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://127.0.0.1:8000/movies/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error("Failed to fetch movies");
          
          const data: Movie[] = await response.json();
          setMovies(data);
        } catch (error) {
          setError("An error occurred while fetching movies: " + error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMovieData();
    }, []);
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    };
  
    // Filter movies based on search query
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-2">
        
      <h1 className="font-bold text-2xl">My Movies</h1>

     {/* Search box */}
     <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for a movie..."
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded">Search</button>
      </div>

      {filteredMovies.length > 0 ? (
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard movie={movie} search={false}/>
        ))}
      </ul>
      ) : (
        <p className="text-gray-500">No movies found.</p>
      )}
    </div>
  );
};

export default MyMovies;
