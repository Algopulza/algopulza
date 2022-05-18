import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function SolvedPagination(props: any) {
  const submitPage = (event: any, page: any) => {
    props.setPage(page-1)
  }
  return (
    <Stack spacing={2}>
      <Pagination
        page={props.currentPage}
        count={props.total} size="large" shape="rounded"
        onChange={submitPage}
       />
    </Stack>
  );
}