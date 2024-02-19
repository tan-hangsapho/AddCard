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
    <div>
      <input
        id={id}
        type={type}
        name={name}
        className="outline-none border-2 w-[300px] h-[40px] p-4 rounded-md focus:ring-green-200"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export { InputSearch };
