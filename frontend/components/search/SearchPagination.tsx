import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useEffect } from 'react'

export default function SearchPagination(props: any) {
  console.log('propsPage:', props.page)
  
  const submitPage = (event: any, page: any) => {
    console.log('SubmitPage:', page)
    props.setPage(page-1)
  }

  return (
    <Stack spacing={2}>
      <Pagination
        page={props.page + 1}
        count={props.totalPage} size="large" shape="rounded"
        onChange={submitPage}
      />
    </Stack>
  );
}