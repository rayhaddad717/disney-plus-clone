"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  use,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl } from "./ui/form";
import { Input } from "./ui/input";
import Image from "next/image";
import { IChat, SearchType } from "@/typings";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Movie } from "@/typings";
import getImagePath from "@/lib/getImagePath";
import Link from "next/link";
import {
  GlobalStateContext,
  GlobalStateDispatchContext,
} from "./global-state-provider";
import { Skeleton } from "./ui/skeleton";
const formSchema = z.object({
  input: z.string().min(2).max(100),
});
function AIChatbot() {
  const globalState = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalStateDispatchContext);
  const [messages, setMessages] = React.useState<IChat[]>([]);
  const [state, setState] = useState<"waiting" | "sending">("waiting");
  const ulRef = React.useRef<HTMLUListElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });
  const [suggestedUserMessages, setSuggestedUserMessages] = useState([
    "I am looking for a comedic movie",
    "I am in for a scare!",
    "Just Browsing",
  ]);
  const askAI = useCallback(async (previousChats: IChat[], newChat: IChat) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        previousChats,
        newChat,
      }),
    });
    const json = await res.json();
    return json.message;
  }, []);
  useEffect(() => {
    setTimeout(() => {
      askAI([], { content: "Hello", role: "user" } as IChat).then(
        (newMessage) => {
          setMessages([{ content: newMessage, role: "system" } as IChat]);
          const parsedMessage = JSON.parse(newMessage);
          if (parsedMessage?.suggestedUserMessages?.length) {
            setSuggestedUserMessages(parsedMessage.suggestedUserMessages);
          } else {
            setSuggestedUserMessages([]);
          }
        }
      );
    }, 250);
  }, [setMessages, askAI]);
  const userMessages = messages.map((message) => {
    const userMessage = {
      ...message,
      actions: {
        links: [],
      },
      searchType: "movie" as SearchType,
    };
    if (userMessage.role === "user") return userMessage;
    try {
      const parsedMessage = JSON.parse(userMessage.content);
      if (parsedMessage?.state) {
        userMessage.searchType = parsedMessage.suggestionType || "movie";
        switch (parsedMessage.state) {
          case "ready":
          case "done":
          case "unsure": {
            userMessage.actions.links = parsedMessage.suggestions;
          }
        }
        return { ...userMessage, content: parsedMessage.userMessage };
      }
      return userMessage;
    } catch (error) {
      return userMessage;
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setState("sending");
    form.reset();
    const newChat = { content: values.input, role: "user" } as IChat;
    setMessages([...messages, newChat]);
    askAI(messages, newChat as IChat).then((newMessage) => {
      try {
        const parsedMessage = JSON.parse(newMessage);
        if (parsedMessage?.suggestedUserMessages?.length) {
          setSuggestedUserMessages(parsedMessage.suggestedUserMessages);
        } else {
          setSuggestedUserMessages([]);
        }
      } catch (error) {}
      const newMessages = [
        ...messages,
        newChat,
        { content: newMessage, role: "system" } as IChat,
      ];
      setMessages([...newMessages]);
      setTimeout(() => {
        if (ulRef.current) {
          ulRef.current.scrollTo({
            top: ulRef.current.scrollHeight * 10,
            behavior: "smooth",
          });
        }
      }, 50);
      setState("waiting");
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col justify-end items-end space-y-2">
      <div
        className={`bg-[#1A1C29] absolute bottom-0   w-[75vw]  md:w-[400px] max-w-lg  text-black dark:text-white rounded-2xl  flex flex-col items-center transition-all duration-500 ease-in-out h-[80vh]  ${
          globalState.isChatbotVisible
            ? "opacity-100"
            : " opacity-0 translate-y-full"
        } overflow-hidden`}
        style={{
          WebkitBoxShadow: "0px 6px 24px 0px rgba(0,0,0,0.75)",
          MozBoxShadow: "0px 6px 24px 0px rgba(0,0,0,0.75)",
          boxShadow: "0px 6px 24px 0px rgba(0,0,0,0.75)",
        }}
      >
        <div className="w-full flex flex-col flex-1 ">
          {/* header */}
          <div className="bg-[#1A1C29] rounded-t-xl p-4 flex justify-between items-center">
            <div className="w-full flex items-center space-x-2">
              {state === "sending" ? (
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
              ) : (
                <div className="animate-pulse rounded-full bg-gradient-to-t from-white h-10 w-10 border-2 flex-shrink-0 border-whiet"></div>
              )}
              <div className="flex flex-col justify-center ">
                <p className="text-sm text-gray-400">
                  This is your AI Assistant
                </p>
                <p>
                  {state === "sending" ? "Thinking..." : "Ask me Anything..."}
                </p>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => dispatch({ type: "TOGGLE_CHATBOT" })}
            >
              <Image
                src={"/icons/chevron_down.svg"}
                alt={"close ai assistant"}
                width={20}
                height={20}
              />
            </div>
          </div>
          {/* end header */}
          {/* start messages */}
          <ul
            ref={ulRef}
            className="max-h-[100%] overflow-y-auto overflow-x-hidden flex flex-col w-full flex-1 gap-4 shrink-1 basis-0 py-1 bg-[#1A1C29]"
          >
            {userMessages.map((message, index) => (
              <li
                key={`message-${index}`}
                className={`w-fit border-[1px] max-w-[60%] p-2 px-4 mx-2   text-black rounded-2xl ${
                  message.role === "user"
                    ? " bg-[#B18C19] ml-auto "
                    : " bg-gray-300 "
                } `}
              >
                <p className="text-sm font-medium">{message.content}</p>
                <div className="flex gap-1 flex-wrap">
                  {message?.actions?.links?.length > 0 &&
                    message.actions.links.map((link, sugIndex) => (
                      <LinkPopover
                        key={`suggestion-${sugIndex}`}
                        link={link}
                        itemType={message.searchType}
                      />
                    ))}
                </div>
              </li>
            ))}

            {state === "sending" ? (
              <li className="w-fit max-w-[60%] border-[1px] rounded-lg p-2 px-4 bg-gray-300 text-black mx-2 text-sm font-medium">
                <p>Thinking....</p>
              </li>
            ) : (
              suggestedUserMessages.length && (
                <li className="ml-auto mx-2 max-w-[80%] flex flex-wrap gap-2 justify-end">
                  {suggestedUserMessages.map((suggestion, index) => (
                    <p
                      onClick={() => onSubmit({ input: suggestion })}
                      key={`suggestedUserMessage-${index}`}
                      className="  rounded-2xl  border-[1px] border-white cursor-pointer hover:border-[#B18C19] hover:text-[#B18C19] transition-all duration-200 ease-in-out  w-fit  p-2 px-4  text-sm font-normal"
                    >
                      {suggestion}
                    </p>
                  ))}
                </li>
              )
            )}
          </ul>
          {/* end messages */}
        </div>
        {/* start form */}
        {globalState.isChatbotVisible && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-between w-full bg-[#1A1C29] px-2 py-2 gap-2"
            >
              <div className="flex-1">
                <FormField
                  disabled={state === "sending"}
                  control={form.control}
                  name="input"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Ask your assistant..."
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <button
                disabled={state === "sending"}
                type="submit"
                className="min-w-10"
              >
                <Image
                  src={"/icons/paper_plane.svg"}
                  alt={"submit message"}
                  width={20}
                  height={20}
                />
              </button>
            </form>
          </Form>
        )}
        {/* end form */}
      </div>
      {!globalState.isChatbotVisible && (
        <div
          style={{
            WebkitBoxShadow: "0px 6px 24px 0px rgba(0,0,0,0.75)",
            MozBoxShadow: "0px 6px 24px 0px rgba(0,0,0,0.75)",
            boxShadow: "0px 6px 24px 0px rgba(0,0,0,0.75)",
          }}
          className="h-[64px] w-[64px] bg-zinc-600 rounded-full cursor-pointer text-center flex justify-center items-center"
          onClick={() => dispatch({ type: "TOGGLE_CHATBOT" })}
        >
          {/* <p className="text-4xl font-bold"> */}
          <img
            src={"/images/chatbot.png"}
            width={32}
            height={32}
            alt="Ask AI"
            style={{
              filter:
                "invert(100%) sepia(100%) saturate(1%) hue-rotate(287deg) brightness(104%) contrast(101%)",
            }}
          />
          {/* </p> */}
        </div>
      )}
    </div>
  );
}
const LinkPopover = React.memo(function ({
  link,
  itemType,
}: {
  link: string;
  itemType: "movie" | "tv-show";
}) {
  const [open, setOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  // Store the timeout ID so it can be cleared on re-enter
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const openTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const dispatch = useContext(GlobalStateDispatchContext);
  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const res: { data: Movie[] } = await (
          await fetch(`/api/search?term=${link}&searchType=${itemType}`)
        ).json();
        if (res.data.length > 0) {
          setMovie(res.data[0]);
        }
      };
      fetchMovies();
    } catch (error) {}
  }, [link, itemType]);
  const handleMouseEnter = () => {
    // Clear any existing timeout to prevent the popover from closing if mouse re-enters
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Set a timeout to close the popover after 3 seconds
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true);
      // Once executed, clear the timeout reference
      openTimeoutRef.current = null;
    }, 200);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    // Set a timeout to close the popover after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      // Once executed, clear the timeout reference
      timeoutRef.current = null;
    }, 100);
  };

  const handleClick = () => {
    setOpen(false);
    dispatch({ type: "HIDE_CHATBOT" });
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={`/search/${link}`}>
          <p
            onClick={handleClick}
            className="hover:underline text-sm font-bold"
          >
            {link}
          </p>
        </Link>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {movie ? (
          <div className="relative flex-shrink-0 cursor-pointer hover:drop-shadow-lg">
            <div className="flex gap-2 items-center mb-2">
              {!imageLoaded && (
                <Skeleton className="h-[60px] w-[80px] rounded-xl" />
              )}

              <Image
                className={`w-fit  object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm  ${
                  imageLoaded ? "block" : "h-0 w-0"
                }`}
                alt={movie.title}
                width={80}
                height={60}
                key={movie.id}
                src={getImagePath(movie.backdrop_path || movie.poster_path)}
                onLoad={() => setImageLoaded(true)}
              />

              <p className=" line-clamp-3">
                {movie.title || movie["name"]} (
                {(movie.release_date || movie.first_air_date)?.split("-")[0]})
              </p>
            </div>
            <p className="line-clamp-3 text-sm">{movie.overview}</p>
            <p className="mt-4 text-md">
              Rating: {movie.vote_average?.toFixed(2)} / 10
            </p>
            <Link href={`/search/${link}`}>
              <p
                className="text-sm text-gray-700 font-bold hover:underline ml-auto cursor-pointer"
                onClick={handleClick}
              >
                More Info
              </p>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <Skeleton className="h-[60px] w-full rounded-xl" />
            </div>
            <div className="flex">
              <Skeleton className="h-[150px] w-full rounded-xl" />
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
});
LinkPopover.displayName = "LinkPopover";
export default AIChatbot;
