import { User } from "@/app/page";
import React, { useState } from "react";
import { Card } from ".";

interface CardListProps {
  items: User[];
  selectCard: string;
  onSelectCard: React.Dispatch<React.SetStateAction<string>>;
  onDeleteCard: (id: string) => void;
}

const CardList = ({
  items,
  selectCard,
  onSelectCard,
  onDeleteCard,
}: CardListProps) => {
  return (
    <div>
      {items.map((item, index) => (
        <Card
          id={item.id}
          name={item.name}
          key={item.id || index}
          image={item.image}
          onSelectCard={onSelectCard}
          selectCard={selectCard}
          onDeleteCard={onDeleteCard}
        />
      ))}
    </div>
  );
};

export { CardList };
