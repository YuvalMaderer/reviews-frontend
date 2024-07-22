import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";

interface SearchFormProps {
  categories: string[];
}

const SearchForm = ({ categories }: SearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params: { [key: string]: string } = {};
      if (searchTerm) params.name = searchTerm;
      if (category) params.category = category;
      setSearchParams(params);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, category, setSearchParams]);

  return (
    <div className="flex gap-4 mb-4">
      <Input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded"
      />
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
    </div>
  );
};

export default SearchForm;
