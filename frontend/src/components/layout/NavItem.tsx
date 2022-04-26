import styled from "styled-components";

const Container = styled.div<{ co: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.co ? "#FFB305" : "black")};
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;

  &:hover {
    color: #ffb305;
  }
`;

type UserProps = {
  onClick(url: string): void;
  url: string;
  name: string;
  isSelected: string;
};

const NavItem = ({ onClick, url, name, isSelected }: UserProps) => {
  return (
    <Container
      onClick={() => onClick(url)}
      co={isSelected === url ? true : false}
    >
      {name}
    </Container>
  );
};

export default NavItem;