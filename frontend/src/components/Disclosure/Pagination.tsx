import { Flex } from "@chakra-ui/react";
import Button from "../Form/Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}: PaginationProps) => {
  return (
    <Flex
      flexDirection="row"
      justifyContent={currentPage === 1 ? "flex-end" : "space-between"}
      width="full"
    >
      {currentPage > 1 && (
        <Button buttonVariant="masterCrud" onClick={onPrevPage} width="25%">
          Previous Page
        </Button>
      )}
      {currentPage < totalPages && (
        <Button
          buttonVariant="masterCrud"
          ml="4"
          onClick={onNextPage}
          width="25%"
        >
          Next Page
        </Button>
      )}
    </Flex>
  );
};

export default Pagination;
