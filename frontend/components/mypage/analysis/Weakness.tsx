import styled from "styled-components";
import { useEffect, useState } from "react";
import { getAnalyWeak } from "../../../api/flask/analysis/AnalyWeek";
import { User } from "../../../pages/mypage";
import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

export default function Weakness({accessToken, bojId}:User) {
  const [word, setWord] = useState<Array<any>>([]);

  const AnalUser = async () => {
    await getAnalyWeak(accessToken, bojId)
      .then((res) => {
        const year = res.data.data;
        let idx = 0;
        const temp = []
        for (idx; idx < year.length; idx++) {
          temp.push({
            text: year[idx].text,
            value: year[idx].value
          })
        }
        setWord(temp);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // AnalUser();
  }, []);
  
  const words = word

  return (
    <Container>
      {/* <ReactWordcloud words={words} /> */}
    </Container>
  );
}