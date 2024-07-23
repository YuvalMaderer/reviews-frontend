import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Star } from "lucide-react";

export interface SearchFormProps {
  categories: object[];
}

const ratings = [
  { value: "", label: "Any" },
  { value: "3", label: "3.0+" },
  { value: "4", label: "4.0+" },
  { value: "4.5", label: "4.5+" },
];

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");
  // const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minRating, setMinRating] = useState(
    searchParams.get("minRating") || ""
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params: { [key: string]: string } = {};
      if (searchTerm) params.name = searchTerm;
      // if (category) params.category = category;
      if (minRating) params.minRating = minRating;
      setSearchParams(params);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, minRating, setSearchParams]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 my-4 px-24">
      <Input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded"
      />
      {/* <select
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
      </select> */}
      <div className="flex gap-2">
        {ratings.map((rating) => (
          <button
            key={rating.value}
            className={`p-2 border rounded ${
              minRating === rating.value ? "bg-blue-200" : ""
            }`}
            onClick={() => setMinRating(rating.value)}
          >
            <span className=" flex items-center gap-2">
              <Star className="h-4 w-4" />
              {rating.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
