import "View/css/main.css";
import classNames from 'classnames';
import { motion } from 'framer-motion';
import * as Io from "react-icons/io5";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import menuItems from "../../../api/menu-items.js";
import { subExpandState } from "View/Common/utils/index.js";

export const Side = props => {
    const { expand, setExpand } = props;
    const navigate = useNavigate();
    const [subExpand, setSubExpand] = useRecoilState(subExpandState);
    const [isInside, setIsInside] = useState(false);
    const [mouseHovering, setMouseHovering] = useState(undefined);

    const handleMenuClick = index => {
        subExpand.includes(index)
            ? setSubExpand([...subExpand.filter(value => value !== index)])
            : setSubExpand([...subExpand, index]);
    }

    const onClickLogo = () => {
        window.location.href = "/"
    }

    const handleCircleClick = () => {
        setSubExpand([]);
        setMouseHovering(undefined);
        setExpand(!expand);
    }

    useEffect(() => {
        setTimeout(() => {
            if (isInside === false) {
                setMouseHovering(undefined);
            }
        }, 30);
    }, [isInside]);

    useEffect(() => {
        if (isInside === false && !mouseHovering) {
            setMouseHovering(undefined);
        }
    }, [isInside])

    return (
        <div className={classNames("side_wrap", { expanded: expand })}>
            <div className="side_body">
                <div className="logo_area prevent_select">
                    {expand ? (
                        <p onClick={onClickLogo} className="shrink_logo _cp">J</p>
                    ) : (
                        <p onClick={onClickLogo} className="expand_logo _cp">JUHAN</p>
                    )}
                </div>
                <div className="menu_area">
                    {menuItems.map((e, i) => (
                        <div
                            key={i}
                            className="items"
                            onMouseEnter={() => setMouseHovering(i)}
                        >
                            <div
                                className="items_wrap prevent_select"
                                onClick={() => e.menuLink ? navigate(e.menuLink) : handleMenuClick(i)}
                            >
                                {e.menuIcon}
                                {!expand && (<p>{e.menuName}</p>)}
                                {!expand && e.menuLink === undefined ? subExpand.includes(i) ? <Io.IoChevronUp /> : <Io.IoChevronDown /> : undefined}
                            </div>
                            {(e.subMenu && !expand) && (
                                <div className={classNames("sub_items", { sub_expanded: subExpand.includes(i) })}>
                                    {e.subMenu.map((element, index) => (
                                        <div key={index} onClick={() => element.subLink && navigate(element.subLink)}>
                                            <p></p>
                                            <p><span> - </span>{element.subName}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {(e.subMenu && expand && mouseHovering === i)
                                && (
                                <motion.div
                                    className="sub_hovering"
                                    initial={{ opacity: 0, rotation: 0.3 }}
                                    animate={{ opacity: 1, rotation: 0.3 }}
                                    exit={{ opacity: 0 }}
                                    onMouseEnter={() => setIsInside(true)}
                                    onMouseLeave={() => setIsInside(false)}
                                >
                                    {e.subMenu.map((element, index) => (
                                        <div key={index} onClick={() => element.subLink && navigate(element.subLink)}>
                                            <p>{element.subName}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
                <div className='inner_circle' onClick={handleCircleClick}>
                    {
                        expand ? (
                            <Io.IoChevronForward />
                        ) : (
                            <Io.IoChevronBackOutline />
                        )
                    }
                </div>
            </div>
        </div >
    );
}