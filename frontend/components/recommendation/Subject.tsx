import { Title } from '../../pages/recommendation'
import SubjectTitle from './SubjectTitle'
import Card from '../common/Card'
import styled from 'styled-components'

const Container = styled.section`
  margin-bottom: 70px;
`

const Cards = styled.div`
  display: flex;
  justify-content: space-between;
`

type TitleProps = {
  sub_title: Title
}

type ListProps = {
  tagList: any,
  bojId: number,
  title: string,
  tierLevel: number,
  tierName: string,
  averageTryCount: number,
  acceptedCount: number,
}

export default function Subject({ sub_title }: TitleProps) {
  // const lists = sub_title.list
  // console.log(lists)

  return (
    <Container>
      <SubjectTitle>{sub_title}</SubjectTitle>
{/*       
      <Cards>
        {lists.map((list:ListProps) =>
        <Card
        key={list.bojId}
        tags={list.tagList}
        id={list.bojId}
        title={list.title}
        level={list.tierLevel}
        name={list.tierName}
        average={list.averageTryCount}
        accept={list.acceptedCount}
        /> )}
      </Cards> */}
    </Container>
  )
}
