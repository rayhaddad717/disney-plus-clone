import { Movie } from "@/typings";
import React, { useMemo } from "react";
import Image from "next/image";
import getImagePath from "@/lib/getImagePath";
import Link from "next/link";

type Props = {
  movie: Movie;
  source: "Genre" | "Search" | "Home" | "CarouselBanner";
};
function MovieCard({ movie, source }: Props) {
  const movieLink = `/movies/${
    movie.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Replace non-alphanumeric characters except for spaces and dashes
      .replace(/\s+/g, "-") // Replace spaces with dashes
  }--${movie.id}?source=${source}`;

  return (
    <Link
      className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
      href={movieLink}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29] z-10"></div>
      <p className="absolute z-20 bottom-5 left-5">{movie.title}</p>

      <Image
        className="w-fit lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
        alt={movie.title}
        width={1920}
        height={1080}
        key={movie.id}
        src={getImagePath(movie.backdrop_path || movie.poster_path)}
        loading="lazy"
      />
    </Link>
  );
}

export default MovieCard;
