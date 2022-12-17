import { useState } from "react";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Episodes from "./components/Episodes";
import { Routes, Route } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import SingleCharacter from "./components/SingleCharacter";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Search />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/searchResults/:search" element={<SearchResults />} />
            <Route path="/singleCharacter/:id" element={<SingleCharacter />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
