import { User } from "@/app/page";
import { InputSearch } from "@/components/atoms/Form/InputSearch";
import React, { useState } from "react";
interface SearchPros {
  item: User[];
}
const Search: React.FC<SearchPros> = ({ item }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };
 
  return (
    <>
      <InputSearch
        type={"text"}
        name={"search"}
        id={"search"}
        onSearch={handleSearchQueryChange}
        placeholder="Search"
      />
    </>
  );
};

export default Search;
