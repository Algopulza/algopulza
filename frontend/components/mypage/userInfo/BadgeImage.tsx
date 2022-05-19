import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Image from "next/image"
import { getBadgeImage } from "../../../util/BadgeImage"
import styled from "styled-components"
import { Transition } from '../../../util/Transition'
import BadgeModal from './BadgeModal'

const ProfileImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: flex-end;
  border-radius: 4rem;
  width: 6vw;
  height: 6vh;
  padding: 0;
  cursor: pointer;
  
`

const EXP = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: bold;
  font-size: 0.8rem;
`

type User = {
  exp: number
}

const BadgeImage = ({exp}:User) => {
  const badge = getBadgeImage(exp).image
  const [opens, setOpens] = useState(false)

  const handleClickOpens = () => {
    setOpens(true)
  }

  const handleCloseWithDisgree = () => {
    setOpens(false)
  }
  return (
    <div>
      <ProfileImage
        onClick={handleClickOpens}
        style={{}}
        >
          <Image src={badge} layout="responsive" width={400} height={400}  alt="뱃지 사진이 이상해요" />
          <EXP>{exp}xp</EXP>
        </ProfileImage>
        
        <Dialog
        open={opens}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseWithDisgree}
      >
        <DialogTitle sx={{margin: "auto", paddingTop:"2rem"}}>{"경험치 등급표"}</DialogTitle>
        <DialogContent
        style={{padding: "1rem 2rem"}}
        >
          <DialogContentText>
            <BadgeModal />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BadgeImage;