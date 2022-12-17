import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "../api";

const SingleCharacter = () => {
  const { id } = useParams();
  const fetchSingleCharacterInfo = async (id: any) => {
    console.log(id, "id");
    const res = await axios(`${baseUrl}/character/${id}`);
    console.log(res.data);
  };
  const { data, isLoading, error, isError } = useQuery(
    ["singleCharacter", id],
    () => fetchSingleCharacterInfo(id)
  );

  return <div>SingleCharacter</div>;
};

export default SingleCharacter;
