import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    term: string;
  };
}

function SearchPage({ params: { term } }: Props) {
  if (!term) notFound();
  const termToUse = decodeURI(term);
  return <div>Welcome to the search page {termToUse}</div>;
}

export default SearchPage;
