import React, { useState } from "react";
// import { Movie, MoviesResponse } from "../types/Types"
import Navbar from "../components/Navbar";
// import MovieCard from "../components/Movie-card";
import MovieSearch from "../components/Search-Movie";
import MyMovies from "../components/My-Movies";

export default function MoviePage() {
    const [page, setPage] = useState("my movies")
    return (
        <div className="flex flex-col gap-4 justify-between">
        <Navbar/>
        {/* page navbar */}
        <div className="inline-flex">
            <button 
                onClick={()=>{setPage("my movies")}}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                My Movies
            </button>
            <button onClick={()=>{setPage("search")}} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                 Search Movies
        </button>
        </div>
        {/* display movies  */}
        {page=="search"?
        <MovieSearch/>: 
        <MyMovies />}
        </div>
  );
};

