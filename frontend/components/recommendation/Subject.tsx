import { SubjectAttr, ProblemAttr } from "../../util/dto"
import SubjectTitle from "./SubjectTitle"
import Card from "../common/card/Card"
import styled from "styled-components"

const Container = styled.section`
  margin-bottom: 80px;
`

const Cards = styled.div`
  display: flex;
  justify-content: space-between;
`

type SubjectProps = {
  subjectAttr: SubjectAttr
}

export default function Subject({ subjectAttr }: SubjectProps) {
  const lists = subjectAttr.list

  return (
    <Container>
      {lists ? <SubjectTitle>{subjectAttr}</SubjectTitle> : null}

      <Cards>
        {lists &&
          lists.map((list: ProblemAttr) => (
            <Card
              key={list.bojId}
              id={list.bojId}
              problemId={list.problemId}
              title={list.title}
              tier={list.tierName}
              level={list.tierLevel}
              accept={list.acceptedCount}
              bookmark={list.markFlag}
            />
          ))}
      </Cards>
    </Container>
  )
}