export const fetchMovies = async ({ query }: { query: string }) => {
  // const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDEyNzRmYmVmMjQxZDVjMjdhYTZlY2M5YTRiZjQ1OCIsIm5iZiI6MTY5Njc0NDE2Ni42ODksInN1YiI6IjY1MjI0MmU2NzQ1MDdkMDExYzEyMWMzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0inAjCma_SK07W5MhKgzsSn3l66_5LMNInKktuD184U";
  const accessToken = process.env.EXPO_PUBLIC_MOVIE_API_KEY; // v4 Access Token (JWT)
  const endpoint = query
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`
    : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`, // THIS is correct for v4
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("API Error:", errorData);
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};
