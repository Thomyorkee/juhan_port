import axios from "axios";
import "View/css/change.css";
import Wave from "react-wavify";
import classNames from "classnames";
import * as Io from "react-icons/io5";
import { motion } from "framer-motion";
import Input from "View/Component/Input";
import { useMutation } from "react-query";
import { openNotification } from "View/utils";
import { SpinnerInfinity } from "spinners-react";
import React, { useState, useEffect } from "react";
import { setCookie } from "View/utils/cookie/cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoad, setLoad] = useState(false);
  const [isItem, setItem] = useState(false);
  const [password, setPassword] = useState("");

  const login = async (req) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/member/login`,
      req
    );
    return response;
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: (req) => login(req),
    onSuccess: (data) => {
      const userInfo = data.data;
      // process.env.NODE_ENV === 'development'
      //     && setCookie("accessToken", userInfo.accessToken, userInfo.cookieOptions);
      setCookie("accessToken", userInfo.accessToken, userInfo.cookieOptions);
      openNotification(
        `${userInfo.value.name}님 환영합니다`,
        <Io.IoCheckmark />,
        `success`
      );
      window.location.replace("/");
    },
    onError: (err) => {
      openNotification(
        err.response.data.message,
        <Io.IoCloseOutline />,
        `none`
      );
    },
  });

  const _Loading = () => {
    mutate({ email: email, password: password });
  };

  const tempSetter = () => {
    setCookie("accessToken", "temp", "temp");
    openNotification(`temp님 환영합니다`, <Io.IoCheckmark />, `success`);
    window.location.replace("/");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 300);
    setTimeout(() => {
      setItem(true);
    }, 1500);
  }, []);

  return (
    <React.Fragment>
      <motion.div
        className="bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={classNames("change", {
            view: isLoad,
          })}
        >
          <div
            className={classNames("logo", {
              itemLoding: isItem,
            })}
          >
            <p>JUHAN</p>
            <Wave
              fill="#f79902"
              paused={false}
              options={{
                height: 120,
                amplitude: 15,
                speed: 0.15,
                points: 4,
              }}
              className="wave"
            />
          </div>
          <div
            className={classNames("paddingArea textArea", {
              itemLoding: isItem === true,
            })}
          >
            <div className={classNames("changeArea")}>
              <div className="after">
                <Input
                  type="text"
                  label={"아이디"}
                  text={email}
                  setText={setEmail}
                />
                <Input
                  type="password"
                  label={"패스워드"}
                  text={password}
                  setText={setPassword}
                  onKeyPress={_Loading}
                />
                <div className="_button" style={{ cursor: "not-allowed" }}>
                  <button className="w-full" type="button" style={{ cursor: "not-allowed" }}>
                    {isLoading === false && <p>로그인</p>}
                    {isLoading === true && <SpinnerInfinity enabled={true} />}
                  </button>
                </div>
                <div className="_button">
                  <button
                    className="w-full"
                    type="button"
                    onClick={() => tempSetter()}
                  >
                    {isLoading === false && <p>Api 연동 없을 시</p>}
                    {isLoading === true && <SpinnerInfinity enabled={true} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Login;
