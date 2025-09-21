export const TMDB_API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const fetchMovies = async ({ query }: {query: string}) => {

  console.log("API Key:", process.env.EXPO_PUBLIC_MOVIE_API_KEY);

  const endpoint = query 
  ? `${TMDB_API_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
  : `${TMDB_API_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  console.log("ENDPOINT:", endpoint)

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_API_CONFIG.headers
  })

  console.log(response)

  if (!response.ok) {
    throw new Error("Failed to fetch movies", response.statusText); 
  }

  const data = await response.json();
  return data.results;
}

export const fetchMovieDetails = async (movieId: string) : Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_API_CONFIG.BASE_URL}/movie/${movieId}`,
      {
        method: 'GET',
        headers: TMDB_API_CONFIG.headers
      }
    );

    if (!response.ok) {
      throw new Error ("Failed the fetch the movie details");
    }

    const data = await response.json();
    
    return data;
  } catch(err) {
    console.log(err);
    throw err;
  }
}