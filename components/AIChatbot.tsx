"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl } from "./ui/form";
import { Input } from "./ui/input";
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
    fetch("/api/suggestions?term=" + values.input)
      .then((res) => res.json())
      .then((data) => {
        setMessages([
          ...newMessages,
          { message: data.message, role: "system" },
        ]);
        setState("waiting");
      });
    form.reset();
  }
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col justify-end items-end space-y-2">
      {visible && (
        <div className="h-[50vh] w-[75vw] sm:w-[50vw] md:w-[35vw] max-w-lg  text-black dark:text-white rounded-sm p-4 bg-white dark:bg-[#1A1C29] border-[1px] border-white flex flex-col justify-between items-center">
          <div className="w-full space-y-4 flex flex-col flex-1 max-h-[80%]">
            <h1 className="w-full ">This is your AI Assistant</h1>
            <ul className="max-h-[100%] overflow-y-auto overflow-x-hidden flex flex-col w-full flex-1 gap-4">
              {messages.map((message) => (
                <li
                  className={`w-8/12 border-[1px] rounded-lg p-2 px-4 border-white ${
                    message.role === "user" ? "ml-auto" : ""
                  }`}
                >
                  <p className="">{message.message}</p>
                </li>
              ))}
              {state === "sending" && (
                <li className="w-8/12 border-[1px] rounded-lg p-2 px-4 border-white">
                  <p>Thinking....</p>
                </li>
              )}
            </ul>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-between w-full gap-4"
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
              <button disabled={state === "sending"} type="submit">
                Send
              </button>
            </form>
          </Form>
        </div>
      )}
      <div
        className="h-20 w-20 bg-red-500 rounded-full cursor-pointer text-center flex justify-center items-center"
        onClick={() => setVisible(!visible)}
      >
        <p>AI</p>
      </div>
    </div>
  );
}

export default AIChatbot;
