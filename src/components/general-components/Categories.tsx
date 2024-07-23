import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchFormProps } from "./Search";

const SearchForm = ({ categories }: SearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState(
    searchParams.get("category") || ""
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params: { [key: string]: string } = {};
      if (currentCategory) params.category = currentCategory;
      setSearchParams(params);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [currentCategory, setSearchParams]);

  return (
    <div className="grid grid-cols-2">
      {categories.map((category) => {
        if (currentCategory === category.name) {
          return (
            <button
              type="button"
              className="mb-4 p-4 w-52 h-20 shadow-2xl transition duration-300 ease-in-out cursor-pointer flex flex-col bg-white justify-center items-center"
              onClick={() =>
                setCurrentCategory(
                  category.name === "All Categories" ? "" : category.name
                )
              }
            >
              <h1 className="mb-2">{category.name}</h1>
              <div>{category.icon}</div>
            </button>
          );
        } else {
          return (
            <button
              type="button"
              className="mb-4 border border-gray-200 p-4 w-52 h-20 hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer flex flex-col bg-gray-50 justify-center items-center"
              onClick={() =>
                setCurrentCategory(
                  category.name === "All Categories" ? "" : category.name
                )
              }
            >
              <h1 className="text-gray-400 mb-2">{category.name}</h1>
              <div className="text-gray-400">{category.icon}</div>
            </button>
          );
        }
      })}
    </div>
  );
};

export default SearchForm;
