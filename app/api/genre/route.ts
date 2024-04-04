import { fetchGenresFromTMDB } from "@/lib/getGenre";

export async function GET(request: Request) {
  const data = await fetchGenresFromTMDB();
  return Response.json({ data });
}
