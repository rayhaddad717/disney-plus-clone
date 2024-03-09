import { MovieCredits, SocialsInfo } from "@/typings";
import { fetchCustomFromTMDB } from "./getMovies";

export async function getMovieSocialsById(movieID: number) {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${movieID}/external_ids`
  );
  const data = await fetchCustomFromTMDB<SocialsInfo>(url);
  return data;
}
export async function getMovieCreditsById(movieID: number) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${movieID}/credits`);
  const data = await fetchCustomFromTMDB<MovieCredits>(url);
  return data;
}
