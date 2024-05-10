import axios from "axios";
import "View/css/table.css";
import classNames from "classnames";
import * as Io from "react-icons/io";
import * as Io5 from "react-icons/io5";
import { Row } from "./components/row";
import { motion } from "framer-motion";
import { ColumnMap } from "./utils/constants";
import { openNotification } from "View/utils";
import columns from "./columns/tableColumns.js";
import { RightClickMenu } from "./components/rightClickMenu";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchSheetData } from "View/Common/RequestHandler/actions";
import { deepClone, findDifferentKeys, onClickCopy, thousandSeparator } from "./utils/utils";

export const Table = (props) => {
  const API_BASE_URL = process.env.REACT_APP_API;
  const { xLen = 16, yLen = 50 } = props;
  const queryClient = useQueryClient();
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [sheetData, setSheetData] = useState({});
  const [selectRow, setSelectRow] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [contextActivated, setContextActivated] = useState(false);
  const [length, setLength] = useState({ xLen: xLen, yLen: yLen });
  const [currentCell, setCurrentCell] = useState({ x: undefined, y: undefined });
  const { isLoading, data } = useQuery(
    ["sheetData"], () =>
    fetchSheetData()
  );

  const saveRow = async (req, mod) => {
    const response = await axios.post(`${API_BASE_URL}/sheet/save`, req);
    return { res: response, mod: mod };
  }

  const saveCell = async (req, rowId) => {
    const response = await axios.post(`${API_BASE_URL}/sheet/saveCell/${rowId}`, req)
    return response
  }

  const deleteRows = async (req) => {
    const value = req.toString();
    const response = await axios.delete(`${API_BASE_URL}/sheet/deleteRows`, { data: { value } })
    return response
  }

  const saveOneRow = useMutation({
    mutationFn: (req) => saveRow(req.req, req.mod),
    onSuccess: (result) => {
      result.mod["id"] = result.res.data.id;
    }
  })

  const saveOneCell = useMutation({
    mutationFn: (req) => saveCell(req.req, req.id),
    onSuccess: (result) => {
      console.log("ok", result);
    }
  })

  const deleteRow = useMutation({
    mutationFn: (req) => deleteRows(req),
    onSuccess: (_) => {
      openNotification('삭제됐습니다.', <Io.IoIosCheckmark />, `success`);
      queryClient.invalidateQueries('sheetData');
      setSelectRow([]);
    }
  })

  const handleRightClick = event => {
    event.preventDefault();
    if (contextActivated) {
      setContextActivated(false);
    } else {
      setPosition({ x: event.clientX, y: event.clientY })
      setContextActivated(prev => !prev);
    }
  };

  const handleChangedCell = ({ x, y }, value) => {
    const req = {}
    req[ColumnMap[x]] = value;
    const currentData = deepClone(sheetData);
    const modifiedData = Object.assign({}, sheetData);
    setPast([...past, currentData]);

    if (!modifiedData[y]) {
      modifiedData[y] = {}
      saveOneRow.mutate({ req: req, mod: modifiedData[y] });
    } else {
      saveOneCell.mutate({ req: req, id: modifiedData[y].id })
    };

    modifiedData[y][x] = value;

    setSheetData(modifiedData);
  };

  const handleDeleteRow = () => {
    if (selectRow.length < 1) {
      openNotification("최소 하나 이상의 행을 선택하세요.", <Io5.IoCloseOutline />, `none`);
    } else {
      const request = selectRow.map(e => sheetData[e].id);
      deleteRow.mutate(request);
    }
  }

  const undo = useCallback(() => {
    if (past.length < 1) return;

    setPast(prevPast => {
      const newPast = [...prevPast];
      const newPresent = newPast.pop();
      console.log(findDifferentKeys(sheetData, newPresent));
      setSheetData(newPresent);
      return newPast;
    });
  }, [past, sheetData, future]);

  // const redo = () => {
  //   if (future.length === 0) return;

  //   const newFuture = [...future];
  //   const newPresent = newFuture.shift();

  //   setPast([...past, present]);
  //   setFuture(newFuture);
  // };

  const keyDown = (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toUpperCase() === 'Z') {
      event.preventDefault();
      // redo();
    } else if (event.ctrlKey && event.key.toUpperCase() === 'Z') {
      event.preventDefault();
      undo();
    } else if (event.ctrlKey && event.key === 'Enter') {
      setLength(prev => {
        const newLength = { xLen: prev.xLen, yLen: prev.yLen + 1 }
        return newLength;
      })
    } else if (event.ctrlKey && event.key.toUpperCase() === 'C') {
      selectRow.length > 0 && onClickCopy(sheetData, selectRow)
    } else if (event.key === 'Delete') {
      handleDeleteRow();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCurrentCell(prev => { return { x: prev.x, y: prev.y - 1 < 1 ? length.yLen : prev.y - 1 } });
    } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
      event.preventDefault();
      setCurrentCell(prev => { return { x: prev.x, y: prev.y + 1 > length.yLen ? 1 : prev.y + 1 } });
    } else if (event.key === 'ArrowLeft') {
      setCurrentCell(prev => { return { x: prev.x - 1 < 2 ? length.xLen : prev.x - 1, y: prev.y } });
    } else if (event.key === 'ArrowRight' || event.key === 'Tab') {
      event.preventDefault();
      setCurrentCell(prev => { return { x: prev.x + 1 > length.xLen ? 2 : prev.x + 1, y: prev.x === length.xLen ? prev.y + 1 : prev.y } });
    } else if (event.key === 'Space') {
      event.preventDefault();
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return () => window.removeEventListener('keydown', keyDown);
  }, [keyDown]);

  useEffect(() => {
    if (data) {
      setLength(prev => {
        const newLength = { xLen: prev.xLen, yLen: Math.floor((data.sheetQueryResult.length + 30) / 10) * 10 }
        return newLength;
      })
      const modifiedData = {};
      data.sheetQueryResult.forEach((e, i) => {
        modifiedData[i + 1] = {
          id: e.id,
          2: e.year, 3: e.month, 4: e.department, 5: e.manager_name,
          6: e.sales_classification, 7: e.sales_product, 8: e.customer_name,
          9: e.project_name, 10: e.order_amount, 11: e.order_profit, 12: e.sales_amount,
          13: e.sales_profit, 14: e.purchase_total, 15: e.purchase_product, 16: e.purchase_manpower
        };
      })
      setSheetData(modifiedData);
    }
  }, [data]);

  return (
    <motion.div className="spt_body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => setContextActivated(false)}
      onContextMenu={e => contextActivated && handleRightClick(e)}
    >
      <div className="spt_title">
        거래처 매입/매출 관리대장

      </div>
      <div className="spt_sub">
        <div>
          <Io.IoIosCheckmark />
          매입/매출 내역 입력
        </div>
        <div>
          * 총 누적 수주이익 : {thousandSeparator(data?.totalOrderProfit)} / 매출이익 : {thousandSeparator(data?.totalSalesProfit)}
        </div>
      </div>
      <div>
        <div className="spt_th" style={{ gridTemplateColumns: `50px repeat(${columns.length + 1}, 1fr)` }}>
          {columns.map((e, i) => (
            <div className={classNames("col_single", { hasGruop: e?.colGruop })} key={i}>
              {!e?.colGruop ? e.columnName : (
                <React.Fragment>
                  <div className="th_gh">
                    {e.columnName}
                  </div>
                  <div className="sub_wrap">
                    {e.colGruop.map((element, index) => (
                      <div key={index} className="th_subs">
                        {element.columnName}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              )}
            </div>
          ))}
        </div>
        {Array.from({ length: length.yLen }, () => undefined).map((_, idx) => (
          <Row
            key={idx}
            y={idx + 1}
            columns={columns}
            xLen={length.xLen}
            selectRow={selectRow}
            setLength={setLength}
            currentCell={currentCell}
            setSelectRow={setSelectRow}
            rowData={sheetData[idx + 1] || {}}
            setCurrentCell={setCurrentCell}
            handleRightClick={handleRightClick}
            handleChangedCell={handleChangedCell}
            setContextActivated={setContextActivated}
          />
        ))}
      </div>
      <RightClickMenu
        data={sheetData}
        position={position}
        deleteRow={handleDeleteRow}
        selectRow={selectRow}
        contextActivated={contextActivated}
      />
    </motion.div>
  );
};
