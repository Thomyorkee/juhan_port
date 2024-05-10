import "View/css/main.css"
import axios from "axios";
import Coin from "../coin";
import classNames from "classnames";
import { motion } from 'framer-motion';
import { Table } from "../spreadsheet";
import { Deck } from "../testing/cards";
import Weather from "View/Pages/weather";
import { useMutation } from "react-query";
import { useEffect, useState } from 'react';
import { Side } from 'View/Parts/side/side';
import Notice from "View/Pages/notice/notice";
import Introduce from "../introduce/introduce";
import Scroll from "View/Pages/css-sample/index";
import { Route, Routes } from "react-router-dom";
import { Header } from "View/Parts/header/header";
import NoticeContents from "View/Pages/write-notice/modify";

export const Main = () => {
    const [expand, setExpand] = useState(true);
    const saveInflow = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API}/inflow`, {})
        return response
    }

    const { mutate } = useMutation({
        mutationFn: (req) => saveInflow(req),
    });

    useEffect(() => {
        const isLogged = window.sessionStorage.getItem("logging")
        if (!isLogged) {
            mutate();
            window.sessionStorage.setItem("logging", true);
        }
    }, [])

    return (
        <motion.div className="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={classNames("main_wrap", { m_expanded: expand })}>
                <Header />
                <Routes>
                    <Route path="/" element={<Introduce />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/noticeContent/*" element={<NoticeContents />} />
                    <Route path="/deck" element={<Deck />} />
                    <Route path="/scroll" element={<Scroll />} />
                    <Route path="/coin" element={<Coin />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/spread" element={<Table />} />
                </Routes>
                <Side expand={expand} setExpand={setExpand} />
            </div>
        </motion.div>
    );
}