import "./index.css";

interface CoursesPaginationProps {
  currentPage: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

function getPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage, currentPage + 1, "...", totalPages];
}

export default function CoursesPagination({
  currentPage,
  total,
  perPage,
  onPageChange,
}: CoursesPaginationProps) {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <nav className="custom-pagination" aria-label="Courses pagination">
      <button
        type="button"
        className="pagination-button pagination-arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ←
      </button>

      {pageItems.map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="pagination-button pagination-ellipsis"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`pagination-button ${
              currentPage === item ? "active" : ""
            }`}
            onClick={() => onPageChange(Number(item))}
            aria-current={currentPage === item ? "page" : undefined}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className="pagination-button pagination-arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
}
