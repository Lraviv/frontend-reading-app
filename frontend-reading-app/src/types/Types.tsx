
export interface Book {
    _id: string;
    name: string;
    author: string;
    chapters: number;
    status: string;
    rating: number;
  }
  
 export interface NewBook {
      name: string;
      author: string;
      chapters: number;
      status: string;
      rating: number;
    }

export interface Movie {
      title: string;
      overview: string;
      poster_path: string | null;
      vote_average: number;
      release_date: string;
    }
    
export interface MoviesResponse {
      page: number;
      results: Movie[];
    }