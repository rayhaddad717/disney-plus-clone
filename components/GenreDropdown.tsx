"use client";
import { Genres } from "@/typings";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useParams } from "next/navigation";

function GenreDropdown() {
  const [data, setData] = useState<Genres>({ genres: [] });
  const params = useParams<{ id: string }>();
  useEffect(() => {
    const init = async () => {
      const { data }: { data: Genres } = await (
        await fetch(`/api/genre`)
      ).json();
      setData(data);
    };
    init();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex justify-center items-center">
        Genre <ChevronDown className="ml-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data?.genres?.map((genre) => (
          <DropdownMenuItem key={genre.id} asChild>
            <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
              <p
                className={`${
                  params.id === genre.id?.toString()
                    ? "text-[#B18C19] font-bold"
                    : ""
                }`}
              >
                {" "}
                {genre.name}
              </p>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default GenreDropdown;
