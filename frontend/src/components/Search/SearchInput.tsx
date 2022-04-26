import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import reading_glasses from "assets/img/reading_glasses.png";

const SearchContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;
const Input = styled.input`
  display: inline-flex;
  width: 13rem;
  height: 1.5rem;
  font-size: 0.7rem;
  margin: 0;
  border-radius: 10rem;
  border: 1px solid grey;
  padding-left: 1rem;
`;

const SearchImgWrapper = styled.a`
  display: flex;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const ReadingGlassesImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
// type UserProps = {
//   onClick(url: string): void;
//   url: string;
//   isSelected: string;
// };

// const SearchInput = ({ onClick, url, isSelected }: UserProps) => {
const SearchInput = () => {
  const [word, setWord] = useState(null); // api
  // const navigate = useNavigate();

  // 검색어 input
  const onChange = (e: any) => {
    setWord(e.target.value);
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <SearchContainer>
      <Input
        placeholder="알고리즘 문제를 검색해주세요."
        value={word || ""}
        type="text"
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <input type="text" style={{ display: "none" }} />
      <SearchImgWrapper>
        <ReadingGlassesImg
          src={reading_glasses}
          alt="reading_glasses"
          onClick={onKeyPress}
        />
      </SearchImgWrapper>
    </SearchContainer>
  );
};

export default SearchInput;