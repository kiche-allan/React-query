import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../api";
import { useQuery } from "react-query";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: () => void;
}
const FilterModal = ({ openModal, handleModal }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [statusSelect, setStatusSelect] = useState<string>("");
  const [genderType, setGenderType] = useState<string>("");

  if (!openModal) {
    return null;
  }
  const genders = [
    {
      id: "female",
      label: "Female",
    },
    {
      id: "male",
      label: "Male",
    },
    {
      id: "genderless",
      label: "Genderless",
    },
    {
      id: "unknown",
      label: "Unknown",
    },
  ];
  const status = [
    {
      id: "alive",
      label: "Alive",
    },
    {
      id: "dead",
      label: "Dead",
    },
    {
      id: "unknown",
      label: "Unknown",
    },
  ];
  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };
  const handleStatus = (e: any) => {
    setStatusSelect(e.target.value);
  };
  const handleGender = (e: any) => {
    setGenderType(e.target.value);
  };
  interface Props {
    status: string;
    gender: string;
  }
  const params: any = {
    status: statusSelect,
    gender: genderType,
  };
  let obj: any = {};
  let str: any;
  for (const key in params) {
    if (params[key]) {
      obj[key] = params[key];
    }
  }
  if (obj.length === 1) {
    str = Object.keys(obj) + "=" + Object.values(obj).join("&");
    console.log(str, "params");
  } else {
    const res = Object.entries(obj);
    str = res.filter((item) => {
      return Object.values(item).every(
        (el) => el !== null && el !== undefined && el !== ""
      );
    });
    console.log((str[0][0] = str[0][1]));
  }

  const fetchCharacters = async (search: string) => {
    const response = await axios(
      `${baseUrl}/character/?name=${search}&status=alive`
    );
    return response?.data;
  };
  const { data, refetch, isLoading, isSuccess }: any = useQuery(
    ["fetchCharacters", search],
    () => fetchCharacters(search),
    {
      keepPreviousData: true,
      enabled: false,
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!search) return;
    refetch();
  };
  console.log(statusSelect, genderType, "data");
  return (
    <div className="modal_wrapper">
      <form className="modal_form" onSubmit={handleSubmit}>
        <div className="close_modal">
          <h3>Filter</h3>
          <p className="close-icon" onClick={handleModal}>
            x
          </p>
          {/* <input type="text" value={search} onChange={handleChange} />
          <button>Submit</button> */}
        </div>
        <div className="select">
          <select value={genderType} onChange={handleGender}>
            <option>Select gender...</option>
            {genders.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="select">
          <select value={statusSelect} onChange={handleStatus}>
            <option>Select status...</option>
            {status.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FilterModal;
