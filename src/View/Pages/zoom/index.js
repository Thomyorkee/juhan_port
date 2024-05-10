import "swiper/css";
import React from "react";
import { connect } from "react-redux";
import Zoom from "View/Component/Zoom";
import { useRecoilValue } from "recoil";
import { textState } from "View/Common/utils";

function Product({ layout }) {
  const text = useRecoilValue(textState);

  console.log("success from other component", text);

  return (
    <React.Fragment>
      <div className="zoom">
        <Zoom
          src={[
            "/img/product-img1.jpg",
            "/img/product-img2.jpg",
            "/img/product-img3.jpg",
            "/img/product-img4.jpg",
            "/img/product-img1.jpg",
            "/img/product-img2.jpg",
            "/img/product-img3.jpg",
            "/img/product-img4.jpg",
            "/img/product-img1.jpg",
            "/img/product-img2.jpg",
            "/img/product-img3.jpg",
            "/img/product-img4.jpg",
            "/img/product-img1.jpg",
            "/img/product-img2.jpg",
            "/img/product-img3.jpg",
            "/img/product-img4.jpg",
            "/img/product-img5.jpg",
            "/img/product-img6.jpg",
          ]}
          zoomRate={2}
          width={layout.width >= 1200 ? 400 : layout.width}
          height={layout.width >= 1200 ? 400 : 500}
          thumbnailPosition={layout.width >= 1200 ? "left" : "bottom"}
          zoomType={layout.width >= 1200 ? "side" : "off"}
        />
      </div>
    </React.Fragment>
  );
}

export default connect(
  // props 로 넣어줄 스토어 상태값
  (state) => ({
    layout: state.layout,
  }),
  // props 로 넣어줄 액션 생성함수
  (dispatch) => ({})
)(Product);
