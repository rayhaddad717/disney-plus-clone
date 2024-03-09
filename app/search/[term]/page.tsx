import AISuggestion from "@/components/AISuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { getMoviesSuggestions } from "@/lib/getMoviesSuggestions";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    term: string;
  };
}

async function SearchPage({ params: { term } }: Props) {
  if (!term) notFound();
  const termToUse = decodeURI(term);
  const configuration = {
    ALLOW_AI: process.env.ALLOW_AI === "true",
  };

  const [movies, popularMovies] = await Promise.all([
    getSearchedMovies(termToUse),
    getPopularMovies(),
  ]);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 lg:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {termToUse}</h1>
        {configuration.ALLOW_AI && <AISuggestion term={termToUse} />}
        <MoviesCarousel title="Movies" movies={movies} isVertical />
        <MoviesCarousel title="You may also like" movies={popularMovies} />
      </div>
    </div>
  );
}

export default SearchPage;
