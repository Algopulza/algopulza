import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { NavItemAttr } from '../../../util/dto'

// const Text = styled.span<{ cond: boolean }>`
//   margin: 0 3vw 0 3vw;
//   font-size: 1.3vw;
//   color: ${(props) => (props.cond ? "#FFC94D" : "#cdcaca")};
//   cursor: pointer;
//   &:hover {
//     color: #FFC94D;
//   }
// `

type NavItemProps = {
  navItemAttr: NavItemAttr,
  isLocated: String,
  onClick(path: string): void
}

export default function NavItemRouter({ navItemAttr, isLocated, onClick }: NavItemProps) {
  const router = useRouter()
  const clickHandler = () => {
    router.push(navItemAttr.url)
  }

  return (
    <span style={{ marginRight: 10, color: '#FFFFFF' }} onClick={clickHandler}>{navItemAttr.item}</span>


    // <Link href={navItemAttr.url}>
    //   <a>
    //     <Text
    //       onClick={() => onClick(navItemAttr.url)}
    //       cond={navItemAttr.url == isLocated ? true : false}
    //     >
    //       {navItemAttr.item}
    //     </Text>
    //   </a>
    // </Link>
  )
}
