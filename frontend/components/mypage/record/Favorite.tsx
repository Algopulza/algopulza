import React, { useEffect, useState } from "react";
import AnalyTitle from "../../common/AnalyTitle";
import FavoriteCard from "./FavoriteCard/FavoriteCard";
import styled from "styled-components";

import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../../../util/stateCollection'
import { getFavorites } from "../../../api/back/analysis/Favorite";
import FavoriteList from "./FavoriteCard/FavoriteList";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 2em;
`;

const Col = styled.div<{size: number}>`
  display: flex;
  flex: ${props => props.size};
  justify-content: center;
  max-height: 40em;
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
      <FavoriteList
        rows={rows}
      />
    </Container>
  );
};

export default Favorite;
