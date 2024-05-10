import React, { useState, useEffect, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import cx from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Mousewheel } from "swiper";
import "View/css/zoom.css";
SwiperCore.use([FreeMode, Mousewheel]);

/*
 +-+-+ +-+-+-+-+
 |H|W| |Z|O|O|M|
 +-+-+ +-+-+-+-+                               
*/

function Zoom({
  src,
  zoomRate,

  height,
  width,

  thumbnailPosition,
  thumbnailSize,
  thumbnailShow,

  zoomType,
}) {
  const [currentImage, setImage] = useState(null);
  const [cursor, setCursor] = useState({});

  /**
   * 전체 컨테이너 width 값 계산
   */
  const getWidth = useCallback(
    (width) => {
      return (thumbnailPosition.toUpperCase() == "LEFT" ||
        thumbnailPosition.toUpperCase() == "RIGHT") &&
        thumbnailShow
        ? width + thumbnailSize + 10 // grid gap size
        : width;
    },
    [thumbnailPosition, thumbnailSize, thumbnailShow]
  );

  /**
   * 전체 컨테이너 height 값 계산
   */
  const getHeight = useCallback(
    (height) => {
      return thumbnailPosition.toUpperCase() == "TOP" ||
        thumbnailPosition.toUpperCase() == "BOTTOM"
        ? height + thumbnailSize + 10 // grid gap size
        : height;
    },
    [thumbnailPosition, thumbnailSize, thumbnailShow]
  );

  /**
   * 확대된 영역 커서 x값 계산
   */
  const calculateCursorX = useCallback(
    (x, safe = true) => {
      const value = x - width / zoomRate / 2;
      const size = width / zoomRate;

      console.log("calculateCursorX", x, width, zoomRate, value, size);
      console.log("X", x, width, zoomRate, value, size);
      console.log(value < 0, 0)
      console.log(value > width - size, width - size)

      if (value < 0) {
        return 0;
      }
      if (safe) {
        if (value > width - size) {
          return width - size;
        }
      }

      return value;
    },
    [width, zoomRate]
  );

  /**
   * 확대된 영역 커서 y값 계산
   */
  const calculateCursorY = useCallback(
    (y, safe = true) => {
      const value = y - height / zoomRate / 2;
      const size = height / zoomRate;

      if (value < 0) {
        return 0;
      }
      if (safe) {
        if (value > height - size) {
          return height - size;
        }
      }
      return value;
    },
    [height, zoomRate]
  );

  // on start
  useEffect(() => {
    if (_.isString(src)) {
      setImage(src);
    } else {
      setImage(_.get(src, "[0]", null));
    }
  }, []);

  return (
    <Fragment>
      <div
        className={cx("_zoom", thumbnailPosition)}
        style={{
          height: getHeight(height),
          width: getWidth(width),
        }}
      >
        {thumbnailShow && (
          <div
            className="swiper-container"
            style={{
              width:
                thumbnailPosition.toUpperCase() == "TOP" ||
                thumbnailPosition.toUpperCase() == "BOTTOM"
                  ? null
                  : thumbnailSize,
              height:
                thumbnailPosition.toUpperCase() == "LEFT" ||
                thumbnailPosition.toUpperCase() == "RIGHT"
                  ? null
                  : thumbnailSize,
            }}
          >
            <Swiper
              direction={
                thumbnailPosition.toUpperCase() == "TOP" ||
                thumbnailPosition.toUpperCase() == "BOTTOM"
                  ? "horizontal"
                  : "vertical"
              }
              spaceBetween={10}
              slidesPerView={"auto"}
              mousewheel={true}
              freeMode={true}
              onClick={(s, e) => {
                if (!!src[s.clickedIndex]) {
                  s.slideTo(s.clickedIndex);
                  setImage(src[s.clickedIndex]);
                }
              }}
            >
              {src.map((item, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div
                      className="background-size"
                      style={{
                        height: thumbnailSize,
                        width: thumbnailSize,
                        backgroundImage: `url(${item})`,
                      }}
                    ></div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        <div
          className="image-container"
          onMouseMove={(e) => {
            setCursor({
              x: e.clientX - e.target.parentElement.offsetLeft,
              y: e.clientY - e.target.parentElement.offsetTop,
            });
          }}
          // onMouseLeave={() => {
          //   setCursor({});
          // }}
        >
          <div
            className="image background-size"
            style={{
              height: height,
              width: width,
              backgroundImage: `url(${currentImage})`,
            }}
          />
          {!_.isEmpty(cursor) && zoomType.toUpperCase() != "CURSOR" && (
            <div
              className={cx("cursor", {
                ["_" + zoomType]: !!zoomType,
              })}
              style={{
                width: width / zoomRate,
                height: height / zoomRate,
                top: calculateCursorY(cursor.y),
                left: calculateCursorX(cursor.x),
              }}
            ></div>
          )}
          {!_.isEmpty(cursor) && (
            <div
              className={cx("view-container", {
                ["_" + zoomType]: !!zoomType,
              })}
              style={
                zoomType.toUpperCase() != "CURSOR"
                  ? {
                      height: height,
                      width: width,
                    }
                  : {
                      width: width / zoomRate,
                      height: height / zoomRate,
                      top: calculateCursorY(cursor.y),
                      left: calculateCursorX(cursor.x),
                    }
              }
            >
              <div
                className="image background-size"
                style={{
                  height: height,
                  width: width,
                  backgroundImage: `url(${currentImage})`,
                  transform: `scale(${zoomRate})`,
                  transformOrigin: '0 0',
                  marginLeft:
                    calculateCursorX(
                      cursor.x
                    ) * zoomRate * -1,
                  marginTop:
                    calculateCursorY(
                      cursor.y
                    ) * zoomRate * -1,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

Zoom.propTypes = {
  zoomRate: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.array.isRequired,
  zoomType: PropTypes.oneOf(["cursor", "cover", "side", "off"]).isRequired,

  thumbnailSize: PropTypes.number,
  thumbnailPosition: PropTypes.string,
  thumbnailShow: PropTypes.bool,
};

Zoom.defaultProps = {
  zoomRate: 5,
  thumbnailSize: 80,
  width: 400,
  height: 400,
  thumbnailPosition: "left",
  thumbnailShow: true,
  zoomType: "side",
};

export default Zoom;