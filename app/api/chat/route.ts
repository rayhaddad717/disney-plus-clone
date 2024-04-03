import { getChatResponse } from "@/lib/getChatResponse";
import { IChat } from "@/typings";

type ChatResponseBody = {
  previousChats: IChat[];
  newChat: IChat;
  movieContext: string | null;
};
export async function POST(request: Request) {
  const body: ChatResponseBody = await request.json();
  if (body.movieContext) {
    const movieContextChatMessage = `The user is now in the ${body.movieContext} details page. Use this movie as your context for vague questions.`;
    const present = body.previousChats.some(
      (chat) => chat.content === movieContextChatMessage
    );
    if (!present)
      body.previousChats.push({
        content: movieContextChatMessage,
        role: "system",
      });
  }
  const res = await getChatResponse(body.previousChats, body.newChat);
  return Response.json({ message: res.body });
}
