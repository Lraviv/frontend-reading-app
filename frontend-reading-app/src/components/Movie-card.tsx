
import React, { useState } from 'react'
import { Movie } from '../types/Types'
import axios from 'axios';

interface MovieCardProps {
    movie: Movie;
    search: boolean;
  }

interface NewMovie {
    title: string;
    overview: string;
    vote_average: number;
    release_date: string;
    my_rating: number;
    poster_path: string;
}

 const MovieCard: React.FC<MovieCardProps> = ({ movie , search}) => {
    const [Movies, setMovies] = useState<Movie[]>([])
    const [error, setError] = useState<string | null>(null);
  
    const HandleAddButton = () => {
        
        return;
    }

    const addMovie = async (NewMovie: NewMovie) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
            "http://127.0.0.1:8000/movies/",
            NewMovie,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setMovies((prevBooks) => [...prevBooks, response.data]);
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
                {search&&
                <div className='w-fit'>
                    <button onClick={HandleAddButton} className="bg-gray-800 hover:bg-blue-700 hover:scale-110 text-white font-bold py-2 px-4 text-xl rounded-2xl">
                        +
                    </button>
                </div>
                }
            </div>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
          </li>
          </div>
  )
}

export default MovieCard
