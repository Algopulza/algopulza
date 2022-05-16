import styled from "styled-components";

const StyledTitle = styled.p`
  font-size: 1.5rem;
`;

const AnalyTitle = (props:any) => {
  return <StyledTitle {...props} ></StyledTitle>;
};

export default AnalyTitle;
