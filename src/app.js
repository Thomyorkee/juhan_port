import Aos from "aos";
import "aos/dist/aos.css";
import { useRecoilValue } from "recoil";
import React, { useEffect } from "react";
import { Main } from "View/Pages/main/main";
import Login from "./View/Pages/login/index";
import { modalStatus } from "View/Common/utils";
import { Routing } from "View/Parts/route/routing";
import WindowResize from "View/Common/Browser/WindowResize";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "View/Parts/scrollToTop/scrollToTop";

const App = props => {
    const modalStat = useRecoilValue(modalStatus);

    useEffect(() => {
        Aos.init();
    })

    useEffect(() => {
        (window.location.pathname !== "/login" && !props.userInfo) && window.location.replace('/login');
    }, [props.userInfo, window.location.pathname])

    useEffect(() => {
        if (modalStat) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [modalStat])

    return (
        <React.Fragment>
            <WindowResize />
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/*" element={<Routing component={<Main />} userInfo={props.userInfo} authType="auth" />} />
                    <Route path="/login" element={<Routing component={<Login />} userInfo={props.userInfo} authType="nonAuth" />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
