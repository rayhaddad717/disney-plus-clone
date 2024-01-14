import { getMoviesSuggestions } from "@/lib/getMoviesSuggestions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");
  const res = await getMoviesSuggestions(term!);
  return Response.json({ message: res.body });
}
