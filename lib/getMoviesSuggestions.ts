export async function getMoviesSuggestions(term: string) {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
    },
    body: JSON.stringify({
      // model: "gpt-3.5-turbo",
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a digital video assistant working for services such as Netflix, Disney Plus, and Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide a quirky breakdown of what the user shoud watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre.  ",
        },
        {
          role: "user",
          content: `${term}`,
        },
      ],
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
}
