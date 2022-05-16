export const getBackgroundColor = (tier: string) =>{
  switch (tier) {
   case 'Bronze':
     return ('#E5C5B6')
   case 'Silver':
     return ('#D5DCE3')
   case 'Gold':
     return ('#FFF7CB')
   case 'Platinum':
     return ('#D3F3E1')
   case 'Diamond':
     return ('#BEDBF9')
   case 'Ruby':
     return ('#FF9999')
   default:
     return ('#A0A0A0')
  }
}
