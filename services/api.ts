export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  header: {
    accept: "application/json",
    Authorization: `Bearer $ {process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

 

// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDEyNzRmYmVmMjQxZDVjMjdhYTZlY2M5YTRiZjQ1OCIsIm5iZiI6MTY5Njc0NDE2Ni42ODksInN1YiI6IjY1MjI0MmU2NzQ1MDdkMDExYzEyMWMzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0inAjCma_SK07W5MhKgzsSn3l66_5LMNInKktuD184U'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
