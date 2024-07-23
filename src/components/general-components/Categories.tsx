import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchFormProps } from "./Search";

const SearchForm = ({ categories }: SearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params: { [key: string]: string } = {};
      if (category) params.category = category;
      setSearchParams(params);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [category, setSearchParams]);

  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default SearchForm;
