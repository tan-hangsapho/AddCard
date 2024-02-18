import { User } from "@/app/page";
import React, { useState } from "react";
interface FormAddProps {
  addNewUser: (user: User) => void;
}
const FormAdd: React.FC<FormAddProps> = ({ addNewUser }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    image: null,
  });

  console.log(user);
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = Math.random().toString(36).substring(2, 8); // return 1f74e
    const newUser = { ...user, id: newId };

    addNewUser((prevUsers) => {
      return [...prevUsers, newUser];
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };
  const handleUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => {
        return {
          ...prevUser,
          image: imageUrl,
        };
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          className="text-black border rounded-md border-black m-2 focus:ring-2 outline-none px-2"
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
        />

        <br />
        <input
          className="border rounded-md border-black m-2"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleUploadFile}
        />

        <br />
        <button className=" mt-3 border rounded-md border-slate-700 p-1 bg-slate-300 text-black">
          Add
        </button>
      </form>
    </div>
  );
};

export default FormAdd;
