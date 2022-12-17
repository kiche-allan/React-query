import React from "react";
import axios from "axios";
import { baseUrl } from "../api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useCounterHook from "../useCounterHook";
import CharactersCard from "./CharactersCard";
const SearchResults = () => {
  const { page, handleNext, handlePrev } = useCounterHook();
  const { search } = useParams();
  const filterCharacters = async (page = 1) => {
    console.log(search, "search");
    const response = await axios(
      `${baseUrl}/character/?name=${search}&status=alive&page=${page}`
    );
    return response.data;
  };
  const { data, error, isSuccess, isLoading, isError }: any = useQuery(
    ["filterCharacters", search, page],
    () => filterCharacters(page)
  );

  if (isError) {
    <p>{error.message}</p>;
  }
  return (
    <div>
      <h2 className="sub-title">
        {isSuccess
          ? `Search results for ${search} `
          : `No search results found. Please try again`}
      </h2>
      <div className="episode_Wrapper">
        {isSuccess && data.results.length
          ? data.results.map((item: any) => (
              <CharactersCard key={item.id} item={item} />
            ))
          : null}
      </div>
      {data?.info.length && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default SearchResults;
