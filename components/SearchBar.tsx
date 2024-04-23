"use client";

import React, { useState } from "react";

import { SearchManufacturer } from "./";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClassName }: { otherClassName: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClassName}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  console.log(manufacturer);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === "" && model === "") {
      alert("Please fill the search bar");
    }

    updateSearchParams(model, manufacturer);
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClassName="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="model icon"
          width={40}
          height={40}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          placeholder="Tiguan"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="searchbar__input"
        />
        <SearchButton otherClassName="sm:hidden" />
      </div>
      <SearchButton otherClassName="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
