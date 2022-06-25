import styled from "styled-components"

const StyledCard = styled.div<{ gtc: string, gtr: string, mt: string, dp: string }>`
  background: #ffffff;
  box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 1rem 2rem;
  display: ${(props) => (props.dp ? props.dp : "")};
  grid-template-columns: ${(props: any) => (props.gtc ? props.gtc : "")};
  grid-template-rows: ${(props: any) => (props.gtr ? props.gtr : "")};
`

const AnalyCard = ({ children, ...props }: any) => {
  return (
    <StyledCard {...children} {...props}>
      {children}
    </StyledCard>
  )
}

export default AnalyCard