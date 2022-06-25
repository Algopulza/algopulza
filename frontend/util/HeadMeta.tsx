import {Head} from 'next/document'

export const HeadMeta = () => {
  return (
    <Head>
      <link rel="shortcut icon" href="/common/brand_logo.png" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;700&display=swap"
        rel="stylesheet"
        type="text/css"
      />
      <title>{"알고풀자"}</title>
      <meta
        name="description"
        content={"막 풀지 말고 알고 풀자! 알고리즘 추천 서비스 입니다! #알고리즘 #algorithm #백준 #baekjoon #boj #프로그래머스 #solved.ac #1일1알고리즘 #알고리즘 #스터디" }
      />
      <meta name="keywords" content="코딩, 프로그래밍, 알고리즘, algorithm, 백준, ,baekjoon ,boj ,프로그래머스 ,solved.ac ,1일1알고리즘 ,알고리즘 ,스터디" />
    </Head>
  )
}