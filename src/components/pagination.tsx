import React from "react";
import { Link } from "gatsby";

import "./pagination.sass";

const Pagination = ({ destination, currentPage, totalPages }: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPreviousPage = () => {
    const isPage2 = currentPage === 2;

    if (isPage2 || isFirstPage) {
      return '#';
    } else {
      return currentPage - 1
    }
  }

  return (
    <nav className="pagination" role="navigation" aria-label="Pagination navigation">
      <Link
        className={`pagination-previous${isFirstPage ? ' is-static button' : ''}`}
        title="Go to the previous page"
        aria-label="Go to the previous page"
        aria-disabled={isFirstPage}
        to={`${destination}/${getPreviousPage()}`}>Previous</Link>
      <Link
        className={`pagination-next${isLastPage ? ' is-static button' : ''}`}
        title="Go to the next page"
        aria-label="Go to the next page"
        aria-disabled={isLastPage}
        to={`${destination}/${isLastPage ? '#' : currentPage + 1}`}>Next page</Link>
      <ul className="pagination-list">
        {Array.from({ length: totalPages }).map((_, page) => {
          const pageNum = page + 1;
          const isCurrentPage = currentPage === pageNum;
          return (
            <li key={`page-${pageNum}`}>
              <Link
                className={`pagination-link ${isCurrentPage ? "is-current" : ""}`}
                aria-label={isCurrentPage ? `Current Page, Page ${pageNum}` : `Go to page ${pageNum}`}
                aria-current={isCurrentPage ? "true" : undefined}
                to={`${destination}/${page === 0 ? '' : pageNum}`}>{`${pageNum}`}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

type PaginationProps = {
  currentPage: number,
  destination: string,
  totalPages: number
};

export default Pagination;
