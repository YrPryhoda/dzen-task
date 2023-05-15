import { Pagination as PaginationRounded, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import React, { useMemo } from "react";

interface IProps {
  totalCount: number;
}

export const Pagination = ({ totalCount = 1 }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = useMemo(
    () => Number(searchParams.get("page") || 1),
    [searchParams]
  );

  const handlerNavigation = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams({ page: value.toString() });
  };

  return (
    <Stack spacing={2}>
      <PaginationRounded
        page={currentPage}
        count={totalCount}
        variant="outlined"
        shape="rounded"
        onChange={handlerNavigation}
      />
    </Stack>
  );
};
