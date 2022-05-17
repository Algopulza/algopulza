import React, { useEffect, useState } from "react";
import AnalyTitle from "../../common/AnalyTitle";
import AnalyCard from "../../common/card/AnalyCard";
import styled from "styled-components";

import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../../util/stateCollection'
import { getFavorites } from "../../../api/back/analysis/Favorite";
import FavoriteList from "./FavoriteCard/FavoriteList";

const None = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  min-height: 8rem;
font-size: 1.5rem;
`
const Favorite = () => {
  const accessToken = useRecoilValue(accessTokenState)
  const [rows, setRows] = useState([])

  // 문제표시 api
  const favoriteList = async () => {
    await getFavorites(accessToken)
      .then(res => {
        setRows(res.data.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => { 
    favoriteList()
  }, [])
  return (
    <AnalyCard>
      <AnalyTitle>즐겨찾기</AnalyTitle>
      {rows.length==0?
      <None>즐겨찾기한 문제가 없어요</None>:
      <FavoriteList
        rows={rows}
      />}
    </AnalyCard>
  );
};

export default Favorite;
