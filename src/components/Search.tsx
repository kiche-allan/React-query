import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!search) return;

    navigate(`/searchResults/${search}`);
    setSearch("");
  };
  return (
    <div className="search-box">
      <form className="form-modal" onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={handleSearch}
          type="text"
          name="name"
          className="search-txt"
          placeholder="Search by name..."
        />
        <button className="search-btn">
          <BsSearch className="search-icon" />
        </button>
      </form>
    </div>
  );
};
export default Search;
