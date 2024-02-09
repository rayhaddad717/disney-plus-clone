import { getChatResponse } from "@/lib/getChatResponse";
import { IChat } from "@/typings";

type ChatResponseBody = {
  previousChats: IChat[];
  newChat: IChat;
};
export async function POST(request: Request) {
  const body: ChatResponseBody = await request.json();
  const res = await getChatResponse(body.previousChats, body.newChat);
  return Response.json({ message: res.body });
}
