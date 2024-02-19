import { User } from "@/app/page";
import { userSchema } from "@/components/validation/schema";
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
  const [error, setError] = useState({
    name: "",
    image: "",
  });
  const validateForm = async (name, value) => {
    try {
      await userSchema.validateAt(name, { [name]: value });
      setError((prev) => ({ ...prev, [name]: "" })); // Clear error on success
    } catch (error) {
      console.log("Error: ", error);
      setError((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error.image) {
      return;
    }
    try {
      await userSchema.validate(user, { abortEarly: false });

      const newId = Math.random().toString(36).substring(2, 8); // return 1f74e
      const newUser = { ...user, id: newId };
      addNewUser((prevUsers) => {
        return [...prevUsers, newUser];
      });
    } catch (error) {
      console.error("Error:", e);
      const Errors = {};
      error.inner.forEach((err) => {
        Errors[err.path] = err.message;
      });
      setError(Errors);
      return;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
    validateForm(name, value);
  };
  const handleUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    validateForm(e.target.name, file);
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
    <div className="p-6">
      <form
        onSubmit={handleOnSubmit}
        className="bg-white shadow-md rounded-lg p-5"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name:
          </label>
          <input
            className="border border-gray-400 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
          />
          {error.name && (
            <div className="text-sm text-red-500 mt-1">{error.name}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-2"
          >
            Image:
          </label>
          <input
            className="border border-gray-400 rounded-md w-full p-2"
            type="file"
            accept="image/*"
            name="image"
            onChange={handleUploadFile}
          />
          {error.image && (
            <div className="text-sm text-red-500 mt-1">{error.image}</div>
          )}
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-4 w-full">
          Add
        </button>
      </form>
    </div>
  );
};

export default FormAdd;
