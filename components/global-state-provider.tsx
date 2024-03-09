"use client";

import { MovieDetail } from "@/typings";
import * as React from "react";

import { createContext, useState } from "react";
// Define types
type State = {
  isChatbotVisible: boolean;
  movieDetail: MovieDetail | null;
};

type Action = {
  type:
    | "TOGGLE_CHATBOT"
    | "HIDE_CHATBOT"
    | "SHOW_CHATBOT"
    | "UPDATE_MOVIE_CONTEXT";
  payload?: {
    movieDetail?: MovieDetail | null;
  };
};

// Initial state
const initialState: State = {
  isChatbotVisible: true,
  movieDetail: null,
};

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_CHATBOT":
      return {
        ...state,
        isChatbotVisible: !state.isChatbotVisible,
      };
    case "HIDE_CHATBOT":
      return {
        ...state,
        isChatbotVisible: false,
      };
    case "SHOW_CHATBOT":
      return {
        ...state,
        isChatbotVisible: true,
      };
    case "UPDATE_MOVIE_CONTEXT": {
      return {
        ...state,
        movieDetail: action.payload?.movieDetail || null,
      };
    }
    default:
      return state;
  }
};
export const GlobalStateContext = createContext(initialState);
export const GlobalStateDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);
export const GlobalStateContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [val, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={val}>
      <GlobalStateDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalStateDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};
