import React from "react";
import { Cell } from "./cell";
import classNames from "classnames";

export const Row = (props) => {
  const { y, xLen, handleChangedCell, rowData, columns, handleRightClick, setLength, setCurrentCell, currentCell, selectRow, setSelectRow } = props;
  
  return (
    <div
      style={{ gridTemplateColumns: "50px repeat(15, 1fr)" }}
      className={classNames("spt_row", { selected: selectRow.includes(y) })}
      onContextMenu={e => selectRow.includes(y) && handleRightClick(e)}
    >
      {Array.from({ length: xLen }, () => undefined).map((_, idx) => (
        <Cell
          y={y}
          x={idx + 1}
          key={`${idx}-${y}`}
          selectRow={selectRow}
          setLength={setLength}
          cValue={rowData || ""}
          columnOpt={columns[idx] || "number"}
          currentCell={currentCell}
          setSelectRow={setSelectRow}
          setCurrentCell={setCurrentCell}
          onChangedValue={handleChangedCell}
        />
      ))}
    </div>
  );
};
