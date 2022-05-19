import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Eight from "./Eight";
import Tag from "./Tag";
import Language from "./Language";
import Month from "./Month";
import Weakness from "./Weakness";
import { User } from "../../../pages/mypage";
import AnalyCard from "../../common/card/AnalyCard";
import Image from "next/image"
import { useRecoilValue } from "recoil";
import { solvedRowState } from "../../../util/stateCollection";
import { flexbox } from "@mui/system";

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
  const [help, setHelp] = useState(false)

  const row = useRecoilValue(solvedRowState)
  console.log(row)
  const showWeakness = async() => {
    setWeakness(true as any);
    setTag(false as any);
    setLanguage(false as any);
    setMonth(false as any);
    setEight(false as any);
    setHelp(false as any);
  }
  
  const showTag = async() => {
    setWeakness(false as any);
    setTag(true as any);
    setLanguage(false as any);
    setMonth(false as any);
    setEight(false as any);
    setHelp(false as any);
  }

  const showLanguage = async() => {
    setWeakness(false as any);
    setTag(false as any);
    setLanguage(true as any);
    setMonth(false as any);
    setEight(false as any);
    setHelp(false as any);
  }

  const showMonth = async() => {
    setWeakness(false as any);
    setTag(false as any);
    setLanguage(false as any);
    setMonth(true as any);
    setEight(false as any);
    setHelp(false as any);
  }

  const showEight = async() => {
    setWeakness(false as any);
    setTag(false as any);
    setLanguage(false as any);
    setMonth(false as any);
    setEight(true as any);
    setHelp(false as any);
  }

  const showHelp = async() => {
    setWeakness(false as any);
    setTag(false as any);
    setLanguage(false as any);
    setMonth(false as any);
    setEight(false as any);
    setHelp(true as any);
  }

  useEffect(()=>{
    if(row === 0){
    setHelp(true as any)
    setEight(false as any)
    }
    else{
    setHelp(false as any)
    setEight(true as any)
    }
  },[row])

  return (
    <Container>
      <Select>
        <CategoryButton onClick={showEight} color={eight?"white":"black"} bg={eight?"#FFC94D":"white"} hbg={eight?"#FFCF62":"#F4F4F4"} hc={eight?"white":"black"}>핵심 유형 분석</CategoryButton>
        <CategoryButton onClick={showTag} color={tag?"white":"black"} bg={tag?"#FFC94D":"white"} hbg={tag?"#FFCF62":"#F4F4F4"} hc={tag?"white":"black"}>유형 별 해결 문제 수</CategoryButton>
        <CategoryButton onClick={showLanguage} color={language?"white":"black"} bg={language?"#FFC94D":"white"} hbg={language?"#FFCF62":"#F4F4F4"} hc={language?"white":"black"}>사용언어 비율</CategoryButton>
        <CategoryButton onClick={showMonth} color={month?"white":"black"} bg={month?"#FFC94D":"white"} hbg={month?"#FFCF62":"#F4F4F4"} hc={month?"white":"black"}>월 별 문제 풀이 갯수</CategoryButton>
        <CategoryButton onClick={showWeakness} color={weakness?"white":"black"} bg={weakness?"#FFC94D":"white"} hbg={weakness?"#FFCF62":"#F4F4F4"} hc={weakness?"white":"black"}>취약점</CategoryButton>
        <CategoryButton onClick={showHelp} color={help?"white":"black"} bg={help?"#FFC94D":"white"} hbg={help?"#FFCF62":"#F4F4F4"} hc={help?"white":"black"}>도움말</CategoryButton>
      </Select>

      <AnalyCard>
        {weakness ? <Weakness accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {tag ? <Tag accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {language ? <Language accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {month ? <Month accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {eight ? <Eight accessToken={accessToken} memberId={memberId} bojId={bojId}/> : null}
        {help ? <div style={{display:"flex",justifyContent:"center",alignContent:"center"}}><Image src={'/analysis/algopulza_help.png'} layout="fixed" width={1000} height={500} alt="도움말 사진" /></div> : null}
      </AnalyCard>
    </Container>
  );
};

export default Index;