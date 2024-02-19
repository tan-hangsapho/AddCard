import React from "react";
import Image from "next/image";
interface CardProps {
  id: string;
  image: string;
  name: string;
  selectCard: string | null;
  onSelectCard: React.Dispatch<React.SetStateAction<string>>;
  onDeleteCard: React.Dispatch<React.SetStateAction<string>>;
}
const Card: React.FC<CardProps> = ({
  id,
  name,
  image,
  selectCard,
  onSelectCard,
  onDeleteCard,
}) => {
  return (
    <div
      onClick={() => {
        // Unselect Card
        if (selectCard === id) {
          onSelectCard("");
        } else {
          onSelectCard(id);
        }
      }}
      className={
        selectCard === id
          ? "flex justify-between items-start w-[250px] bg-gray-400   m-auto mt-5 p-2 border border-[#d6c2e7] rounded-lg "
          : "flex justify-between items-start w-[250px]  m-auto mt-5 p-2 border border-[#d6c2e7] rounded-lg hover:bg-gray-200"
      }
    >
      <div className="flex flex-col gap-0">
        <h1 className="text-xl font-bold mb-2">{name}</h1>
        <Image src={image} alt="myuse" width={200} height={200} />
      </div>
      <div>
        <button
          onClick={(e) => {
            if (window.confirm(`Are you sure you want to delete ${name}?`)) {
              onDeleteCard(id);
            }
            e.stopPropagation();
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Card;
