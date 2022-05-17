import styled from "styled-components";

const StyledCard = styled.div<{gtc:string}>`
  background: #FFFFFF;
  box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 1rem;
  
  grid-template-columns: ${(props:any) => (props.gtc? "1fr 2fr":"")};
  grid-template-rows: ${(props:any) => (props.gtr? "1fr 2fr":"")};
`;

const AnalyCard = ({children, ...props}:any) => {
  return (
    <StyledCard {...children} {...props}>
      {children}
    </StyledCard>
  );
};

export default AnalyCard;
