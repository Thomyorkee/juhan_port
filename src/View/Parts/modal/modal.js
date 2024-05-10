import "View/css/modal.css";
import { useState } from "react";
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { useDrag } from 'react-use-gesture';
import { modalStatus } from 'View/Common/utils';

export const Modal = ({ component }) => {
    const [logoPos, setlogoPos] = useState({ x: 0, y: 0 })
    const [modalStat, setModalStat] = useRecoilState(modalStatus);
    const bindLogoPos = useDrag((params) => {setlogoPos({ x: params.offset[0], y: params.offset[1] })});
    
    const onClickBackground = event => {
        if (event.target === event.currentTarget) setModalStat(undefined);
    }

    return (
        <div className={classNames("modal_bg", { opa_on: modalStat })} onClick={e => onClickBackground(e)}>
            <motion.div
                className="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: "relative",
                    top: logoPos.y,
                    left: logoPos.x
                }}
            >
                <div
                    className="modal_header"
                    {...bindLogoPos()}
                    onMouseDown={e => e.target.style.cursor = "all-scroll"}
                    onMouseUp={e => e.target.style.cursor = "default"}
                >
                    <div className="btn_wrap">
                        <div onClick={() => setModalStat(undefined)}/>
                        <div />
                        <div />
                    </div>
                </div>
                <div className="modal_body">
                    {component}
                </div>
            </motion.div>
        </div>
    );
}