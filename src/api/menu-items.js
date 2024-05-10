import * as Io from "react-icons/io5";

export default [
  {
    menuName: "홈으로",
    menuIcon: <Io.IoHome />,
    menuLink: "/",
    subMenu: undefined
  },
  {
    menuName: "공지사항",
    menuIcon: <Io.IoMegaphone />,
    menuLink: "/notice",
    subMenu: undefined
  },
  {
    menuName: "게시판",
    menuIcon: <Io.IoReader />,
    menuLink: undefined,
    subMenu: [
      {
        subName: "공지사항 조회",
        subLink: "/notice"
      },
      {
        subName: "공지사항 조회",
        subLink: "/notice"
      },
      {
        subName: "공지사항 조회",
        subLink: "/notice"
      }
    ]
  },
  // {
  //   menuName: "게시판 관리",
  //   menuIcon: <Io.IoDocuments />,
  //   menuLink: "/weather",
  //   subMenu: undefined
  // },
  {
    menuName: "날씨",
    menuIcon: <Io.IoSunny />,
    menuLink: "/weather",
    subMenu: undefined
  },
  {
    menuName: "스프레드시트",
    menuIcon: <Io.IoGrid />,
    menuLink: "/spread",
    subMenu: undefined
  },
  {
    menuName: "리액트 스프링",
    menuIcon: <Io.IoSettings />,
    menuLink: "/deck",
    subMenu: undefined
  },
  {
    menuName: "테스트중",
    menuIcon: <Io.IoFlaskSharp />,
    menuLink: undefined,
    subMenu: [
      {
        subName: "CSS Test",
        subLink: "/scroll"
      }
    ]
  },
]
