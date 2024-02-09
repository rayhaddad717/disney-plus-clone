import { getSearchedMovies, getSearchedTVShow } from "@/lib/getMovies";
import { SearchType } from "@/typings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");
  const searchType = searchParams.get("searchType") as SearchType;

  const data =
    searchType === "tv-show"
      ? await getSearchedTVShow(term!)
      : await getSearchedMovies(term!);
  return Response.json({ data });
}
