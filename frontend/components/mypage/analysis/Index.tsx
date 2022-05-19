import React, { useState } from "react";
import styled from "styled-components";
import Eight from "./Eight";
import Tag from "./Tag";
import Language from "./Language";
import Month from "./Month";
import Weakness from "./Weakness";
import { User } from "../../../pages/mypage";
import AnalyCard from "../../common/card/AnalyCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1fr;
`;

const Select = styled.div`
  display: inline-flex;
  flex-direction: column;
  font-weight: bold;
`

const CategoryButton = styled.button<{bg:string, hbg:string, hc:string}>`
  height: 6vh;
  width: 10vw;
  font-size: 0.8rem;
  border: 1px solid  ${(props) => (props.bg ? props.bg : "")};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.bg ? props.bg : "")};
  color: ${(props) => (props.color ? props.color : "")};
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.hbg ? props.hbg : "")};
    color:  ${(props) => (props.hc ? props.hc : "")};
  }
  margin-top: 1rem;
`

const Index = ({accessToken, memberId, bojId}:User) => {
  const [eight, setEight] = useState(true)
  const [tag, setTag] = useState(false)
  const [language, setLanguage] = useState(false)
  const [month, setMonth] = useState(false)
  const [weakness, setWeakness] = useState(false)

  const showWeakness = async() => {
    setWeakness(true as any);
    setTag(false as any);
    setLanguage(false as any);
    setMonth(false as any);
    setEight(false as any);
  }
  
  const showTag = async() => {
    setWeakness(false as any);
    setTag(true as any);
    setLanguage(false as any);
    setMonth(false as any);
    setEight(false as any);
  }

  const showLanguage = async() => {
    setWeakness(false as any);
    setTag(false as any);
    setLanguage(true as any);
    setMonth(false as any);
    setEight(false as any);
  }

  const showMonth = async() => {
    setWeakness(false as any);
    setTag(false as any);
    setLanguage(false as any);
    setMonth(true as any);
    setEight(false as any);
  }

  const showEight = async() => {
    setWeakness(false as any);
    setTag(false as any);
    setLanguage(false as any);
    setMonth(false as any);
    setEight(true as any);
  }

  return (
    <Container>
      <Select>
        <CategoryButton onClick={showEight} color={eight?"white":"black"} bg={eight?"#8F8F8F":"white"} hbg={eight?"#898989":"#F4F4F4"} hc={eight?"white":"black"}>핵심 유형 분석</CategoryButton>
        <CategoryButton onClick={showTag} color={tag?"white":"black"} bg={tag?"#8F8F8F":"white"} hbg={tag?"#898989":"#F4F4F4"} hc={tag?"white":"black"}>유형 별 해결 문제 수</CategoryButton>
        <CategoryButton onClick={showLanguage} color={language?"white":"black"} bg={language?"#8F8F8F":"white"} hbg={language?"#898989":"#F4F4F4"} hc={language?"white":"black"}>사용언어 비율</CategoryButton>
        <CategoryButton onClick={showMonth} color={month?"white":"black"} bg={month?"#8F8F8F":"white"} hbg={month?"#898989":"#F4F4F4"} hc={month?"white":"black"}>월 별 문제 풀이 갯수</CategoryButton>
        <CategoryButton onClick={showWeakness} color={weakness?"white":"black"} bg={weakness?"#8F8F8F":"white"} hbg={weakness?"#898989":"#F4F4F4"} hc={weakness?"white":"black"}>취약점</CategoryButton>
      </Select>

      <AnalyCard>
        {weakness ? <Weakness accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {tag ? <Tag accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {language ? <Language accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {month ? <Month accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {eight ? <Eight accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
      </AnalyCard>
    </Container>
  );
};

export default Index;