import React, { useState, useEffect } from "react";
import { baseUrl } from "../api";
import { useQuery } from "react-query";
import axios from "axios";
import CharactersCard from "./CharactersCard";
import Search from "./Search";
import useCounterHook from "../useCounterHook";

const Characters = () => {
  const { page, handleNext, handlePrev } = useCounterHook();

  const [searchError, setSearchError] = useState<string>("");

  const fetchCharacters: any = async (page = 1): Promise<any> => {
    const response = await axios(`${baseUrl}/character?page=${page}`);
    return response?.data;
  };
  const { data, error, isSuccess, isLoading, isFetching, isError }: any =
    useQuery(
      ["fetchCharacters", page],
      () => fetchCharacters(page),

      {
        keepPreviousData: true,

        refetchOnMount: true,
      }
    );

  if (isLoading) {
    <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  if (isError) return <p>{`An error has occured ${error.message}`}</p>;
  console.log(data);
  console.log({ isLoading, isFetching });
  return (
    <>
      <div>{isFetching && <p>Fetching...</p>}</div>

      <p className="search-title">{searchError}</p>
      <h2>All characters</h2>
      <div className="episode_Wrapper">
        {isSuccess && data.results.length
          ? data.results.map((item: any) => (
              <CharactersCard key={item.id} item={item} />
            ))
          : null}
      </div>
      <p>{`Page ${page} out of ${data?.info.pages}`}</p>
      <div className="btn_wrapper">
        <button
          className="btn_pagination"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="btn_pagination"
          disabled={page === 42}
          onClick={() => {
            console.log("hey");
            handleNext();
          }}
          // Disable the Next Page button until we know a next page is available
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Characters;
