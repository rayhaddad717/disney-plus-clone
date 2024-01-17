"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl } from "./ui/form";
import { Input } from "./ui/input";
import Image from "next/image";
const formSchema = z.object({
  input: z.string().min(2).max(100),
});
function AIChatbot() {
  const [visible, setVisible] = React.useState(true);

  const [messages, setMessages] = React.useState<
    { role: "user" | "system"; message: string }[]
  >([
    {
      role: "system",
      message: "Hi, I'm your AI assistant. Ask me anything!",
    },
    {
      role: "user",
      message: "Hi, I'm your AI assistant. Ask me anything!",
    },
    {
      role: "system",
      message: "Hi, I'm your AI assistant. Ask me anything!",
    },
    {
      role: "system",
      message: "Hi, I'm your AI assistant. Ask me anything!",
    },
    {
      role: "system",
      message: "Hi, I'm your AI assistant. Ask me anything!",
    },
    {
      role: "system",
      message: "Hi, I'm your AI assistant. Ask me anything!",
    },
    {
      role: "system",
      message: "Hi, I'm your AI assistant. Ask me anything!",
    },
    {
      role: "system",
      message: "Hi, I'm your AI assistant. Ask me anything!",
    },
    {
      role: "system",
      message: "Hi, I'm your AI assistant. Ask me anything!",
    },
  ]);
  const [state, setState] = useState<"waiting" | "sending">("waiting");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setState("sending");
    const newMessages = [
      ...messages,
      { message: values.input, role: "user" },
    ] as { role: "user" | "system"; message: string }[];
    setMessages(newMessages);
    // fetch("/api/suggestions?term=" + values.input)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setMessages([
    //       ...newMessages,
    //       { message: data.message, role: "system" },
    //     ]);
    //   });
    setTimeout(() => {
      setState("waiting");
    }, 1000);
    form.reset();
  }
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col justify-end items-end space-y-2">
      <div
        className={`bg-[#FEFEFE]  w-[75vw]  md:w-[400px] max-w-lg  text-black dark:text-white rounded-2xl  flex flex-col items-center transition-height duration-300 ease-in-out ${
          visible ? "h-[70vh]" : "h-0"
        } overflow-hidden`}
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
              onClick={() => setVisible(!visible)}
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
          <ul className="max-h-[100%] overflow-y-auto overflow-x-hidden flex flex-col w-full flex-1 gap-4 shrink-1 basis-0 py-1">
            {messages.map((message) => (
              <li
                className={`w-8/12 border-[1px] rounded-full p-2 px-4 mx-2 border-white ${
                  message.role === "user" ? "ml-auto" : "bg-gray-300 text-black"
                } bg-[#1A1C29]`}
              >
                <p className="text-sm font-medium">{message.message}</p>
              </li>
            ))}
            {state === "sending" && (
              <li className="w-8/12 border-[1px] rounded-lg p-2 px-4 border-white">
                <p>Thinking....</p>
              </li>
            )}
          </ul>
          {/* end messages */}
        </div>
        {/* start form */}
        {visible && (
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
                        <Input placeholder="Ask your assistant..." {...field} />
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

      <div
        className="h-12 w-12 bg-red-500 rounded-full cursor-pointer text-center flex justify-center items-center"
        onClick={() => setVisible(!visible)}
      >
        <p>AI</p>
      </div>
    </div>
  );
}

export default AIChatbot;
