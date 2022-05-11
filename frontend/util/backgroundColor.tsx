export const getBackgroundColor = (tier: string) =>{
  switch (tier) {
   case 'Bronze':
     return ('#AD5600')
   case 'Silver':
     return ('#435F7A')
   case 'Gold':
     return ('#EC9A00')
   case 'Platinum':
     return ('#2BE3A5')
   case 'Diamond':
     return ('#00B4FC')
   case 'Ruby':
     return ('#FF0062')
   default:
     return ('#545454')
  }
}
