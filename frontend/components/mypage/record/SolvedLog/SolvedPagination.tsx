import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function SearchPagination(props: any) {
  const submitPage = (event: any) => {
    props.propPage(event.target.textContent-1)
  }

  return (
    <Stack spacing={2}>
      <Pagination
       count={10} size="large" shape="rounded"
       onClick={submitPage}
       />
    </Stack>
  );
}