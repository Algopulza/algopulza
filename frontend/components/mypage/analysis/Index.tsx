import React, { useState } from "react";
import styled from "styled-components";
import Weakness from "./Weakness";
import Tag from "./Tag";
import Language from "./Language";
import Month from "./Month";
import { User } from "../../../pages/my-page";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  max-height: 500px;
`;

const Select = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0 1rem;
  font-weight: bold;
`

const CategoryButton = styled.button<{bg:string, hbg:string, hc:string}>`
  height: 2rem;
  width: 8rem;
  font-size: 0.8rem;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 10px 6px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.bg ? props.bg : "")};
  color: ${(props) => (props.color ? props.color : "")};
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.hbg ? props.hbg : "")};
    color:  ${(props) => (props.hc ? props.hc : "")};
  }
  margin-top: 1rem;
  margin-left: 13rem;
`

const SubContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  max-width: 800px;
`

const Index = ({accessToken, memberId, bojId}:User) => {
  const [weakness, setWeakness] = useState(true)
  const [tag, setTag] = useState(false)
  const [language, setLanguage] = useState(false)
  const [month, setMonth] = useState(false)

  const showWeakness = async() => {
    setWeakness(true as any);
    setTag(false as any);
    setLanguage(false as any);
    setMonth(false as any);
  }
  
  const showTag = async() => {
    setWeakness(false as any);
    setTag(true as any);
    setLanguage(false as any);
    setMonth(false as any);
  }

  const showLanguage = async() => {
    setWeakness(false as any);
    setTag(false as any);
    setLanguage(true as any);
    setMonth(false as any);
  }

  const showMonth = async() => {
    setWeakness(false as any);
    setTag(false as any);
    setLanguage(false as any);
    setMonth(true as any);
  }

  return (
    <Container>
      <Select>
        <CategoryButton onClick={showWeakness} color={weakness?"white":"#939292"} bg={weakness?"#FFC94D":"white"} hbg={weakness?"#EA9800":"#fff2d9"} hc={weakness?"white":"#939292"}>취약점</CategoryButton>
        <CategoryButton onClick={showLanguage} color={language?"white":"#939292"} bg={language?"#FFC94D":"white"} hbg={language?"#EA9800":"#fff2d9"} hc={language?"white":"#939292"}>사용언어 비율</CategoryButton>
        <CategoryButton onClick={showTag} color={tag?"white":"#939292"} bg={tag?"#FFC94D":"white"} hbg={tag?"#EA9800":"#fff2d9"} hc={tag?"white":"#939292"}>태그 별 해결 문제 수</CategoryButton>
        <CategoryButton onClick={showMonth} color={month?"white":"#939292"} bg={month?"#FFC94D":"white"} hbg={month?"#EA9800":"#fff2d9"} hc={month?"white":"#939292"}>월 별 문제 풀이 갯수</CategoryButton>
      </Select>

      <SubContainer>
        {weakness ? <Weakness accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {tag ? <Tag accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {language ? <Language accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {month ? <Month accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
      </SubContainer>
    </Container>
  );
};

export default Index;