import React, { useEffect, useState } from "react";
import AnalyTitle from "../../common/AnalyTitle";
import FavoriteCard from "./FavoriteCard/FavoriteCard";
import styled from "styled-components";

import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../../util/stateCollection'
import { getFavorites } from "../../../api/back/analysis/Favorite";
import FavoriteList from "./FavoriteCard/FavoriteList";

const Container = styled.div`
  min-width: 100%;
  min-height: 700px;
  background: #ffffff;
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Favorite = () => {
  const accessToken = useRecoilValue(accessTokenState)
  const [rows, setRows] = useState([])

  // 최초진입시 문제표시 api
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
    <Container>
      <AnalyTitle>즐겨찾기</AnalyTitle>
      {rows.length==0?
      <div>아직 즐겨찾기 항목이 없습니다! 맘에 드는 카드의 별을 눌러 즐겨찾기를 해보세요 :)</div>:
      <FavoriteList
        rows={rows}
      />}
    </Container>
  );
};

export default Favorite;
