import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function SearchPagination(props: any) {
  const submitPage = (event: any, page: any) => {
    props.setPage(page-1)
  }

  return (
    <Stack spacing={2}>
      <Pagination
        page={props.currentPage}
        count={props.totalPage} size="large" shape="rounded"
        onChange={submitPage}
       />
    </Stack>
  );
}