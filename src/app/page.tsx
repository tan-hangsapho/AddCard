"use client";

import { Card, FormAdd, Modal, UpdateForm } from "@/components";
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
  const handleDeleteCard = (id: string) => {
    const deleteItem = users.filter((users) => users.id !== id);
    setUsers(deleteItem);
  };
  return (
    <>
      <CardList
        items={users}
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
