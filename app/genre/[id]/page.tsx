import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};
function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
  return (
    <div className="text-red-500">
      Welcoe to the genre {id}, {genre}
      <Button variant={"outline"}>Click me</Button>
    </div>
  );
}

export default GenrePage;
