import React from "react";
import * as PropTypes from "prop-types";
import { Link } from "gatsby";

import "./pagination.sass";

const Pagination = ({ destination, currentPage, totalPages }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPreviousPage = () => {
    const isPage2 = currentPage === 2;

    if (isPage2 || isFirstPage) {
      return '';
    } else {
      return currentPage - 1
    }
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <Link
        className="pagination-previous"
        title="Go to the previous page"
        disabled={isFirstPage}
        aria-disabled={isFirstPage}
        to={`${destination}/${getPreviousPage()}`}>Previous</Link>
      <Link
        className="pagination-next"
        title="Go to the next page"
        disabled={isLastPage}
        aria-disabled={isLastPage}
        to={`${destination}/${isLastPage ? currentPage : currentPage + 1}`}>Next page</Link>
      <ul className="pagination-list">
        {Array.from({ length: totalPages }).map((_, page) => {
          const pageNum = page + 1;
          const isCurrentPage = currentPage === pageNum;
          return (
            <li key={`page-${pageNum}`}>
              <Link
                className={`pagination-link ${isCurrentPage ? "is-current" : ""}`}
                aria-label={isCurrentPage ? `Page ${pageNum}` : `Go to page ${pageNum}`}
                aria-current={isCurrentPage ? "page" : null}
                to={`${destination}/${page === 0 ? '' : pageNum}`}>{`${pageNum}`}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  destination: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default Pagination;
