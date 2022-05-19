import Link from "next/link"
import { useRecoilState } from "recoil"
import { pageState } from "../../../util/stateCollection"
import styled from "styled-components"

const Title = styled.span`
  margin-left: 40px;
  font-size: 1.8vw;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
`

export default function BrandName() {
  const [page, setPage] = useRecoilState(pageState)

  return (
    <span>
      <Link href="/recommendation">
        <Title onClick={() => setPage("/recommendation")}>알고풀자</Title>
      </Link>
    </span>
  )
}