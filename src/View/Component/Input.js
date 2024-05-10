import cx from "classnames";
import * as IconHi from "react-icons/hi";
import React, { useState, useCallback, useRef } from "react";

function Input({ label, type, text, setText, ...props }) {
    const [isFocus, setFocus] = useState("");
    const _onChange = (e) => {
        setText(e.target.value);
        props.onChange instanceof Function && props.onChange(e);
    };
    const [show, setShow] = useState(false);

    const inputRef = useRef();
    const changeShowAtPassword = useCallback(
        (e) => {
            if (e.nativeEvent.type === "click") {
                setShow(!show);
            }
        },
        [show]
    );

    return (
        <React.Fragment>
            <div
                className={cx("text _input", props.className, {
                    on: text !== "",
                    on: isFocus !== "" || text !== "",
                })}
                onClick={() => {
                    inputRef.current.focus();
                }}
            >
                <div
                    className={cx("titleText", props.className, {
                        on: text !== "",
                        on: isFocus !== "" || text !== "",
                    })}
                >{label}</div>
                <input
                    type={
                        type !== "password" ? type : show === false ? "password" : "text"
                    }
                    onChange={_onChange}
                    onFocus={() => {
                        setFocus("true")
                    }}
                    onKeyDown={e => (props.onKeyPress && e.code === "Enter") && props.onKeyPress()}
                    onBlur={() => {
                        setFocus("")
                    }}
                    ref={inputRef}
                />
                {type === "password" && (
                    <React.Fragment>
                        <div className="svgIcon"
                            onClick={changeShowAtPassword}
                        >
                            {show === false ? (
                                <IconHi.HiOutlineEye />
                            ) : (
                                <IconHi.HiOutlineEyeOff />
                            )}
                        </div>
                    </React.Fragment>
                )}
            </div>

        </React.Fragment>
    );
}

export default Input;