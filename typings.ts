export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origianl_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  //tv show
  name?: string;
  first_air_date?: string;
};

export type SearchResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};
export interface IChat {
  role: "user" | "system";
  content: string;
}
export type SearchType = "movie" | "tv-show";
