import classNames from "classnames";
import { ColumnOptions } from "../utils/constants";
import { thousandSeparator } from "../utils/utils";
import React, { useEffect, useRef, useState } from "react";

export const Cell = (props) => {
  const { x, y, cValue, onChangedValue, columnOpt, selectRow, setSelectRow, setCurrentCell, currentCell } = props;
  const highlightRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState({ value: cValue[x] });

  const onChange = (e) => {
    setValue({ value: e.target.value });
  };

  const onKeyPressOnInput = async (e) => {
    if (e.key === 'ArrowUp') {
      await hasNewValue(e.target.value);
    } else if (e.key === 'ArrowDown' || e.key === "Enter") {
      await hasNewValue(e.target.value);
    } else if (e.key === 'ArrowLeft') {
      await hasNewValue(e.target.value);
    } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
      await hasNewValue(e.target.value);
    }
  };

  const onKeyPressOnSelect = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onBlur = (e) => {
    hasNewValue(e.target.value);
  };

  const hasNewValue = (value) => {
    if (value.trim() !== "") {
      onChangedValue(
        {
          x: x,
          y: y,
        },
        value
      );
    }
    setEditing(false);
    setSelected(false);

    return Promise.resolve();
  };

  const clicked = () => {
    setCurrentCell({ x: x, y: y });
  };

  const doubleClicked = () => {
    if (x !== 1) {
      setEditing(true);
    }
  };

  const onClickNumberSection = () => {
    selectRow.includes(y)
      ? setSelectRow(prev => [...prev.filter(value => value !== y)])
      : setSelectRow(prev => [...prev, y]);
    setCurrentCell({ x: undefined, y: undefined });
  }

  const renderInputForms = () => {
    if (editing && columnOpt && columnOpt.columnStyle === ColumnOptions.SELECT) {
      return (
        <select
          type="select"
          default
          onBlur={onBlur}
          tabIndex={-1}
          className={classNames("", { highlight: selected })}
          onKeyDown={onKeyPressOnSelect}
          value={value.value || ""}
          onChange={onChange}
          autoFocus
        >
          <option value={""}></option>
          {columnOpt?.selectOpt?.map((e, i) => (
            <option key={i}>{e}</option>
          ))}
        </select>
      );
    } else if (editing) {
      return (
        <input
          type={columnOpt.columnStyle === ColumnOptions.NUMBER ? "number" : "text"}
          className={classNames("", { highlight: selected })}
          onBlur={onBlur}
          onKeyDown={onKeyPressOnInput}
          value={value.value || ""}
          onChange={onChange}
          autoFocus
        />
      )
    }
    else {
      return (
        <span
          ref={highlightRef}
          role="presentation"
          tabIndex={1}
          onKeyUp={() => x !== 1 && setEditing(true)}
          style={{ cursor: x === 1 && "pointer" }}
          onDoubleClick={() => doubleClicked()}
          className={classNames("", { highlight: selected })}
          onClick={() => x === 1 ? onClickNumberSection() : clicked()}
        >
          {x === 1 ? y : value !== "" ? x > 8 ? thousandSeparator(value.value, ","): value.value : value.value}
        </span>
      )
    }
  }

  useEffect(() => {   
    setEditing(false);
    if (currentCell.x === x && currentCell.y === y) {
      setSelected(true);
      if (highlightRef.current) {
        highlightRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
        highlightRef.current.focus();
      };
    } else {
      setSelected(false);
    }
  }, [currentCell]);

  useEffect(() => {
    setValue({ value: cValue[x] });
  }, [cValue])

  return (
    <React.Fragment>
      {renderInputForms()}
    </React.Fragment>
  );
};
