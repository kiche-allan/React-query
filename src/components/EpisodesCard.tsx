import React from "react";

interface Props {
  item: any;
}
const EpisodesCard = ({ item }: Props) => {
  return (
    <div className="episode_Card">
      <h3>{item.name}</h3>
      <h3>{item.episode}</h3>
    </div>
  );
};

export default EpisodesCard;
