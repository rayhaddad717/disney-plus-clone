import MoviesCarousel from "@/components/MoviesCarousel";
import { Button } from "@/components/ui/button";
import { getDiscoverMovies } from "@/lib/getMovies";
import { Metadata, ResolvingMetadata } from "next/types";
import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};
export async function generateMetadata(
  { params: { id }, searchParams: { genre } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    return {
      title: `${genre} Movies | MovieGenie`,
    };
  } catch (error) {
    return {
      title: "Movie Genie",
    };
  }
}
async function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
  const movies = await getDiscoverMovies(id);
  return (
    <div className="max-x-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 lg:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {genre}</h1>
      </div>
      <MoviesCarousel
        title={`Genre`}
        movies={movies}
        isVertical
        source="Genre"
      />
    </div>
  );
}

export default GenrePage;
