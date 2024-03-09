import * as React from "react";

import { MovieCredits } from "@/typings";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import getImagePath from "@/lib/getImagePath";

type Props = {
  movieCredits: MovieCredits;
};
export function MovieCredits({ movieCredits }: Props) {
  return (
    <div
      className="flex flex-col gap-4 w-max-80vw overflow-hidden"
      style={{ marginTop: 96 }}
    >
      <h1 className="text-3xl font-bold">Top Cast</h1>
      <ul className="w-full flex flex-wrap items-center justify-between gap-6">
        {movieCredits.cast.map((cast, index) => (
          <li
            className="w-full  md:w-[34%] lg:w-[30%] min-h-14 flex gap-4"
            key={cast.id}
          >
            <Avatar className="h-24 w-fit">
              <AvatarImage
                src={getImagePath(cast.profile_path)}
                alt={cast.name}
                className="object-cover"
              />
              <AvatarFallback>
                {cast.name.split(" ")?.[0]?.[0]}{" "}
                {cast.name.split(" ")?.[1]?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 py-2">
              <span className="font-bold">{cast.name}</span>
              <span className="text-gray-300">{cast.character}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
