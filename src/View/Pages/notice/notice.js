import axios from "axios";
import "View/css/intro.css";
import classNames from "classnames";
import { motion } from "framer-motion";
import * as Io5 from "react-icons/io5";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "react-query";
import SaveNotice from "../write-notice/save";
import { Modal } from "View/Parts/modal/modal";
import { modalStatus } from "View/Common/utils";
import { localDatetimeRenderer, openNotification } from "View/utils";
import React, { useEffect, useState } from "react";
import NoticeContents from "../write-notice/modify";
import { Chart } from "react-chartjs-2";
import { fetchDashboardData } from "View/Common/RequestHandler/actions";
// import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { ContentBox } from "View/Parts/content-box/content-box";

// ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Notice = ({ expand }) => {
  const API_BASE_URL = process.env.REACT_APP_API;
  const [checkAll, setCheckAll] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  const [chartConfig, setChartConfig] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [noticeList, setNoticeList] = useState(undefined);
  const [modalStat, setModalStat] = useRecoilState(modalStatus);
  const { isLoading, data } = useQuery(["dashboardData"], () =>
    fetchDashboardData()
  );

  const getNoticeList = async (req) => {
    const response = await axios.post(
      `${API_BASE_URL}/serviceCenter/notice/${req.page}`,
      req
    );
    return response;
  };
  const deleteNoticeList = async (req) => {
    const value = req.toString();
    const response = await axios.delete(
      `${API_BASE_URL}/serviceCenter/deleteNotice`,
      { data: { value } }
    );
    return response;
  };
  const mutation = useMutation({
    mutationFn: (req) => getNoticeList(req),
    onSuccess: (result) => {
      setNoticeList(result.data);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (req) => deleteNoticeList(req),
    onSuccess: () => {
      mutation.mutate({ page: currentPage });
      alert(`${deleteList.length} 개의 행 삭제완료`);
      setDeleteList([]);
    },
  });

  const onClickCheckbox = (event, id) => {
    event.stopPropagation();
    deleteList.includes(id)
      ? setDeleteList(deleteList.filter((e) => e !== id))
      : setDeleteList([...deleteList, id]);
  };

  const onClickDelete = () => {
    deleteList.length < 1
      ? openNotification("최소 하나 이상의 행을 선택하세요.", <Io5.IoCloseOutline />, `none`)
      : deleteMutation.mutate(deleteList);
  };

  // id 표시 필요할 때
  // const idRenderer = (total, index, currentPage) => {
  //     return total - (currentPage * 5 + index)
  // }

  const onClickPageMove = (page) => {
    setDeleteList([]);
    setCurrentPage(page);
    mutation.mutate({ page: page });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (mutation.data === undefined) {
      mutation.mutate({ page: currentPage });
    }
  }, []);

  useEffect(() => {
    data &&
      setChartConfig({
        type: "radar",
        data: {
          labels: data?.countQueryResult?.map((e) => {
            return e.agent;
          }),
          datasets: [
            {
              label: "Number of count",
              backgroundColor: "rgb(0, 0, 0, 0.5)",
              borderWidth: 0,
              data: data?.countQueryResult?.map((e) => e.count),
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
  }, [data]);

  return (
    <motion.div
      className="content_inside notice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="wrap_half">
        <ContentBox
          title={"Notice List"}
          content={
            <div className="body_wrap">
              <div className="btnWrap">
                <button onClick={onClickDelete}>삭제</button>
                <button onClick={() => setModalStat(<SaveNotice />)}>
                  공지사항 작성
                </button>
              </div>
              <div className="grid-table th">
                <input
                  type="checkbox"
                  onClick={() => {
                    if (!checkAll) {
                      setDeleteList(
                        noticeList?.contents.map((element) => element.id)
                      );
                    } else {
                      setDeleteList([]);
                    }
                    setCheckAll(!checkAll);
                  }}
                />
                <div className="_table-item">제목</div>
                <div className="_table-item">등록일</div>
              </div>
              {noticeList ? (
                noticeList.contents.map((element, index) => (
                  <div className="grid-table td" key={index}>
                    <input
                      type="checkbox"
                      onChange={(event) => onClickCheckbox(event, element.id)}
                      checked={deleteList.includes(element.id)}
                    />
                    <div
                      className="_table-item"
                      onClick={() =>
                        setModalStat(<NoticeContents element={element} />)
                      }
                    >
                      {element.announcement_title}
                    </div>
                    <div className="_table-item">
                      {localDatetimeRenderer(
                        element.created_date,
                        "dateFormat"
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid-table none">
                  <div className="loading" />
                </div>
              )}
              <div className="paging">
                {noticeList && (
                  <ul>
                    <p
                      onClick={() =>
                        currentPage > 0 && onClickPageMove(currentPage - 1)
                      }
                      style={{
                        color: currentPage === 0 ? "#c0c0c0" : "#000000",
                        cursor: currentPage === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      {"<"}
                    </p>
                    {Array.from(
                      { length: noticeList.totalPages },
                      () => undefined
                    ).map((_, index) => (
                      <li
                        className={classNames(null, {
                          active: index === currentPage,
                        })}
                        key={index}
                        onClick={() => onClickPageMove(index)}
                      >
                        <span>{index + 1}</span>
                      </li>
                    ))}
                    <p
                      onClick={() =>
                        currentPage < noticeList.totalPages - 1 &&
                        onClickPageMove(currentPage + 1)
                      }
                      style={{
                        color:
                          currentPage === noticeList.totalPages - 1
                            ? "#c0c0c0"
                            : "#000000",
                        cursor:
                          currentPage === noticeList.totalPages - 1
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {">"}
                    </p>
                  </ul>
                )}
              </div>
            </div>
          }
        />
        {/* <ContentBox title={"User agent summury"} content={chartConfig && <Chart {...chartConfig} />} /> */}
        <ContentBox title={"User agent summury"} />
      </div>
      <div className="wrap_full">
        <ContentBox title={"User agent summury"} />
      </div>
      {modalStat && <Modal component={modalStat} />}
    </motion.div>
  );
};

export default Notice;
