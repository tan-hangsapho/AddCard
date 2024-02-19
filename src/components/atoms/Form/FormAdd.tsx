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
    <div>
      <form onSubmit={handleOnSubmit} className="bg-pink-500	">
        <input
          className="text-black border rounded-md border-black m-2 focus:ring-2 outline-none px-2"
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
        />
        {error.name && (
          <div className="error-message text-red-500">{error.name}</div>
        )}
        <br />
        <input
          className="border rounded-md border-black m-2"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleUploadFile}
        />
        {error.image && (
          <div className="error-message text-red-500">{error.image}</div>
        )}
        <br />
        <button className=" mt-3 border rounded-md border-slate-700 p-1 bg-slate-300 text-black">
          Add
        </button>
      </form>
    </div>
  );
};

export default FormAdd;
