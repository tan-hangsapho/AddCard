"use client";

import { Card, FormAdd, InputSearch, Modal, UpdateForm } from "@/components";
import { CardList } from "@/components/atoms/Card/CardList";
import React, { useState } from "react";

export interface User {
  id: string;
  name: string;
  image: string;
}
export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectCard, setSelectCard] = useState("");

  const selectedUser = users.filter((user) => {
    if (user.id === selectCard) {
      return user;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleDeleteCard = (id: string) => {
    const deleteItem = users.filter((users) => users.id !== id);
    setUsers(deleteItem);
  };

  return (
    <>
      <InputSearch
        type={"text"}
        name={"search"}
        id={"search"}
        onSearch={handleSearchQueryChange }
        placeholder="Search"
      />
      <CardList
        items={filteredUsers}
        selectCard={selectCard}
        onSelectCard={setSelectCard}
        onDeleteCard={handleDeleteCard}
      />
      <Modal selectCard={selectCard}>
        {selectedUser.length > 0 ? (
          <>
            <UpdateForm selectedUser={selectedUser[0]} updateUser={setUsers} />
          </>
        ) : (
          <>
            <FormAdd addNewUser={setUsers} />
          </>
        )}
      </Modal>
    </>
  );
}
