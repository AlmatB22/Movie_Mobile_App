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

// const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmE0ZThhZjE3ZGQ3YTcwZTc0YzhjYjE3MWY0OWQwOSIsIm5iZiI6MTc1NjUyNzAzNC43NDUsInN1YiI6IjY4YjI3OWJhM2RhOTljNjY1ZTFmMWE0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2yNsB4CmwurIVONrJBJyZYmPQt1fGxO5KvS1F5tOQ14'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));