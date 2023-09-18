import CustomButton from "../Button";

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
        <>
            {currentPage > 1 && (
                <CustomButton bg="#ffffff" onClick={onPrevPage}>
                    Previous Page
                </CustomButton>
            )}
            {currentPage < totalPages && (
                <CustomButton bg="#ffffff" ml="4" onClick={onNextPage}>
                    Next Page
                </CustomButton>
            )}
        </>
    );
};

export default Pagination;