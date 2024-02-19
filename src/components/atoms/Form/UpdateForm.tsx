import { User } from "@/app/page";
import React, { Dispatch, SetStateAction, useState } from "react";

interface UpdateFormProps {
  updateUser: Dispatch<SetStateAction<User[]>>;
  selectedUser: User;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  selectedUser,
  updateUser,
}) => {
  const [user, setUser] = useState({
    name: selectedUser.name,
    image: selectedUser.image,
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser((prevUsers) => {
      return prevUsers.map((prevUser) => {
        if (prevUser.id === selectedUser.id) {
          return {
            ...prevUser,
            ...user,
          };
        }
        return prevUser;
      });
    });
  };

  // Get the value from the input fields:
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOnUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
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

  const handleRemoveFile = () => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        image: "",
      };
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        className="text-black border rounded-md border-black m-2 focus:ring-2 outline-none px-2"
        type="text"
        id="name"
        name="name"
        defaultValue={selectedUser.name}
        value={user.name}
        onChange={handleOnChange}
      />
      <br />

      <label htmlFor="image">Image:</label>
      {selectedUser.image ? (
        <div className="relative">
          <button className="absolute bg-red-500" onClick={handleRemoveFile}>
            &times;
          </button>
          <img src={selectedUser.image} alt="image" />
        </div>
      ) : (
        <input
          className="border rounded-md border-black m-2"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleOnUploadFile}
        />
      )}
      <br />

      <button className="bg-red-500">Update</button>
    </form>
  );
};

export { UpdateForm };
