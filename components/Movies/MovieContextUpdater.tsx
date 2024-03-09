"use client";
import { useContext, useEffect } from "react";
import {
  GlobalStateContext,
  GlobalStateDispatchContext,
} from "../global-state-provider";
import { MovieDetail } from "@/typings";

type Props = {
  movieDetail: MovieDetail;
};
export default function MovieContextUpdater({ movieDetail }: Props) {
  const globalState = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalStateDispatchContext);
  useEffect(() => {
    // if (!globalState.isChatbotVisible) dispatch({ type: "SHOW_CHATBOT" });

    dispatch({ type: "UPDATE_MOVIE_CONTEXT", payload: { movieDetail } });
  }, [movieDetail]);

  return <></>;
}
