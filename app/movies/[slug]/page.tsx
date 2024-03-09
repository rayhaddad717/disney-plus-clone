import { MovieVideosCarousel } from "@/components/Movies/MovieVideosCarousel";
import { Progress } from "@/components/ui/progress";
import getImagePath from "@/lib/getImagePath";
import { getMovieDetailsById, getMovieVideosById } from "@/lib/getMovies";
import {
  getMovieCreditsById,
  getMovieSocialsById,
} from "@/lib/getMovieDetails";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { MovieCredits } from "@/components/Movies/MovieCredits";
import MovieContextUpdater from "@/components/Movies/MovieContextUpdater";

interface Props {
  params: {
    slug: string;
  };
}

async function MovieDetailsPage({ params: { slug } }: Props) {
  if (!slug) notFound();
  const splitSlug = slug.split("--");

  const movieID = parseInt(splitSlug[splitSlug.length - 1]);
  if (!Number.isInteger(movieID)) notFound();
  const [movie, movieVideos, movieCredits, movieSocials] = await Promise.all([
    getMovieDetailsById(movieID),
    getMovieVideosById(movieID),
    getMovieCreditsById(movieID),
    getMovieSocialsById(movieID),
  ]);
  const movieSocialsData = [
    {
      platform: "Facebook",
      id: movieSocials.facebook_id,
      link: ``,
    },
    {
      platform: "IMDb",
      id: movieSocials.imdb_id,
      link: `https://www.imdb.com/title/${movieSocials.imdb_id}`,
    },
    {
      platform: "Instagram",
      id: movieSocials.instagram_id,
      link: `https://www.instagram.com/${movieSocials.instagram_id}/`,
    },
    {
      platform: "X",
      id: movieSocials.twitter_id,
      link: `https://twitter.com/${movieSocials.twitter_id}`,
    },
  ].filter((x) => x.id);
  function getRuntime(runtime: number) {
    let fullRuntime = "";
    if (runtime % 60 > 0) {
      fullRuntime = fullRuntime.concat(`${Math.floor(runtime / 60)}h `);
    }

    fullRuntime = fullRuntime.concat(`${runtime % 60}m`);
    return fullRuntime;
  }

  return (
    <div className="max-w-7xl mx-auto flex-1 px-6 xl:px-0">
      <div className="flex flex-col space-y-5 mt-32 lg:mt-42">
        <div className="flex justify-between items-center">
          <figure className="max-w-screen-md">
            <div className="flex items-center mb-4 text-yellow-300">
              {Array.from({ length: Math.floor(movie.vote_average) }).map(
                (_, index) => (
                  <svg
                    key={`star-${index}`}
                    className="w-5 h-5 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                )
              )}
              {movie.vote_average - Math.floor(movie.vote_average) >= 0.5 && (
                <svg
                  className="w-5 h-5 me-1"
                  viewBox="0 -32 576 576"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" />
                </svg>
              )}
              <p className="mx-4">-</p>
              <p className="">{movie.vote_average.toFixed(1)} / 10</p>
            </div>
            {movie.tagline && (
              <blockquote>
                <p className="text-4xl font-semibold italic text-gray-900 dark:text-white">
                  "{movie.tagline}"
                </p>
              </blockquote>
            )}
            <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
              <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                  {movie.vote_count} Voters
                </cite>
              </div>
            </figcaption>
          </figure>
          <div className="flex flex-col">
            <span>{movie.popularity} Popularity</span>

            <Progress value={movie.popularity} className="w-[60%]" />
          </div>
        </div>

        <div className="flex gap-4 flex-col lg:flex-row justify-center px-4">
          <Image
            className="w-fit lg:min-w-[280px] h-[420px] object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
            alt={movie.title}
            width={280}
            height={420}
            key={movie.id}
            src={getImagePath(movie.poster_path)}
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">{movie.title}</h1>
            <ul className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <li
                  key={genre.id}
                  className="w-fit border-[1px]  p-1 px-2   text-black rounded-full bg-gray-300 hover:bg-gray-400 transition-all ease-in-out duration-200"
                >
                  <Link
                    key={`genre-${genre.id}`}
                    href={`/genre/${genre.id}?genre=${genre.name}`}
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3>{movie.overview}</h3>
            <div className="flex flex-col gap-2 my-auto">
              <h3>Release Date: {movie.release_date}</h3>
              <h3>Runtime: {getRuntime(movie.runtime)}</h3>
              <h3>
                Languages:
                {movie.spoken_languages.reduce(
                  (prev, cur) => prev + " " + cur.english_name,
                  ""
                )}
              </h3>
              <h3> ${movie.budget.toLocaleString()} Budget</h3>
              <Link href={movie.homepage}>
                <p className="hover:text-orange-400 text-yellow-400 transition-all ease-in-out duration-200  underline text-xl font-bold">
                  Official Site
                </p>
              </Link>

              {movie.belongs_to_collection && (
                <h3>{movie.belongs_to_collection.name}</h3>
              )}
            </div>
          </div>
        </div>
        <div
          className="flex flex-col gap-4 mt-[6rem] "
          style={{ marginTop: 96 }}
        >
          <h1 className="text-3xl font-bold w-full">
            Trailers, Videos, and more
          </h1>
          <MovieVideosCarousel movieVideos={movieVideos} />
        </div>
        <div
          className="flex flex-col gap-4 mt-[6rem]"
          style={{ marginTop: 96 }}
        >
          <h3 className="text-3xl font-bold">Socials</h3>
          <ul className="flex flex-col pl-4">
            {movieSocialsData.map((social) => (
              <li key={social.platform}>
                <Link href={social.link} target="_blank">
                  <p className="hover:text-orange-400 transition-all ease-in-out duration-200  hover:underline text-lg font-bold">
                    {social.platform}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <MovieCredits movieCredits={movieCredits} />
      </div>
      <MovieContextUpdater movieDetail={movie} />
    </div>
  );
}

export default MovieDetailsPage;
