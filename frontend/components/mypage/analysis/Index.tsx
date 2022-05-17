import React, { useState } from "react";
import styled from "styled-components";
import Weakness from "./Weakness";
import Tag from "./Tag";
import Language from "./Language";
import Month from "./Month";
import { User } from "../../../pages/mypage";
import AnalyCard from "../../common/card/AnalyCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  gap: 2rem;
`;

const Select = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0 1rem;
  font-weight: bold;
`

const CategoryButton = styled.button<{bg:string, hbg:string, hc:string}>`
  height: 7vh;
  width: 10vw;
  font-size: 0.8rem;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
        <CategoryButton onClick={showWeakness} color={weakness?"white":"white"} bg={weakness?"#282828":"#A1A1A1"} hbg={weakness?"#404040":"#8F8F8F"} hc={weakness?"white":"white"}>취약점</CategoryButton>
        <CategoryButton onClick={showTag} color={tag?"white":"white"} bg={tag?"#282828":"#A1A1A1"} hbg={tag?"#404040":"#8F8F8F"} hc={tag?"white":"white"}>태그 별 해결 문제 수</CategoryButton>
        <CategoryButton onClick={showLanguage} color={language?"white":"white"} bg={language?"#282828":"#A1A1A1"} hbg={language?"#404040":"#8F8F8F"} hc={language?"white":"white"}>사용언어 비율</CategoryButton>
        <CategoryButton onClick={showMonth} color={month?"white":"white"} bg={month?"#282828":"#A1A1A1"} hbg={month?"#404040":"#8F8F8F"} hc={month?"white":"white"}>월 별 문제 풀이 갯수</CategoryButton>
      </Select>

      <AnalyCard>
        {weakness ? <Weakness accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {tag ? <Tag accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {language ? <Language accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {month ? <Month accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
      </AnalyCard>
    </Container>
  );
};

export default Index;