export const getBadgeImage = (exp: number) =>{
  if( exp <= 14)
     return {image: ('/analysis/badge/seed1.png'), per: [Math.floor(exp/14 * 100)], grade:"씨앗"}
  else if( exp <= 60)
     return {image: ('/analysis/badge/seed2.png'), per: [Math.floor(exp/60 * 100)], grade:"새싹"}
  else if( exp <= 180)
     return {image: ('/analysis/badge/seed3.png'), per: [Math.floor(exp/180 * 100)], grade:"푸른잎"}
  else if( exp <= 360)
     return {image: ('/analysis/badge/seed4.png'), per: [Math.floor(exp/360 * 100)], grade:"봉오리"}
  else if( exp <= 720)
     return {image: ('/analysis/badge/seed5.png'), per: [Math.floor(exp/720 * 100)], grade:"개화"}
  else
     return {image: ('/analysis/badge/seed5.png'), per: [Math.floor(exp/720 * 100)], grade:"개화"}
  }
