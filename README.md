## 프로젝트 소개

3년차 프론트엔드 개발자 김주한의 포트폴리오입니다.

### `로그인`

초기 입장 시 [http://localhost](http://localhost) 로그인 기능을 구현했습니다. 백엔드 소스에서 JWT를 발급받아 쿠키형식으로 저장, 매번 API요청 시 토큰검증의 형태의
Flow를 가집니다.\
한번 로그인 시 로그인 정보는 쿠키에 저장되어 이후 페이지 입장시에는 로그인이 필요하지 않습니다.\
- 백엔드 소스 유실로 임시 토큰을 발급받는 버튼을 추가해놨습니다.

### `메인페이지`

간략한 소개 및 이력, 자격증, 경험 등을 정리했습니다.\
프로젝트 전반에 걸쳐 AOS 라이브러리를 사용해 컴포넌트의 fade-in, out 등의 애니메이션을 편리하게 추가했습니다.

### `좌측 사이드바`

사이드바 우측 중단 화살표 버튼으로 사이드바 확장/축소가 가능합니다.\
매뉴 아이템은 트리형태를 가지며 자식 노드가 존재할 시 Expand가 가능합니다. 사이드바 축소시에는 자식 노드가 호버링됩니다.\
classNames를 사용하여 특정 state 조건에 따른 동적 css 변경 기능을 통해 구현됐습니다.

### `공지사항`

냉장고에 붙은 포스트잇에 영감을 받아 제작한 이동가능한 컨텐츠 영역을 구현했습니다. 현재 영역간 재배치 기능을 추가하고 있습니다.\
공지사항을 게시판 형태로 구현하였고 React-query를 사용하여 게시글을 삽입,수정,삭제할 수 있도록 제작했습니다.\

### `날씨`

상단에 서울시 동 단위까지 검색 가능한 자동완성 검색창을 배치했습니다.\
외부 API 통신을 테스트하기 위해 날씨정보는 https://api.openweathermap.org의 데이터를 사용했습니다.\
지도는 react leaflet 라이브러리를 사용하여 검색한 지역의 위경도를 통해 반영되도록 만들었습니다.

### `스프레드시트`

구글 시트를 직접 구현해보고자 만들어본 페이지입니다. 외부 라이브러리 도움 없이 순수 Javascript를 통해 구현하고자 했습니다.\
매 Cell 입력시 입력데이터는 db상에 저장이되는 형태로 제작했습니다.\
웹접근성을 고려하여 키보드 조작이 가능하게 하였고, 최대한 엑셀의 느낌이 나도록 따라해봤습니다.\

- 사용 키\
-> 년, 월, 사업부, 담당자, 매출구분, 매출품목 부분 : 셀렉트박스 형태로 3번 클릭시 혹은 두번 클릭하여 입력모드로 전환 후 Space를 누를 시 선택항목이 활성화됩니다.\
-> Tab : 다음 열로 이동\
-> Enter : 다음 행으로 이동\
-> Arrow : 화살표 방향 셀 이동\
-> Ctrl + z : 실행 취소\
-> Ctrl + Enter : 행 추가\
-> 인덱스 번호 클릭 후 마우스 우클릭 : 행의 복사 및 삭제 버튼 활성화\

### `리액트 스프링`

react spring 라이브러리를 사용해 동적인 웹을 구현해보고자 스터디중입니다.\
현재는 카드셔플기능 밖에 없지만 조금 더 공부해서 앞으로 많은 테스트 코드를 추가할 예정입니다,\

### `테스트중`

현재 테스트중인 css 샘플들을 모아놓은 페이지입니다. 웹서비스는 기능도 중요하지만 사용자들이 보기에 편하고 멋진것도 중요하다고 생각해 틈틈히 scss를 통한 애니메이션 구현을 연습하고 있습니다.

## 구동방법

프로젝트를 구동하는 방법

### `1. npm i`

npm install을 통해 node_modules 폴더를 생성합니다.

### `2. npm start`

설치가 끝나면 npm start를 통해 실행됩니다. 기본 포트를 80으로 설정했습니다.

### `npm run build`

Jenkins 파이프라인 파일을 만들어 빌드부터 Docker 배포까지 원클릭으로 이루어지도록 설정했습니다.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.