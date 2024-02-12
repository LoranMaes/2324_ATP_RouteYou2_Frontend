import React from "react";
import Link from "next/link";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { usePathname, useSearchParams } from "next/navigation";
import Icon from "@mdi/react";

/**
 * Renders a pagination component for navigating through pages.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} lastPage - The total number of pages.
 * @param {number} currentPage - The current page number.
 * @param {number} [maxLinks=7] - The maximum number of page links to display. Defaults to 7.
 * @param {string} [previousButtonText="Previous page"] - The text for the previous page button. Defaults to "Previous page".
 * @param {string} [nextButtonText="Next page"] - The text for the next page button. Defaults to "Next page".
 * @returns {JSX.Element} The pagination component.
 */
const AppPagination = ({
  lastPage,
  currentPage,
  maxLinks = 7,
  previousButtonText = "Previous page",
  nextButtonText = "Next page",
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Generates an array of page numbers for pagination.
   * @returns {Array} An array of page numbers with labels, numbers, and keys.
   */
  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (lastPage <= maxLinks) {
      for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push({ label: i, number: i, key: i });
      }
      pageNumbers.unshift({
        label: previousButtonText,
        number: Math.max(currentPage - 1, 1),
        key: "previousButton",
      });
      pageNumbers.push({
        label: nextButtonText,
        number: Math.min(currentPage + 1, lastPage),
        key: "nextButton",
      });
      return pageNumbers;
    }
    const maxPagesBeforeCurrentPage = Math.max(currentPage - 2, 1);
    const maxPagesAfterCurrentPage = Math.min(currentPage + 2, lastPage);

    pageNumbers.push({ label: 1, number: 1, key: 1 });

    for (
      let i = maxPagesBeforeCurrentPage;
      i <= maxPagesAfterCurrentPage;
      i++
    ) {
      if (i !== 1 && i !== lastPage) {
        pageNumbers.push({ label: i, number: i, key: i });
      }
    }

    if (!pageNumbers.includes(lastPage)) {
      pageNumbers.push({ label: lastPage, number: lastPage, key: "lastPage" });
    }

    if (currentPage > 4) {
      pageNumbers.splice(1, 0, {
        label: "...",
        number: currentPage - 3,
        key: "separatorBefore",
      });
    }
    if (currentPage < lastPage - 3) {
      pageNumbers.splice(pageNumbers.length - 1, 0, {
        label: "...",
        number: currentPage + 3,
        key: "separatorAfter",
      });
    }
    pageNumbers.unshift({
      label: previousButtonText,
      number: Math.max(currentPage - 1, 1),
      key: "previousButton",
    });
    pageNumbers.push({
      label: nextButtonText,
      number: Math.min(currentPage + 1, lastPage),
      key: "nextButton",
    });

    return pageNumbers;
  };

  /**
   * Renders the page numbers for pagination.
   * @returns {React.ReactNode} The rendered page numbers.
   */
  const renderPageNumbers = () => {
    const pageNumbers = generatePageNumbers();

    return pageNumbers.map((pageNumber) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("page", pageNumber.number);
      const search = current.toString();
      const query = search ? `?${search}` : "";

      return (
        <React.Fragment key={pageNumber.key}>
          {pageNumber.label === previousButtonText ? (
            <li key={pageNumber.key} className="mr-[1rem] sm:mr-[5rem]">
              <Link
                scroll={false}
                href={`${pathname}${query}}`}
                className={`flex px-3 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-accent-gray cursor-not-allowed opacity-[0.7]"
                    : "bg-primary-green"
                } lg:hidden`}
                aria-disabled={currentPage === 1 ? true : false}
                onClick={currentPage === 1 ? (e) => e.preventDefault() : null}
              >
                <Icon
                  path={mdiChevronLeft}
                  title="Previous page icon"
                  size={1.5}
                  className="text-background"
                />
              </Link>
              <Link
                scroll={false}
                href={`${pathname}${query}`}
                className={`px-3 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-accent-gray cursor-not-allowed opacity-[0.7]"
                    : "bg-primary-green"
                }   text-background no-underline hidden lg:flex min-w-[12rem] justify-center`}
                aria-disabled={currentPage === 1 ? true : false}
                onClick={currentPage === 1 ? (e) => e.preventDefault() : null}
              >
                {previousButtonText}
              </Link>
            </li>
          ) : pageNumber.label === nextButtonText ? (
            <li key={pageNumber.key} className="ml-[1rem] sm:ml-[5rem]">
              <Link
                scroll={false}
                href={`${pathname}${query}`}
                className={`flex px-3 py-2 rounded-md ${
                  currentPage === lastPage
                    ? "bg-accent-gray cursor-not-allowed opacity-[0.7]"
                    : "bg-primary-green"
                }  lg:hidden`}
                aria-disabled={currentPage === lastPage ? true : false}
                onClick={
                  currentPage === lastPage ? (e) => e.preventDefault() : null
                }
              >
                <Icon
                  path={mdiChevronRight}
                  title="Next page icon"
                  size={1.5}
                  className="text-background"
                />
              </Link>
              <Link
                scroll={false}
                href={`${pathname}${query}`}
                className={`px-3 py-2 rounded-md ${
                  currentPage === lastPage
                    ? "bg-accent-gray cursor-not-allowed opacity-[0.7]"
                    : "bg-primary-green"
                }   text-background no-underline hidden lg:flex min-w-[12rem] justify-center`}
                aria-disabled={currentPage === lastPage ? true : false}
                onClick={
                  currentPage === lastPage ? (e) => e.preventDefault() : null
                }
              >
                {nextButtonText}
              </Link>
            </li>
          ) : (
            <li
              key={pageNumber.key}
              className={`flex justify-between px-3 py-2 rounded-md text-sm leading-5 h-fit`}
            >
              <Link
                scroll={false}
                href={`${pathname}${query}`}
                className={`text-base no-underline relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.2rem] after:bg-primary-green after:transition-all after:duration-300 after:ease-in-out after:transform after:translate-y-[0.4rem] after:scale-x-0 hover:after:scale-x-100 focus:after:scale-x-100 ${
                  pageNumber.number === currentPage
                    ? "after:scale-x-100 font-bold"
                    : "after:scale-x-0"
                }`}
                aria-label={`Page ${pageNumber.number}`}
                aria-current={pageNumber.number === currentPage ? "page" : null}
              >
                {pageNumber.label}
              </Link>
            </li>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <nav
      aria-label="pagination"
      className="flex justify-center w-full h-[6rem]"
    >
      <h2 className="sr-only">Pagination</h2>
      <ul className="flex items-center relative justify-center w-full h-full">
        {renderPageNumbers()}
      </ul>
    </nav>
  );
};

export default AppPagination;
