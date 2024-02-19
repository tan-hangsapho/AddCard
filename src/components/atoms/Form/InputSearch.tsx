import { useState } from "react";
interface InputProps {
  type: string;
  placeholder?: string;
  name: string;
  id: string;
  onSearch: (query: string) => void;
}
const InputSearch: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  id,
  onSearch,
}) => {
  const [search, setSearch] = useState("");
  console.log(search);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // Call onSearch with the new search query
  };
  return (
    <div className="flex justify-center items-center mt-6">
      <input
        id={id}
        type={type}
        name={name}
        className="outline-none border border-gray-300 w-[300px] h-[40px] p-4 rounded-lg shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500" // Styles directly here
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export { InputSearch };
