"use client";

import { Movie } from "@/typings";
import React, { useContext, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import getImagePath from "@/lib/getImagePath";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";
import {
  GlobalStateContext,
  GlobalStateDispatchContext,
} from "./global-state-provider";

Autoplay.globalOptions = {
  delay: 8000,
};
type Props = {
  movies: Movie[];
};
function CarouselsBanner({ movies }: Props) {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);
  const globalState = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalStateDispatchContext);
  useEffect(() => {
    if (globalState.movieDetail)
      dispatch({
        type: "UPDATE_MOVIE_CONTEXT",
        payload: { movieDetail: null },
      });
  }, [dispatch, globalState]);
  return (
    <Carousel
      className="overflow-hidden lg:-mt-40 relative cursor-pointer"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {movies
          ?.filter((m) => m.backdrop_path)
          ?.map((movie) => (
            <CarouselItem key={movie.id}>
              <Link
                href={`/movies/${
                  movie.title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "") // Replace non-alphanumeric characters except for spaces and dashes
                    .replace(/\s+/g, "-") // Replace spaces with dashes
                }--${movie.id}?source=CarouselBanner`}
                className="flex-full min-w-0 relative"
                key={movie.id}
              >
                <Image
                  src={getImagePath(movie.backdrop_path, true)}
                  key={movie.id}
                  alt={movie.title}
                  width={1920}
                  height={1080}
                  loading="lazy"
                />
                <div
                  className="hidden md:inline absolute mt-0 top-0 pt-40 xl:pt-52
              left-0 lg:mt-40 bg-transparent
              h-full w-full bg-gradient-to-r from-gray-900/90 via-transparent to-transparent
              p-10 space-y-5 text-white
              z-20"
                >
                  <h2 className="text-5xl font-bold max-w-xl z-50">
                    {movie.title}
                  </h2>
                  <p className="max-w-xl line-clamp-3">{movie.overview}</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CarouselsBanner;
