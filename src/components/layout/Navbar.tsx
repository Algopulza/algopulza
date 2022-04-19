import { useState, useEffect} from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "components/Search/SearchInput"
import NavItem from "components/layout/NavItem"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  border-bottom: 1px solid black;
  padding: 1rem 5rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-family: 'GmarketSansBold';
`

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  position: relative;
  align-items: center;
`

const Navbar = () => {
  const location = useLocation();
  const [isSelected, setIsSelected] = useState("/");
  const navigate = useNavigate();
  
  const onClick = (url: string) => {
    navigate(url);
    setIsSelected(url);
  };

  useEffect(() => {
    setIsSelected("/" + location.pathname.split("/")[1]);
  }, [location]);

  return (
    <Container>
        <Title onClick={() => navigate("/")}>알고 풀자</Title>
      <TabContainer>
        <NavItem 
                url="/recommand"
                name="추천"
                onClick={onClick}
                isSelected={isSelected}
        />
        <NavItem 
                url="/random"
                name="랜덤"
                onClick={onClick}
                isSelected={isSelected}
        />
        <NavItem 
                url="/category"
                name="카테고리"
                onClick={onClick}
                isSelected={isSelected}
        />
        <NavItem 
                url="/analysis"
                name="분석"
                onClick={onClick}
                isSelected={isSelected}
        />

      </TabContainer>
      <SearchInput
      url = {"/search"}
      onClick={onClick}
      isSelected={isSelected}
    />
    </Container>
  );
};

export default Navbar;
