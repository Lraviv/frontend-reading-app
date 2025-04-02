
import React, { useState } from 'react'
import { Movie } from '../types/Types'
import axios from 'axios';

interface MovieCardProps {
    movie: Movie;
    search: boolean;
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>; // Accept setMovies from parent

  }

interface NewMovie {
    title: string;
    overview: string;
    vote_average: number;
    release_date: string;
    my_rating: number;
    poster_path: string | null;
}

 const MovieCard: React.FC<MovieCardProps> = ({ movie , search}) => {
    const [Movies, setMovies] = useState<Movie[]>([])
    const [error, setError] = useState<string | null>(null);
  

    const addMovie = async (NewMovie: NewMovie) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
            "http://127.0.0.1:8000/movies",
            NewMovie,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setMovies((prevMovies) => [...prevMovies, response.data]);
        } catch (err) {
          setError("Error adding book.");
          console.error(err);
        }
      };

      const deleteMovie = async (movie_id: string) => {
        try 
          const token = localStorage.getItem("token");
          await axios.delete(`http://127.0.0.1:8000/movies/${movie_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setMovies((prevMovies) => prevMovies.filter((movie) => movie.title !== movie_id));
          
        } catch (err) {
          setError("Error adding book.");
          console.error(err);
        }
      };
  return (
    <div className="flex bg-gradient-to-bl bg-gray-100 bg-gray-300 rounded-2xl p-8 m-4">
          
          <li key={movie.title}>
            <h3 className="font-bold">{movie.title}</h3>
            <div className="flex flex-row ">
                <div className='w-full'>
                    {movie.poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: '100px', height: '150px' }}
                    />
                    )}
                </div>
                
                
            </div>
            
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            {search?
                <div className='w-fit'>
                    <button 
                        onClick={() => addMovie({
                            title: movie.title,
                            overview: movie.overview,
                            vote_average: movie.vote_average,
                            release_date: movie.release_date,
                            my_rating: 0, // Default rating since it's not provided
                            poster_path: movie.poster_path
                        })}
                        className="bg-gray-800 hover:bg-blue-700 hover:scale-110 text-white font-bold py-2 px-4 text-xl rounded-2xl">
                        +
                        </button>
                </div>:
                <div className='absoulute gap-2 w-4 h-10'>
                    <button
                    onClick={()=> deleteMovie(movie.title)}
                    className="bg-gray-800 hover:bg-blue-700 hover:scale-110 text-white font-bold py-2 px-4 text-xl rounded-2xl">
                    -
                    </button>
                    <button
                    className="bg-gray-800 hover:bg-blue-700 hover:scale-110 text-white font-bold py-2 px-4 text-xl rounded-2xl">
                        ✎
                    </button>
                </div>
                }
          </li>
          </div>
  )
}

export default MovieCard
