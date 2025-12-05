import React from "react";
import { Button, Image } from "react-bootstrap";
import type { PaginationProps } from "../../types/interfaces";

const Pagination = ({
  totalProducts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className=" w-100 d-flex align-items-center justify-content-between">
      <Image
        onClick={() =>
          setCurrentPage(
            currentPage === 1
              ? Math.ceil(totalProducts / productsPerPage)
              : currentPage - 1
          )
        }
        className="cursor-pointer mx-2"
        src="/Prev.png"
      />
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`rounded-circle p-4 mx-2 pagination-bullet d-flex align-items-center justify-content-center text-dark ${
            currentPage === page ? "text-white bg-warning" : ""
          }`}>
          {page}
        </Button>
      ))}
      <Image
        onClick={() =>
          setCurrentPage(
            currentPage === Math.ceil(totalProducts / productsPerPage)
              ? 1
              : currentPage + 1
          )
        }
        className="cursor-pointer mx-2"
        src="/Next.png"
      />
    </div>
  );
};

export default Pagination;
