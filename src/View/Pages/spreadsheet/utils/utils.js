import * as Io from "react-icons/io5";
import { openNotification } from "View/utils";
import { ColumnMap } from "./constants";

export const thousandSeparator = (value, type = ",") => {
    if (value === null || value === undefined || isNaN(value)) return value;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, type);
};

export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

export const convertToCSV = (data) => {
    const rows = data.map(obj => Object.values(obj).join('\t'));
    return [...rows].join('\n');
}

export const onClickCopy = async (data, selectRow) => {
    const copyData = selectRow.map(e => { return data[e] });
    try {
        await navigator.clipboard.writeText(convertToCSV(copyData));
        openNotification('클립보드에 링크가 복사되었습니다.', <Io.IoCheckmark />, `success`);
    } catch (e) {
        const textArea = document.createElement('textarea');
        textArea.value = convertToCSV(copyData);
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        openNotification('클립보드에 링크가 복사되었습니다.', <Io.IoCheckmark />, `success`);
    }
};

export const findDifferentKeys = (obj1, obj2) => {
    const differentKeys = [];

    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            differentKeys.push({ key, value1: obj1[key], value2: obj2[key] });
        }
    }

    return differentKeys;
}

export const jsonKeyConverter = (jsonObject) => {
    const transformedObject = {};
    for (const key in jsonObject) {
        const columnName = mapIntegerToColumnName(parseInt(key));
        transformedObject[columnName] = jsonObject[key];
    }

    return transformedObject;
};

const mapIntegerToColumnName = (integerKey) => {
    const columnMapKeys = Object.keys(ColumnMap);
    const matchingKey = columnMapKeys.find(key => parseInt(key) === integerKey);
    return matchingKey ? ColumnMap[matchingKey] : null;
};