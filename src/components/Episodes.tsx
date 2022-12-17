import React, { useState } from "react";
import { baseUrl } from "../api";
import { useQuery } from "react-query";
import axios from "axios";
import { AxiosError } from "axios";
import EpisodesCard from "../components/EpisodesCard";
import useCounterHook from "../useCounterHook";
interface Props {
  data: any;
  error: AxiosError;
  isLoading: boolean;
}
const Episodes = () => {
  const { page, handleNext, handlePrev } = useCounterHook();
  const fetchEpisodes = async (page = 1) => {
    const response = await axios(`${baseUrl}/episode?page=${page}`);
    return response?.data;
  };

  const { data, error, isLoading, isSuccess }: any = useQuery(
    ["fetchEpisodes", page],
    () => fetchEpisodes(page),
    {
      keepPreviousData: true,
    }
  );
  if (error) return <p>{`An error has occured ${error.message}`}</p>;

  return (
    <>
      <div>{isLoading && <p>Loading...</p>}</div>

      <div className="episode_Wrapper">
        {isSuccess && data.results.length
          ? data.results.map((item: any) => (
              <EpisodesCard key={item.id} item={item} />
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

export default Episodes;
