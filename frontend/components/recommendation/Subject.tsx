import { SubjectAttr, ProblemAttr } from '../../util/dto'
import SubjectTitle from './SubjectTitle'
import Card from '../common/card/Card'
import styled from 'styled-components'
import Image from 'next/image';
import brand_logo from '../../public/common/brand_logo.png'
import { useEffect, useState } from 'react';

const Container = styled.section`
margin-bottom: 80px;
`

const Cards = styled.div`
  display: flex;
  justify-content: space-between;
`

const CircularProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  @keyframes logoSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    #logo {
        animation: logoSpin 2s linear infinite;
    }
`

type SubjectProps = {
  subjectAttr: SubjectAttr
}

export default function Subject({ subjectAttr }: SubjectProps) {
  const lists = subjectAttr.list
  const [ alert, setAlert ] = useState(true)
  console.log(subjectAttr)

  useEffect(() =>{
    setTimeout(() => {setAlert(false)},2000)
  },[])

  return (
    <Container>
      
      { !lists ?
      <>
        {alert?
        <CircularProgressContainer>
          <Image id="logo" src={brand_logo} alt="" />
        </CircularProgressContainer>
        :null}
      </>
      : null }

      {lists ? <SubjectTitle>{subjectAttr}</SubjectTitle> : null}
      
      <Cards>
        {lists && lists.map((list: ProblemAttr) =>
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
        )}
      </Cards>
    </Container>
  )
}
