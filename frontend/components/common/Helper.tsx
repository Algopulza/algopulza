import { Popover, Button, Text, Grid } from "@nextui-org/react"

export default function Helper() {
  return (
    <Grid.Container justify="center" alignContent="center">
      <Grid key={"right"}>
        <Popover placement={"right"}>
          <Popover.Trigger>
            <Button flat color="warning" auto style={{marginLeft: 10, fontSize: '1.2vw', borderRadius: '15px'}}>?</Button>
          </Popover.Trigger>
          
          <Popover.Content>
            <Text css={{ p: "$10" }}>
              확인해보쇼
            </Text>
          </Popover.Content>
        </Popover>
      </Grid>
    </Grid.Container>
  )
}