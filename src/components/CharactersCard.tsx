import React from "react";
import { useNavigate } from "react-router-dom";
const CharactersCard = ({ item }: any) => {
  const navigate = useNavigate();
  const episode = item.episode[0].split("/").slice(-2).join(" ");

  return (
    <div
      className="episode_Card"
      onClick={() => navigate(`/singleCharacter/${item.id}`)}
    >
      <img src={item.image} alt={item.name} className="image_card" />
      <h3>{item.name}</h3>
      <h3>{item.gender}</h3>
      <h3>{episode}</h3>
    </div>
  );
};

export default CharactersCard;
