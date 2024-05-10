import 'View/css/scroll.css';
import classNames from "classnames";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Scroll = () => {
    const [moveX, setMoveX] = useState(undefined);
    const [moveY, setMoveY] = useState(undefined);
    const [ref1, inView1] = useInView({
        threshold: 0.4,
    });
    const [ref2, inView2] = useInView({
        threshold: 0.4,
    });
    const [ref3, inView3] = useInView({
        threshold: 0.4,
    });
    const [ref4, inView4] = useInView({
        threshold: 0.4,
    });

    const _mouseMove = (e) => {
        const MouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
        const MouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));

        setMoveX((100 * MouseX) * 1 / 200);
        setMoveY((50 * MouseY) * 1 / 200);
    }

    const ROOT = document.documentElement;
    const MIN = 10;
    const THRESHOLD = window.innerHeight * (1.2 - 0.225);
    const update = e => {
        const scroll = Math.floor(window.scrollY / window.innerHeight * 100);
        if (window.scrollY > THRESHOLD) {
            const progress = Math.floor((window.scrollY - THRESHOLD) / (document.body.scrollHeight - window.innerHeight - THRESHOLD) * 100);
            ROOT.style.setProperty('--content', progress);
        }
        ROOT.style.setProperty('--scroll', Math.max(0, Math.min(scroll, 100 - MIN)));
    };

    useEffect(() => {
        window.addEventListener('scroll', update);
        return () => {
            window.removeEventListener('scroll', update);
        }
    }, [])

    return (
        <React.Fragment>
            <div ref={ref1}
                className={classNames("_scroll01", {
                    on: inView1 === true,
                })}
            >
                <div className="wrap">
                    <div className="_scrollText">
                        <span className="text01">C</span>
                        <span className="text02">e</span>
                        <span className="text03">r</span>
                        <span className="text04">a</span>
                        <span className="text05">m</span>
                        <span className="text06">i</span>
                        <span className="text07">c</span>
                        <span className="text08">소</span>
                        <span className="text09">재</span>
                        <br />
                        <span className="text03">D</span>
                        <span className="text04">i</span>
                        <span className="text05">s</span>
                        <span className="text06">p</span>
                        <span className="text07">l</span>
                        <span className="text08">a</span>
                        <span className="text09">y</span>
                        <span className="text10">부</span>
                        <span className="text11">품</span>
                        <span className="text12">전</span>
                        <span className="text13">문</span>
                        <span className="text14">기</span>
                        <span className="text15">업</span>
                    </div>
                    <div className="button">
                        <button>text</button>
                        <button>text</button>
                        <button>text</button>
                        <button>text</button>
                        <button>text</button>
                    </div>
                </div>
            </div>
            <div ref={ref2}
                className={classNames("_scroll02", {
                    on: inView2 === true,
                })}
                onMouseMove={_mouseMove}
            >
                <div className="bg"
                    style={{
                        transform: `translate(${moveX}px, ${moveY}px) scale(1.1)`
                    }}>
                    <div className="bgPic"></div>
                </div>
                <div className="rollingArea">
                    <div className="image_rolling">
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                    </div>
                    <div className="image_rolling">
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                    </div>
                    <div className="image_rolling">
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                        <div className="_image-item"></div>
                    </div>
                </div>
            </div >
            <div ref={ref3}
                className={classNames("_scroll03", {
                    on: inView3 === true,
                })}
            >
                <div className="border"></div>
                <div className="text-left commonText">
                    <div className="text">Hi,<br />This is my portfolio</div>
                </div>
                <div className="text-right commonText">
                    <div className="text">Hi,<br />This is my portfolio</div>
                </div>
            </div >
            <div ref={ref4}
                className={classNames("_scroll04", {
                    on: inView4 === true,
                })}
            >
                <div className="stiky_pic">
                    <img src="/img/cloud.png" alt="none"/>
                </div>
            </div >
        </React.Fragment >
    )
}

export default connect(
    // props 로 넣어줄 스토어 상태값
    (state) => ({
        layout: state.layout,
    }),
    // props 로 넣어줄 액션 생성함수
    (dispatch) => ({})
)(Scroll);

