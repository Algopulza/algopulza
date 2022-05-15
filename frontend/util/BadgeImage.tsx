export const getBadgeImage = (exp: number) =>{
  if( exp <= 14)
     return {image: ('_next/static/media/seed1.6bc96c0e.png'), per: [Math.floor(exp/14 * 100)], grade:"씨앗"}
  else if( exp <= 60)
     return {image: ('_next/static/media/seed2.95799e4b.png'), per: [Math.floor(exp/60 * 100)], grade:"새싹"}
  else if( exp <= 180)
     return {image: ('_next/static/media/seed3.8d92ccde.png'), per: [Math.floor(exp/180 * 100)], grade:"푸른잎"}
  else if( exp <= 360)
     return {image: ('_next/static/media/seed4.cf1c4514.png'), per: [Math.floor(exp/360 * 100)], grade:"봉오리"}
  else if( exp <= 720)
     return {image: ('_next/static/media/seed5.8885e175.png'), per: [Math.floor(exp/720 * 100)], grade:"개화"}
  else
     return {image: ('_next/static/media/seed5.8885e175.png'), per: [Math.floor(exp/720 * 100)], grade:"개화"}
  }
