import * as Io from "react-icons/io5";
import { useDrag } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';
import { useEffect, useState } from "react";
import classNames from "classnames";

export const ContentBox = props => {
    const { type, title, content, setDynamic } = props;
    const [relativePos, setRelativePos] = useState({ x: 0, y: 0 })
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
    const bind = useDrag(({ down, movement: [mx, my], event, velocity }) =>
        api.start(i => {
            return { x: down ? mx : 0, y: down ? my : 0, immediate: down }
        }),
        { bounds: { left: -745, right: 745, top: -50, bottom: 50 }, rubberband: true }
    )

    // useEffect(() => {
    //     if (relativePos.x <= -745) {
    //         setDynamic && setDynamic(prev => [prev[1], prev[0]])
    //     }
    // }, [relativePos])

    return (
        <animated.div
            className="content"
            style={{ x, y }}
        >
            <div
                className="content_name prevent_select"
                {...bind()}
                onMouseDown={e => { e.target.style.cursor = "all-scroll" }}
                onMouseUp={e => { e.target.style.cursor = "default" }}
            >
                {title}
                <Io.IoMove />
            </div>
            <div className={classNames("", {content_body: !type })}>
                {content}
            </div>
        </animated.div>
    );
}