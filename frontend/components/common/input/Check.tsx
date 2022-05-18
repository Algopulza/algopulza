import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import { useSetRecoilState } from 'recoil';
import { checkState } from '../../../util/stateCollection';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export default function Check() {
  const setIsCheck = useSetRecoilState(checkState)

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Checkbox {...label} onClick={() => {setIsCheck(prev => !prev)}} style={{padding: 0, marginRight: '5px'}}/>
      <span>해결</span>
    </div>
  );
}
