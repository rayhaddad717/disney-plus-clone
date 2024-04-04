import { Genres } from "@/typings";

export async function fetchGenresFromTMDB() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  };
  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as Genres;
  return data;
}
