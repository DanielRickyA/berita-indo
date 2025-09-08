"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationTableProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

function PaginationTable({
  page,
  limit,
  total,
  onPageChange,
}: PaginationTableProps) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-between items-center w-full">
      <span className="text-sm text-muted-foreground">
        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
        {total}
      </span>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 ? (
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page - 1);
                }}
              />
            ) : (
              <span className="opacity-50 cursor-not-allowed px-3 py-1">
                Previous
              </span>
            )}
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            {page < totalPages ? (
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page + 1);
                }}
              />
            ) : (
              <span className="opacity-50 cursor-not-allowed px-3 py-1">
                Next
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationTable;
