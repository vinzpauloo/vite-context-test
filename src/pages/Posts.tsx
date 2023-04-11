import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { usePosts } from "../services/api/usePosts";
import { Box, Typography, Button, TextField } from "@mui/material";

interface PostDataProps {
  title: string;
  id: number;
}

interface PaginationProps {
  data?: string[] | any[];
  page?: number;
  itemsPerPage?: number;
}

interface LogoutProps {
  onAuthentication: (isAuthenticated: boolean) => void;
}

const Posts = ({ onAuthentication }: LogoutProps) => {
  const { getPosts } = usePosts();
  const [postData, setPostData] = useState<PostDataProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const inputRef = useRef<any | null>(null);

  const handleGetPosts = async () => {
    try {
      const response = await getPosts();
      console.log(response);
      setPostData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const Pagination = (props: PaginationProps) => {
    const { data = [], page = 1, itemsPerPage = 20 } = props;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
  };

  const paginationData = useMemo(
    () =>
      Pagination({
        data: postData,
        page: currentPage,
        itemsPerPage: itemsPerPage,
      }),
    [postData, currentPage, itemsPerPage]
  );

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    const totalPages = Math.ceil(postData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, postData.length, itemsPerPage]);

  useEffect(() => {
    handleGetPosts();
    inputRef.current.focus();
  }, []);
  return (
    <Box sx={{ textAlign: "left" }}>
      {paginationData &&
        paginationData?.map((item, index) => (
          <Typography key={index}>
            {item?.id}. {item?.title}
          </Typography>
        ))}
      <Box sx={{ display: "flex", alignItems: " center" }}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography>{currentPage}</Typography>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(postData.length / itemsPerPage)}
        >
          Next
        </Button>
      </Box>
      <Box>
        <TextField inputRef={inputRef} />
      </Box>
      <Box>
        <Button onClick={() => onAuthentication(false)}>Logout</Button>
      </Box>
    </Box>
  );
};

export default Posts;
