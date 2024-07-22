interface PaginationProps {
  businessesPerPage: number;
  totalBusinesses: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({
  businessesPerPage,
  totalBusinesses,
  paginate,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBusinesses / businessesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 border rounded ${
                number === currentPage ? "bg-gray-200" : "bg-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
