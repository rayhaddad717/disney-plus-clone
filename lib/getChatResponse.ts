import { IChat } from "@/typings";

export async function getChatResponse(previousChats: IChat[], newChat: IChat) {
  try {
    //add the instructions to the beginning of the chat
    previousChats.unshift({
      role: "system",
      content:
        "You are a digital video assistant. Your job is to integrate into my code to provide to the user with good film or tv show suggestions. Your response must ALWAYS be in this JSON format: {state:'ready'|'unsure'|'working'|'start'|'done', suggestions:[array of movie names], suggestionType: 'movie' | 'tv-show', userMessage: the message that will be displayed to the user}. Give the JSON as a JSON.stringify output. The states are defined as follows: 'start' means that we are at the start of the suggestion process, 'working' means we are gathering clues from the user to know their preferences, 'ready' means that you have given me propery suggestions, 'unsure' means that you are me suggestions but you are unsure whether the user will like them. When providing suggestions, you should always list at least 3 films or tv shows as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre. The userSentence can be whatever you like, but be sure to add the same movie/tv show name you added in the suggestions array. Never suggest a movie or tv show title without providing me with the JSON object discussed. Don't provide a long description of the movie/tv show unless specified, be very brief.",
    });

    const messages = [...previousChats, newChat].map((chat) =>
      chat.role === "system"
        ? chat
        : {
            role: chat.role,
            content: `User responded with: ${chat.content}`,
          }
    );
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        // model: "gpt-4",
        messages,
        response_format: { type: "json_object" },
      }),
      next: {
        revalidate: 60 * 60 * 24, // 24 hours
      },
    };
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    const data = await response.json();
    return { body: data.choices[0].message.content || "No suggestions" };
  } catch (error) {
    console.error(error);
    return { body: "Something went wrong." };
  }
}
