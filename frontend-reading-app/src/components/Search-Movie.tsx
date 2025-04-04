import React, { useState, useEffect } from "react";
import { Movie, MoviesResponse } from "../types/Types"
import MovieCard from "../components/Movie-card";

const MovieSearch: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>(""); // State for the search input

  async function fetchMovies(movieName: string): Promise<MoviesResponse> {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:8000/movies/search/${movieName}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: MoviesResponse = await response.json();
    return data;
  }
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value); // Update search term when the user types
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!search) return; // Do nothing if the search term is empty

    setLoading(true);
    setError(null);

    try {
      const data = await fetchMovies(search);
      setMovies(data.results);
    } catch (error) {
      setError("An error occurred while fetching movies: " + error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch default movie data on initial render
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await fetchMovies("Black Widow");
        setMovies(data.results);
      } catch (error) {
        setError("An error occurred while fetching movies: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
    <h1 className="font-bold text-2xl">Search Movies</h1>

      {/* Search box */}
      <div className="mb-4">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for a movie..."
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded">Search</button>
        </form>
      </div>
      {/* Movies Display */}
      <ul className="gap-10">
        {movies.map((movie) => (
        <MovieCard movie={movie} search={true}/>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
