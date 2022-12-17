import React, { useState } from "react";
import FilterModal from "./FilterModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <>
      <div className="nav_wrapper">
        <h2 className="title">Rick and Morty</h2>
        <div className="btn_wrapper">
          <button className="btn">
            <Link to="/" className="btn-link">
              Characters
            </Link>
          </button>
          {/* <button className="btn" onClick={handleModal}>
            Filter by characters
          </button> */}
          <button className="btn">
            <Link to="/episodes" className="btn-link">
              Episodes
            </Link>
          </button>
        </div>
      </div>
      {openModal && (
        <FilterModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleModal={handleModal}
        />
      )}
    </>
  );
};

export default Navbar;
