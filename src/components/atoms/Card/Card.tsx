"use client";
import React, { useState } from "react";
import Image from "next/image";
interface CardProps {
  id?: number;
  title?: string;
  description?: string;
  img: string;
}
const Card: React.FC<CardProps> = ({ id, title, description, img }) => {
  return (
    <div className="max-w-md  m-10 mx-auto bg-white rounded-md overflow-hidden shadow-md">
      <div className="p-4 bg-red-500">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <Image src={img} alt="myuse" width={200} height={200} />
      </div>
    </div>
  );
};

const CardList: React.FC = () => {
  const [data, setData] = useState<CardProps[]>([
    {
      id: 1,
      title: "User 1",
      description: "Hello World",
      img: "/img/mydog.jpg",
    },
    {
      id: 2,
      title: "User 2",
      description: "Hell world",
      img: "/img/happybirthday.png",
    },
  ]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newImage, setNewImage] = useState<string>(""); // New state for image URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
    }
  };
  const addData = () => {
    setData((prevData) => {
      const newId = Math.floor(Math.random() * 1000);
      const newCard: CardProps = {
        id: newId,
        title: newTitle,
        description: newDescription,
        img: newImage || "",
      };
      return [...prevData, newCard];
    });
    setNewTitle("");
    setNewDescription("");
    setNewImage("");
  };
  const addImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl) {
      setNewImage(imageUrl);
    }
  };
  const updateData = () => {
    setData((prevData) => {
      const newId = prevData.length;
      return prevData.map((card) => {
        if (card.id === newId) {
          return {
            ...card,
            title: newTitle,
            description: newDescription,
            image: newImage,
          };
        }
        return card;
      });
    });
    setNewTitle("");
    setNewDescription("");
    setNewImage("");
  };
  return (
    <>
      <div className="w-full max-w-xs">
        <form
          action=""
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <input
            type="text"
            placeholder="Title"
            className=" mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className=" mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <input
            className="mt-8"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {newImage && (
            <Image
              src={newImage}
              alt="Selected Image"
              width={200}
              height={200}
            />
          )}
          <button
            className="mt-8 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={addData}
          >
            Add Card
          </button>
        </form>
      </div>
      <div className="App">
        <div className="card-container">
          {data.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              img={card.img}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardList;
