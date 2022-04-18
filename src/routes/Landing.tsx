import React from 'react';
import styled from "styled-components";
import landing from 'assets/img/landing_img.png'

const Container = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr;
    width: 100vw;
    height: 100vh;
`

const Img = styled.img`
    
`

const Landing = () => {
    return (
        <Container>
            <Img src = {landing} />
        </Container>
    );
};

export default Landing;