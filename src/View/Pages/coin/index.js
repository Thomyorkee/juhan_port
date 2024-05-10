import "View/css/testSub.css";
import classNames from "classnames";
import * as Antd from "react-icons/ai";
import { useQuery } from "react-query";
import { useCallback, useState } from "react";
import coinCode from "../../../api/CoinCode.json";
import { thousandSeparator } from "View/Common/utils";
import { ChartDetail } from "View/Parts/ChartDetail/chartDetail";
import { useApiRequestCurrency } from "View/Common/RequestHandler";
import { fetchChartData } from "View/Common/RequestHandler/actions";

const Coin = () => {
  const responseData = useApiRequestCurrency();
  const [rowClick, setRowClick] = useState(undefined);
  const { isLoading, data } = useQuery(["chartData", rowClick], () => rowClick !== undefined && fetchChartData(rowClick));

  const setOption = useCallback((e) => {
    setRowClick(e)
  }, [])

  return (
    <div>
      <div className="main_con03">
        <div className="video-wrapper" style={{ backgroundColor: "white" }}>
          <ul
            className="currency"
            style={{
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
              marginTop: "50px",
            }}
          >
            <li
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                borderBottom: "1px solid #000",
                padding: "15px",
                backgroundColor: "#e5e5e5",
                textAlign: "center",
              }}
            >
              <span>종목명</span>
              <span>최근 24시간 변동</span>
              <span>현재가</span>
              <span>전일 최고가</span>
              <span>전일 최저가</span>
              <span>전일 종가</span>
            </li>
            {responseData?.data !== undefined &&
              Object.entries(responseData?.data).filter(e => e[0] !== "date").map((e, i) => (
                <li className="data_index" onClick={() => setOption(e[0])} key={i}>
                  <span>{e[0]}({coinCode[e[0]]})</span>
                  <span
                    className={classNames("up", {
                      down: e[1].fluctate_24H < 0,
                    })}
                  >
                    <Antd.AiFillCaretUp />{" "}
                    {thousandSeparator(e[1].fluctate_24H, ",")} KRW(
                    {thousandSeparator(e[1].fluctate_rate_24H, ",")}%)
                  </span>
                  <span
                    className={classNames("up", {
                      down: e[1].fluctate_24H < 0,
                    })}
                  >
                    {thousandSeparator((parseInt(e[1].prev_closing_price, 10) + parseInt(e[1].fluctate_24H, 10)).toString(), ",")} KRW
                  </span>
                  <span>{thousandSeparator(e[1].max_price, ",")} KRW</span>
                  <span>{thousandSeparator(e[1].min_price, ",")} KRW</span>
                  <span>
                    {thousandSeparator(e[1].prev_closing_price, ",")} KRW
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : data && (
        <ChartDetail name={rowClick} chartOn={data?.data?.map((e, _) => { return { x: new Date(e[0]), y: [e[1], e[2], e[3], e[4]] } })} setChartOn={setRowClick} />
      )}
    </div>
  );
}

export default Coin;